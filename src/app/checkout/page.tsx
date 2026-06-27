"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useShop } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Stepper, CHECKOUT_STEPS } from "@/components/checkout/Stepper";
import { AddressForm } from "@/components/checkout/AddressForm";
import { ShippingOptions, SHIPPING_METHODS } from "@/components/checkout/ShippingOptions";
import { PaymentForm, type PaymentDetails } from "@/components/checkout/PaymentForm";
import { Address } from "@/types";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, clearCart, products } = useShop();
  const [step, setStep] = useState(0);
  const [placed, setPlaced] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState<Partial<Address>>({});
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [payment, setPayment] = useState<PaymentDetails>({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const shippingPrice = SHIPPING_METHODS.find((m) => m.id === shippingMethod)?.price ?? 0;
  const total = subtotal + shippingPrice;

  const next = () => setStep((s) => Math.min(s + 1, CHECKOUT_STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handlePlaceOrder = async () => {
    if (!address.fullName || !address.line1 || !address.city || !address.country) {
      setError("Please fill in your address details before placing the order.");
      setStep(0);
      return;
    }

    setPlacing(true);
    setError(null);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          customer: address,
          shippingMethod,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Failed to place order.");
      }

      const { order } = await res.json();
      setOrderNumber(order.orderNumber);
      setPlaced(true);
      clearCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to place order.");
    } finally {
      setPlacing(false);
    }
  };

  if (placed) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-cream px-6 pt-32 text-center">
        <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <CheckCircle2 size={56} className="text-gold" />
        </motion.div>
        <h1 className="mt-6 font-playfair text-3xl text-black">Order Confirmed</h1>
        {orderNumber && (
          <p className="mt-2 font-poppins text-sm uppercase tracking-widest text-gold">
            Order {orderNumber}
          </p>
        )}
        <p className="mt-2 max-w-md font-inter text-sm text-black/60">
          Thank you for your purchase. A confirmation email is on its way, and your pieces will be
          carefully prepared by our artisans.
        </p>
        <Button onClick={() => router.push("/shop")} variant="primary" size="lg" className="mt-8">
          Continue Shopping
        </Button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-cream px-6 pt-32 text-center">
        <h1 className="font-playfair text-3xl text-black">Your cart is empty</h1>
        <Button href="/shop" variant="primary" size="lg" className="mt-8">
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-cream pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <h1 className="mb-10 font-playfair text-4xl text-black">Checkout</h1>
        <Stepper current={step} />

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_340px]">
          <div className="min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {step === 0 && <AddressForm address={address} onChange={setAddress} />}
                {step === 1 && <ShippingOptions selected={shippingMethod} onSelect={setShippingMethod} />}
                {step === 2 && <PaymentForm details={payment} onChange={setPayment} />}
                {step === 3 && (
                  <div className="space-y-6">
                    <h3 className="font-playfair text-xl text-black">Review Your Order</h3>
                    <div className="space-y-3">
                      {cart.map((item) => {
                        const product = products.find((p) => p.id === item.productId);
                        if (!product) return null;
                        return (
                          <div key={`${item.productId}-${item.color}-${item.size}`} className="flex justify-between font-inter text-sm text-black/70">
                            <span>
                              {product.name} × {item.quantity}
                            </span>
                            <span>{formatPrice(product.price * item.quantity)}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="border-t border-black/10 pt-4 font-inter text-sm text-black/70">
                      <p>{address.fullName}</p>
                      <p>{address.line1}, {address.city}, {address.state} {address.postalCode}</p>
                      <p>{address.country}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {error && <p className="mt-6 font-inter text-sm text-red-600">{error}</p>}

            <div className="mt-10 flex justify-between">
              {step > 0 ? (
                <Button variant="outline" onClick={back} className="!text-black !border-black/30 hover:!border-gold hover:!text-gold">
                  Back
                </Button>
              ) : (
                <span />
              )}
              {step < CHECKOUT_STEPS.length - 1 ? (
                <Button variant="primary" onClick={next}>
                  Continue
                </Button>
              ) : (
                <Button variant="primary" onClick={handlePlaceOrder} disabled={placing}>
                  {placing ? "Placing Order..." : "Place Order"}
                </Button>
              )}
            </div>
          </div>

          <div className="h-fit bg-black p-7 text-cream">
            <h2 className="font-playfair text-xl">Order Summary</h2>
            <div className="mt-6 space-y-3 font-inter text-sm">
              <div className="flex justify-between text-cream/70">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-cream/70">
                <span>Shipping</span>
                <span>{shippingPrice === 0 ? "Free" : formatPrice(shippingPrice)}</span>
              </div>
              <div className="flex justify-between border-t border-cream/15 pt-3 text-base font-medium text-cream">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
