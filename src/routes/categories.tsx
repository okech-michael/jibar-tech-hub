import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/data";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — JIBAR TECHNOLOGIES" },
      { name: "description", content: "Explore all electronics categories: laptops, gaming PCs, monitors, networking, accessories and more." },
      { property: "og:title", content: "Browse Categories — JIBAR TECHNOLOGIES" },
      { property: "og:description", content: "Browse laptops, gaming PCs, monitors and more." },
    ],
  }),
  component: Categories,
});

function Categories() {
  return (
    <>
      <section className="pt-32 md:pt-40 pb-12 bg-surface border-b border-border">
        <div className="container-x">
          <p className="eyebrow mb-3">Discover</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary">Categories</h1>
          <p className="mt-4 text-muted-foreground max-w-xl">Find exactly what you need — from creator workstations to ergonomic accessories and everything in between.</p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container-x grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 60}>
              <Link to="/shop" className="group relative block aspect-[5/6] rounded-3xl overflow-hidden bg-surface-muted border border-border lift">
                <img src={c.image} alt={c.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                  <h2 className="text-2xl font-semibold tracking-tight">{c.name}</h2>
                  <p className="mt-2 text-sm text-white/75">{c.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                    Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
