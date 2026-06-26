import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ProductCard } from "@/components/site/ProductCard";
import { categories, products } from "@/lib/data";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — JIBAR TECHNOLOGIES" },
      { name: "description", content: "Browse premium laptops, gaming PCs, monitors, networking and accessories with nationwide delivery in Kenya." },
      { property: "og:title", content: "Shop Premium Electronics — JIBAR TECHNOLOGIES" },
      { property: "og:description", content: "Genuine electronics with manufacturer warranty." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const [cat, setCat] = useState<string>("all");
  const [sort, setSort] = useState<string>("featured");
  const filtered = useMemo(() => {
    let list = cat === "all" ? products : products.filter((p) => p.category === cat);
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [cat, sort]);

  return (
    <>
      <section className="pt-32 md:pt-40 pb-12 bg-surface border-b border-border">
        <div className="container-x">
          <p className="eyebrow mb-3">Shop</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary">All Products</h1>
          <p className="mt-4 text-muted-foreground max-w-xl">Curated electronics from the world's most trusted brands — delivered anywhere in Kenya with full warranty.</p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container-x">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between mb-10">
            <div className="flex flex-wrap gap-2">
              <Chip active={cat === "all"} onClick={() => setCat("all")}>All</Chip>
              {categories.map((c) => (
                <Chip key={c.slug} active={cat === c.slug} onClick={() => setCat(c.slug)}>{c.name}</Chip>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <label className="text-sm text-muted-foreground">Sort</label>
              <select value={sort} onChange={(e) => setSort(e.target.value)}
                className="h-10 px-4 rounded-full bg-surface border border-border text-sm focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15">
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-24 text-muted-foreground">No products in this category yet.</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
              {filtered.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function Chip({ active, children, onClick }: { active?: boolean; children: React.ReactNode; onClick?: () => void }) {
  return (
    <button onClick={onClick}
      className={["h-10 px-4 rounded-full text-sm font-medium transition-colors border",
        active ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-border hover:border-accent/60"].join(" ")}>
      {children}
    </button>
  );
}
