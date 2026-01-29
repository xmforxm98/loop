const FIREBASE_BASE = 'https://firebasestorage.googleapis.com/v0/b/innerfive.firebasestorage.app/o/';
const ALT_MEDIA = '?alt=media';

const firebaseItem = (path) => `${FIREBASE_BASE}${encodeURIComponent(path)}${ALT_MEDIA}`;

const majorArcana = [
    'foolcrown', 'magician', 'highpriestess', 'theempress', 'emperor',
    'hierophant', 'lover', 'chariot', 'strength', 'hermit',
    'wheeloffortune', 'justice', 'hangedman', 'death', 'temperance',
    'devil', 'tower', 'star', 'moon', 'sun', 'judgment', 'world'
];

/**
 * Modern DIY approach: 
 * Instead of single images, we treat the 4 variations as 'Styles' 
 * that can be composed or chosen.
 */
const styles = {
    1: { name: 'Noble Classic', mood: 'Balanced' },
    2: { name: 'Deep Mystic', mood: 'Dark' },
    3: { name: 'Golden Luxury', mood: 'Rich' },
    4: { name: 'Artistic Modern', mood: 'Creative' }
};

const getCard = (name, style = 1) => {
    if (!majorArcana.includes(name)) return null;
    const v = Math.max(1, Math.min(4, style));
    const path = `tarot_cards/${name === 'hermit' ? `Hermit${v}.png` : `${name}${v}.png`}`;
    return {
        id: `${name}-${v}`,
        name: name,
        style: styles[v],
        url: firebaseItem(path)
    };
};

/**
 * Returns a layer-ready object for DIY composition
 */
const getLayers = (name) => {
    return [1, 2, 3, 4].map(v => getCard(name, v));
};

module.exports = {
    majorArcana,
    styles,
    getCard,
    getLayers,
    compose: (name, options = {}) => {
        // Future: Handle actual transparent PNG merging
        return getCard(name, options.style || 1);
    }
};
