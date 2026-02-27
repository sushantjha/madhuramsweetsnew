"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { orderStatuses, sampleOrders } from "@/lib/data";
import { getOrders, Order } from "@/app/checkout/page";
import PageLoader from "@/components/shared/PageLoader";
import { useLanguage } from "@/context/LanguageContext";
import {
  Package,
  Search,
  ChevronRight,
  CheckCircle2,
  Clock,
  Calendar,
  ShoppingBag,
} from "lucide-react";

export default function OrdersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window === "undefined") return [];
    return getOrders();
  });
  const [searchId, setSearchId] = useState("");
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const getStatusIcon = (statusId: number) => {
    const status = orderStatuses.find((s) => s.id === statusId);
    return status?.icon || Clock;
  };

  const getStatusName = (statusId: number) => {
    const status = orderStatuses.find((s) => s.id === statusId);
    return status?.name || "Processing";
  };

  const getStatusColor = (statusId: number) => {
    if (statusId === 6) return "text-green-600 bg-green-50";
    if (statusId >= 4) return "text-[#FF9933] bg-[#FFF5E6]";
    return "text-[#8B0000] bg-[#FFF5E6]";
  };

  const handleTrackOrder = () => {
    if (searchId.trim()) {
      router.push(`/tracking?id=${searchId}`);
    }
  };

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
              {t("orders.title")}
            </h1>
            <p className="text-lg text-white/90">
              {t("orders.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Orders Content */}
      <section className="py-12 bg-[#FFFBF5] min-h-[400px]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Track Order */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-md p-6 mb-8"
          >
            <h3 className="font-bold text-[#3D2314] text-lg mb-4">
              {t("orders.trackOrder")}
            </h3>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder={t("orders.enterOrderId")}
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="flex-1 px-4 py-3 bg-[#FFF5E6] border border-[#E8D5C4] rounded-lg focus:ring-2 focus:ring-[#FF9933] focus:border-[#FF9933] outline-none"
              />
              <Button
                onClick={handleTrackOrder}
                className="bg-gradient-to-r from-[#8B0000] to-[#FF6B00] hover:from-[#6B0000] hover:to-[#8B0000] text-white px-6 cursor-pointer"
              >
                <Search className="w-4 h-4 mr-2" />
                {t("orders.track")}
              </Button>
            </div>
          </motion.div>

          {/* Orders List */}
          {orders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Package className="w-24 h-24 text-[#E8D5C4] mx-auto mb-6" />
              <h2
                className="text-2xl font-bold text-[#3D2314] mb-4"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                {t("orders.noOrders")}
              </h2>
              <p className="text-[#6B5B4F] mb-8">
                {t("orders.startShopping")}
              </p>
              <Link href="/shop">
                <Button className="bg-gradient-to-r from-[#8B0000] to-[#FF6B00] text-white px-8 rounded-full cursor-pointer">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  {t("cart.startShopping")}
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <p className="text-[#6B5B4F] text-sm mb-2">
                {orders.length} order{orders.length !== 1 ? "s" : ""} found
              </p>
              {orders.map((order, i) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl shadow-md overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-[#8B0000] text-lg">
                            {order.id}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {getStatusName(order.status)}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-[#6B5B4F]">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {order.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <ShoppingBag className="w-4 h-4" />
                            {order.items.length} {t("orders.items")}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#8B0000]">
                          ₹{order.total}
                        </p>
                        <Link href={`/tracking?id=${order.id}`}>
                          <Button
                            variant="outline"
                            className="mt-2 border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-white cursor-pointer"
                          >
                            {t("orders.viewDetails")}
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="mt-4 pt-4 border-t border-[#E8D5C4]">
                      <p className="text-sm text-[#6B5B4F]">
                        <span className="font-medium text-[#3D2314]">{t("orders.items")}: </span>
                        {order.items.slice(0, 3).join(", ")}
                        {order.items.length > 3 && ` +${order.items.length - 3} more`}
                      </p>
                    </div>

                    {/* Status Progress */}
                    <div className="mt-4 pt-4 border-t border-[#E8D5C4]">
                      <div className="flex items-center justify-between">
                        {orderStatuses.map((status, idx) => (
                          <div
                            key={status.id}
                            className="flex flex-col items-center"
                          >
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                idx < order.status
                                  ? "bg-green-500 text-white"
                                  : idx === order.status - 1
                                  ? "bg-[#FF9933] text-white"
                                  : "bg-[#E8D5C4] text-[#6B5B4F]"
                              }`}
                            >
                              {idx < order.status ? (
                                <CheckCircle2 className="w-4 h-4" />
                              ) : (
                                <div className="w-2 h-2 rounded-full bg-current" />
                              )}
                            </div>
                            <span className="text-xs text-[#6B5B4F] mt-1 hidden md:block">
                              {status.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
