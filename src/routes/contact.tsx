import { createFileRoute } from "@tanstack/react-router";
import { Phone, MapPin, Clock, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
import { PHONE, WHATSAPP_URL } from "@/lib/data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — JIBAR Technologies" },
      { name: "description", content: "Visit our Nairobi shop, call 0790210629, or message us on WhatsApp. We respond fast." },
      { property: "og:title", content: "Contact JIBAR Technologies" },
      { property: "og:description", content: "Call, WhatsApp or visit our Nairobi shop." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <section className="pt-32 md:pt-40 pb-12 bg-surface border-b border-border">
        <div className="container-x">
          <p className="eyebrow mb-3">Get in touch</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary">We're ready to help.</h1>
          <p className="mt-4 text-muted-foreground max-w-xl">Have a question about a product, a quote, or delivery? Reach out and a JIBAR specialist will respond promptly.</p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container-x grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Send us a message</h2>
            {sent ? (
              <div className="p-8 rounded-2xl bg-success/10 border border-success/30 text-success font-medium">
                Thank you — we'll be in touch shortly.
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="First Name" required><input required className={inputCls} /></Field>
                  <Field label="Last Name" required><input required className={inputCls} /></Field>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Phone Number" required><input required type="tel" className={inputCls} /></Field>
                  <Field label="Email (optional)"><input type="email" className={inputCls} /></Field>
                </div>
                <Field label="Subject"><input className={inputCls} /></Field>
                <Field label="Message" required>
                  <textarea required rows={5} className={[inputCls, "py-3 resize-none"].join(" ")} />
                </Field>
                <button type="submit" className="h-12 px-7 rounded-full bg-primary text-primary-foreground font-semibold btn-premium">
                  Send Message
                </button>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-surface">
              <iframe
                title="JIBAR Technologies location"
                src="https://www.google.com/maps?q=Nairobi%20CBD&output=embed"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <a href={`tel:${PHONE}`} className="flex items-center gap-3 p-5 rounded-2xl bg-primary text-primary-foreground font-semibold btn-premium">
                <Phone className="h-5 w-5 text-accent" /> Call Now
              </a>
              <a href={WHATSAPP_URL} className="flex items-center gap-3 p-5 rounded-2xl border border-border bg-card text-foreground font-semibold hover:border-accent/60 transition-colors">
                <MessageCircle className="h-5 w-5 text-accent" /> WhatsApp Us
              </a>
            </div>
            <div className="rounded-2xl bg-surface border border-border p-6 space-y-4 text-sm">
              <Info icon={MapPin} title="Physical Shop">Nairobi CBD, Kenya</Info>
              <Info icon={Phone} title="Phone"><a href={`tel:${PHONE}`} className="hover:text-accent">{PHONE}</a></Info>
              <Info icon={Mail} title="Email">sales@jibartech.co.ke</Info>
              <Info icon={Clock} title="Hours">Mon – Sat · 8:30am – 6:30pm</Info>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const inputCls = "w-full h-12 px-4 rounded-xl bg-background border border-border text-sm focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 transition";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-foreground mb-2">{label}{required && <span className="text-accent"> *</span>}</span>
      {children}
    </label>
  );
}

function Info({ icon: Icon, title, children }: { icon: React.ComponentType<{ className?: string }>; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <Icon className="h-5 w-5 text-accent mt-0.5 shrink-0" />
      <div>
        <p className="font-semibold text-primary">{title}</p>
        <p className="text-muted-foreground">{children}</p>
      </div>
    </div>
  );
}
