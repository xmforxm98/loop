const FIREBASE_BASE = 'https://firebasestorage.googleapis.com/v0/b/innerfive.firebasestorage.app/o/';
const ALT_MEDIA = '?alt=media';

const firebaseItem = (path) => `${FIREBASE_BASE}${encodeURIComponent(path)}${ALT_MEDIA}`;

const majorArcanaNames = [
    'foolcrown', 'magician', 'highpriestess', 'theempress', 'emperor',
    'hierophant', 'lover', 'chariot', 'strength', 'hermit',
    'wheeloffortune', 'justice', 'hangedman', 'death', 'temperance',
    'devil', 'tower', 'star', 'moon', 'sun', 'judgment', 'world'
];

const tarotAssets = majorArcanaNames.flatMap(card =>
    [1, 2, 3, 4].map(v => ({
        id: `tarot-${card}-${v}`,
        title: `${card.charAt(0).toUpperCase() + card.slice(1)} Vol.${v}`,
        url: firebaseItem(`tarot_cards/${card === 'hermit' ? `Hermit${v}.png` : `${card}${v}.png`}`),
        cardName: card,
        version: v
    }))
);

module.exports = {
    tarotAssets,
    majorArcanaNames,
    getBaseUrl: () => "https://edit-all.web.app"
};
