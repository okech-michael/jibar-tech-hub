import { createFileRoute } from "@tanstack/react-router";
import { Award, MapPin, Sparkles, Users } from "lucide-react";
import heroImg from "@/assets/hero-laptop.jpg";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — JIBAR Technologies" },
      { name: "description", content: "JIBAR Technologies is a Nairobi-based premium electronics retailer delivering genuine products with manufacturer warranty across Kenya." },
      { property: "og:title", content: "About JIBAR Technologies" },
      { property: "og:description", content: "Premium electronics retailer based in Nairobi, serving all of Kenya." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="relative pt-32 md:pt-44 pb-20 md:pb-28 bg-primary text-primary-foreground overflow-hidden">
        <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/30" />
        <div className="relative container-x max-w-3xl">
          <p className="eyebrow text-accent mb-4">Our Story</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">A modern electronics retailer, built in Nairobi.</h1>
          <p className="mt-6 text-lg text-white/75 leading-relaxed">JIBAR Technologies was founded on a simple belief: Kenyans deserve a premium, trustworthy way to buy genuine electronics — without paying a premium for it.</p>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="container-x grid lg:grid-cols-2 gap-14 items-start">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-primary">Built on trust. Delivered with care.</h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>From our physical shop in Nairobi to doorsteps across all 47 counties, we connect Kenyan professionals, gamers, students and households with the electronics they need to do their best work and live their best lives.</p>
              <p>We work directly with authorised distributors and brand partners, so every device you buy is genuine, warrantied and supported. No grey imports. No surprises.</p>
              <p>Our team is made up of technologists who use the products we sell. We're here to advise honestly, recommend confidently and stand behind every order.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-surface border-y border-border">
        <div className="container-x grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Award, k: "100%", v: "Genuine Products" },
            { icon: Users, k: "10K+", v: "Customers Served" },
            { icon: MapPin, k: "47", v: "Counties Covered" },
            { icon: Sparkles, k: "4.9/5", v: "Average Rating" },
          ].map((s) => (
            <div key={s.v} className="text-center md:text-left">
              <s.icon className="h-6 w-6 text-accent mb-3 mx-auto md:mx-0" />
              <p className="text-3xl md:text-4xl font-bold tracking-tight text-primary">{s.k}</p>
              <p className="mt-1 text-sm uppercase tracking-widest text-muted-foreground">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="container-x grid md:grid-cols-3 gap-6">
          {[
            { t: "Experience", d: "Years of focused expertise in sourcing, advising and supporting electronics customers across Kenya." },
            { t: "Quality Assurance", d: "Every product is verified for authenticity, serial-tracked and packaged for safe nationwide delivery." },
            { t: "Customer Satisfaction", d: "We measure ourselves by the relationships we build — not the transactions we process." },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 80}>
              <div className="p-8 rounded-2xl bg-card border border-border lift h-full">
                <h3 className="text-xl font-semibold text-primary">{c.t}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
