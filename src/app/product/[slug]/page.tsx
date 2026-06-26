import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts, PRODUCTS } from "@/data/products";
import { ProductDetailContent } from "@/components/product/ProductDetailContent";
import { RelatedProducts } from "@/components/product/RelatedProducts";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return (
    <>
      <ProductDetailContent product={product} />
      <RelatedProducts products={related} />
    </>
  );
}
