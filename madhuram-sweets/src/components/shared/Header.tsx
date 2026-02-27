"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { indianLanguages } from "@/lib/data";
import {
  ShoppingCart,
  Menu,
  Phone,
  Package,
  Home,
  Store,
  Info,
  Mail,
  Globe,
  ChevronDown,
} from "lucide-react";

const navItems = [
  { href: "/", labelKey: "nav.home", labelHi: "होम", icon: Home },
  { href: "/shop", labelKey: "nav.shop", labelHi: "दुकान", icon: Store },
  { href: "/about", labelKey: "nav.about", labelHi: "हमारे बारे में", icon: Info },
  { href: "/contact", labelKey: "nav.contact", labelHi: "संपर्क", icon: Mail },
  { href: "/orders", labelKey: "nav.orders", labelHi: "मेरे ऑर्डर", icon: Package },
];

export default function Header() {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  // Calculate selected language from context
  const selectedLang = indianLanguages.find(l => l.code === language) || indianLanguages[12];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleLanguageChange = (lang: typeof indianLanguages[0]) => {
    setLanguage(lang.code);
    setLangDropdownOpen(false);
  };

  // Get navigation label based on language
  const getNavLabel = (item: typeof navItems[0]) => {
    if (language === "hi") return item.labelHi;
    return t(item.labelKey);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E8D5C4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 md:w-12 md:h-12 relative">
              <Image
                src="/logo-new.png"
                alt="Madhuram Sweets Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="hidden sm:block text-left">
              <h1
                className="text-lg md:text-xl font-bold text-[#8B0000]"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                {t("hero.title")}
              </h1>
              <p className="text-xs text-[#6B5B4F]">{t("hero.tagline")}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 cursor-pointer ${
                  isActive(item.href)
                    ? "text-[#8B0000] bg-[#FFF5E6]"
                    : "text-[#3D2314] hover:text-[#8B0000] hover:bg-[#FFF5E6]/50"
                }`}
              >
                {getNavLabel(item)}
                {isActive(item.href) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF9933] to-[#8B0000]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 px-2 py-1.5 md:px-3 md:py-2 bg-[#FFF5E6] rounded-lg hover:bg-[#FFE4C4] transition-colors cursor-pointer"
              >
                <Globe className="w-4 h-4 text-[#8B0000]" />
                <span className="text-xs md:text-sm font-medium text-[#8B0000] hidden sm:inline">
                  {selectedLang.name}
                </span>
                <ChevronDown className={`w-3 h-3 text-[#8B0000] transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-[#E8D5C4] py-2 z-50 max-h-80 overflow-y-auto"
                  >
                    {indianLanguages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang)}
                        className={`w-full px-4 py-2 text-left hover:bg-[#FFF5E6] transition-colors cursor-pointer ${
                          selectedLang.code === lang.code ? "bg-[#FFF5E6] text-[#8B0000] font-medium" : "text-[#3D2314]"
                        }`}
                      >
                        <span className="block">{lang.name}</span>
                        <span className="text-xs text-[#6B5B4F]">{lang.englishName}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-sm bg-[#FFF5E6] px-3 py-1.5 rounded-full">
              <Phone className="w-4 h-4 text-[#FF9933]" />
              <a
                href="tel:07710084997"
                className="text-[#8B0000] hover:text-[#FF9933] font-medium"
              >
                07710084997
              </a>
            </div>

            <Link href="/orders">
              <Button variant="ghost" size="icon" className="relative cursor-pointer">
                <Package className="w-5 h-5 text-[#8B0000]" />
              </Button>
            </Link>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative cursor-pointer">
                <ShoppingCart className="w-5 h-5 text-[#8B0000]" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-[#FF9933] to-[#FF6B00] text-white text-xs rounded-full flex items-center justify-center font-bold"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden cursor-pointer"
                >
                  <Menu className="w-6 h-6 text-[#8B0000]" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 bg-white p-0">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between p-4 border-b border-[#E8D5C4]">
                    <Link
                      href="/"
                      className="flex items-center gap-3"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="w-12 h-12 relative">
                        <Image
                          src="/logo-new.png"
                          alt="Madhuram Sweets Logo"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <h2
                          className="text-xl font-bold text-[#8B0000]"
                          style={{ fontFamily: "var(--font-playfair), serif" }}
                        >
                          {t("hero.title")}
                        </h2>
                        <p className="text-xs text-[#6B5B4F]">{t("hero.tagline")}</p>
                      </div>
                    </Link>
                  </div>

                  {/* Navigation Links */}
                  <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
                          isActive(item.href)
                            ? "bg-gradient-to-r from-[#FFF5E6] to-[#FFEBD6] text-[#8B0000]"
                            : "text-[#3D2314] hover:bg-[#FFF5E6]/50"
                        }`}
                      >
                        <item.icon className="w-5 h-5 text-[#FF9933]" />
                        <span className="font-medium">
                          {getNavLabel(item)}
                        </span>
                      </Link>
                    ))}
                  </nav>

                  {/* Language Selector Mobile */}
                  <div className="px-4 py-2 border-t border-[#E8D5C4]">
                    <p className="text-xs text-[#6B5B4F] mb-2">Language / भाषा</p>
                    <div className="flex flex-wrap gap-1">
                      {indianLanguages.slice(0, 6).map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            handleLanguageChange(lang);
                            setMobileMenuOpen(false);
                          }}
                          className={`px-2 py-1 text-xs rounded-md transition-colors cursor-pointer ${
                            selectedLang.code === lang.code
                              ? "bg-[#8B0000] text-white"
                              : "bg-[#FFF5E6] text-[#3D2314] hover:bg-[#FFE4C4]"
                          }`}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-4 border-t border-[#E8D5C4] space-y-3">
                    <a
                      href="tel:07710084997"
                      className="flex items-center gap-3 px-4 py-2 bg-[#FFF5E6] rounded-xl cursor-pointer"
                    >
                      <Phone className="w-5 h-5 text-[#FF9933]" />
                      <span className="text-[#8B0000] font-medium">
                        07710084997
                      </span>
                    </a>
                    <a
                      href="https://wa.me/917710084997"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-2 bg-green-50 rounded-xl cursor-pointer"
                    >
                      <svg
                        className="w-5 h-5 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      <span className="text-green-700 font-medium">WhatsApp Us</span>
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Click outside to close language dropdown */}
      {langDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setLangDropdownOpen(false)}
        />
      )}
    </header>
  );
}
