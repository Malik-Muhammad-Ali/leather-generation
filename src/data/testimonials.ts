import { Testimonial } from "@/types";
import { IMAGES } from "./images";

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Alexander Hayes",
    location: "London, UK",
    rating: 5,
    quote:
      "The Heritage Biker Jacket is, without question, the finest leather piece I own. Every stitch tells a story of real craftsmanship.",
    avatar: IMAGES.portraits[0],
  },
  {
    id: "t2",
    name: "Isabella Moreau",
    location: "Paris, France",
    rating: 5,
    quote:
      "I've bought from luxury houses twice the price with half the quality. Leather Generation understands what timeless actually means.",
    avatar: IMAGES.portraits[1],
  },
  {
    id: "t3",
    name: "Marcus Chen",
    location: "Singapore",
    rating: 5,
    quote:
      "From the unboxing to the first wear, everything felt deliberate. The briefcase has become part of my daily uniform.",
    avatar: IMAGES.portraits[2],
  },
  {
    id: "t4",
    name: "Olivia Bennett",
    location: "New York, USA",
    rating: 4,
    quote:
      "Customer service helped me pick the right size for my partner's jacket and it arrived beautifully packaged. A genuinely premium experience.",
    avatar: IMAGES.portraits[3],
  },
];
