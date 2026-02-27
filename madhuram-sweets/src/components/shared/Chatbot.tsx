"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import { products } from "@/lib/data";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatAction {
  action: "add_to_cart" | "checkout" | "remove_from_cart";
  product?: {
    name: string;
    quantity: number;
    weight?: string;
    price: number;
  };
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "🙏 Namaste! Welcome to Madhuram Sweets. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Fix: Use 'cart' instead of 'cartItems'
  const { addToCart, cart, cartCount } = useCart();
  const { t } = useLanguage();
  const router = useRouter();

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Fix: Use 'cart' array and map properly
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.text,
          cartItems: cart.map((item) => ({
            name: item.product.name,
            quantity: item.quantity,
            price: item.price,
            weight: item.weight,
          })),
        }),
      });

      const data = await response.json();

      if (data.success) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response,
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);

        // Handle actions
        if (data.action) {
          handleAction(data.action);
        }
      } else {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Sorry, I couldn't process your request. Please try again or contact us directly.",
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, something went wrong. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = (actionData: ChatAction) => {
    if (actionData.action === "add_to_cart" && actionData.product) {
      const productData = actionData.product;
      
      // Find the actual product from the products list
      const foundProduct = products.find(p => 
        p.name.toLowerCase().includes(productData.name.toLowerCase()) ||
        productData.name.toLowerCase().includes(p.name.toLowerCase())
      );
      
      if (foundProduct) {
        addToCart(foundProduct, productData.weight || "1kg");
      } else {
        // Create a temporary product object
        const tempProduct = {
          id: Date.now(),
          name: productData.name,
          nameHindi: productData.name,
          price: productData.price,
          weight: productData.weight || "1pc",
          category: "sweets",
          image: "/products/placeholder.png",
          description: `${productData.name} - Added via chatbot`,
          ingredients: "",
          shelfLife: "3 days",
          badge: "",
          badgeType: "",
          rating: 4.5,
          reviews: 0,
        };
        addToCart(tempProduct, productData.weight || "1pc");
      }

      // Add confirmation message
      setTimeout(() => {
        const confirmMessage: Message = {
          id: (Date.now() + 2).toString(),
          text: `✅ Added ${productData.name} to your cart! You can continue shopping or say "checkout" to complete your order.`,
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, confirmMessage]);
      }, 500);
    } else if (actionData.action === "checkout") {
      // Navigate to cart page
      setTimeout(() => {
        const confirmMessage: Message = {
          id: (Date.now() + 2).toString(),
          text: "🛒 Taking you to checkout... Please complete your order details there.",
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, confirmMessage]);
        setIsOpen(false);
        router.push("/cart");
      }, 500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickActions = [
    "What sweets do you have?",
    "Tell me about Peda Mahaprasad",
    "I want 1kg Kaju Barfi",
    "What are your timings?",
  ];

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 bg-gradient-to-r from-[#8B0000] to-[#A52A2A] text-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow cursor-pointer"
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-5 z-50 w-[350px] sm:w-[400px] max-w-[calc(100vw-40px)] bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#E8D5C4]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#8B0000] to-[#A52A2A] text-white p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Madhuram Assistant</h3>
                  <p className="text-xs text-white/80">Always here to help</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[350px] overflow-y-auto p-4 bg-[#FFF5E6]/30">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 mb-3 ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.sender === "bot" && (
                    <div className="w-8 h-8 bg-[#8B0000] rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-[#8B0000] to-[#A52A2A] text-white rounded-br-none"
                        : "bg-white text-[#3D2314] rounded-bl-none shadow-sm border border-[#E8D5C4]"
                    }`}
                  >
                    {message.text}
                  </div>
                  {message.sender === "user" && (
                    <div className="w-8 h-8 bg-[#FF9933] rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex gap-2 mb-3">
                  <div className="w-8 h-8 bg-[#8B0000] rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-[#E8D5C4]">
                    <div className="flex gap-1">
                      <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                        className="w-2 h-2 bg-[#8B0000] rounded-full"
                      />
                      <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-[#8B0000] rounded-full"
                      />
                      <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 bg-[#8B0000] rounded-full"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-[#6B5B4F] mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setInputValue(action);
                        inputRef.current?.focus();
                      }}
                      className="text-xs px-3 py-1.5 bg-[#FFF5E6] text-[#8B0000] rounded-full hover:bg-[#FFE4C4] transition-colors cursor-pointer"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-[#E8D5C4] bg-white">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t("chatbot.placeholder")}
                  className="flex-1 px-4 py-2 border border-[#E8D5C4] rounded-full text-sm focus:outline-none focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000]"
                  disabled={isLoading}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="w-10 h-10 bg-gradient-to-r from-[#8B0000] to-[#A52A2A] text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
              {/* Fix: Use cartCount instead of cartItems.length */}
              {cartCount > 0 && (
                <button
                  onClick={() => router.push("/cart")}
                  className="mt-2 w-full flex items-center justify-center gap-2 text-sm text-[#8B0000] hover:text-[#FF9933] transition-colors cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {cartCount} item{cartCount > 1 ? "s" : ""} in cart
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
