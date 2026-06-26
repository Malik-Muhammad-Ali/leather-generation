import { Order, Address } from "@/types";

export const MOCK_ORDERS: Order[] = [
  {
    id: "LG-10293",
    date: "2026-05-18",
    status: "Delivered",
    total: 489,
    items: [{ productId: "p1", quantity: 1 }],
  },
  {
    id: "LG-10287",
    date: "2026-04-02",
    status: "Shipped",
    total: 205,
    items: [
      { productId: "p3", quantity: 1 },
      { productId: "p5", quantity: 1 },
    ],
  },
  {
    id: "LG-10260",
    date: "2026-02-21",
    status: "Delivered",
    total: 540,
    items: [{ productId: "p7", quantity: 1 }],
  },
];

export const MOCK_ADDRESSES: Address[] = [
  {
    id: "a1",
    fullName: "Alexander Hayes",
    line1: "221B Baker Street",
    city: "London",
    state: "Greater London",
    postalCode: "NW1 6XE",
    country: "United Kingdom",
    phone: "+44 20 7946 0958",
    isDefault: true,
  },
];
