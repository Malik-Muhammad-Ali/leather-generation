import { Product } from "@/types";
import { IMAGES } from "./images";

const colorVariants = (labels: { label: string; swatch: string }[]) =>
  labels.map((l, i) => ({ id: `color-${i}`, label: l.label, type: "color" as const, swatch: l.swatch }));

const sizeVariants = (labels: string[]) =>
  labels.map((l, i) => ({ id: `size-${i}`, label: l, type: "size" as const }));

const sampleReviews = (productName: string): Product["reviews"] => [
  {
    id: "r1",
    author: "James R.",
    rating: 5,
    date: "2026-04-12",
    title: "Exceptional craftsmanship",
    body: `The ${productName} exceeded my expectations — the leather is rich, the stitching is flawless, and it only gets better with age.`,
  },
  {
    id: "r2",
    author: "Sofia M.",
    rating: 4,
    date: "2026-03-02",
    title: "Beautiful, worth the investment",
    body: "Took a couple of weeks to arrive but the quality is unmistakable. Feels like a piece that will last decades.",
  },
  {
    id: "r3",
    author: "Daniel K.",
    rating: 5,
    date: "2026-02-18",
    title: "Heirloom quality",
    body: "Bought this as a gift and ended up wanting one myself. The attention to detail is on another level.",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    slug: "heritage-biker-jacket",
    name: "Heritage Biker Jacket",
    category: "jackets",
    price: 489,
    compareAtPrice: 590,
    images: [IMAGES.jackets[0], IMAGES.jackets[1], IMAGES.jackets[2]],
    shortDescription: "Full-grain leather biker jacket with asymmetric zip.",
    description:
      "Cut from full-grain calfskin and finished with solid brass hardware, the Heritage Biker Jacket is built on a century-old silhouette reimagined for the modern wardrobe. Each jacket is hand-cut and stitched by our master tailors, then naturally aged to develop a patina unique to its wearer.",
    specs: [
      { label: "Material", value: "100% Full-Grain Calfskin Leather" },
      { label: "Lining", value: "Quilted Viscose" },
      { label: "Hardware", value: "Solid Brass" },
      { label: "Origin", value: "Handcrafted in Italy" },
      { label: "Care", value: "Leather conditioner every 6 months" },
    ],
    colors: colorVariants([
      { label: "Deep Black", swatch: "#0B0B0B" },
      { label: "Cognac Brown", swatch: "#5C3A21" },
    ]),
    sizes: sizeVariants(["S", "M", "L", "XL"]),
    rating: 4.8,
    reviewCount: 132,
    reviews: sampleReviews("Heritage Biker Jacket"),
    isBestSeller: true,
    stock: 14,
  },
  {
    id: "p2",
    slug: "aviator-shearling-jacket",
    name: "Aviator Shearling Jacket",
    category: "jackets",
    price: 720,
    images: [IMAGES.jackets[3], IMAGES.jackets[4], IMAGES.jackets[0]],
    shortDescription: "Shearling-lined aviator jacket for timeless warmth.",
    description:
      "Inspired by mid-century flight jackets, the Aviator combines a supple suede-leather shell with genuine shearling lining for unmatched warmth and presence. A wardrobe centerpiece designed to be worn for generations.",
    specs: [
      { label: "Material", value: "Suede Leather Shell" },
      { label: "Lining", value: "Genuine Shearling" },
      { label: "Hardware", value: "Antique Brass" },
      { label: "Origin", value: "Handcrafted in Italy" },
    ],
    colors: colorVariants([{ label: "Camel", swatch: "#C69C6D" }]),
    sizes: sizeVariants(["S", "M", "L", "XL", "XXL"]),
    rating: 4.9,
    reviewCount: 64,
    reviews: sampleReviews("Aviator Shearling Jacket"),
    isNew: true,
    stock: 7,
  },
  {
    id: "p3",
    slug: "bifold-cardholder-wallet",
    name: "Bifold Cardholder Wallet",
    category: "wallets",
    price: 95,
    images: [IMAGES.wallets[0], IMAGES.wallets[1], IMAGES.wallets[2]],
    shortDescription: "Slim bifold wallet, hand-stitched edges.",
    description:
      "Crafted from vegetable-tanned leather and finished with hand-burnished edges, this bifold wallet holds up to eight cards and folded currency without ever feeling bulky in the pocket.",
    specs: [
      { label: "Material", value: "Vegetable-Tanned Leather" },
      { label: "Card Slots", value: "8" },
      { label: "Dimensions", value: "11cm x 9cm" },
      { label: "Origin", value: "Handcrafted in Portugal" },
    ],
    colors: colorVariants([
      { label: "Espresso", swatch: "#3A2317" },
      { label: "Cognac", swatch: "#5C3A21" },
      { label: "Black", swatch: "#0B0B0B" },
    ]),
    rating: 4.7,
    reviewCount: 248,
    reviews: sampleReviews("Bifold Cardholder Wallet"),
    isBestSeller: true,
    stock: 56,
  },
  {
    id: "p4",
    slug: "minimalist-card-holder",
    name: "Minimalist Card Holder",
    category: "wallets",
    price: 65,
    images: [IMAGES.wallets[2], IMAGES.wallets[0], IMAGES.wallets[1]],
    shortDescription: "Ultra-slim card holder for the modern minimalist.",
    description:
      "A single fold of premium nappa leather holds four cards and a few bills — nothing more, nothing less. Designed for those who carry light and value refined simplicity.",
    specs: [
      { label: "Material", value: "Nappa Leather" },
      { label: "Card Slots", value: "4" },
      { label: "Dimensions", value: "9.5cm x 7cm" },
    ],
    colors: colorVariants([
      { label: "Black", swatch: "#0B0B0B" },
      { label: "Tan", swatch: "#C69C6D" },
    ]),
    rating: 4.6,
    reviewCount: 91,
    reviews: sampleReviews("Minimalist Card Holder"),
    isNew: true,
    stock: 38,
  },
  {
    id: "p5",
    slug: "classic-buckle-belt",
    name: "Classic Buckle Belt",
    category: "belts",
    price: 110,
    images: [IMAGES.belts[0], IMAGES.belts[1], IMAGES.belts[2]],
    shortDescription: "Full-grain leather belt with solid brass buckle.",
    description:
      "A foundational piece for any wardrobe — full-grain leather, edge-painted by hand, fastened with a solid brass buckle that will outlast the belt itself.",
    specs: [
      { label: "Material", value: "Full-Grain Leather" },
      { label: "Buckle", value: "Solid Brass" },
      { label: "Width", value: "3.5cm" },
      { label: "Origin", value: "Handcrafted in Spain" },
    ],
    colors: colorVariants([
      { label: "Black", swatch: "#0B0B0B" },
      { label: "Brown", swatch: "#5C3A21" },
    ]),
    sizes: sizeVariants(["32", "34", "36", "38", "40"]),
    rating: 4.8,
    reviewCount: 176,
    reviews: sampleReviews("Classic Buckle Belt"),
    isBestSeller: true,
    stock: 64,
  },
  {
    id: "p6",
    slug: "reversible-dress-belt",
    name: "Reversible Dress Belt",
    category: "belts",
    price: 130,
    images: [IMAGES.belts[2], IMAGES.belts[0], IMAGES.belts[1]],
    shortDescription: "Two belts in one, with rotating buckle.",
    description:
      "A travel-friendly essential: black on one side, cognac on the other, joined by a rotating buckle mechanism finished in brushed nickel.",
    specs: [
      { label: "Material", value: "Full-Grain Leather, Reversible" },
      { label: "Buckle", value: "Brushed Nickel" },
      { label: "Width", value: "3.5cm" },
    ],
    sizes: sizeVariants(["32", "34", "36", "38"]),
    rating: 4.5,
    reviewCount: 58,
    reviews: sampleReviews("Reversible Dress Belt"),
    stock: 29,
  },
  {
    id: "p7",
    slug: "executive-briefcase",
    name: "Executive Briefcase",
    category: "bags",
    price: 540,
    compareAtPrice: 620,
    images: [IMAGES.bags[0], IMAGES.bags[1], IMAGES.bags[2]],
    shortDescription: "Structured briefcase for the modern professional.",
    description:
      "A structured silhouette in full-grain leather, padded for a 15-inch laptop and finished with solid brass hardware. Built for the boardroom and the airport gate alike.",
    specs: [
      { label: "Material", value: "Full-Grain Leather" },
      { label: "Laptop Sleeve", value: "Up to 15\"" },
      { label: "Hardware", value: "Solid Brass" },
      { label: "Origin", value: "Handcrafted in Italy" },
    ],
    colors: colorVariants([
      { label: "Espresso", swatch: "#3A2317" },
      { label: "Black", swatch: "#0B0B0B" },
    ]),
    rating: 4.9,
    reviewCount: 87,
    reviews: sampleReviews("Executive Briefcase"),
    isBestSeller: true,
    stock: 11,
  },
  {
    id: "p8",
    slug: "weekender-duffel",
    name: "Weekender Duffel",
    category: "bags",
    price: 480,
    images: [IMAGES.bags[3], IMAGES.bags[0], IMAGES.bags[2]],
    shortDescription: "Spacious leather duffel for short escapes.",
    description:
      "Generously sized and reinforced at every stress point, the Weekender is built from naturally tanned leather that softens beautifully over years of travel.",
    specs: [
      { label: "Material", value: "Naturally Tanned Leather" },
      { label: "Capacity", value: "45L" },
      { label: "Origin", value: "Handcrafted in Spain" },
    ],
    colors: colorVariants([{ label: "Cognac", swatch: "#5C3A21" }]),
    rating: 4.7,
    reviewCount: 45,
    reviews: sampleReviews("Weekender Duffel"),
    isNew: true,
    stock: 9,
  },
  {
    id: "p9",
    slug: "structured-tote",
    name: "Structured Tote",
    category: "bags",
    price: 395,
    images: [IMAGES.bags[2], IMAGES.bags[3], IMAGES.bags[1]],
    shortDescription: "Elegant structured tote for everyday carry.",
    description:
      "A refined silhouette with an interior organizer panel and magnetic closure, the Structured Tote moves seamlessly from office to evening.",
    specs: [
      { label: "Material", value: "Pebbled Full-Grain Leather" },
      { label: "Interior", value: "Suede Lining, 3 Pockets" },
    ],
    colors: colorVariants([
      { label: "Black", swatch: "#0B0B0B" },
      { label: "Tan", swatch: "#C69C6D" },
    ]),
    rating: 4.6,
    reviewCount: 72,
    reviews: sampleReviews("Structured Tote"),
    stock: 22,
  },
  {
    id: "p10",
    slug: "leather-watch-strap",
    name: "Leather Watch Strap",
    category: "accessories",
    price: 55,
    images: [IMAGES.accessories[0], IMAGES.accessories[1], IMAGES.accessories[2]],
    shortDescription: "Hand-stitched leather watch strap.",
    description:
      "A single piece of vegetable-tanned leather, hand-stitched and finished with a brushed buckle — built to complement any timepiece.",
    specs: [
      { label: "Material", value: "Vegetable-Tanned Leather" },
      { label: "Width", value: "20mm / 22mm" },
    ],
    colors: colorVariants([
      { label: "Brown", swatch: "#5C3A21" },
      { label: "Black", swatch: "#0B0B0B" },
    ]),
    rating: 4.5,
    reviewCount: 39,
    reviews: sampleReviews("Leather Watch Strap"),
    stock: 80,
  },
  {
    id: "p11",
    slug: "passport-travel-wallet",
    name: "Passport Travel Wallet",
    category: "accessories",
    price: 85,
    images: [IMAGES.accessories[1], IMAGES.accessories[2], IMAGES.accessories[0]],
    shortDescription: "Organized travel wallet for passport & cards.",
    description:
      "Keep your passport, boarding pass, and cards together in a single slim case, finished with the same full-grain leather used across our travel collection.",
    specs: [
      { label: "Material", value: "Full-Grain Leather" },
      { label: "Slots", value: "Passport + 4 Cards + Boarding Pass" },
    ],
    rating: 4.7,
    reviewCount: 53,
    reviews: sampleReviews("Passport Travel Wallet"),
    isNew: true,
    stock: 41,
  },
  {
    id: "p12",
    slug: "keychain-leather-fob",
    name: "Leather Key Fob",
    category: "accessories",
    price: 35,
    images: [IMAGES.accessories[2], IMAGES.accessories[0], IMAGES.accessories[1]],
    shortDescription: "Hand-braided leather key fob.",
    description:
      "A small detail that makes a statement — hand-braided leather with a solid brass ring, designed to age gracefully alongside your keys.",
    specs: [
      { label: "Material", value: "Braided Leather" },
      { label: "Hardware", value: "Solid Brass" },
    ],
    rating: 4.4,
    reviewCount: 28,
    reviews: sampleReviews("Leather Key Fob"),
    stock: 95,
  },
  {
    id: "p13",
    slug: "bespoke-monogram-wallet",
    name: "Bespoke Monogram Wallet",
    category: "custom",
    price: 150,
    images: [IMAGES.wallets[1], IMAGES.wallets[2], IMAGES.wallets[0]],
    shortDescription: "Personalized wallet with hand-stamped initials.",
    description:
      "Choose your leather, your stitching color, and your initials — each Bespoke Monogram Wallet is made to order by a single craftsperson from start to finish.",
    specs: [
      { label: "Material", value: "Choice of Full-Grain Leather" },
      { label: "Personalization", value: "Hand-Stamped Initials" },
      { label: "Lead Time", value: "2-3 Weeks" },
    ],
    colors: colorVariants([
      { label: "Black", swatch: "#0B0B0B" },
      { label: "Cognac", swatch: "#5C3A21" },
      { label: "Tan", swatch: "#C69C6D" },
    ]),
    rating: 5.0,
    reviewCount: 21,
    reviews: sampleReviews("Bespoke Monogram Wallet"),
    stock: 999,
  },
  {
    id: "p14",
    slug: "custom-tailored-jacket",
    name: "Custom Tailored Jacket",
    category: "custom",
    price: 950,
    images: [IMAGES.jackets[2], IMAGES.jackets[1], IMAGES.jackets[3]],
    shortDescription: "Made-to-measure leather jacket, your specifications.",
    description:
      "Submit your measurements and preferences, and our master tailors will hand-craft a jacket built exclusively for you — from leather selection to lining and hardware.",
    specs: [
      { label: "Material", value: "Choice of Full-Grain Leather" },
      { label: "Fit", value: "Made-to-Measure" },
      { label: "Lead Time", value: "4-6 Weeks" },
    ],
    rating: 5.0,
    reviewCount: 12,
    reviews: sampleReviews("Custom Tailored Jacket"),
    stock: 999,
  },
];

export function getProductBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, count = 4) {
  return PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, count);
}

export function getBestSellers() {
  return PRODUCTS.filter((p) => p.isBestSeller);
}
