import { Link } from "@tanstack/react-router";
import { Phone, MapPin, Clock, Mail, Facebook, Instagram, Twitter } from "lucide-react";
import { PHONE, WHATSAPP_URL, categories } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-x py-16 lg:py-20">
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-[1.2fr_1fr_1fr_1.1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-5">
              <span className="grid place-items-center h-9 w-9 rounded-md bg-accent text-accent-foreground font-bold text-sm">JB</span>
              <span className="font-semibold text-lg">JIBAR<span className="text-accent">.</span></span>
            </Link>
            <p className="text-sm text-primary-foreground/70 leading-relaxed max-w-sm">
              Premium electronics retailer based in Nairobi, delivering genuine products with manufacturer warranties across Kenya.
            </p>
            <div className="mt-6 flex gap-3">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social" className="h-9 w-9 grid place-items-center rounded-full bg-white/10 hover:bg-accent transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-primary-foreground/60 mb-4">Shop</h4>
            <ul className="space-y-3 text-sm">
              {categories.slice(0, 6).map((c) => (
                <li key={c.slug}><Link to="/categories" className="text-primary-foreground/80 hover:text-accent transition-colors">{c.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-primary-foreground/60 mb-4">Support</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="text-primary-foreground/80 hover:text-accent">About Us</Link></li>
              <li><Link to="/contact" className="text-primary-foreground/80 hover:text-accent">Contact</Link></li>
              <li><a href={WHATSAPP_URL} className="text-primary-foreground/80 hover:text-accent">WhatsApp Support</a></li>
              <li><span className="text-primary-foreground/80">Delivery & Returns</span></li>
              <li><span className="text-primary-foreground/80">Warranty</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-primary-foreground/60 mb-4">Visit & Contact</h4>
            <ul className="space-y-4 text-sm text-primary-foreground/85">
              <li className="flex items-start gap-3"><MapPin className="h-4 w-4 mt-0.5 text-accent shrink-0" />Nairobi CBD — physical shop open daily</li>
              <li className="flex items-start gap-3"><Phone className="h-4 w-4 mt-0.5 text-accent shrink-0" /><a href={`tel:${PHONE}`} className="hover:text-accent">{PHONE}</a></li>
              <li className="flex items-start gap-3"><Mail className="h-4 w-4 mt-0.5 text-accent shrink-0" />sales@jibartech.co.ke</li>
              <li className="flex items-start gap-3"><Clock className="h-4 w-4 mt-0.5 text-accent shrink-0" />Mon–Sat 8:30am – 6:30pm</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-6 flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-xs text-primary-foreground/60">
          <p>© {new Date().getFullYear()} JIBAR Technologies. All rights reserved.</p>
          <p>Nairobi, Kenya · Nationwide Delivery · M-Pesa Accepted</p>
        </div>
      </div>
    </footer>
  );
}
