/**
 * GENUINE customer feedback only – add entries here once a customer has
 * given permission to publish their words. Never add invented reviews.
 *
 * Example:
 * { name: "Jane D.", company: "Northside FC", country: "United Kingdom", quote: "..." }
 */
export type Testimonial = { name: string; company?: string; country?: string; quote: string };

export const testimonials: Testimonial[] = [];
