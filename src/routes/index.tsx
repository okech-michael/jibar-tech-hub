import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ShieldCheck, Truck, BadgeCheck, Lock, Headphones, TrendingDown, Phone, Quote, Star } from "lucide-react";
import heroImg from "@/assets/hero-laptop.jpg";
import { brands, categories, products, WHATSAPP_URL } from "@/lib/data";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JIBAR TECHNOLOGIES — Premium Electronics in Kenya" },
      { name: "description", content: "Shop premium laptops, gaming PCs, monitors and accessories with nationwide delivery across Kenya. Genuine products. Manufacturer warranty. M-Pesa accepted." },
      { property: "og:title", content: "JIBAR TECHNOLOGIES — Premium Electronics" },
      { property: "og:description", content: "Genuine electronics. Nationwide delivery. M-Pesa accepted." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Categories />
      <Featured />
      <WhyChoose />
      <PromoBanner />
      <BrandsSection />
      <Testimonials />
      <ShoppingExperience />
      <Newsletter />
    </>
  );
}

function Hero() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative min-h-[100vh] overflow-hidden bg-primary text-primary-foreground">
      <div
        className="absolute inset-0"
        style={{ transform: `translate3d(0, ${y * 0.25}px, 0) scale(${1 + Math.min(y, 600) * 0.0004})` }}
      >
        <img src={heroImg} alt="" className="h-full w-full object-cover opacity-80" width={1920} height={1280} />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/70 to-primary/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent" />
      </div>

      <div className="relative container-x pt-40 md:pt-48 pb-24 md:pb-32 min-h-[100vh] flex flex-col justify-center">
        <div
          className="max-w-2xl"
          style={{ transform: `translate3d(0, ${y * -0.08}px, 0)`, opacity: Math.max(0, 1 - y / 600) }}
        >
          <p className="eyebrow text-accent mb-5 animate-float-up">Nairobi · Nationwide Delivery</p>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white animate-float-up" style={{ animationDelay: "120ms" }}>
            Premium Electronics<br />for <span className="text-accent">Work</span>, Gaming<br /> & Everyday Life.
          </h1>
          <p className="mt-7 text-base md:text-lg text-white/75 max-w-xl leading-relaxed animate-float-up" style={{ animationDelay: "240ms" }}>
            Genuine laptops, desktops, monitors and accessories from the world's most trusted brands — delivered anywhere in Kenya with manufacturer warranty.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3 animate-float-up" style={{ animationDelay: "360ms" }}>
            <Link to="/shop" className="inline-flex items-center gap-2 h-13 px-7 py-4 rounded-full bg-accent text-accent-foreground font-semibold btn-premium">
              Shop Now <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={WHATSAPP_URL} className="inline-flex items-center gap-2 h-13 px-7 py-4 rounded-full border border-white/25 text-white font-semibold hover:bg-white/10 transition-colors">
              <Phone className="h-4 w-4" /> Call / WhatsApp
            </a>
          </div>

          <dl className="mt-14 grid grid-cols-3 gap-6 max-w-lg animate-float-up" style={{ animationDelay: "500ms" }}>
            {[
              { k: "10K+", v: "Happy Customers" },
              { k: "47", v: "Counties Served" },
              { k: "100%", v: "Genuine Products" },
            ].map((s) => (
              <div key={s.v}>
                <dt className="text-2xl md:text-3xl font-bold tracking-tight text-white">{s.k}</dt>
                <dd className="mt-1 text-xs uppercase tracking-widest text-white/55">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-xs uppercase tracking-widest flex flex-col items-center gap-2 animate-float-up" style={{ animationDelay: "700ms" }}>
        <span>Scroll</span>
        <span className="h-10 w-px bg-white/30" />
      </div>
    </section>
  );
}

function Marquee() {
  const items = [...brands, ...brands];
  return (
    <div className="border-y border-border bg-surface overflow-hidden">
      <div className="flex marquee gap-16 py-7 whitespace-nowrap">
        {items.map((b, i) => (
          <span key={i} className="text-base md:text-lg font-semibold tracking-tight text-muted-foreground/80">{b}</span>
        ))}
      </div>
    </div>
  );
}

function Categories() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container-x">
        <Reveal>
          <div className="flex items-end justify-between gap-6 flex-wrap mb-12">
            <div>
              <p className="eyebrow mb-3">Browse</p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-primary max-w-2xl">Shop by Category</h2>
            </div>
            <Link to="/categories" className="text-sm font-semibold text-primary hover:text-accent inline-flex items-center gap-2">
              View all categories <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 60}>
              <Link
                to="/shop"
                className="group relative block aspect-[4/5] rounded-2xl overflow-hidden bg-surface-muted border border-border lift"
              >
                <img src={c.image} alt={c.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <h3 className="text-lg md:text-xl font-semibold tracking-tight">{c.name}</h3>
                  <p className="mt-1 text-xs text-white/75 line-clamp-1">{c.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent">
                    Explore <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Featured() {
  return (
    <section className="py-24 lg:py-32 bg-surface">
      <div className="container-x">
        <Reveal>
          <div className="flex items-end justify-between gap-6 flex-wrap mb-12">
            <div>
              <p className="eyebrow mb-3">Bestsellers</p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-primary max-w-2xl">Featured Products</h2>
            </div>
            <Link to="/shop" className="text-sm font-semibold text-primary hover:text-accent inline-flex items-center gap-2">
              View all products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {products.slice(0, 8).map((p, i) => (
            <Reveal key={p.slug} delay={i * 40}><ProductCard product={p} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const reasons = [
  { icon: BadgeCheck, title: "Genuine Products", text: "Every device is sourced through authorized channels with verifiable serials." },
  { icon: Truck, title: "Nationwide Delivery", text: "Door-to-door delivery across all 47 counties with reliable courier partners." },
  { icon: ShieldCheck, title: "Manufacturer Warranty", text: "Full original warranty on every product, with local servicing support." },
  { icon: Lock, title: "Secure Payments", text: "Pay safely with M-Pesa, bank transfer or card. Payment confirmed before dispatch." },
  { icon: Headphones, title: "Professional Support", text: "Talk to specialists who understand the products — not call-center scripts." },
  { icon: TrendingDown, title: "Competitive Prices", text: "Honest pricing with transparent quotes for bulk and corporate orders." },
];

function WhyChoose() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container-x">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="eyebrow mb-3">Why JIBAR</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-primary">A premium retailer built on trust.</h2>
            <p className="mt-5 text-muted-foreground">We deliver more than products — we deliver confidence. Every order is backed by genuine warranty, secure payments and people who care.</p>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 60}>
              <div className="h-full p-7 rounded-2xl bg-card border border-border lift">
                <div className="h-12 w-12 grid place-items-center rounded-xl bg-primary/5 text-accent">
                  <r.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-primary">{r.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{r.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PromoBanner() {
  return (
    <section className="py-12 lg:py-20">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-10 md:p-16 lg:p-20 min-h-[360px] flex items-center">
            <div className="absolute inset-0 opacity-50">
              <img src={heroImg} alt="" className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/40" />
            </div>
            <div className="relative max-w-xl">
              <p className="eyebrow text-accent mb-4">Limited Offer</p>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">Up to <span className="text-accent">15% off</span> business laptops this month.</h3>
              <p className="mt-5 text-white/75 max-w-md">Curated bundles for SMEs and corporates. Talk to us for tailored quotes, financing and after-sales support.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/shop" className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-accent text-accent-foreground font-semibold btn-premium">
                  Shop the offer <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={WHATSAPP_URL} className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-white/25 text-white font-semibold hover:bg-white/10 transition-colors">
                  Request a quote
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BrandsSection() {
  return (
    <section className="py-16 lg:py-24 bg-surface">
      <div className="container-x">
        <Reveal>
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="eyebrow mb-3">Trusted Brands</p>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-primary">Authorised retailer for the world's best.</h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {brands.map((b, i) => (
            <Reveal key={b} delay={i * 30}>
              <div className="h-20 grid place-items-center rounded-xl border border-border bg-background text-foreground/70 hover:text-primary hover:border-accent/50 transition-colors">
                <span className="text-base md:text-lg font-bold tracking-tight">{b}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  { name: "Brian K.", role: "Founder, Nairobi", text: "Smooth ordering, fast delivery to Kisumu, and the laptop is exactly as described. JIBAR has earned my repeat business." },
  { name: "Aisha N.", role: "Operations Manager", text: "We kitted out our entire office with monitors and accessories. Pricing was fair and after-sales support has been exceptional." },
  { name: "Daniel M.", role: "Software Engineer", text: "Genuine gear, transparent communication, and a real warranty. This is how online electronics shopping should feel." },
];

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="py-24 lg:py-32">
      <div className="container-x">
        <Reveal>
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="eyebrow mb-3">Customer Voices</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-primary">Loved by professionals across Kenya.</h2>
          </div>
        </Reveal>
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-3xl bg-surface border border-border p-8 md:p-14 text-center">
            <Quote className="h-10 w-10 text-accent mx-auto mb-6" />
            <p className="text-lg md:text-2xl text-foreground leading-relaxed font-medium tracking-tight transition-opacity duration-500">
              "{testimonials[i].text}"
            </p>
            <div className="mt-8">
              <div className="flex justify-center gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-accent text-accent" />)}
              </div>
              <p className="font-semibold text-primary">{testimonials[i].name}</p>
              <p className="text-sm text-muted-foreground">{testimonials[i].role}</p>
            </div>
          </div>
          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, k) => (
              <button key={k} aria-label={`Slide ${k + 1}`} onClick={() => setI(k)}
                className={["h-1.5 rounded-full transition-all", k === i ? "w-8 bg-accent" : "w-1.5 bg-border hover:bg-muted-foreground"].join(" ")} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ShoppingExperience() {
  const steps = [
    { n: "01", t: "Browse", d: "Explore curated electronics by category, brand or use-case." },
    { n: "02", t: "Add to Cart", d: "Select your products and confirm quantities effortlessly." },
    { n: "03", t: "Checkout", d: "Quick guest checkout — no account required." },
    { n: "04", t: "Pay via M-Pesa", d: "Secure payment confirmed before dispatch." },
    { n: "05", t: "Delivery", d: "Receive nationwide with tracking and friendly support." },
  ];
  return (
    <section className="py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="container-x">
        <Reveal>
          <div className="max-w-xl mb-14">
            <p className="eyebrow text-accent mb-3">How it works</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Shopping made effortless.</h2>
          </div>
        </Reveal>
        <ol className="grid md:grid-cols-5 gap-6 md:gap-2 relative">
          <div aria-hidden className="hidden md:block absolute top-6 left-[10%] right-[10%] h-px bg-white/15" />
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <li className="relative">
                <div className="relative z-10 h-12 w-12 grid place-items-center rounded-full bg-white text-primary font-bold shadow-elevated">
                  {String(i + 1)}
                </div>
                <p className="mt-5 text-xs uppercase tracking-widest text-accent">{s.n}</p>
                <h3 className="mt-1 text-lg font-semibold text-white">{s.t}</h3>
                <p className="mt-1.5 text-sm text-white/65 leading-relaxed pr-2">{s.d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container-x">
        <Reveal>
          <div className="max-w-2xl mx-auto text-center">
            <p className="eyebrow mb-3">Stay in the loop</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-primary">Early access to drops and offers.</h2>
            <p className="mt-4 text-muted-foreground">Be the first to know when new products land and when prices drop. No spam, ever.</p>
            <form onSubmit={(e) => { e.preventDefault(); }} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="you@email.com"
                className="flex-1 h-12 px-5 rounded-full bg-surface border border-border focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15 text-sm"
              />
              <button type="submit" className="h-12 px-6 rounded-full bg-primary text-primary-foreground font-semibold btn-premium">
                Subscribe
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
