import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Loop | Unlimited Browser-based Audio Editor",
  description: "Merge, loop, and extend your audio files locally in your browser. No server uploads, total privacy, and high speed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXX"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>
        <main>{children}</main>
        <footer className="py-12 border-t border-border mt-20">
          <div className="container text-center">
            <p className="text-secondary text-sm mb-4">
              &copy; {new Date().getFullYear()} Loop Audio Editor. All rights reserved.
            </p>
            <p className="text-xs text-secondary max-w-2xl mx-auto">
              Privacy Disclaimer: Your files are processed entirely on your local machine. We never upload your audio data to any server. Secure, private, and fast.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
