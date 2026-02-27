"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import PageLoader from "@/components/shared/PageLoader";
import { businessInfo } from "@/lib/data";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Award,
  Heart,
  Leaf,
  ShieldCheck,
  Users,
  Star,
  Sparkles,
} from "lucide-react";

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PageLoader isLoading={isLoading} />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/temple-bg-4k.png"
            alt="Temple Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 hero-gradient" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Sparkles className="w-12 h-12 text-[#FFD700] mx-auto mb-4" />
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Our Story
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {businessInfo.subHeader}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24 bg-[#FFFBF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2
                className="text-3xl md:text-4xl font-bold text-[#8B0000] mb-6"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                A Legacy of Pure & Divine Sweets
              </h2>
              <p className="text-[#6B5B4F] mb-6 leading-relaxed">
                Nestled in the holy city of Deoghar, Jharkhand, Madhuram Sweets has
                been serving devotees and sweet lovers for generations. Our shop is
                located near the sacred Baba Baidyanath Dham, one of the twelve
                Jyotirlingas, making our sweets an integral part of the divine
                pilgrimage experience.
              </p>
              <p className="text-[#6B5B4F] mb-6 leading-relaxed">
                We believe in the purity of tradition. Every sweet we craft is made
                with 100% pure desi ghee, sourced from local farms. Our recipes have
                been passed down through generations, preserving the authentic taste
                of Indian mithai.
              </p>
              <p className="text-[#FFD700] font-medium text-lg">
                {businessInfo.hindiTagline}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/products/real/dry-fruit-laddu.jpeg"
                alt="Traditional Sweets"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#FFF5E6] to-[#FFFBF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-[#8B0000] mb-4"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Our Values
            </h2>
            <p className="text-[#6B5B4F] max-w-2xl mx-auto">
              What makes Madhuram Sweets special
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Leaf,
                title: "Pure Ingredients",
                desc: "100% pure desi ghee and natural ingredients sourced from trusted local farmers",
              },
              {
                icon: Heart,
                title: "Made with Love",
                desc: "Every sweet is handcrafted with care and devotion by our skilled artisans",
              },
              {
                icon: ShieldCheck,
                title: "Quality Assured",
                desc: "Strict quality control to ensure freshness and hygiene in every bite",
              },
              {
                icon: Award,
                title: "Traditional Recipes",
                desc: "Authentic recipes passed down through generations of sweet makers",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#FF9933] to-[#8B0000] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-[#3D2314] text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-[#6B5B4F] text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-[#8B0000] to-[#FF6B00] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "25+", label: "Years of Service" },
              { number: "50K+", label: "Happy Customers" },
              { number: "30+", label: "Sweet Varieties" },
              { number: "4.9", label: "Customer Rating" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div
                  className="text-4xl md:text-5xl font-bold mb-2"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  {stat.number}
                </div>
                <div className="text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 md:py-24 bg-[#FFFBF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-md text-center"
            >
              <MapPin className="w-8 h-8 text-[#FF9933] mx-auto mb-4" />
              <h3 className="font-bold text-[#3D2314] mb-2">Visit Us</h3>
              <p className="text-[#6B5B4F] text-sm">{businessInfo.address}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-md text-center"
            >
              <Phone className="w-8 h-8 text-[#FF9933] mx-auto mb-4" />
              <h3 className="font-bold text-[#3D2314] mb-2">Call Us</h3>
              <a
                href={`tel:${businessInfo.phone}`}
                className="text-[#8B0000] font-medium hover:text-[#FF9933] cursor-pointer"
              >
                {businessInfo.phone}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-md text-center"
            >
              <Clock className="w-8 h-8 text-[#FF9933] mx-auto mb-4" />
              <h3 className="font-bold text-[#3D2314] mb-2">Opening Hours</h3>
              <p className="text-[#6B5B4F] text-sm">
                Mon-Sat: {businessInfo.timings.weekdays}
              </p>
              <p className="text-[#6B5B4F] text-sm">
                Sunday: {businessInfo.timings.sunday}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
