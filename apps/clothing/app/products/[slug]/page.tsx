import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "../../../components/add-to-cart";
import { CartPanel } from "../../../components/cart-panel";
import { products } from "../../data";

const money = new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 });

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <main>
      <section className="relative overflow-hidden bg-ink pb-12 pt-32 text-white">
        <Image src={product.detailImage} alt="" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(17,24,39,0.96),rgba(17,24,39,0.8)_58%,rgba(17,24,39,0.42))]" />
        <div className="shell relative z-10">
          <Link href="/products" className="text-sm font-semibold text-white/75">Back to products</Link>
          <h1 className="mt-5 text-[clamp(2.35rem,7vw,4.25rem)] font-black leading-tight">{product.name}</h1>
          <p className="mt-4 text-xl text-white/80">{money.format(product.price)}</p>
        </div>
      </section>
      <section className="section bg-white">
        <div className="shell grid gap-8 lg:grid-cols-[1fr_0.7fr_0.7fr]">
          <Image src={product.detailImage} alt={product.name} width={760} height={428} className="rounded-md object-cover" />
          <div>
            <p className="text-sm font-bold uppercase text-accent">{product.category}</p>
            <p className="mt-4 text-lg leading-8 text-slate-700">{product.description}</p>
            <p className="mt-5 font-semibold text-slate-600">{product.stock} pieces currently available.</p>
            <dl className="mt-6 grid gap-3 rounded-md border border-slate-200 bg-slate-50 p-5 text-sm">
              {[
                ["Collection", product.collection],
                ["Gender", product.gender],
                ["Material", product.material],
                ["Fit", product.fit],
                ["Available colours", product.colors.join(", ")],
                ["Available sizes", product.sizes.join(", ")],
                ["Care", product.care]
              ].map(([label, value]) => (
                <div key={label} className="grid gap-1 border-b border-slate-200 pb-3 last:border-b-0 last:pb-0 md:grid-cols-[150px_1fr]">
                  <dt className="font-bold text-ink">{label}</dt>
                  <dd className="text-slate-600">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-7">
              <AddToCart product={product} />
            </div>
          </div>
          <CartPanel />
        </div>
      </section>
    </main>
  );
}
