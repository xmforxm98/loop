// Google Analytics Measurement ID
export const GA_MEASUREMENT_ID = 'G-1KV1SVB9KS';

/**
 * Tracks a page view event.
 * @param url The URL of the page being viewed.
 */
export const pageview = (url: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('config', GA_MEASUREMENT_ID, {
            page_path: url,
        });
    }
};

/**
 * Tracks a custom event.
 * @param action The action performed (e.g., 'click_download').
 * @param category The category of the event (e.g., 'gallery').
 * @param label The label of the event (e.g., 'eidos-cards').
 * @param value The value associated with the event.
 */
export const event = ({ action, category, label, value }: {
    action: string;
    category: string;
    label?: string;
    value?: number;
}) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};
