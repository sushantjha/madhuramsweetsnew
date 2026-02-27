"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products, categories, getBadgeStyle } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import PageLoader from "@/components/shared/PageLoader";
import {
  Star,
  ShoppingBag,
  Filter,
  Search,
  Grid,
  List,
  Sparkles,
  Crown,
  Leaf,
  Gift,
  Droplets,
  Heart,
  Star as StarIcon,
} from "lucide-react";

const categoryIcons: Record<string, React.ElementType> = {
  all: Sparkles,
  featured: Crown,
  traditional: Star,
  phalahari: Leaf,
  namkeen: Gift,
  ghee: Droplets,
  honey: Heart,
  prasad: Gift,
};

export default function ShopPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { addToCart } = useCart();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "all" || product.category === activeCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.nameHindi.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <PageLoader isLoading={isLoading} />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-[#8B0000] to-[#FF6B00] py-12 md:py-16">
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
              Our Sweets Collection
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Explore our complete range of traditional Indian sweets made with pure
              desi ghee and love
            </p>
          </motion.div>
        </div>
      </section>

      {/* Shop Content */}
      <section className="py-12 bg-[#FFFBF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-md p-4 mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B5B4F]" />
                <input
                  type="text"
                  placeholder="Search sweets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FFF5E6] border border-[#E8D5C4] rounded-xl text-[#3D2314] placeholder-[#6B5B4F] focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent cursor-text"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const Icon = categoryIcons[cat.id] || Sparkles;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                        activeCategory === cat.id
                          ? "bg-gradient-to-r from-[#8B0000] to-[#FF6B00] text-white shadow-md"
                          : "bg-[#FFF5E6] text-[#3D2314] hover:bg-[#FFE4C4]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {cat.name}
                    </button>
                  );
                })}
              </div>

              {/* View Mode */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-[#8B0000] text-white"
                      : "bg-[#FFF5E6] text-[#3D2314] hover:bg-[#FFE4C4]"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    viewMode === "list"
                      ? "bg-[#8B0000] text-white"
                      : "bg-[#FFF5E6] text-[#3D2314] hover:bg-[#FFE4C4]"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Products Grid/List */}
          <AnimatePresence mode="wait">
            {filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <ShoppingBag className="w-16 h-16 text-[#E8D5C4] mx-auto mb-4" />
                <p className="text-[#6B5B4F] text-lg">No products found</p>
                <Button
                  onClick={() => {
                    setActiveCategory("all");
                    setSearchQuery("");
                  }}
                  className="mt-4 bg-[#8B0000] hover:bg-[#6B0000] text-white cursor-pointer"
                >
                  Clear Filters
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "space-y-4"
                }
              >
                {filteredProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {viewMode === "grid" ? (
                      // Grid View Card
                      <Link href={`/product/${product.id}`}>
                        <div
                          className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border ${
                            product.isSpecial
                              ? "border-[#FFD700] special-product"
                              : "border-[#E8D5C4]"
                          } group`}
                        >
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div
                              className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold ${getBadgeStyle(
                                product.badgeType
                              )}`}
                            >
                              {product.badge}
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="text-xs text-[#FF9933] mb-1">
                              {product.nameHindi}
                            </div>
                            <h3
                              className="font-bold text-[#3D2314] mb-2 line-clamp-1"
                              style={{ fontFamily: "var(--font-playfair), serif" }}
                            >
                              {product.name}
                            </h3>
                            <div className="flex items-center gap-2 mb-3">
                              <Star className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
                              <span className="text-sm font-medium text-[#3D2314]">
                                {product.rating}
                              </span>
                              <span className="text-xs text-[#6B5B4F]">
                                ({product.reviews})
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-lg font-bold text-[#8B0000]">
                                  ₹{product.price}
                                </span>
                                <span className="text-xs text-[#6B5B4F]">
                                  /{product.weight}
                                </span>
                              </div>
                              <Button
                                size="sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                  addToCart(product, product.weight);
                                }}
                                className="bg-gradient-to-r from-[#8B0000] to-[#FF6B00] hover:from-[#6B0000] hover:to-[#8B0000] text-white cursor-pointer"
                              >
                                Add
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      // List View Card
                      <Link href={`/product/${product.id}`}>
                        <div
                          className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border ${
                            product.isSpecial
                              ? "border-[#FFD700] special-product"
                              : "border-[#E8D5C4]"
                          } flex`}
                        >
                          <div className="relative w-32 md:w-48 h-32 md:h-36 flex-shrink-0">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 p-4 flex flex-col justify-center">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <div className="text-xs text-[#FF9933] mb-1">
                                  {product.nameHindi}
                                </div>
                                <h3
                                  className="font-bold text-[#3D2314] text-lg"
                                  style={{
                                    fontFamily: "var(--font-playfair), serif",
                                  }}
                                >
                                  {product.name}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <Star className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
                                  <span className="text-sm font-medium">
                                    {product.rating}
                                  </span>
                                  <span className="text-xs text-[#6B5B4F]">
                                    ({product.reviews} reviews)
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-xl font-bold text-[#8B0000]">
                                  ₹{product.price}
                                </div>
                                <div className="text-xs text-[#6B5B4F] mb-2">
                                  /{product.weight}
                                </div>
                                <Button
                                  size="sm"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    addToCart(product, product.weight);
                                  }}
                                  className="bg-gradient-to-r from-[#8B0000] to-[#FF6B00] text-white cursor-pointer"
                                >
                                  Add to Cart
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Count */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-[#6B5B4F] mt-8"
          >
            Showing {filteredProducts.length} of {products.length} products
          </motion.p>
        </div>
      </section>
    </>
  );
}
