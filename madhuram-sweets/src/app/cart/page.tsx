"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import PageLoader from "@/components/shared/PageLoader";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

export default function CartPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { cart, updateQuantity, removeItem, cartTotal, cartCount } = useCart();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PageLoader isLoading={isLoading} />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-[#8B0000] to-[#FF6B00] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Your Cart
            </h1>
            <p className="text-lg text-white/90">
              {cartCount} item{cartCount !== 1 ? "s" : ""} in your cart
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-12 bg-[#FFFBF5] min-h-[400px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {cart.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <ShoppingBag className="w-24 h-24 text-[#E8D5C4] mx-auto mb-6" />
              <h2
                className="text-2xl font-bold text-[#3D2314] mb-4"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                Your cart is empty
              </h2>
              <p className="text-[#6B5B4F] mb-8 max-w-md mx-auto">
                Looks like you haven&apos;t added any sweets yet. Start shopping to fill your cart with delicious treats!
              </p>
              <Link href="/shop">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#8B0000] to-[#FF6B00] hover:from-[#6B0000] hover:to-[#8B0000] text-white px-8 rounded-full cursor-pointer"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Start Shopping
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <Link href="/shop">
                  <Button
                    variant="ghost"
                    className="mb-4 pl-0 text-[#6B5B4F] hover:text-[#8B0000] cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Continue Shopping
                  </Button>
                </Link>

                {cart.map((item, i) => (
                  <motion.div
                    key={`${item.product.id}-${item.weight}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-2xl p-4 md:p-6 shadow-md flex gap-4"
                  >
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-[#FFF5E6] flex-shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        width={128}
                        height={128}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-[#3D2314] text-lg">
                            {item.product.name}
                          </h3>
                          <p className="text-[#6B5B4F] text-sm">
                            {item.product.nameHindi}
                          </p>
                          <p className="text-[#8B0000] font-medium mt-1">
                            {item.weight}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id, item.weight)}
                          className="text-[#6B5B4F] hover:text-red-500 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.weight, -1)
                            }
                            className="w-8 h-8 rounded-full bg-[#FFF5E6] flex items-center justify-center text-[#8B0000] hover:bg-[#FF9933] hover:text-white transition-colors cursor-pointer"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-semibold text-[#3D2314]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.weight, 1)
                            }
                            className="w-8 h-8 rounded-full bg-[#FFF5E6] flex items-center justify-center text-[#8B0000] hover:bg-[#FF9933] hover:text-white transition-colors cursor-pointer"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-xl font-bold text-[#8B0000]">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-2xl p-6 shadow-md sticky top-24"
                >
                  <h3
                    className="text-xl font-bold text-[#3D2314] mb-6"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    Order Summary
                  </h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-[#6B5B4F]">
                      <span>Subtotal</span>
                      <span>₹{cartTotal}</span>
                    </div>
                    <div className="flex justify-between text-[#6B5B4F]">
                      <span>Delivery</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="border-t border-[#E8D5C4] pt-3 flex justify-between">
                      <span className="font-bold text-[#3D2314]">Total</span>
                      <span className="font-bold text-[#8B0000] text-xl">
                        ₹{cartTotal}
                      </span>
                    </div>
                  </div>

                  <Link href="/checkout">
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-[#8B0000] to-[#FF6B00] hover:from-[#6B0000] hover:to-[#8B0000] text-white py-6 text-lg rounded-xl cursor-pointer"
                    >
                      Proceed to Checkout
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>

                  <p className="text-center text-[#6B5B4F] text-sm mt-4">
                    Free delivery on orders above ₹500
                  </p>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
