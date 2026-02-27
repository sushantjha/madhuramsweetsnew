"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import { indianStates, citiesByState, businessInfo } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";
import PageLoader from "@/components/shared/PageLoader";
import { toast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  CreditCard,
  Banknote,
  Copy,
  Loader2,
  ChevronDown,
  ShieldCheck,
  Truck,
} from "lucide-react";

// Order type
export interface Order {
  id: string;
  date: string;
  items: string[];
  total: number;
  status: number;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerCity: string;
  customerState: string;
  customerPincode: string;
  paymentMethod: "online" | "cod";
  expectedDelivery?: string;
  deliveryDate?: string;
}

// Save order to localStorage
export function saveOrder(order: Order) {
  if (typeof window === "undefined") return;
  const orders = getOrders();
  orders.unshift(order);
  localStorage.setItem("madhuram-orders", JSON.stringify(orders));
}

// Get orders from localStorage
export function getOrders(): Order[] {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem("madhuram-orders");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  }
  return [];
}

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [step, setStep] = useState<"address" | "payment">("address");
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("online");
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrLoading, setQrLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const { t } = useLanguage();

  const [addressForm, setAddressForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [stateSearch, setStateSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Prevent QR code from being downloaded
  useEffect(() => {
    const preventContextMenu = (e: MouseEvent) => {
      if (qrRef.current?.contains(e.target as Node)) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", preventContextMenu);
    return () => document.removeEventListener("contextmenu", preventContextMenu);
  }, []);

  const filteredStates = indianStates.filter((state) =>
    state.toLowerCase().includes(stateSearch.toLowerCase())
  );

  const availableCities = addressForm.state ? citiesByState[addressForm.state] || [] : [];
  const filteredCities = availableCities.filter((city) =>
    city.toLowerCase().includes(citySearch.toLowerCase())
  );

  const handleGenerateQR = () => {
    setQrLoading(true);
    setTimeout(() => {
      setQrLoading(false);
      setShowQRCode(true);
    }, 2000);
  };

  const handlePlaceOrder = () => {
    const newOrderId = `MS-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`;
    
    // Create order object
    const order: Order = {
      id: newOrderId,
      date: new Date().toISOString().split('T')[0],
      items: cart.map(item => `${item.product.name} (${item.weight}) x${item.quantity}`),
      total: cartTotal,
      status: 1,
      customerName: addressForm.name,
      customerPhone: addressForm.phone,
      customerAddress: addressForm.address,
      customerCity: addressForm.city,
      customerState: addressForm.state,
      customerPincode: addressForm.pincode,
      paymentMethod: paymentMethod,
      expectedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    };
    
    // Save order to localStorage
    saveOrder(order);
    
    setOrderId(newOrderId);
    setOrderPlaced(true);
    clearCart();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "UPI ID copied to clipboard",
    });
  };

  const isDeoghar = addressForm.city.toLowerCase().includes("deoghar");

  if (cart.length === 0 && !orderPlaced) {
    return (
      <>
        <PageLoader isLoading={isLoading} />
        <section className="py-20 bg-[#FFFBF5] min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#3D2314] mb-4">Your cart is empty</h2>
            <Link href="/shop">
              <Button className="bg-[#8B0000] text-white cursor-pointer">Shop Now</Button>
            </Link>
          </div>
        </section>
      </>
    );
  }

  if (orderPlaced) {
    return (
      <>
        <PageLoader isLoading={isLoading} />
        <section className="py-20 bg-[#FFFBF5] min-h-[60vh] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md mx-auto px-4"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1
              className="text-3xl font-bold text-[#8B0000] mb-4"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {t("orderSuccess.title")}
            </h1>
            <p className="text-[#6B5B4F] mb-4">
              {t("orderSuccess.message")} <span className="font-bold text-[#8B0000]">{orderId}</span>
            </p>
            <p className="text-[#6B5B4F] mb-8">
              {t("orderSuccess.blessing")}
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/orders">
                <Button variant="outline" className="border-[#8B0000] text-[#8B0000] cursor-pointer">
                  {t("orderSuccess.viewOrders")}
                </Button>
              </Link>
              <Link href="/shop">
                <Button className="bg-gradient-to-r from-[#8B0000] to-[#FF6B00] text-white cursor-pointer">
                  {t("orderSuccess.continueShopping")}
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageLoader isLoading={isLoading} />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-[#8B0000] to-[#FF6B00] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {t("checkout.title")}
            </h1>
            <p className="text-white/80">{t("checkout.completeOrder")}</p>
          </motion.div>
        </div>
      </section>

      {/* Checkout Content */}
      <section className="py-12 bg-[#FFFBF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              onClick={() => setStep("address")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all cursor-pointer ${
                step === "address"
                  ? "bg-[#8B0000] text-white"
                  : "bg-white text-[#6B5B4F] shadow-md"
              }`}
            >
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">1</span>
              {t("checkout.address")}
            </button>
            <div className="w-12 h-0.5 bg-[#E8D5C4]" />
            <button
              onClick={() => step === "payment" && setStep("payment")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                step === "payment"
                  ? "bg-[#8B0000] text-white"
                  : "bg-white text-[#6B5B4F] shadow-md"
              }`}
              disabled={step !== "payment"}
            >
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">2</span>
              {t("checkout.payment")}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {step === "address" && (
                  <motion.div
                    key="address"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white rounded-2xl shadow-md p-6"
                  >
                    <h2 className="text-xl font-bold text-[#8B0000] mb-6">
                      {t("checkout.deliveryAddress")}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-[#3D2314]">{t("checkout.fullName")} *</Label>
                        <Input
                          value={addressForm.name}
                          onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                          className="mt-2 bg-[#FFF5E6] border-[#E8D5C4]"
                          placeholder={t("checkout.fullName")}
                        />
                      </div>
                      <div>
                        <Label className="text-[#3D2314]">{t("checkout.phoneNumber")} *</Label>
                        <Input
                          value={addressForm.phone}
                          onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                          className="mt-2 bg-[#FFF5E6] border-[#E8D5C4]"
                          placeholder="10-digit mobile number"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <Label className="text-[#3D2314]">{t("checkout.fullAddress")} *</Label>
                      <textarea
                        value={addressForm.address}
                        onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
                        className="mt-2 w-full h-24 px-4 py-3 bg-[#FFF5E6] border border-[#E8D5C4] rounded-lg resize-none outline-none focus:ring-2 focus:ring-[#FF9933]"
                        placeholder="House No., Street, Landmark"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      {/* State Dropdown */}
                      <div className="relative">
                        <Label className="text-[#3D2314]">{t("checkout.state")} *</Label>
                        <button
                          onClick={() => setStateDropdownOpen(!stateDropdownOpen)}
                          className="mt-2 w-full px-4 py-3 bg-[#FFF5E6] border border-[#E8D5C4] rounded-lg text-left flex items-center justify-between cursor-pointer"
                        >
                          <span className={addressForm.state ? "text-[#3D2314]" : "text-[#6B5B4F]"}>
                            {addressForm.state || t("checkout.selectState")}
                          </span>
                          <ChevronDown className="w-4 h-4 text-[#6B5B4F]" />
                        </button>
                        {stateDropdownOpen && (
                          <div className="absolute z-20 mt-2 w-full bg-white border border-[#E8D5C4] rounded-lg shadow-lg max-h-48 overflow-auto">
                            <input
                              type="text"
                              placeholder={t("checkout.searchState")}
                              value={stateSearch}
                              onChange={(e) => setStateSearch(e.target.value)}
                              className="w-full px-4 py-2 border-b border-[#E8D5C4] outline-none"
                            />
                            {filteredStates.map((state) => (
                              <button
                                key={state}
                                onClick={() => {
                                  setAddressForm({ ...addressForm, state, city: "" });
                                  setStateDropdownOpen(false);
                                  setStateSearch("");
                                }}
                                className="w-full px-4 py-2 text-left hover:bg-[#FFF5E6] cursor-pointer"
                              >
                                {state}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* City Dropdown */}
                      <div className="relative">
                        <Label className="text-[#3D2314]">{t("checkout.city")} *</Label>
                        <button
                          onClick={() => addressForm.state && setCityDropdownOpen(!cityDropdownOpen)}
                          disabled={!addressForm.state}
                          className="mt-2 w-full px-4 py-3 bg-[#FFF5E6] border border-[#E8D5C4] rounded-lg text-left flex items-center justify-between disabled:opacity-50 cursor-pointer"
                        >
                          <span className={addressForm.city ? "text-[#3D2314]" : "text-[#6B5B4F]"}>
                            {addressForm.city || t("checkout.selectCity")}
                          </span>
                          <ChevronDown className="w-4 h-4 text-[#6B5B4F]" />
                        </button>
                        {cityDropdownOpen && (
                          <div className="absolute z-20 mt-2 w-full bg-white border border-[#E8D5C4] rounded-lg shadow-lg max-h-48 overflow-auto">
                            <input
                              type="text"
                              placeholder={t("checkout.searchCity")}
                              value={citySearch}
                              onChange={(e) => setCitySearch(e.target.value)}
                              className="w-full px-4 py-2 border-b border-[#E8D5C4] outline-none"
                            />
                            {filteredCities.map((city) => (
                              <button
                                key={city}
                                onClick={() => {
                                  setAddressForm({ ...addressForm, city });
                                  setCityDropdownOpen(false);
                                  setCitySearch("");
                                }}
                                className="w-full px-4 py-2 text-left hover:bg-[#FFF5E6] cursor-pointer"
                              >
                                {city}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <div>
                        <Label className="text-[#3D2314]">{t("checkout.pincode")} *</Label>
                        <Input
                          value={addressForm.pincode}
                          onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                          className="mt-2 bg-[#FFF5E6] border-[#E8D5C4]"
                          placeholder="6-digit pincode"
                        />
                      </div>
                    </div>

                    {isDeoghar && (
                      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                        <p className="text-green-700 font-medium">
                          🎉 {t("checkout.sameDayDelivery")}
                        </p>
                      </div>
                    )}

                    <Button
                      onClick={() => setStep("payment")}
                      className="mt-6 w-full bg-gradient-to-r from-[#8B0000] to-[#FF6B00] text-white py-6 text-lg cursor-pointer"
                    >
                      {t("checkout.continuePayment")}
                    </Button>
                  </motion.div>
                )}

                {step === "payment" && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-2xl shadow-md p-6"
                  >
                    <h2 className="text-xl font-bold text-[#8B0000] mb-6">
                      {t("checkout.paymentMethod")}
                    </h2>

                    {/* Payment Options */}
                    <div className="space-y-4">
                      <label
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          paymentMethod === "online"
                            ? "border-[#FF9933] bg-[#FFF5E6]"
                            : "border-[#E8D5C4]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "online"}
                          onChange={() => setPaymentMethod("online")}
                          className="w-5 h-5 accent-[#FF9933]"
                        />
                        <CreditCard className="w-6 h-6 text-[#8B0000]" />
                        <div>
                          <p className="font-semibold text-[#3D2314]">{t("checkout.onlinePayment")}</p>
                          <p className="text-sm text-[#6B5B4F]">{t("checkout.payViaUPI")}</p>
                        </div>
                      </label>

                      <label
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          paymentMethod === "cod"
                            ? "border-[#FF9933] bg-[#FFF5E6]"
                            : "border-[#E8D5C4]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "cod"}
                          onChange={() => setPaymentMethod("cod")}
                          className="w-5 h-5 accent-[#FF9933]"
                        />
                        <Banknote className="w-6 h-6 text-[#8B0000]" />
                        <div>
                          <p className="font-semibold text-[#3D2314]">{t("checkout.cod")}</p>
                          <p className="text-sm text-[#6B5B4F]">{t("checkout.payWhenReceive")}</p>
                        </div>
                      </label>
                    </div>

                    {/* QR Code Section */}
                    {paymentMethod === "online" && (
                      <div className="mt-6">
                        {!showQRCode ? (
                          <Button
                            onClick={handleGenerateQR}
                            disabled={qrLoading}
                            className="w-full bg-gradient-to-r from-[#8B0000] to-[#FF6B00] text-white py-6 cursor-pointer"
                          >
                            {qrLoading ? (
                              <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                {t("checkout.generatingQR")}
                              </>
                            ) : (
                              t("checkout.generateQR")
                            )}
                          </Button>
                        ) : (
                          <div
                            ref={qrRef}
                            className="bg-gradient-to-br from-[#FFF5E6] to-[#FFEBD6] rounded-2xl p-6 text-center select-none"
                          >
                            <p className="text-[#8B0000] font-medium mb-4">
                              {t("checkout.scanToPay")} ₹{cartTotal}
                            </p>
                            <div className="relative w-48 h-48 mx-auto bg-white p-4 rounded-xl shadow-md">
                              <Image
                                src="/qr/payment-qr.png"
                                alt="Payment QR Code"
                                fill
                                className="object-contain"
                                draggable={false}
                              />
                            </div>
                            <p className="mt-4 text-sm text-[#6B5B4F]">
                              {t("checkout.upiId")}: Q049323241@ybl
                              <button
                                onClick={() => copyToClipboard("Q049323241@ybl")}
                                className="ml-2 text-[#FF9933] hover:text-[#8B0000] cursor-pointer"
                              >
                                <Copy className="w-4 h-4 inline" />
                              </button>
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex gap-4 mt-6">
                      <Button
                        variant="outline"
                        onClick={() => setStep("address")}
                        className="flex-1 border-[#E8D5C4] cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        {t("checkout.back")}
                      </Button>
                      <Button
                        onClick={handlePlaceOrder}
                        className="flex-1 bg-gradient-to-r from-[#8B0000] to-[#FF6B00] text-white py-6 cursor-pointer"
                      >
                        {t("checkout.placeOrder")}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
                <h3 className="text-xl font-bold text-[#8B0000] mb-4">{t("cart.orderSummary")}</h3>
                
                <div className="space-y-3 mb-4 max-h-48 overflow-auto">
                  {cart.map((item) => (
                    <div key={`${item.product.id}-${item.weight}`} className="flex justify-between text-sm">
                      <span className="text-[#6B5B4F]">
                        {item.product.name} ({item.weight}) × {item.quantity}
                      </span>
                      <span className="text-[#3D2314]">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#E8D5C4] pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#6B5B4F]">{t("cart.subtotal")}</span>
                    <span className="text-[#3D2314]">₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B5B4F]">{t("cart.delivery")}</span>
                    <span className="text-green-600">{t("cart.free")}</span>
                  </div>
                  <div className="flex justify-between border-t border-[#E8D5C4] pt-2">
                    <span className="font-bold text-[#3D2314]">{t("cart.total")}</span>
                    <span className="font-bold text-[#8B0000] text-xl">₹{cartTotal}</span>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-[#FFF5E6] rounded-xl">
                  <div className="flex items-center gap-2 text-[#6B5B4F] text-sm">
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                    {t("checkout.securePayment")}
                  </div>
                  <div className="flex items-center gap-2 text-[#6B5B4F] text-sm mt-2">
                    <Truck className="w-4 h-4 text-[#FF9933]" />
                    {t("checkout.freeDeliveryIndia")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
