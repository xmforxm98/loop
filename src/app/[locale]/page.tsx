"use client";
import React, { useState, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Music,
  Repeat,
  Layers,
  ArrowRight,
  Download,
  Trash2,
  AlertCircle,
  Loader2,
  Clock,
  MessageSquare,
  Send,
  X,
  CheckCircle2
} from "lucide-react";
import { fetchFile } from "@ffmpeg/util";
import { useFFmpeg } from "@/hooks/useFFmpeg";
import "../../app/audio-editor.css"; // Fixed relative path
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

import WaveformTrimmer from "@/components/WaveformTrimmer";
import AdBanner from "@/components/AdBanner";
import { blogPosts } from "@/lib/blog-data";

type Tool = "merge" | "loop" | "extend" | "trim";

export default function AudioEditor() {
  const t = useTranslations('home');
  const tNav = useTranslations('nav');
  const { ffmpeg, loaded, loading: ffmpegLoading, progress, load } = useFFmpeg();
  const [activeTool, setActiveTool] = useState<Tool>("merge");
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [crossfade, setCrossfade] = useState(0.5);
  const [loopCount, setLoopCount] = useState(2);
  const [targetDuration, setTargetDuration] = useState(90); // minutes
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(60);
  const [segments, setSegments] = useState<{ id: string, start: number, end: number }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbackBody, setFeedbackBody] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (activeTool === "merge") {
        setFiles((prev) => [...prev, ...newFiles]);
      } else {
        setFiles(newFiles);
      }
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    setFiles((prev) => {
      const newFiles = [...prev];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex >= 0 && targetIndex < newFiles.length) {
        [newFiles[index], newFiles[targetIndex]] = [newFiles[targetIndex], newFiles[index]];
      }
      return newFiles;
    });
  };

  const handleProcess = async () => {
    if (!loaded) {
      const success = await load();
      if (success === false) {
        setError("Could not load the processing engine. Please check your internet connection and try again.");
        return;
      }
    }

    if (files.length === 0) {
      setError("Please select at least one file.");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setResultUrl(null);

    try {
      if (activeTool === "merge") {
        await processMerge();
      } else if (activeTool === "loop") {
        await processLoop();
      } else if (activeTool === "extend") {
        await processExtend();
      } else if (activeTool === "trim") {
        await processTrim();
      }
    } catch (err: any) {
      console.error(err);
      setError("An error occurred during processing. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const processMerge = async () => {
    const fileNames: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const ext = files[i].name.split(".").pop();
      const name = `input${i}.${ext}`;
      await ffmpeg.writeFile(name, await fetchFile(files[i]));
      fileNames.push(name);
    }

    let command: string[] = [];
    const outputName = "merged_output.mp3";

    if (crossfade > 0 && files.length > 1) {
      let inputs = fileNames.flatMap((name) => ["-i", name]);
      let filter = "[0:a][1:a]acrossfade=d=" + crossfade + ":c1=tri:c2=tri[a0]";
      for (let i = 2; i < files.length; i++) {
        filter += `;[a${i - 2}][${i}:a]acrossfade=d=${crossfade}:c1=tri:c2=tri[a${i - 1}]`;
      }
      const lastLabel = files.length > 1 ? `[a${files.length - 2}]` : "[0:a]";
      command = [...inputs, "-filter_complex", filter, "-map", lastLabel, outputName];
    } else {
      const concatList = fileNames.map(n => `file '${n}'`).join("\n");
      await ffmpeg.writeFile("concat.txt", concatList);
      command = ["-f", "concat", "-safe", "0", "-i", "concat.txt", "-c", "copy", outputName];
    }

    await ffmpeg.exec(command);
    const data = await ffmpeg.readFile(outputName);
    const url = URL.createObjectURL(new Blob([data as any], { type: "audio/mp3" }));
    setResultUrl(url);
  };

  const processLoop = async () => {
    const ext = files[0].name.split(".").pop();
    const inputName = `input.${ext}`;
    const outputName = "looped_output.mp3";
    await ffmpeg.writeFile(inputName, await fetchFile(files[0]));
    await ffmpeg.exec(["-stream_loop", (loopCount - 1).toString(), "-i", inputName, "-c", "copy", outputName]);
    const data = await ffmpeg.readFile(outputName);
    const url = URL.createObjectURL(new Blob([data as any], { type: "audio/mp3" }));
    setResultUrl(url);
  };

  const processExtend = async () => {
    const ext = files[0].name.split(".").pop();
    const inputName = `input.${ext}`;
    const outputName = "extended_output.mp3";
    await ffmpeg.writeFile(inputName, await fetchFile(files[0]));
    const targetSeconds = targetDuration * 60;
    await ffmpeg.exec(["-stream_loop", "-1", "-i", inputName, "-t", targetSeconds.toString(), "-c", "copy", outputName]);
    const data = await ffmpeg.readFile(outputName);
    const url = URL.createObjectURL(new Blob([data as any], { type: "audio/mp3" }));
    setResultUrl(url);
  };

  const processTrim = async () => {
    if (segments.length === 0) {
      setError("No segments selected.");
      return;
    }
    const ext = files[0].name.split(".").pop();
    const inputName = `input.${ext}`;
    const outputName = "trimmed_output.mp3";
    await ffmpeg.writeFile(inputName, await fetchFile(files[0]));
    let filter = "";
    let inputs = "";
    segments.forEach((seg, i) => {
      filter += `[0:a]atrim=start=${seg.start}:end=${seg.end},asetpts=PTS-STARTPTS[a${i}];`;
      inputs += `[a${i}]`;
    });
    filter += `${inputs}concat=n=${segments.length}:v=0:a=1[out]`;
    await ffmpeg.exec([
      "-i", inputName,
      "-filter_complex", filter,
      "-map", "[out]",
      "-c:a", "libmp3lame",
      "-q:a", "2",
      outputName
    ]);
    const data = await ffmpeg.readFile(outputName);
    const url = URL.createObjectURL(new Blob([data as any], { type: "audio/mp3" }));
    setResultUrl(url);
  };

  const downloadResult = () => {
    if (resultUrl) {
      const a = document.createElement("a");
      a.href = resultUrl;
      a.download = `loop_edited_${Date.now()}.mp3`;
      a.click();
    }
  };

  return (
    <div className="container py-12">
      {/* Hero Section */}
      <section className="text-center mb-16 animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 outfit">
          Edit Audio <span className="gradient-text">Without Limits</span>
        </h1>
        <p className="text-xl text-secondary max-w-2xl mx-auto mb-10">
          {t('hero.subtitle')}
        </p>

        {/* Tool Cards */}
        <div className="tool-grid">
          <div
            className={`tool-card ${activeTool === "merge" ? "active" : ""}`}
            onClick={() => { setActiveTool("merge"); setFiles([]); setError(null); }}
          >
            <div className="icon-box"><Layers size={24} /></div>
            <h3 className="text-xl font-bold mb-2">{t('tools.merge.title')}</h3>
            <p className="text-sm opacity-80">{t('tools.merge.desc')}</p>
          </div>
          <div
            className={`tool-card ${activeTool === "loop" ? "active" : ""}`}
            onClick={() => { setActiveTool("loop"); setFiles([]); setError(null); }}
          >
            <div className="icon-box"><Repeat size={24} /></div>
            <h3 className="text-xl font-bold mb-2">{t('tools.loop.title')}</h3>
            <p className="text-sm opacity-80">{t('tools.loop.desc')}</p>
          </div>
          <div
            className={`tool-card ${activeTool === "extend" ? "active" : ""}`}
            onClick={() => { setActiveTool("extend"); setFiles([]); setError(null); }}
          >
            <div className="icon-box"><Clock size={24} /></div>
            <h3 className="text-xl font-bold mb-2">{t('tools.extend.title')}</h3>
            <p className="text-sm opacity-80">{t('tools.extend.desc')}</p>
          </div>
          <div
            className={`tool-card ${activeTool === "trim" ? "active" : ""}`}
            onClick={() => { setActiveTool("trim"); setFiles([]); setError(null); }}
          >
            <div className="icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 6 2 2 2-2M3 18l2-2 2 2M12 6l2 2 2-2M12 18l2-2 2 2M18 12c.3 0 .5.2.5.5s-.2.5-.5.5h-4c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h4ZM8 12c.3 0 .5.2.5.5s-.2.5-.5.5H4c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h4Z" /><path d="M12 2v20M18 2v20" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-2">{t('tools.trim.title')}</h3>
            <p className="text-sm opacity-80">{t('tools.trim.desc')}</p>
          </div>
        </div>
      </section>

      {/* Top Ad Unit */}
      <AdBanner dataAdSlot="XXXXXXXXXX" />

      {/* Main Action Area */}
      <section className="max-w-3xl mx-auto glass rounded-[2rem] p-12 shadow-xl animate-fade-in" style={{ animationDelay: "0.2s" }} id="editor">
        {/* Drop Zone */}
        {!isProcessing && !resultUrl && (
          <div
            className="drop-zone mb-8"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('active'); }}
            onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove('active'); }}
            onDrop={(e) => {
              e.preventDefault();
              e.currentTarget.classList.remove('active');
              if (e.dataTransfer.files) {
                const newFiles = Array.from(e.dataTransfer.files);
                if (activeTool === "merge") {
                  setFiles((prev) => [...prev, ...newFiles]);
                } else {
                  setFiles(newFiles);
                }
              }
            }}
          >
            <Upload className="mx-auto mb-4 text-primary" size={48} />
            <h4 className="text-xl font-bold mb-2">
              {files.length > 0 ? `${files.length} file(s) selected` : "Drop your audio files here"}
            </h4>
            <p className="text-secondary">Or click to browse from your computer</p>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="audio/*"
              multiple={activeTool === "merge"}
              onChange={handleFileChange}
            />
          </div>
        )}

        {/* File List */}
        {files.length > 0 && !isProcessing && !resultUrl && (
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <h5 className="font-bold">Selected Tracks</h5>
              <button
                className="clear-btn"
                onClick={() => setFiles([])}
              >
                Clear All
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto pr-2">
              <AnimatePresence mode="popLayout">
                {files.map((file, idx) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={`${file.name}-${idx}`}
                    className="file-item"
                  >
                    <Music size={20} className="text-primary shrink-0" />
                    <div className="file-info">
                      <span className="file-name truncate">{file.name}</span>
                      <span className="file-meta">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>

                    <div className="file-actions">
                      {activeTool === "merge" && (
                        <>
                          <button
                            className="action-btn"
                            disabled={idx === 0}
                            onClick={() => moveFile(idx, 'up')}
                            title="Move Up"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
                          </button>
                          <button
                            className="action-btn"
                            disabled={idx === files.length - 1}
                            onClick={() => moveFile(idx, 'down')}
                            title="Move Down"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                          </button>
                        </>
                      )}
                      <button
                        className="action-btn delete"
                        onClick={() => removeFile(idx)}
                        title="Remove"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {activeTool === "merge" && (
              <button
                className="add-files-btn mt-4"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="flex items-center gap-2">
                  <Upload size={18} /> <span>Add More Files</span>
                </div>
              </button>
            )}
          </div>
        )}

        {/* Settings */}
        {files.length > 0 && !isProcessing && !resultUrl && (
          <div className="settings-panel mb-12">
            <h5 className="font-bold mb-6 flex items-center gap-2">
              Settings
            </h5>

            {activeTool === "merge" && (
              <div className="input-group">
                <label>Crossfade Duration (seconds)</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.1"
                    value={crossfade}
                    onChange={(e) => setCrossfade(parseFloat(e.target.value))}
                    className="flex-1"
                  />
                  <span className="font-bold w-12 text-right">{crossfade}s</span>
                </div>
              </div>
            )}

            {activeTool === "loop" && (
              <div className="input-group">
                <label>Number of Loops</label>
                <input
                  type="number"
                  min="2"
                  max="100"
                  value={loopCount}
                  onChange={(e) => setLoopCount(parseInt(e.target.value))}
                />
              </div>
            )}

            {activeTool === "extend" && (
              <div className="input-group">
                <label>Target Duration (minutes)</label>
                <input
                  type="number"
                  min="1"
                  max="480"
                  value={targetDuration}
                  onChange={(e) => setTargetDuration(parseInt(e.target.value))}
                />
              </div>
            )}

            {activeTool === "trim" && files.length > 0 && (
              <div className="mt-4">
                <WaveformTrimmer
                  file={files[0]}
                  onSegmentsChange={(newSegments) => {
                    setSegments(newSegments);
                  }}
                />
              </div>
            )}
          </div>
        )}

        {/* Progress State */}
        {isProcessing && (
          <div className="text-center py-12">
            <Loader2 className="mx-auto mb-4 text-primary animate-spin" size={48} />
            <h4 className="text-2xl font-bold mb-2">Processing Audio...</h4>
            <p className="text-secondary mb-6">This may take a few minutes for large files.</p>

            <div className="progress-container">
              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="font-bold text-primary">{progress}% Complete</p>
          </div>
        )}

        {/* Result State */}
        {resultUrl && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-6">
              <Download size={40} />
            </div>
            <h4 className="text-3xl font-bold mb-2">Ready for Download!</h4>
            <p className="text-secondary mb-8">Your audio file has been processed successfully.</p>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button className="btn btn-primary px-10" onClick={downloadResult}>
                <Download size={20} /> Download File
              </button>
              <button
                className="btn glass border-none px-10"
                onClick={() => { setResultUrl(null); setFiles([]); }}
              >
                Reset & Edit More
              </button>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-danger/10 text-danger p-4 rounded-xl flex items-start gap-3 mb-6">
            <AlertCircle className="shrink-0" size={20} />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Action Button */}
        {files.length > 0 && !isProcessing && !resultUrl && (
          <button
            className="btn btn-primary w-full py-4 text-lg"
            onClick={handleProcess}
            disabled={ffmpegLoading}
          >
            {ffmpegLoading ? "Loading Engine..." : `Process & ${activeTool === "merge" ? "Merge" :
              activeTool === "loop" ? "Loop" :
                activeTool === "extend" ? "Extend" :
                  "Trim"
              }`}
            {!ffmpegLoading && <ArrowRight size={20} />}
          </button>
        )}
      </section>

      {/* Privacy Message */}
      <section className="mt-16 max-w-2xl mx-auto">
        <div className="glass p-6 rounded-2xl border border-primary/20 flex gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
            <AlertCircle size={24} />
          </div>
          <div>
            <h5 className="font-bold mb-1">{t('features.privacy.title')}</h5>
            <p className="text-sm text-secondary">
              {t('features.privacy.desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Recent Blog Posts Preview */}
      <section className="mt-32 max-w-5xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold outfit mb-2">{t('recentPosts')}</h2>
            <p className="text-secondary">Audio production tips and updates</p>
          </div>
          <Link href="/blog" className="text-primary font-bold hover:underline flex items-center gap-2">
            {t('viewAllPosts')} <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="glass p-5 rounded-[2rem] border-transparent hover:border-primary/20 transition-all group"
            >
              <img
                src={post.image}
                className="w-full h-32 object-cover rounded-2xl mb-4 group-hover:scale-[1.02] transition-transform"
                alt={post.title}
              />
              <h4 className="font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h4>
              <p className="text-xs text-secondary line-clamp-3">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Feedback Button */}
      <section className="mt-12 text-center">
        <button
          onClick={() => setIsFeedbackOpen(true)}
          className="btn glass border-2 border-primary/20 hover:border-primary hover:bg-primary/5 px-8 py-3 transition-all flex items-center gap-2 mx-auto"
        >
          <MessageSquare size={18} />
          Submit Feedback / Suggestion
        </button>
        <p className="text-[10px] text-secondary mt-3 font-bold uppercase tracking-widest">
          We value your feedback to make Loop better
        </p>
      </section>

      {/* Feedback Modal */}
      <AnimatePresence>
        {isFeedbackOpen && (
          <div className="modal-overlay">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!feedbackSent) setIsFeedbackOpen(false);
              }}
              style={{ position: 'absolute', inset: 0 }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="modal-container"
            >
              <div className="modal-content">
                {!feedbackSent && (
                  <div className="modal-header">
                    <div>
                      <h3 className="text-2xl font-bold outfit mb-1">Feedback</h3>
                      <p className="text-sm text-secondary">Share your thoughts or report an issue.</p>
                    </div>
                    <button
                      onClick={() => setIsFeedbackOpen(false)}
                      className="close-btn"
                    >
                      <X size={20} />
                    </button>
                  </div>
                )}

                {feedbackSent ? (
                  <div className="text-center animate-fade-in py-4">
                    <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h4 className="text-3xl font-bold mb-3 outfit">Feedback Received</h4>
                    <p className="text-secondary mb-8 leading-relaxed">
                      Thank you for your valuable feedback!<br />
                      We will review it and continue to improve Loop.
                    </p>
                    <button
                      className="btn btn-primary w-full py-4 rounded-2xl shadow-lg"
                      onClick={() => {
                        setIsFeedbackOpen(false);
                        setFeedbackSent(false);
                        setFeedbackBody("");
                      }}
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <>
                    <textarea
                      value={feedbackBody}
                      onChange={(e) => setFeedbackBody(e.target.value)}
                      placeholder="Write your suggestion or feedback here..."
                      className="feedback-textarea"
                      style={{ minHeight: '180px' }}
                    />
                    <button
                      disabled={!feedbackBody.trim() || feedbackLoading}
                      onClick={async () => {
                        setFeedbackLoading(true);
                        try {
                          const response = await fetch('/api/feedback', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ body: feedbackBody }),
                          });

                          if (response.ok) {
                            setFeedbackSent(true);
                          } else {
                            alert("Failed to send feedback. Please try again later.");
                          }
                        } catch (err) {
                          console.error(err);
                          alert("An error occurred. Please try again.");
                        } finally {
                          setFeedbackLoading(false);
                        }
                      }}
                      className="btn btn-primary w-full py-4 text-lg font-bold rounded-2xl shadow-lg disabled:opacity-50"
                    >
                      {feedbackLoading ? (
                        <span className="flex items-center gap-2">
                          <Loader2 size={20} className="animate-spin" /> Submitting...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send size={18} /> Submit Feedback
                        </span>
                      )}
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
