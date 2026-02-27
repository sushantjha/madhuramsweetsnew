"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PageLoader from "@/components/shared/PageLoader";
import { businessInfo } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "@/hooks/use-toast";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Facebook,
  Instagram,
  Map,
} from "lucide-react";

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you soon. Jai Baba Baidyanath!",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

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
              {t("contact.title")}
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              {t("contact.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12 md:py-16 bg-[#FFFBF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2
                  className="text-2xl font-bold text-[#8B0000] mb-6"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  {t("contact.sendMessage")}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label className="text-[#3D2314]">{t("contact.yourName")}</Label>
                    <Input
                      type="text"
                      placeholder={t("contact.yourName")}
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="mt-2 bg-[#FFF5E6] border-[#E8D5C4] focus:ring-[#FF9933] focus:border-[#FF9933]"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-[#3D2314]">{t("contact.email")}</Label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="mt-2 bg-[#FFF5E6] border-[#E8D5C4] focus:ring-[#FF9933] focus:border-[#FF9933]"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-[#3D2314]">{t("contact.phone")}</Label>
                      <Input
                        type="tel"
                        placeholder="Your phone number"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="mt-2 bg-[#FFF5E6] border-[#E8D5C4] focus:ring-[#FF9933] focus:border-[#FF9933]"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-[#3D2314]">{t("contact.message")}</Label>
                    <textarea
                      placeholder={t("contact.howCanHelp")}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="mt-2 w-full h-32 px-4 py-3 bg-[#FFF5E6] border border-[#E8D5C4] rounded-lg focus:ring-2 focus:ring-[#FF9933] focus:border-[#FF9933] outline-none resize-none"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-[#8B0000] to-[#FF6B00] hover:from-[#6B0000] hover:to-[#8B0000] text-white py-6 text-lg rounded-xl cursor-pointer"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    {t("contact.send")}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Address Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FF9933] to-[#8B0000] rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#3D2314] text-lg mb-1">
                      {t("contact.visitShop")}
                    </h3>
                    <p className="text-[#6B5B4F]">{businessInfo.address}</p>
                    <a
                      href={businessInfo.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-2 text-[#FF9933] hover:text-[#8B0000] font-medium cursor-pointer"
                    >
                      <Map className="w-4 h-4" />
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FF9933] to-[#8B0000] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#3D2314] text-lg mb-1">
                      {t("contact.callUs")}
                    </h3>
                    <a
                      href={`tel:${businessInfo.phone}`}
                      className="text-[#8B0000] font-medium text-lg hover:text-[#FF9933] cursor-pointer"
                    >
                      {businessInfo.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Email Cards */}
              {businessInfo.emails.map((email, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#FF9933] to-[#8B0000] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#3D2314] text-lg mb-1">
                        {t("contact.emailUs")} {businessInfo.emails.length > 1 ? i + 1 : ""}
                      </h3>
                      <a
                        href={`mailto:${email}`}
                        className="text-[#8B0000] font-medium hover:text-[#FF9933] cursor-pointer"
                      >
                        {email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}

              {/* Timing Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FF9933] to-[#8B0000] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#3D2314] text-lg mb-1">
                      {t("contact.openingHours")}
                    </h3>
                    <p className="text-[#6B5B4F]">
                      Monday - Saturday: {businessInfo.timings.weekdays}
                    </p>
                    <p className="text-[#6B5B4F]">
                      Sunday: {businessInfo.timings.sunday}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gradient-to-r from-[#8B0000] to-[#FF6B00] rounded-2xl shadow-lg p-6 text-white">
                <h3 className="font-bold text-lg mb-4">{t("contact.connectWithUs")}</h3>
                <div className="flex gap-4">
                  <a
                    href={businessInfo.social.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-6 h-6" />
                  </a>
                  <a
                    href={businessInfo.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a
                    href={businessInfo.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="bg-[#FFFBF5] pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2
              className="text-2xl md:text-3xl font-bold text-[#8B0000] mb-2"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Find Us on Map
            </h2>
            <p className="text-[#6B5B4F]">
              Visit our shop near HadHadiya Pool, Deoghar College Road
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-xl"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3634.4567!2d86.6979!3d24.4853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f128b9b9b9b9b9%3A0x1234567890!2sHadHadiya%20Pool%2C%20Deoghar%20College%20Road%2C%20Deoghar%2C%20Jharkhand%20814112!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
              title="Madhuram Sweets Location"
            />
          </motion.div>

          <div className="mt-6 text-center">
            <a
              href={businessInfo.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B0000] text-white rounded-full hover:bg-[#6B0000] transition-colors font-medium cursor-pointer"
            >
              <Map className="w-5 h-5" />
              Get Directions
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
