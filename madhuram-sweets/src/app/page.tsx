"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { products, reviews, businessInfo, getBadgeStyle } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import PageLoader from "@/components/shared/PageLoader";
import {
  Star,
  ChevronRight,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Leaf,
  Heart,
  Award,
  Crown,
  Flame,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();
  const featuredProducts = products.filter((p) => p.isFeatured);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PageLoader isLoading={isLoading} />

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[600px] md:min-h-[700px]">
        <div className="absolute inset-0">
          <Image
            src="/temple-bg-4k.png"
            alt="Baba Baidyanath Dham Temple"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 hero-gradient" />
        </div>
        <div className="absolute inset-0 temple-pattern" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 min-h-[600px] md:min-h-[700px] flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[#FFD700] font-medium mb-2 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              {businessInfo.subHeader}
            </motion.p>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              style={{ fontFamily: "var(--font-playfair), serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Madhuram Sweets
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-[#FFD700] font-medium mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {businessInfo.hindiTagline}
            </motion.p>

            <motion.p
              className="text-lg text-white/90 mb-8 max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Experience the divine taste of traditional Indian sweets prepared with
              100% pure desi ghee. Perfect for temple offerings, festivals, and
              special occasions.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link href="/shop">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#FF9933] to-[#FF6B00] hover:from-[#FF6B00] hover:to-[#FF9933] text-white px-8 py-6 text-lg rounded-full shadow-xl cursor-pointer"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Shop Now
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 px-8 py-6 text-lg rounded-full backdrop-blur-sm cursor-pointer"
                >
                  Our Story
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-gradient-to-r from-[#8B0000] to-[#FF6B00] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
            {[
              { icon: Leaf, text: "100% Pure Ghee" },
              { icon: Truck, text: "Fast Delivery" },
              { icon: ShieldCheck, text: "Quality Assured" },
              { icon: Heart, text: "Made with Love" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-2"
              >
                <item.icon className="w-8 h-8 text-[#FFD700]" />
                <span className="font-medium text-sm md:text-base">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-[#FFFBF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#FF9933] font-medium flex items-center justify-center gap-2 mb-2">
              <Crown className="w-5 h-5" />
              पवित्र प्रसाद
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#8B0000] mb-4"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Featured Sweets
            </h2>
            <p className="text-[#6B5B4F] max-w-2xl mx-auto">
              Our most beloved sweets, perfect for temple offerings and special occasions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-white rounded-2xl overflow-hidden shadow-xl cursor-pointer border-2 border-[#FFD700] special-product group"
              >
                <Link href={`/product/${product.id}`}>
                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-1/2 h-64 md:h-80">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div
                        className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${getBadgeStyle(
                          product.badgeType
                        )}`}
                      >
                        {product.badge}
                      </div>
                    </div>
                    <div className="flex-1 p-6 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[#FF9933] text-sm font-medium">
                          {product.nameHindi}
                        </span>
                      </div>
                      <h3
                        className="text-2xl font-bold text-[#3D2314] mb-2"
                        style={{ fontFamily: "var(--font-playfair), serif" }}
                      >
                        {product.name}
                      </h3>
                      <p className="text-[#6B5B4F] text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
                          <span className="font-semibold text-[#3D2314]">
                            {product.rating}
                          </span>
                        </div>
                        <span className="text-[#6B5B4F] text-sm">
                          ({product.reviews} reviews)
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-[#8B0000]">
                            ₹{product.price}
                          </span>
                          <span className="text-[#6B5B4F] text-sm ml-1">
                            /{product.weight}
                          </span>
                        </div>
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(product, product.weight);
                          }}
                          className="bg-gradient-to-r from-[#8B0000] to-[#FF6B00] hover:from-[#6B0000] hover:to-[#8B0000] text-white cursor-pointer"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/shop">
              <Button
                size="lg"
                variant="outline"
                className="border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-white px-8 rounded-full cursor-pointer"
              >
                View All Products
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#FFF5E6] to-[#FFFBF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#FF9933] font-medium flex items-center justify-center gap-2 mb-2">
              <Award className="w-5 h-5" />
              Customer Love
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#8B0000] mb-4"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              What Our Customers Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, 6).map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className={`w-4 h-4 ${
                        j < review.rating
                          ? "fill-[#FFD700] text-[#FFD700]"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-[#3D2314] mb-4">&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[#3D2314]">{review.name}</p>
                    <p className="text-sm text-[#6B5B4F]">{review.city}</p>
                  </div>
                  <span className="text-xs bg-[#FFF5E6] text-[#8B0000] px-2 py-1 rounded-full">
                    {review.product}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#8B0000] via-[#800020] to-[#FF6B00] text-white relative overflow-hidden">
        <div className="absolute inset-0 temple-pattern opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Order Now for Temple Offerings
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Get fresh sweets delivered to your doorstep. Perfect for Baba Baidyanath
              Darshan and special occasions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/shop">
                <Button
                  size="lg"
                  className="bg-white text-[#8B0000] hover:bg-[#FFD700] px-8 py-6 text-lg rounded-full cursor-pointer"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Start Shopping
                </Button>
              </Link>
              <a href={`tel:${businessInfo.phone}`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/20 px-8 py-6 text-lg rounded-full cursor-pointer"
                >
                  Call: {businessInfo.phone}
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
