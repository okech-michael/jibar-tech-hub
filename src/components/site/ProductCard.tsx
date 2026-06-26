import { Link } from "@tanstack/react-router";
import { ShoppingCart, Check } from "lucide-react";
import { formatKES, type Product } from "@/lib/data";
import { useCart } from "@/lib/cart";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <div className="group relative flex flex-col rounded-2xl bg-card border border-border overflow-hidden lift">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="relative block aspect-square bg-surface-muted overflow-hidden"
      >
        {product.oldPrice && (
          <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-destructive text-destructive-foreground text-[10px] font-semibold tracking-wide uppercase">
            Save {formatKES(product.oldPrice - product.price)}
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{product.brand}</span>
          {product.inStock ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-success"><Check className="h-3 w-3" />In stock</span>
          ) : (
            <span className="text-[11px] text-destructive font-medium">Out of stock</span>
          )}
        </div>
        <Link to="/product/$slug" params={{ slug: product.slug }} className="block">
          <h3 className="font-semibold text-foreground leading-snug line-clamp-1">{product.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{product.short}</p>
        </Link>
        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <div>
            <p className="text-lg font-bold text-primary tracking-tight">{formatKES(product.price)}</p>
            {product.oldPrice && (
              <p className="text-xs text-muted-foreground line-through">{formatKES(product.oldPrice)}</p>
            )}
          </div>
          <button
            onClick={() => add(product.slug, 1)}
            aria-label={`Add ${product.name} to cart`}
            className="h-10 w-10 grid place-items-center rounded-full bg-primary text-primary-foreground hover:bg-accent transition-colors btn-premium"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
