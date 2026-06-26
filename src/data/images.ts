// Curated Unsplash photo IDs (verified reachable via images.unsplash.com).
// Centralized here so misassigned/placeholder images can be swapped in one place
// once real product photography is available.

function unsplash(id: string, w = 1600, q = 80) {
  return `https://images.unsplash.com/photo-${id}?w=${w}&q=${q}&auto=format&fit=crop`;
}

export const IMAGES = {
  heroJacket: unsplash("1503342217505-b0a15ec3261c", 2000),
  heroTexture: unsplash("1556228453-efd6c1ff04f6", 2000),
  storeInterior: unsplash("1559056199-641a0ac8b55e", 2000),

  jackets: [
    unsplash("1551028719-00167b16eac5"),
    unsplash("1556905055-8f358a7a47b2"),
    unsplash("1591047139829-d91aecb6caea"),
    unsplash("1614252369475-531eba835eb1"),
    unsplash("1620625515032-6ed0c1790c75"),
  ],
  wallets: [
    unsplash("1559563458-527698bf5295"),
    unsplash("1542060748-10c28b62716f"),
    unsplash("1605812860427-4024433a70fd"),
  ],
  belts: [
    unsplash("1553062407-98eeb64c6a62"),
    unsplash("1624222247344-550fb60583dc"),
    unsplash("1543528176-61b239494933"),
  ],
  bags: [
    unsplash("1473966968600-fa801b869a1a"),
    unsplash("1539109136881-3be0616acf4b"),
    unsplash("1525507119028-ed4c629a60a3"),
    unsplash("1592878904946-b3cd8ae243d0"),
  ],
  accessories: [
    unsplash("1517841905240-472988babdf9"),
    unsplash("1576566588028-4147f3842f27"),
    unsplash("1604644401890-0bd678c83788"),
  ],

  workshop: [
    unsplash("1606760227091-3dd870d97f1d"),
    unsplash("1455165814004-1126a7199f9b"),
    unsplash("1573855619003-97b4799dcd8b"),
  ],

  portraits: [
    unsplash("1530893609608-32a9af3aa95c", 400),
    unsplash("1487058792275-0ad4aaf24ca7", 400),
    unsplash("1505740420928-5e560c06d30e", 400),
    unsplash("1567401893414-76b7b1e5a7a5", 400),
    unsplash("1556742049-0cfed4f6a45d", 400),
    unsplash("1495474472287-4d71bcdd2085", 400),
    unsplash("1490578474895-699cd4e2cf59", 400),
  ],
};
