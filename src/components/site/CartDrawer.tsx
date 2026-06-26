import { Link } from "@tanstack/react-router";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { formatKES } from "@/lib/data";

export function CartDrawer() {
  const { open, setOpen, detailed, setQty, remove, subtotal, count } = useCart();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div className={["fixed inset-0 z-[60] transition-opacity duration-300", open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"].join(" ")} aria-hidden={!open}>
      <button aria-label="Close cart" onClick={() => setOpen(false)} className="absolute inset-0 bg-primary/40 backdrop-blur-sm" />
      <aside
        className={[
          "absolute right-0 top-0 h-full w-full sm:w-[440px] bg-background shadow-premium flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h2 className="font-semibold tracking-tight">Your Cart <span className="text-muted-foreground font-normal">({count})</span></h2>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Close" className="h-9 w-9 grid place-items-center rounded-full hover:bg-secondary">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {detailed.length === 0 ? (
            <div className="h-full grid place-items-center text-center py-20">
              <div>
                <div className="mx-auto h-14 w-14 grid place-items-center rounded-full bg-surface-muted text-muted-foreground mb-4"><ShoppingBag className="h-6 w-6" /></div>
                <h3 className="font-semibold text-foreground">Your cart is empty</h3>
                <p className="text-sm text-muted-foreground mt-1">Discover premium electronics built for work, gaming and life.</p>
                <button onClick={() => setOpen(false)} className="mt-6 inline-flex h-11 px-6 items-center rounded-full bg-primary text-primary-foreground text-sm font-semibold btn-premium">
                  Continue shopping
                </button>
              </div>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {detailed.map(({ product, quantity }) => (
                <li key={product.slug} className="py-4 flex gap-4">
                  <div className="h-20 w-20 rounded-lg bg-surface-muted overflow-hidden shrink-0">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{product.brand}</p>
                    <p className="font-medium text-foreground line-clamp-1">{product.name}</p>
                    <p className="text-sm text-primary font-semibold mt-1">{formatKES(product.price)}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="inline-flex items-center border border-border rounded-full">
                        <button onClick={() => setQty(product.slug, quantity - 1)} className="h-8 w-8 grid place-items-center hover:text-accent" aria-label="Decrease"><Minus className="h-3.5 w-3.5" /></button>
                        <span className="w-7 text-center text-sm font-medium">{quantity}</span>
                        <button onClick={() => setQty(product.slug, quantity + 1)} className="h-8 w-8 grid place-items-center hover:text-accent" aria-label="Increase"><Plus className="h-3.5 w-3.5" /></button>
                      </div>
                      <button onClick={() => remove(product.slug)} className="text-muted-foreground hover:text-destructive p-1" aria-label="Remove"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {detailed.length > 0 && (
          <div className="border-t border-border bg-surface p-6 space-y-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Subtotal</span><span className="font-medium text-foreground">{formatKES(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Delivery</span><span>Calculated at checkout</span>
            </div>
            <Link to="/checkout" onClick={() => setOpen(false)} className="flex items-center justify-center gap-2 h-12 rounded-full bg-primary text-primary-foreground font-semibold btn-premium">
              Proceed to Checkout <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="text-[11px] text-center text-muted-foreground">Secure M-Pesa payment · Genuine products · Manufacturer warranty</p>
          </div>
        )}
      </aside>
    </div>
  );
}
