import { Category } from "@/types";
import { IMAGES } from "./images";

export const CATEGORIES: { id: Category; name: string; image: string; description: string }[] = [
  { id: "jackets", name: "Leather Jackets", image: IMAGES.jackets[0], description: "Timeless silhouettes, full-grain leather" },
  { id: "wallets", name: "Wallets", image: IMAGES.wallets[0], description: "Slim, handcrafted everyday carry" },
  { id: "belts", name: "Belts", image: IMAGES.belts[0], description: "Solid brass buckles, vegetable-tanned hide" },
  { id: "bags", name: "Bags", image: IMAGES.bags[0], description: "Totes, briefcases & weekenders" },
  { id: "accessories", name: "Accessories", image: IMAGES.accessories[0], description: "Small leather goods, finely finished" },
  { id: "custom", name: "Custom", image: IMAGES.accessories[1], description: "Bespoke pieces, made to order" },
];
