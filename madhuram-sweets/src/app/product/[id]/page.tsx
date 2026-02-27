"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { products, weightPrices, getBadgeStyle } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import PageLoader from "@/components/shared/PageLoader";
import {
  Star,
  Minus,
  Plus,
  ShoppingBag,
  ArrowLeft,
  Heart,
  Share2,
  Truck,
  ShieldCheck,
  Clock,
} from "lucide-react";

export default function ProductDetailPage() {
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [selectedWeight, setSelectedWeight] = useState("500g");
  const [quantity, setQuantity] = useState(1);

  const productId = parseInt(params.id as string);
  const product = products.find((p) => p.id === productId);
  const relatedProducts = products
    .filter((p) => p.id !== productId && p.category === product?.category)
    .slice(0, 4);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!product && !isLoading) {
      router.push("/shop");
    }
  }, [product, isLoading, router]);

  if (!product) {
    return <PageLoader isLoading={isLoading} />;
  }

  const currentPrice = weightPrices[product.id]?.[selectedWeight] || product.price;
  const availableWeights = Object.keys(weightPrices[product.id] || {});

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedWeight);
    }
  };

  return (
    <>
      <PageLoader isLoading={isLoading} />

      {/* Breadcrumb */}
      <div className="bg-[#FFF5E6] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-[#6B5B4F] hover:text-[#8B0000] cursor-pointer">
              Home
            </Link>
            <span className="text-[#E8D5C4]">/</span>
            <Link href="/shop" className="text-[#6B5B4F] hover:text-[#8B0000] cursor-pointer">
              Shop
            </Link>
            <span className="text-[#E8D5C4]">/</span>
            <span className="text-[#8B0000] font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-8 md:py-12 bg-[#FFFBF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-xl">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div
                  className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-sm font-semibold ${getBadgeStyle(
                    product.badgeType
                  )}`}
                >
                  {product.badge}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-[#FFF5E6] transition-colors cursor-pointer">
                  <Heart className="w-5 h-5 text-[#8B0000]" />
                </button>
                <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-[#FFF5E6] transition-colors cursor-pointer">
                  <Share2 className="w-5 h-5 text-[#8B0000]" />
                </button>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <Link href="/shop">
                <Button
                  variant="ghost"
                  className="mb-4 pl-0 text-[#6B5B4F] hover:text-[#8B0000] cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Shop
                </Button>
              </Link>

              <span className="text-[#FF9933] font-medium mb-1">
                {product.nameHindi}
              </span>
              <h1
                className="text-3xl md:text-4xl font-bold text-[#3D2314] mb-4"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-[#FFD700] text-[#FFD700]"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[#3D2314] font-semibold">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-3xl font-bold text-[#8B0000]">
                  ₹{currentPrice}
                </span>
                <span className="text-[#6B5B4F] ml-2">/ {selectedWeight}</span>
              </div>

              {/* Description */}
              <p className="text-[#6B5B4F] mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Weight Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#3D2314] mb-2">
                  Select Weight
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableWeights.map((weight) => (
                    <button
                      key={weight}
                      onClick={() => setSelectedWeight(weight)}
                      className={`px-4 py-2 rounded-lg border-2 font-medium transition-all cursor-pointer ${
                        selectedWeight === weight
                          ? "border-[#8B0000] bg-[#8B0000] text-white"
                          : "border-[#E8D5C4] bg-white text-[#3D2314] hover:border-[#FF9933]"
                      }`}
                    >
                      {weight}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#3D2314] mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-[#E8D5C4] rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-[#8B0000] hover:bg-[#FFF5E6] transition-colors cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-semibold text-[#3D2314]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-[#8B0000] hover:bg-[#FFF5E6] transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-[#6B5B4F]">
                    Total:{" "}
                    <span className="font-bold text-[#8B0000]">
                      ₹{currentPrice * quantity}
                    </span>
                  </span>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex gap-4 mb-8">
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-[#8B0000] to-[#FF6B00] hover:from-[#6B0000] hover:to-[#8B0000] text-white py-6 text-lg rounded-xl cursor-pointer"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Link href="/checkout" className="flex-1">
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handleAddToCart}
                    className="w-full border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-white py-6 text-lg rounded-xl cursor-pointer"
                  >
                    Buy Now
                  </Button>
                </Link>
              </div>

              {/* Product Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-[#FFF5E6] rounded-xl">
                <div>
                  <h4 className="font-semibold text-[#3D2314] mb-2">Ingredients</h4>
                  <p className="text-[#6B5B4F] text-sm">{product.ingredients}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#3D2314] mb-2">Shelf Life</h4>
                  <p className="text-[#6B5B4F] text-sm">{product.shelfLife}</p>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                {[
                  { icon: Truck, text: "Fast Delivery" },
                  { icon: ShieldCheck, text: "Quality Assured" },
                  { icon: Clock, text: "Fresh Daily" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl shadow-sm"
                  >
                    <item.icon className="w-6 h-6 text-[#FF9933]" />
                    <span className="text-xs text-[#3D2314] text-center">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2
                className="text-2xl font-bold text-[#8B0000] mb-6"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                Related Products
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedProducts.map((p) => (
                  <Link key={p.id} href={`/product/${p.id}`}>
                    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer">
                      <div className="relative h-32">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="font-semibold text-[#3D2314] text-sm line-clamp-1">
                          {p.name}
                        </h3>
                        <p className="text-[#8B0000] font-bold">₹{p.price}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
