export interface TarotAsset {
    /** Unique ID for the asset version, e.g., 'tarot-foolcrown-1' */
    id: string;
    /** Human-readable title, e.g., 'Foolcrown Vol.1' */
    title: string;
    /** Direct CDN URL to the high-quality image */
    url: string;
    /** Internal card identifier (lower case) */
    cardName: string;
    /** Variation version (1 to 4) */
    version: number;
}

/**
 * A comprehensive collection of Major Arcana tarot cards (88 items total).
 * Each of the 22 cards has 4 unique artistic variations.
 */
export const tarotAssets: TarotAsset[];

/**
 * List of all 22 Major Arcana card names included in the package.
 */
export const majorArcanaNames: string[];

/**
 * Returns the base website URL for additional resources and full gallery.
 */
export function getBaseUrl(): string;
