import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/lib/data/products";
import { ProductDetailContent } from "@/components/product/ProductDetailContent";
import { RelatedProducts } from "@/components/product/RelatedProducts";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product);

  return (
    <>
      <ProductDetailContent product={product} />
      <RelatedProducts products={related} />
    </>
  );
}
