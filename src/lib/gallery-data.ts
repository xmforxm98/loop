export interface ImageAsset {
    id: string;
    title: string;
    url: string;
}

export interface ImagePackage {
    slug: string;
    title: string;
    description: string;
    thumbnail: string;
    category: string;
    count: number;
    assets: ImageAsset[];
}

const FIREBASE_BASE = 'https://firebasestorage.googleapis.com/v0/b/innerfive.firebasestorage.app/o/';
const ALT_MEDIA = '?alt=media';

// Helper to construct URLs
const firebaseItem = (path: string) => `${FIREBASE_BASE}${encodeURIComponent(path)}${ALT_MEDIA}`;

export const imagePackages: ImagePackage[] = [
    {
        slug: "eidos-cards",
        title: "Eidos Card Collection",
        description: "The complete set of Eidos identity cards from the InnerFive project. Each card represents a unique spiritual archetype.",
        thumbnail: firebaseItem('eidos_cards/The Soulful Nurturer of Compassionate Healer_1.png'),
        category: "Archetypes",
        count: 58,
        assets: [
            { id: "e1", title: "The Soulful Nurturer", url: firebaseItem('eidos_cards/The Soulful Nurturer of Compassionate Healer_1.png') },
            { id: "e2", title: "The Architect of Spirit", url: firebaseItem('eidos_cards/The Architect of Spirit of Great Manifestor_1.png') },
            { id: "e3", title: "The Autonomous Leader", url: firebaseItem('eidos_cards/The Autonomous Leader of Strong-willed Lighthouse_1.png') },
            { id: "e4", title: "The Cosmic Connector", url: firebaseItem('eidos_cards/The Cosmic Connector of Spiritual Enlightener_1.png') },
            { id: "e5", title: "The Serene Scholar", url: firebaseItem('eidos_cards/The Serene Scholar of Wise Guide_1.png') },
            { id: "e6", title: "The Sage of Suffering", url: firebaseItem('eidos_cards/The Sage of Suffering of Inner Alchemist_1.png') },
            { id: "e7", title: "The Visionary Entrepreneur", url: firebaseItem('eidos_cards/The Visionary Entrepreneur of Golden Pioneer_1.png') },
            { id: "e8", title: "The Compassionate Advisor", url: firebaseItem('eidos_cards/The Compassionate Advisor of Wise Guide_1.png') },
            { id: "e9", title: "The Unstoppable Pioneer", url: firebaseItem('eidos_cards/The Unstoppable Pioneer of Indomitable Explorer_1.png') },
            { id: "e10", title: "The Firm Foundation Manager", url: firebaseItem('eidos_cards/The Firm Foundation Manager of Deep-rooted Nurturer_1.png') },
            { id: "e11", title: "The Shadow Conqueror", url: firebaseItem('eidos_cards/The Shadow Conqueror of Inner Alchemist_1.png') },
            { id: "e12", title: "The Passionate Seeker", url: firebaseItem('eidos_cards/The Passionate Seeker of Radiant Creator_1.png') },
            { id: "e13", title: "The Pragmatic Magnate", url: firebaseItem('eidos_cards/The Pragmatic Magnate of Golden Pioneer_1.png') },
            { id: "e14", title: "The Intuitive Mentor", url: firebaseItem('eidos_cards/The Intuitive Mentor of Wise Guide_1.png') },
            { id: "e15", title: "The Serene Oracle", url: firebaseItem('eidos_cards/The Serene Oracle of Spiritual Enlightener_1.png') },
            { id: "e16", title: "The Unyielding Pioneer", url: firebaseItem('eidos_cards/The Unyielding Pioneer of Strong-willed Lighthouse_1.png') },
            { id: "e17", title: "The Gentle Healer", url: firebaseItem('eidos_cards/The Gentle Healer of Deep-rooted Nurturer_1.png') },
            { id: "e18", title: "The Mediator of Peace", url: firebaseItem('eidos_cards/The Mediator of Peace of Compassionate Healer_1.png') },
            { id: "e19", title: "The Balanced Mediator", url: firebaseItem('eidos_cards/The Balanced Mediator of Destiny Integrator_1.png') },
            { id: "e20", title: "The Wind of Change", url: firebaseItem('eidos_cards/The Wind of Change of Free Innovator_1.png') },
            { id: "e21", title: "The Transformative Catalyst", url: firebaseItem('eidos_cards/The Transformative Catalyst of Inner Alchemist_1.png') },
            { id: "e22", title: "The Discerning Analyst", url: firebaseItem('eidos_cards/The Discerning Analyst of Resolute Designer_1.png') },
            { id: "e23", title: "The Social Network Builder", url: firebaseItem('eidos_cards/The Social Network Builder of Relationship Artisan_1.png') },
            { id: "e24", title: "The Ethical Administrator", url: firebaseItem('eidos_cards/The Ethical Administrator of Wise Ruler_1.png') },
            { id: "e25", title: "The Fair Collaborator", url: firebaseItem('eidos_cards/The Fair Collaborator of Destiny Integrator_1.png') },
            { id: "e26", title: "The Visionary Realizer", url: firebaseItem('eidos_cards/The Visionary Realizer of Great Manifestor_1.png') },
            { id: "e27", title: "The Conqueror of Knowledge", url: firebaseItem('eidos_cards/The Conqueror of Knowledge of Indomitable Explorer_1.png') },
            { id: "e28", title: "The True Unifier", url: firebaseItem('eidos_cards/The True Unifier of Relationship Artisan_1.png') },
            { id: "e29", title: "Oriented Ideator", url: firebaseItem('eidos_cards/Oriented Ideator of Creative Affluent_1.png') },
            { id: "e30", title: "The Intuitive Forecaster", url: firebaseItem('eidos_cards/The Intuitive Forecaster of Flexible Strategist_1.png') },
            { id: "e31", title: "The Ideological Leader", url: firebaseItem('eidos_cards/The Ideological Leader of Wise Ruler_1.png') },
            { id: "e32", title: "The Intuitive Oracle", url: firebaseItem('eidos_cards/The Intuitive Oracle of Abyss Explorer_1.png') },
            { id: "e33", title: "The Inspired Verdant Architect", url: firebaseItem('eidos_cards/The Inspired Verdant Architect of Green Mercenary_1.png') },
            { id: "e34", title: "The Resilient Artisan", url: firebaseItem('eidos_cards/The Resilient Artisan of Strong-willed Lighthouse_1.png') },
            { id: "e35", title: "The Harmonizer of Change", url: firebaseItem('eidos_cards/The Harmonizer of Change of Flexible Strategist_1.png') },
            { id: "e36", title: "The Boundless Explorer", url: firebaseItem('eidos_cards/The Boundless Explorer of Free Innovator_1.png') },
            { id: "e37", title: "The Inspiring Pioneer", url: firebaseItem('eidos_cards/The Inspiring Pioneer of Free Innovator_1.png') },
            { id: "e38", title: "The Pragmatic Builder", url: firebaseItem('eidos_cards/The Pragmatic Builder of Resolute Designer_1.png') },
            { id: "e39", title: "The Gregarious Visionary", url: firebaseItem('eidos_cards/The Gregarious Visionary of Radiant Creator_1.png') },
            { id: "e40", title: "The Global Transformer", url: firebaseItem('eidos_cards/The Global Transformer of Great Manifestor_1.png') },
            { id: "e41", title: "The Community Advocate", url: firebaseItem('eidos_cards/The Community Advocate of Deep-rooted Nurturer_1.png') },
            { id: "e42", title: "The Principled Administrator", url: firebaseItem('eidos_cards/The Principled Administrator of Resolute Designer_1.png') },
            { id: "e43", title: "The Artistic Entrepreneur", url: firebaseItem('eidos_cards/The Artistic Entrepreneur of Creative Affluent_1.png') },
            { id: "e44", title: "The Flowing Philosopher", url: firebaseItem('eidos_cards/The Flowing Philosopher of Abyss Explorer_1.png') },
            { id: "e45", title: "The Solitary Sage", url: firebaseItem('eidos_cards/The Solitary Sage of Abyss Explorer_1.png') },
            { id: "e46", title: "The Fiery Artist", url: firebaseItem('eidos_cards/The Fiery Artist of Radiant Creator_1.png') },
            { id: "e47", title: "The Strategic Adaptor", url: firebaseItem('eidos_cards/The Strategic Adaptor of Flexible Strategist_1.png') },
            { id: "e48", title: "The Light Bearer", url: firebaseItem('eidos_cards/The Light Bearer of Spiritual Enlightener_1.png') },
            { id: "e49", title: "The Guardian of Principles", url: firebaseItem('eidos_cards/The Guardian of Principles of Honorable Strategist_1.png') },
            { id: "e50", title: "The Social Influencer", url: firebaseItem('eidos_cards/The Social Influencer of Golden Pioneer_1.png') },
            { id: "e51", title: "The Wealth Organizer", url: firebaseItem('eidos_cards/The Wealth Organizer of Creative Affluent_1.png') },
            { id: "e52", title: "The Resilient Verdant Architect", url: firebaseItem('eidos_cards/The Resilient Verdant Architect of Green Mercenary_1.png') },
            { id: "e53", title: "The Harmonious Builder", url: firebaseItem('eidos_cards/The Harmonious Builder of Destiny Integrator_1.png') },
            { id: "e54", title: "The Ambitious Verdant Architect", url: firebaseItem('eidos_cards/The Ambitious Verdant Architect_1.png') },
            { id: "e55", title: "The Authoritative Mentor", url: firebaseItem('eidos_cards/The Authoritative Mentor of Honorable Strategist_1.png') },
            { id: "e56", title: "The Luminous Servant", url: firebaseItem('eidos_cards/The Luminous Servant of Compassionate Healer_1.png') },
            { id: "e57", title: "The Conductor of Harmony", url: firebaseItem('eidos_cards/The Conductor of Harmony of Relationship Artisan_1.png') },
            { id: "e58", title: "The Leader of Adventure", url: firebaseItem('eidos_cards/The Leader of Adventure of Indomitable Explorer_1.png') },
        ]
    },
    {
        slug: "tarot-major-arcana",
        title: "Major Arcana Variations",
        description: "A comprehensive collection of Major Arcana tarot cards, featuring 4 unique artistic variations for each card.",
        thumbnail: firebaseItem('tarot_cards/foolcrown1.png'),
        category: "Tarot",
        count: 88,
        assets: [
            ...['foolcrown', 'magician', 'highpriestess', 'theempress', 'emperor', 'hierophant', 'lover', 'chariot', 'strength', 'hermit', 'wheeloffortune', 'justice', 'hangedman', 'death', 'temperance', 'devil', 'tower', 'star', 'moon', 'sun', 'judgment', 'world'].flatMap(card =>
                [1, 2, 3, 4].map(v => ({
                    id: `tarot-${card}-${v}`,
                    title: `${card.charAt(0).toUpperCase() + card.slice(1)} Vol.${v}`,
                    url: firebaseItem(`tarot_cards/${card === 'hermit' ? `Hermit${v}.png` : `${card}${v}.png`}`)
                }))
            )
        ]
    },
    {
        slug: "eidos-group-illustrations",
        title: "Eidos Group Art",
        description: "Cinematic group illustrations representing the major spiritual families in the InnerFive universe.",
        thumbnail: firebaseItem('eidos_group_image/Abyss_Explorer1.png'),
        category: "Illustrations",
        count: 80,
        assets: [
            ...['Abyss_Explorer', 'Compassionate_Healer', 'Creative_Affluent', 'Deep-rooted_Nurturer', 'Destiny_Integrator', 'Flexible_Strategist', 'Free_Innovator', 'Golden_Pioneer', 'Great_Manifestor', 'Green_Mercenary', 'Honorable_Strategist', 'Indomitable_Explorer', 'Inner_Alchemist', 'Radiant_Creator', 'Relationship_Artisan', 'Resolute_Designer', 'Spiritual_Enlightener', 'Strong-willed_Lighthouse', 'Wise_Guide', 'Wise_Ruler'].flatMap(group =>
                [1, 2, 3, 4].map(v => ({
                    id: `group-${group}-${v}`,
                    title: `${group.replace(/_/g, ' ')} v${v}`,
                    url: firebaseItem(`eidos_group_image/${group}${v}.png`)
                }))
            )
        ]
    },
    {
        slug: "golden-sage-collection",
        title: "Golden Sage Series",
        description: "Exquisite artwork featuring the Golden Sage, a symbol of ultimate wisdom and enlightenment.",
        thumbnail: firebaseItem('eidos_images/golden_sage/The visionary verdant oracle of golden sage2.jpg'),
        category: "Vibe",
        count: 5,
        assets: [
            { id: "gs1", title: "Golden Sage Oracle", url: firebaseItem('eidos_images/golden_sage/The visionary verdant oracle of golden sage2.jpg') },
            { id: "gs2", title: "Golden Sage Meditation", url: firebaseItem('eidos_images/golden_sage/The visionary verdant oracle of golden sage1.jpg') },
            { id: "gs3", title: "Golden Sage Enlightenment", url: firebaseItem('eidos_images/golden_sage/The visionary verdant oracle of golden sage3.jpg') },
            { id: "gs4", title: "Golden Sage Legacy", url: firebaseItem('eidos_images/golden_sage/The visionary verdant oracle of golden sage4.jpg') },
            { id: "gs5", title: "Golden Sage Spirit", url: firebaseItem('eidos_images/golden_sage/The visionary verdant oracle of golden sage5.jpg') },
        ]
    }
];
