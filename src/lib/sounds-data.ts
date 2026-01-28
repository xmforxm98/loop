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
    },
    {
        id: "7",
        title: "Techno Beat Loop",
        category: "Music",
        duration: "0:12",
        url: `${GITHUB_AUDIO_BASE}se-techno.mp3`,
        license: "MIT"
    },
    {
        id: "8",
        title: "Space Drone",
        category: "Sci-Fi",
        duration: "0:10",
        url: `${GITHUB_AUDIO_BASE}pipe-01.mp3`,
        license: "MIT"
    },
    {
        id: "9",
        title: "Cyber Signal",
        category: "Tech",
        duration: "0:05",
        url: `${GITHUB_AUDIO_BASE}glockenspiel-02.mp3`,
        license: "MIT"
    },
    {
        id: "10",
        title: "Urban Traffic",
        category: "City",
        duration: "0:20",
        url: `${GITHUB_AUDIO_BASE}walking.mp3`, // Reuse for now or find better
        license: "MIT"
    },
    {
        id: "11",
        title: "Magic Sparkle",
        category: "Fantasy",
        duration: "0:03",
        url: `${GITHUB_AUDIO_BASE}glockenspiel-03.mp3`,
        license: "MIT"
    },
    {
        id: "12",
        title: "Industrial Hum",
        category: "Industrial",
        duration: "0:15",
        url: `${GITHUB_AUDIO_BASE}pipe-02.mp3`,
        license: "MIT"
    }
];
