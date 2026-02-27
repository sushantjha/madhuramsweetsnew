"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  isTranslating: boolean;
};

// Static translations for Hindi (fallback) and English
const staticTranslations: Record<string, Record<string, string>> = {
  en: {
    // Header
    "nav.home": "Home",
    "nav.shop": "Shop",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.orders": "My Orders",
    
    // Hero
    "hero.title": "Madhuram Sweets",
    "hero.subtitle": "Jyotirling Baba Baidyanath Dham ka Mahaprasad",
    "hero.tagline": "Our sweets have just one thing - love and purity!",
    "hero.description": "Experience the divine taste of traditional Indian sweets prepared with 100% pure desi ghee. Perfect for temple offerings, festivals, and special occasions.",
    "hero.shopNow": "Shop Now",
    "hero.ourStory": "Our Story",
    
    // Features
    "feature.pureGhee": "100% Pure Ghee",
    "feature.fastDelivery": "Fast Delivery",
    "feature.qualityAssured": "Quality Assured",
    "feature.madeWithLove": "Made with Love",
    
    // Products
    "products.featuredTitle": "Featured Sweets",
    "products.featuredSubtitle": "Our most beloved sweets, perfect for temple offerings and special occasions",
    "products.viewAll": "View All Products",
    "products.addToCart": "Add to Cart",
    "products.reviews": "reviews",
    
    // Reviews
    "reviews.title": "What Our Customers Say",
    "reviews.subtitle": "Customer Love",
    
    // Shop
    "shop.title": "Our Sweets Collection",
    "shop.subtitle": "Explore our complete range of traditional Indian sweets made with pure desi ghee and love",
    "shop.searchPlaceholder": "Search sweets...",
    "shop.noProducts": "No products found",
    "shop.clearFilters": "Clear Filters",
    "shop.showing": "Showing",
    "shop.of": "of",
    "shop.products": "products",
    
    // Cart
    "cart.title": "Your Cart",
    "cart.items": "items in your cart",
    "cart.empty": "Your cart is empty",
    "cart.emptyDesc": "Looks like you haven't added any sweets yet. Start shopping to fill your cart with delicious treats!",
    "cart.startShopping": "Start Shopping",
    "cart.continueShopping": "Continue Shopping",
    "cart.subtotal": "Subtotal",
    "cart.delivery": "Delivery",
    "cart.free": "Free",
    "cart.total": "Total",
    "cart.orderSummary": "Order Summary",
    "cart.proceedCheckout": "Proceed to Checkout",
    "cart.freeDelivery": "Free delivery on orders above ₹500",
    
    // Checkout
    "checkout.title": "Checkout",
    "checkout.completeOrder": "Complete your order",
    "checkout.address": "Address",
    "checkout.payment": "Payment",
    "checkout.deliveryAddress": "Delivery Address",
    "checkout.fullName": "Full Name",
    "checkout.phoneNumber": "Phone Number",
    "checkout.fullAddress": "Full Address",
    "checkout.state": "State",
    "checkout.city": "City",
    "checkout.pincode": "Pincode",
    "checkout.selectState": "Select State",
    "checkout.selectCity": "Select City",
    "checkout.searchState": "Search state...",
    "checkout.searchCity": "Search city...",
    "checkout.sameDayDelivery": "Great! You're in Deoghar. Enjoy free same-day delivery!",
    "checkout.continuePayment": "Continue to Payment",
    "checkout.paymentMethod": "Payment Method",
    "checkout.onlinePayment": "Online Payment",
    "checkout.payViaUPI": "Pay via UPI / QR Code",
    "checkout.cod": "Cash on Delivery",
    "checkout.payWhenReceive": "Pay when you receive",
    "checkout.generateQR": "Generate Payment QR",
    "checkout.generatingQR": "Generating QR Code...",
    "checkout.scanToPay": "Scan to pay",
    "checkout.upiId": "UPI ID",
    "checkout.back": "Back",
    "checkout.placeOrder": "Place Order",
    "checkout.securePayment": "100% Secure Payment",
    "checkout.freeDeliveryIndia": "Free Delivery Across India",
    
    // Order Success
    "orderSuccess.title": "Order Placed Successfully!",
    "orderSuccess.message": "has been placed successfully.",
    "orderSuccess.blessing": "Jai Baba Baidyanath! We'll contact you shortly to confirm your order.",
    "orderSuccess.viewOrders": "View Orders",
    "orderSuccess.continueShopping": "Continue Shopping",
    
    // Orders
    "orders.title": "My Orders",
    "orders.subtitle": "Track your orders and view order history",
    "orders.trackOrder": "Track Your Order",
    "orders.enterOrderId": "Enter Order ID (e.g., MS-2024-001)",
    "orders.track": "Track",
    "orders.noOrders": "No orders yet",
    "orders.startShopping": "Start shopping to place your first order!",
    "orders.orderDate": "Order Date",
    "orders.totalAmount": "Total Amount",
    "orders.deliveredOn": "Delivered On",
    "orders.expectedDelivery": "Expected Delivery",
    "orders.items": "Items",
    "orders.viewDetails": "View Details",
    
    // Tracking
    "tracking.title": "Track Order",
    "tracking.orderId": "Order ID",
    "tracking.backToOrders": "Back to Orders",
    "tracking.orderStatus": "Order Status",
    "tracking.currentStatus": "Current Status",
    "tracking.orderSummary": "Order Summary",
    "tracking.contactSupport": "Contact Support",
    
    // About
    "about.title": "Our Story",
    "about.legacyTitle": "A Legacy of Pure & Divine Sweets",
    "about.legacyP1": "Nestled in the holy city of Deoghar, Jharkhand, Madhuram Sweets has been serving devotees and sweet lovers for generations. Our shop is located near the sacred Baba Baidyanath Dham, one of the twelve Jyotirlingas, making our sweets an integral part of the divine pilgrimage experience.",
    "about.legacyP2": "We believe in the purity of tradition. Every sweet we craft is made with 100% pure desi ghee, sourced from local farms. Our recipes have been passed down through generations, preserving the authentic taste of Indian mithai.",
    "about.valuesTitle": "Our Values",
    "about.valuesSubtitle": "What makes Madhuram Sweets special",
    "about.pureIngredients": "Pure Ingredients",
    "about.pureIngredientsDesc": "100% pure desi ghee and natural ingredients sourced from trusted local farmers",
    "about.madeWithLove": "Made with Love",
    "about.madeWithLoveDesc": "Every sweet is handcrafted with care and devotion by our skilled artisans",
    "about.qualityAssured": "Quality Assured",
    "about.qualityAssuredDesc": "Strict quality control to ensure freshness and hygiene in every bite",
    "about.traditionalRecipes": "Traditional Recipes",
    "about.traditionalRecipesDesc": "Authentic recipes passed down through generations of sweet makers",
    "about.yearsService": "Years of Service",
    "about.happyCustomers": "Happy Customers",
    "about.sweetVarieties": "Sweet Varieties",
    "about.customerRating": "Customer Rating",
    "about.visitUs": "Visit Us",
    "about.callUs": "Call Us",
    "about.emailUs": "Email Us",
    "about.openingHours": "Opening Hours",
    "about.connectWithUs": "Connect With Us",
    
    // Contact
    "contact.title": "Contact Us",
    "contact.subtitle": "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
    "contact.sendMessage": "Send us a Message",
    "contact.yourName": "Your Name",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.message": "Message",
    "contact.howCanHelp": "How can we help you?",
    "contact.send": "Send Message",
    "contact.visitShop": "Visit Our Shop",
    "contact.callUs": "Call Us",
    "contact.emailUs": "Email Us",
    "contact.openingHours": "Opening Hours",
    "contact.connectWithUs": "Connect With Us",
    
    // Product Detail
    "product.backToShop": "Back to Shop",
    "product.selectWeight": "Select Weight",
    "product.quantity": "Quantity",
    "product.total": "Total",
    "product.buyNow": "Buy Now",
    "product.ingredients": "Ingredients",
    "product.shelfLife": "Shelf Life",
    "product.fastDelivery": "Fast Delivery",
    "product.qualityAssured": "Quality Assured",
    "product.freshDaily": "Fresh Daily",
    "product.relatedProducts": "Related Products",
    
    // Footer
    "footer.quickLinks": "Quick Links",
    "footer.contactUs": "Contact Us",
    "footer.storeTimings": "Store Timings",
    "footer.followUs": "Follow Us",
    "footer.monSat": "Mon - Sat",
    "footer.sunday": "Sunday",
    "footer.allRightsReserved": "All rights reserved.",
    "footer.jaiBaba": "Jai Baba Baidyanath! 🙏",
    
    // CTA
    "cta.orderNow": "Order Now for Temple Offerings",
    "cta.description": "Get fresh sweets delivered to your doorstep. Perfect for Baba Baidyanath Darshan and special occasions.",
    "cta.startShopping": "Start Shopping",
    "cta.call": "Call",

    // Chatbot
    "chatbot.title": "Madhuram Assistant",
    "chatbot.welcome": "🙏 Namaste! Welcome to Madhuram Sweets. How can I help you today?",
    "chatbot.placeholder": "Type your message...",
    "chatbot.send": "Send",
  },
  hi: {
    // Header
    "nav.home": "होम",
    "nav.shop": "दुकान",
    "nav.about": "हमारे बारे में",
    "nav.contact": "संपर्क",
    "nav.orders": "मेरे ऑर्डर",
    
    // Hero
    "hero.title": "मधुरम स्वीट्स",
    "hero.subtitle": "ज्योतिर्लिंग बाबा बैद्यनाथ धाम का महाप्रसाद",
    "hero.tagline": "हमारी मिठाई में बस एक चीज़ है - प्यार और शुद्धता!",
    "hero.description": "100% शुद्ध देसी घी से बनी पारंपरिक भारतीय मिठाइयों का दिव्य स्वाद अनुभव करें। मंदिर के अर्पण, त्योहारों और विशेष अवसरों के लिए उपयुक्त।",
    "hero.shopNow": "अभी खरीदें",
    "hero.ourStory": "हमारी कहानी",
    
    // Features
    "feature.pureGhee": "100% शुद्ध घी",
    "feature.fastDelivery": "तुरंत डिलीवरी",
    "feature.qualityAssured": "गुणवत्ता की गारंटी",
    "feature.madeWithLove": "प्यार से बना",
    
    // Products
    "products.featuredTitle": "विशेष मिठाइयाँ",
    "products.featuredSubtitle": "हमारी सबसे प्रिय मिठाइयाँ, मंदिर अर्पण और विशेष अवसरों के लिए उपयुक्त",
    "products.viewAll": "सभी उत्पाद देखें",
    "products.addToCart": "कार्ट में डालें",
    "products.reviews": "समीक्षाएं",
    
    // Reviews
    "reviews.title": "हमारे ग्राहक क्या कहते हैं",
    "reviews.subtitle": "ग्राहक प्रेम",
    
    // Shop
    "shop.title": "हमारी मिठाइयों का संग्रह",
    "shop.subtitle": "शुद्ध देसी घी और प्यार से बनी पारंपरिक भारतीय मिठाइयों की पूरी श्रृंखला देखें",
    "shop.searchPlaceholder": "मिठाई खोजें...",
    "shop.noProducts": "कोई उत्पाद नहीं मिला",
    "shop.clearFilters": "फ़िल्टर साफ़ करें",
    "shop.showing": "दिखा रहा है",
    "shop.of": "में से",
    "shop.products": "उत्पाद",
    
    // Cart
    "cart.title": "आपका कार्ट",
    "cart.items": "आइटम कार्ट में",
    "cart.empty": "आपका कार्ट खाली है",
    "cart.emptyDesc": "लगता है आपने अभी तक कोई मिठाई नहीं जोड़ी है। स्वादिष्ट मिठाइयों से अपना कार्ट भरने के लिए खरीदारी शुरू करें!",
    "cart.startShopping": "खरीदारी शुरू करें",
    "cart.continueShopping": "खरीदारी जारी रखें",
    "cart.subtotal": "उप-योग",
    "cart.delivery": "डिलीवरी",
    "cart.free": "मुफ्त",
    "cart.total": "कुल",
    "cart.orderSummary": "ऑर्डर सारांश",
    "cart.proceedCheckout": "चेकआउट करें",
    "cart.freeDelivery": "₹500 से ऊपर के ऑर्डर पर मुफ्त डिलीवरी",
    
    // Checkout
    "checkout.title": "चेकआउट",
    "checkout.completeOrder": "अपना ऑर्डर पूरा करें",
    "checkout.address": "पता",
    "checkout.payment": "भुगतान",
    "checkout.deliveryAddress": "डिलीवरी का पता",
    "checkout.fullName": "पूरा नाम",
    "checkout.phoneNumber": "फ़ोन नंबर",
    "checkout.fullAddress": "पूरा पता",
    "checkout.state": "राज्य",
    "checkout.city": "शहर",
    "checkout.pincode": "पिनकोड",
    "checkout.selectState": "राज्य चुनें",
    "checkout.selectCity": "शहर चुनें",
    "checkout.searchState": "राज्य खोजें...",
    "checkout.searchCity": "शहर खोजें...",
    "checkout.sameDayDelivery": "बहुत अच्छा! आप देवघर में हैं। मुफ्त समान-दिवसीय डिलीवरी का आनंद लें!",
    "checkout.continuePayment": "भुगतान के लिए आगे बढ़ें",
    "checkout.paymentMethod": "भुगतान विधि",
    "checkout.onlinePayment": "ऑनलाइन भुगतान",
    "checkout.payViaUPI": "UPI / QR कोड से भुगतान करें",
    "checkout.cod": "कैश ऑन डिलीवरी",
    "checkout.payWhenReceive": "प्राप्त करते समय भुगतान करें",
    "checkout.generateQR": "भुगतान QR उत्पन्न करें",
    "checkout.generatingQR": "QR कोड उत्पन्न हो रहा है...",
    "checkout.scanToPay": "भुगतान के लिए स्कैन करें",
    "checkout.upiId": "UPI आईडी",
    "checkout.back": "वापस",
    "checkout.placeOrder": "ऑर्डर दें",
    "checkout.securePayment": "100% सुरक्षित भुगतान",
    "checkout.freeDeliveryIndia": "भारत भर में मुफ्त डिलीवरी",
    
    // Order Success
    "orderSuccess.title": "ऑर्डर सफलतापूर्वक दिया गया!",
    "orderSuccess.message": "सफलतापूर्वक दिया गया है।",
    "orderSuccess.blessing": "जय बाबा बैद्यनाथ! आपके ऑर्डर की पुष्टि के लिए हम जल्द ही आपसे संपर्क करेंगे।",
    "orderSuccess.viewOrders": "ऑर्डर देखें",
    "orderSuccess.continueShopping": "खरीदारी जारी रखें",
    
    // Orders
    "orders.title": "मेरे ऑर्डर",
    "orders.subtitle": "अपने ऑर्डर ट्रैक करें और ऑर्डर इतिहास देखें",
    "orders.trackOrder": "अपना ऑर्डर ट्रैक करें",
    "orders.enterOrderId": "ऑर्डर आईडी दर्ज करें (जैसे, MS-2024-001)",
    "orders.track": "ट्रैक करें",
    "orders.noOrders": "कोई ऑर्डर नहीं",
    "orders.startShopping": "अपना पहला ऑर्डर देने के लिए खरीदारी शुरू करें!",
    "orders.orderDate": "ऑर्डर तिथि",
    "orders.totalAmount": "कुल राशि",
    "orders.deliveredOn": "डिलीवरी की तारीख",
    "orders.expectedDelivery": "अपेक्षित डिलीवरी",
    "orders.items": "आइटम",
    "orders.viewDetails": "विवरण देखें",
    
    // Tracking
    "tracking.title": "ऑर्डर ट्रैक करें",
    "tracking.orderId": "ऑर्डर आईडी",
    "tracking.backToOrders": "ऑर्डर पर वापस जाएं",
    "tracking.orderStatus": "ऑर्डर स्थिति",
    "tracking.currentStatus": "वर्तमान स्थिति",
    "tracking.orderSummary": "ऑर्डर सारांश",
    "tracking.contactSupport": "सहायता से संपर्क करें",
    
    // About
    "about.title": "हमारी कहानी",
    "about.legacyTitle": "शुद्ध और दिव्य मिठाइयों की एक विरासत",
    "about.legacyP1": "झारखंड के पवित्र शहर देवघर में स्थित, मधुरम स्वीट्स पीढ़ियों से भक्तों और मिठाई प्रेमियों की सेवा कर रहा है। हमारी दुकान पवित्र बाबा बैद्यनाथ धाम के पास स्थित है, जो बारह ज्योतिर्लिंगों में से एक है।",
    "about.legacyP2": "हम परंपरा की शुद्धता में विश्वास करते हैं। हमारी हर मिठाई 100% शुद्ध देसी घी से बनाई जाती है, जो स्थानीय खेतों से प्राप्त होती है।",
    "about.valuesTitle": "हमारे मूल्य",
    "about.valuesSubtitle": "मधुरम स्वीट्स को क्या विशेष बनाता है",
    "about.pureIngredients": "शुद्ध सामग्री",
    "about.pureIngredientsDesc": "विश्सनीय स्थानीय किसानों से प्राप्त 100% शुद्ध देसी घी और प्राकृतिक सामग्री",
    "about.madeWithLove": "प्यार से बना",
    "about.madeWithLoveDesc": "हर मिठाई हमारे कुशल कारीगरों द्वारा देखभाल और भक्ति के साथ हाथ से तैयार की जाती है",
    "about.qualityAssured": "गुणवत्ता की गारंटी",
    "about.qualityAssuredDesc": "हर कौर में ताजगी और स्वच्छता सुनिश्चित करने के लिए सख्त गुणवत्ता नियंत्रण",
    "about.traditionalRecipes": "पारंपरिक व्यंजन",
    "about.traditionalRecipesDesc": "मिठाई बनाने वालों की पीढ़ियों से प्राप्त प्रामाणिक व्यंजन",
    "about.yearsService": "वर्षों की सेवा",
    "about.happyCustomers": "खुश ग्राहक",
    "about.sweetVarieties": "मिठाई किस्में",
    "about.customerRating": "ग्राहक रेटिंग",
    "about.visitUs": "हमें देखें",
    "about.callUs": "हमें कॉल करें",
    "about.emailUs": "हमें ईमेल करें",
    "about.openingHours": "खुलने का समय",
    "about.connectWithUs": "हमारे साथ जुड़ें",
    
    // Contact
    "contact.title": "हमसे संपर्क करें",
    "contact.subtitle": "कोई सवाल है? हम आपसे सुनना पसंद करेंगे। हमें एक संदेश भेजें और हम जल्द से जल्द जवाब देंगे।",
    "contact.sendMessage": "हमें एक संदेश भेजें",
    "contact.yourName": "आपका नाम",
    "contact.email": "ईमेल",
    "contact.phone": "फ़ोन",
    "contact.message": "संदेश",
    "contact.howCanHelp": "हम आपकी कैसे मदद कर सकते हैं?",
    "contact.send": "संदेश भेजें",
    "contact.visitShop": "हमारी दुकान आएं",
    "contact.callUs": "हमें कॉल करें",
    "contact.emailUs": "हमें ईमेल करें",
    "contact.openingHours": "खुलने का समय",
    "contact.connectWithUs": "हमारे साथ जुड़ें",
    
    // Product Detail
    "product.backToShop": "दुकान पर वापस जाएं",
    "product.selectWeight": "वजन चुनें",
    "product.quantity": "मात्रा",
    "product.total": "कुल",
    "product.buyNow": "अभी खरीदें",
    "product.ingredients": "सामग्री",
    "product.shelfLife": "शेल्फ लाइफ",
    "product.fastDelivery": "तुरंत डिलीवरी",
    "product.qualityAssured": "गुणवत्ता की गारंटी",
    "product.freshDaily": "रोज़ाना ताजा",
    "product.relatedProducts": "संबंधित उत्पाद",
    
    // Footer
    "footer.quickLinks": "त्वरित लिंक",
    "footer.contactUs": "हमसे संपर्क करें",
    "footer.storeTimings": "दुकान का समय",
    "footer.followUs": "हमें फॉलो करें",
    "footer.monSat": "सोम - शनि",
    "footer.sunday": "रविवार",
    "footer.allRightsReserved": "सर्वाधिकार सुरक्षित।",
    "footer.jaiBaba": "जय बाबा बैद्यनाथ! 🙏",
    
    // CTA
    "cta.orderNow": "मंदिर अर्पण के लिए अभी ऑर्डर करें",
    "cta.description": "ताजी मिठाइयाँ आपके घर पर डिलीवर। बाबा बैद्यनाथ दर्शन और विशेष अवसरों के लिए उपयुक्त।",
    "cta.startShopping": "खरीदारी शुरू करें",
    "cta.call": "कॉल करें",

    // Chatbot
    "chatbot.title": "मधुरम सहायक",
    "chatbot.welcome": "🙏 नमस्ते! मधुरम स्वीट्स में आपका स्वागत है। मैं आज आपकी कैसे मदद कर सकता हूं?",
    "chatbot.placeholder": "अपना संदेश टाइप करें...",
    "chatbot.send": "भेजें",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState(() => {
    if (typeof window === "undefined") return "en";
    const savedLang = localStorage.getItem("madhuram-language");
    return savedLang || "en";
  });
  
  const [isTranslating, setIsTranslating] = useState(false);
  const [dynamicTranslations, setDynamicTranslations] = useState<Record<string, string>>({});
  const translationCache = useRef<Record<string, Record<string, string>>>({});
  const pendingTranslations = useRef<Set<string>>(new Set());

  // Load cached translations on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem("madhuram-translation-cache");
        if (cached) {
          translationCache.current = JSON.parse(cached);
        }
      } catch (e) {
        // Ignore cache errors
      }
    }
  }, []);

  // Save cache when it changes
  useEffect(() => {
    if (typeof window !== "undefined" && Object.keys(translationCache.current).length > 0) {
      localStorage.setItem("madhuram-translation-cache", JSON.stringify(translationCache.current));
    }
  }, [dynamicTranslations]);

  const setLanguage = useCallback((lang: string) => {
    setLanguageState(lang);
    localStorage.setItem("madhuram-language", lang);
    // Clear dynamic translations when language changes
    setDynamicTranslations({});
  }, []);

  const translateText = useCallback(async (text: string, targetLang: string): Promise<string> => {
    // Check cache first
    const cacheKey = `${targetLang}:${text}`;
    if (translationCache.current[targetLang]?.[text]) {
      return translationCache.current[targetLang][text];
    }
    
    // Check if translation is already pending
    if (pendingTranslations.current.has(cacheKey)) {
      // Wait for pending translation
      return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
          if (translationCache.current[targetLang]?.[text]) {
            clearInterval(checkInterval);
            resolve(translationCache.current[targetLang][text]);
          }
        }, 100);
        // Timeout after 10 seconds
        setTimeout(() => {
          clearInterval(checkInterval);
          resolve(text);
        }, 10000);
      });
    }

    pendingTranslations.current.add(cacheKey);

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, targetLanguage: targetLang }),
      });

      const data = await response.json();
      
      if (data.success && data.translatedText) {
        // Cache the result
        if (!translationCache.current[targetLang]) {
          translationCache.current[targetLang] = {};
        }
        translationCache.current[targetLang][text] = data.translatedText;
        return data.translatedText;
      }
      
      return text;
    } catch (error) {
      console.error("Translation error:", error);
      return text;
    } finally {
      pendingTranslations.current.delete(cacheKey);
    }
  }, []);

  const t = useCallback((key: string): string => {
    // For English and Hindi, use static translations
    if (language === "en" || language === "hi") {
      return staticTranslations[language]?.[key] || staticTranslations["en"]?.[key] || key;
    }

    // For other languages, check if we have a cached translation
    const cacheKey = `${language}:${key}`;
    
    // Check dynamic translations first
    if (dynamicTranslations[cacheKey]) {
      return dynamicTranslations[cacheKey];
    }

    // Check localStorage cache
    const englishText = staticTranslations["en"]?.[key];
    if (!englishText) return key;

    // If we have a cached translation for this language and text
    if (translationCache.current[language]?.[englishText]) {
      return translationCache.current[language][englishText];
    }

    // Trigger async translation for next time
    // Return English text for now
    if (typeof window !== "undefined" && !pendingTranslations.current.has(cacheKey)) {
      translateText(englishText, language).then((translated) => {
        setDynamicTranslations((prev) => ({
          ...prev,
          [cacheKey]: translated,
        }));
      });
    }

    // Return English text as fallback
    return englishText;
  }, [language, dynamicTranslations, translateText]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isTranslating }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
