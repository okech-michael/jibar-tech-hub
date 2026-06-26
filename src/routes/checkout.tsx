import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Lock, Smartphone, Check } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatKES } from "@/lib/data";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — JIBAR TECHNOLOGIES" },
      { name: "description", content: "Secure guest checkout with M-Pesa. Payment confirmed before dispatch." },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const { detailed, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<"details" | "pay" | "done">("details");

  if (detailed.length === 0 && step !== "done") {
    return (
      <section className="pt-40 pb-24 container-x text-center">
        <h1 className="text-3xl font-bold text-primary">Your cart is empty</h1>
        <p className="mt-3 text-muted-foreground">Add a product before proceeding to checkout.</p>
        <Link to="/shop" className="mt-6 inline-flex items-center gap-2 h-12 px-6 rounded-full bg-primary text-primary-foreground font-semibold btn-premium">
          Continue shopping
        </Link>
      </section>
    );
  }

  const delivery = subtotal > 50000 ? 0 : 500;
  const total = subtotal + delivery;

  return (
    <section className="pt-28 md:pt-32 pb-20">
      <div className="container-x">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent mb-8">
          <ArrowLeft className="h-4 w-4" /> Continue shopping
        </Link>

        {step === "done" ? (
          <div className="max-w-xl mx-auto text-center py-16">
            <div className="mx-auto h-16 w-16 grid place-items-center rounded-full bg-success text-success-foreground mb-6"><Check className="h-7 w-7" /></div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary">Order received</h1>
            <p className="mt-4 text-muted-foreground">Thank you! We've sent payment instructions to your phone. Our team will confirm and dispatch within 24 hours.</p>
            <button onClick={() => { clear(); navigate({ to: "/" }); }} className="mt-8 h-12 px-7 rounded-full bg-primary text-primary-foreground font-semibold btn-premium">Back home</button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-14">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">Checkout</h1>
              <p className="mt-2 text-muted-foreground">Guest checkout — no account required. Pay securely via M-Pesa.</p>

              {step === "details" && (
                <form
                  onSubmit={(e) => { e.preventDefault(); setStep("pay"); }}
                  className="mt-10 space-y-6"
                >
                  <Section title="Contact">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label="First Name" required><input required className={inputCls} /></Field>
                      <Field label="Last Name" required><input required className={inputCls} /></Field>
                      <Field label="Phone Number" required><input required type="tel" placeholder="07XX XXX XXX" className={inputCls} /></Field>
                      <Field label="Email (optional)"><input type="email" className={inputCls} /></Field>
                    </div>
                  </Section>

                  <Section title="Delivery">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label="County" required><input required className={inputCls} /></Field>
                      <Field label="Town" required><input required className={inputCls} /></Field>
                    </div>
                    <Field label="Delivery Address" required><input required className={inputCls} /></Field>
                    <Field label="Nearest Landmark"><input className={inputCls} /></Field>
                    <Field label="Additional Notes"><textarea rows={3} className={[inputCls, "py-3 resize-none"].join(" ")} /></Field>
                  </Section>

                  <button type="submit" className="h-13 w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold btn-premium inline-flex items-center justify-center gap-2">
                    Continue to Payment
                  </button>
                </form>
              )}

              {step === "pay" && (
                <div className="mt-10 space-y-6">
                  <div className="p-6 rounded-2xl bg-surface border border-border">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-6 w-6 text-accent" />
                      <h3 className="font-semibold text-primary">M-Pesa Payment</h3>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">A payment prompt will be sent to your phone. Your order will be dispatched immediately after we confirm payment.</p>
                    <div className="mt-5 p-4 rounded-xl bg-background border border-border text-sm">
                      <p className="text-muted-foreground">Amount to pay</p>
                      <p className="mt-1 text-2xl font-bold text-primary">{formatKES(total)}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => setStep("details")} className="h-12 px-6 rounded-full border border-border font-semibold hover:border-accent/60">Back</button>
                    <button onClick={() => setStep("done")} className="h-12 px-7 rounded-full bg-accent text-accent-foreground font-semibold btn-premium inline-flex items-center gap-2">
                      <Lock className="h-4 w-4" /> Pay {formatKES(total)}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl bg-surface border border-border p-6">
                <h3 className="font-semibold text-primary mb-4">Order Summary</h3>
                <ul className="divide-y divide-border">
                  {detailed.map(({ product, quantity }) => (
                    <li key={product.slug} className="py-3 flex gap-3 items-center">
                      <div className="h-14 w-14 rounded-lg bg-surface-muted overflow-hidden shrink-0">
                        <img src={product.image} alt="" className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground line-clamp-1">{product.name}</p>
                        <p className="text-xs text-muted-foreground">Qty {quantity}</p>
                      </div>
                      <p className="text-sm font-semibold text-primary whitespace-nowrap">{formatKES(product.price * quantity)}</p>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-border space-y-2 text-sm">
                  <Row label="Subtotal" value={formatKES(subtotal)} />
                  <Row label="Delivery" value={delivery === 0 ? "Free" : formatKES(delivery)} />
                  <div className="pt-2 mt-2 border-t border-border flex items-center justify-between">
                    <span className="font-semibold text-primary">Total</span>
                    <span className="font-bold text-primary text-lg">{formatKES(total)}</span>
                  </div>
                </div>
                <p className="mt-4 text-[11px] text-center text-muted-foreground flex items-center justify-center gap-1.5">
                  <Lock className="h-3 w-3" /> Secure M-Pesa payment · Confirmed before dispatch
                </p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
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
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-6 rounded-2xl bg-surface border border-border space-y-5">
      <h3 className="font-semibold text-primary">{title}</h3>
      {children}
    </div>
  );
}
function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between text-muted-foreground"><span>{label}</span><span className="text-foreground font-medium">{value}</span></div>;
}
