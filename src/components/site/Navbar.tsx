import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Search, ShoppingCart, Phone, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { PHONE } from "@/lib/data";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Navbar({ transparent = false }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setOpen, count } = useCart();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const solid = !transparent || scrolled;

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        solid
          ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-soft"
          : "bg-transparent border-b border-transparent",
      ].join(" ")}
    >
      <div className="container-x flex h-16 md:h-20 items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="JIBAR TECHNOLOGIES">
          <span className={["grid place-items-center h-9 w-9 rounded-md font-bold text-sm tracking-tight",
            solid ? "bg-primary text-primary-foreground" : "bg-white/10 text-white backdrop-blur"].join(" ")}>JB</span>
          <span className={["font-semibold tracking-tight text-base md:text-lg",
            solid ? "text-foreground" : "text-white"].join(" ")}>
            JIBAR<span className="text-accent">.</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((n) => {
            const active = pathname === n.to || (n.to !== "/" && pathname.startsWith(n.to));
            return (
              <Link
                key={n.to}
                to={n.to}
                className={[
                  "text-sm font-medium transition-colors relative",
                  solid
                    ? active ? "text-primary" : "text-muted-foreground hover:text-primary"
                    : active ? "text-white" : "text-white/75 hover:text-white",
                ].join(" ")}
              >
                {n.label}
                {active && <span className="absolute -bottom-1.5 left-0 right-0 h-px bg-accent" />}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 md:gap-2">
          <button
            aria-label="Search"
            className={["h-10 w-10 grid place-items-center rounded-full transition-colors",
              solid ? "text-foreground hover:bg-secondary" : "text-white hover:bg-white/10"].join(" ")}
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open cart"
            className={["relative h-10 w-10 grid place-items-center rounded-full transition-colors",
              solid ? "text-foreground hover:bg-secondary" : "text-white hover:bg-white/10"].join(" ")}
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-5 min-w-5 px-1 grid place-items-center rounded-full bg-accent text-accent-foreground text-[10px] font-bold">
                {count}
              </span>
            )}
          </button>
          <a
            href={`tel:${PHONE}`}
            className="hidden md:inline-flex items-center gap-2 h-10 px-4 rounded-full bg-accent text-accent-foreground text-sm font-semibold btn-premium"
          >
            <Phone className="h-4 w-4" />
            Call Now
          </a>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
            className={["lg:hidden h-10 w-10 grid place-items-center rounded-full",
              solid ? "text-foreground hover:bg-secondary" : "text-white hover:bg-white/10"].join(" ")}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-background border-t border-border">
          <div className="container-x py-6 flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="py-3 px-2 rounded-md text-base font-medium text-foreground hover:bg-secondary"
              >
                {n.label}
              </Link>
            ))}
            <a href={`tel:${PHONE}`} className="mt-3 inline-flex items-center justify-center gap-2 h-12 rounded-full bg-accent text-accent-foreground font-semibold">
              <Phone className="h-4 w-4" /> Call {PHONE}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
