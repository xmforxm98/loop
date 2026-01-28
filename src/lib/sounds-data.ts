export interface SoundItem {
    id: string;
    title: string;
    category: string;
    duration: string;
    url: string;
    license: string;
}

const GITHUB_AUDIO_BASE = 'https://github.com/scottschiller/soundmanager2/raw/master/demo/_mp3/';

export const soundItems: SoundItem[] = [
    {
        id: "1",
        title: "Cinematic Impact",
        category: "Cinematic",
        duration: "0:04",
        url: `${GITHUB_AUDIO_BASE}china_1.mp3`,
        license: "MIT"
    },
    {
        id: "2",
        title: "Digital Glitch",
        category: "Tech",
        duration: "0:02",
        url: `${GITHUB_AUDIO_BASE}click-high.mp3`,
        license: "MIT"
    },
    {
        id: "3",
        title: "Forest Ambience",
        category: "Nature",
        duration: "0:15",
        url: `${GITHUB_AUDIO_BASE}rain.mp3`,
        license: "MIT"
    },
    {
        id: "4",
        title: "Keyboard Typing",
        category: "Office",
        duration: "0:08",
        url: `${GITHUB_AUDIO_BASE}walking.mp3`,
        license: "MIT"
    },
    {
        id: "5",
        title: "Success Chime",
        category: "UI",
        duration: "0:03",
        url: `${GITHUB_AUDIO_BASE}glockenspiel-01.mp3`,
        license: "MIT"
    },
    {
        id: "6",
        title: "Water Splash",
        category: "Nature",
        duration: "0:02",
        url: `${GITHUB_AUDIO_BASE}click-low.mp3`,
        license: "MIT"
    }
];
