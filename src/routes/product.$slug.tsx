import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, Minus, Plus, Phone, MessageCircle, ShieldCheck, Truck, BadgeCheck, ShoppingCart } from "lucide-react";
import { formatKES, products, PHONE, WHATSAPP_URL } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — JIBAR Technologies` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} · ${loaderData.product.brand}` },
          { property: "og:description", content: loaderData.product.short },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="pt-40 pb-24 container-x text-center">
      <h1 className="text-3xl font-bold text-primary">Product not found</h1>
      <Link to="/shop" className="mt-6 inline-flex items-center gap-2 text-accent font-semibold">
        <ArrowLeft className="h-4 w-4" /> Back to shop
      </Link>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add, setOpen } = useCart();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"specs" | "description" | "warranty">("specs");

  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);

  return (
    <>
      <section className="pt-28 md:pt-32 pb-16 lg:pb-24">
        <div className="container-x">
          <nav className="text-sm text-muted-foreground mb-6 flex gap-2">
            <Link to="/" className="hover:text-accent">Home</Link><span>/</span>
            <Link to="/shop" className="hover:text-accent">Shop</Link><span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16">
            <div>
              <div className="aspect-square rounded-3xl bg-surface-muted overflow-hidden border border-border group">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="mt-4 grid grid-cols-4 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <button key={i} className="aspect-square rounded-xl bg-surface-muted border border-border overflow-hidden hover:border-accent/60">
                    <img src={product.image} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="eyebrow mb-3">{product.brand}</p>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary leading-tight">{product.name}</h1>
              <p className="mt-4 text-muted-foreground">{product.short}</p>

              <div className="mt-6 flex items-end gap-4">
                <p className="text-3xl md:text-4xl font-bold text-primary tracking-tight">{formatKES(product.price)}</p>
                {product.oldPrice && <p className="text-lg text-muted-foreground line-through">{formatKES(product.oldPrice)}</p>}
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm">
                {product.inStock ? (
                  <span className="inline-flex items-center gap-1.5 text-success font-medium"><Check className="h-4 w-4" /> In stock — ships in 24h</span>
                ) : <span className="text-destructive font-medium">Currently out of stock</span>}
              </div>

              <div className="mt-8 flex items-center gap-4">
                <div className="inline-flex items-center border border-border rounded-full h-12">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-12 w-12 grid place-items-center hover:text-accent" aria-label="Decrease"><Minus className="h-4 w-4" /></button>
                  <span className="w-10 text-center font-semibold">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="h-12 w-12 grid place-items-center hover:text-accent" aria-label="Increase"><Plus className="h-4 w-4" /></button>
                </div>
                <button onClick={() => { add(product.slug, qty); setOpen(true); }}
                  className="flex-1 inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-primary text-primary-foreground font-semibold btn-premium">
                  <ShoppingCart className="h-4 w-4" /> Add to Cart
                </button>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <a href={`tel:${PHONE}`} className="inline-flex items-center justify-center gap-2 h-12 rounded-full border border-border font-semibold hover:border-accent/60">
                  <Phone className="h-4 w-4 text-accent" /> Call
                </a>
                <a href={WHATSAPP_URL} className="inline-flex items-center justify-center gap-2 h-12 rounded-full border border-border font-semibold hover:border-accent/60">
                  <MessageCircle className="h-4 w-4 text-accent" /> WhatsApp
                </a>
              </div>

              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <Pill icon={Truck}>Nationwide delivery</Pill>
                <Pill icon={ShieldCheck}>Genuine product</Pill>
                <Pill icon={BadgeCheck}>Manufacturer warranty</Pill>
              </ul>

              <div className="mt-10 border-t border-border pt-6">
                <div className="flex gap-2 border-b border-border">
                  {(["specs", "description", "warranty"] as const).map((t) => (
                    <button key={t} onClick={() => setTab(t)}
                      className={["px-4 py-3 text-sm font-semibold capitalize transition-colors relative",
                        tab === t ? "text-primary" : "text-muted-foreground hover:text-foreground"].join(" ")}>
                      {t}
                      {tab === t && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-accent" />}
                    </button>
                  ))}
                </div>
                <div className="pt-5 text-sm text-muted-foreground leading-relaxed transition-opacity duration-300">
                  {tab === "specs" && (
                    <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                      {product.specs.map((s) => (
                        <div key={s.label} className="flex justify-between gap-4 py-2 border-b border-border/60">
                          <dt className="text-muted-foreground">{s.label}</dt>
                          <dd className="text-foreground font-medium text-right">{s.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  {tab === "description" && <p>{product.description}</p>}
                  {tab === "warranty" && <p>{product.warranty}. Local servicing supported through authorised channels. Original receipt required for claims.</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16 lg:py-24 bg-surface border-t border-border">
          <div className="container-x">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8">Related Products</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {related.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function Pill({ icon: Icon, children }: { icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-surface border border-border">
      <Icon className="h-4 w-4 text-accent shrink-0" />
      <span className="text-foreground/80 font-medium">{children}</span>
    </li>
  );
}
