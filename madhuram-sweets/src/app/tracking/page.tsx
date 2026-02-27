"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { orderStatuses } from "@/lib/data";
import PageLoader from "@/components/shared/PageLoader";
import { getOrders, Order } from "@/app/checkout/page";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Package,
  Truck,
  MapPinned,
  Timer,
  Phone,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  CheckCircle2,
  Timer,
  Package,
  Truck,
  MapPinned,
};

function TrackingContent() {
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  
  // Find order using useMemo instead of useEffect + setState
  const order = React.useMemo(() => {
    if (orderId) {
      const orders = getOrders();
      return orders.find(o => o.id === orderId) || null;
    }
    return null;
  }, [orderId]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
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
              Track Order
            </h1>
            <p className="text-lg text-white/90">Order ID: {order?.id}</p>
          </motion.div>
        </div>
      </section>

      {/* Tracking Content */}
      <section className="py-12 bg-[#FFFBF5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/orders">
            <Button
              variant="ghost"
              className="mb-6 pl-0 text-[#6B5B4F] hover:text-[#8B0000] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Orders
            </Button>
          </Link>

          {order && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Tracking Timeline */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-2"
              >
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h2
                    className="text-xl font-bold text-[#8B0000] mb-6"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    Order Status
                  </h2>

                  <div className="relative">
                    {orderStatuses.map((status, idx) => {
                      const isCompleted = idx < order.status;
                      const isCurrent = idx === order.status - 1;
                      const IconComponent = iconMap[status.icon] || Clock;

                      return (
                        <motion.div
                          key={status.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="relative flex gap-4 pb-8 last:pb-0"
                        >
                          {/* Timeline Line */}
                          {idx < orderStatuses.length - 1 && (
                            <div
                              className={`absolute left-5 top-10 w-0.5 h-full ${
                                isCompleted || isCurrent
                                  ? "bg-green-500"
                                  : "bg-[#E8D5C4]"
                              }`}
                            />
                          )}

                          {/* Status Icon */}
                          <div
                            className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                              isCompleted
                                ? "bg-green-500 text-white"
                                : isCurrent
                                ? "bg-[#FF9933] text-white animate-pulse"
                                : "bg-[#E8D5C4] text-[#6B5B4F]"
                            }`}
                          >
                            <IconComponent className="w-5 h-5" />
                          </div>

                          {/* Status Content */}
                          <div>
                            <h3
                              className={`font-semibold ${
                                isCompleted || isCurrent
                                  ? "text-[#3D2314]"
                                  : "text-[#6B5B4F]"
                              }`}
                            >
                              {status.name}
                            </h3>
                            <p className="text-sm text-[#6B5B4F]">
                              {status.description}
                            </p>
                            {isCurrent && (
                              <span className="inline-block mt-2 px-3 py-1 bg-[#FF9933]/20 text-[#FF9933] text-xs font-medium rounded-full">
                                Current Status
                              </span>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
                  <h2
                    className="text-xl font-bold text-[#8B0000] mb-6"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-[#6B5B4F]">Order Date</span>
                      <span className="font-medium text-[#3D2314]">
                        {order.date}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B5B4F]">Total Amount</span>
                      <span className="font-bold text-[#8B0000] text-lg">
                        ₹{order.total}
                      </span>
                    </div>
                    {order.deliveryDate && (
                      <div className="flex justify-between">
                        <span className="text-[#6B5B4F]">Delivered On</span>
                        <span className="font-medium text-green-600">
                          {order.deliveryDate}
                        </span>
                      </div>
                    )}
                    {order.expectedDelivery && (
                      <div className="flex justify-between">
                        <span className="text-[#6B5B4F]">Expected Delivery</span>
                        <span className="font-medium text-[#FF9933]">
                          {order.expectedDelivery}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-[#E8D5C4] pt-4 mb-6">
                    <h4 className="font-semibold text-[#3D2314] mb-2">Items</h4>
                    <ul className="space-y-1">
                      {order.items.map((item, i) => (
                        <li key={i} className="text-sm text-[#6B5B4F]">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a href="tel:07710084997">
                    <Button
                      className="w-full bg-gradient-to-r from-[#8B0000] to-[#FF6B00] hover:from-[#6B0000] hover:to-[#8B0000] text-white cursor-pointer"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Contact Support
                    </Button>
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default function TrackingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#FFFBF5]"><div className="text-[#8B0000]">Loading...</div></div>}>
      <TrackingContent />
    </Suspense>
  );
}
