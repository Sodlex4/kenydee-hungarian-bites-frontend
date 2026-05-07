export interface Testimonial {
  text: string;
  author: string;
  rating: number;
  image?: string;
  verified: boolean;
}

export const testimonials: Testimonial[] = [
  {
    text: "Absolutely incredible! The perfect blend of traditional Hungarian flavor and fresh, modern taste. Every bite is pure perfection.",
    author: "Steve",
    rating: 5,
    image: "/image/trainwithsteve.webp",
    verified: true,
  },
  {
    text: "These hot dog rolls have become my go-to for parties. Guests always ask where I got them — they're truly exceptional!",
    author: "Jimmy",
    rating: 5,
    image: "/image/jimmy.webp",
    verified: true,
  },
  {
    text: "Fresh, authentic, and packed with flavor. Hungarian Bites never disappoints — my family asks for them weekly.",
    author: "Mc Wizzy",
    rating: 5,
    image: "/image/mc-wizzy.webp",
    verified: true,
  },
];

export function getAverageRating(testimonials: Testimonial[]): string {
  const total = testimonials.reduce((sum, t) => sum + t.rating, 0);
  return (total / testimonials.length).toFixed(1);
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
