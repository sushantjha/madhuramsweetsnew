"use client";

import { AnimatePresence, motion } from "framer-motion";

interface PageLoaderProps {
  isLoading: boolean;
}

export default function PageLoader({ isLoading }: PageLoaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#8B0000] via-[#800020] to-[#FF6B00]"
        >
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="relative flex flex-col items-center">
            {/* 3D Rotating Mandala */}
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              {/* Outer Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-4 border-dashed border-[#FFD700]/60"
                style={{
                  boxShadow: "0 0 30px rgba(255, 215, 0, 0.3), inset 0 0 30px rgba(255, 215, 0, 0.1)"
                }}
              />
              
              {/* Middle Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border-2 border-[#FF9933]/80"
              />
              
              {/* Inner Rotating Element */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 rounded-full"
                style={{
                  background: "linear-gradient(135deg, rgba(255, 153, 51, 0.3) 0%, rgba(255, 215, 0, 0.3) 100%)",
                  boxShadow: "0 0 20px rgba(255, 153, 51, 0.4)"
                }}
              >
                {/* Diya/Flame Shape */}
                <svg viewBox="0 0 100 100" className="absolute inset-2">
                  <motion.path
                    d="M50 10 C30 30 25 50 50 90 C75 50 70 30 50 10"
                    fill="url(#flameGradient)"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [1, 0.8, 1]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <defs>
                    <linearGradient id="flameGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#FF6B00" />
                      <stop offset="50%" stopColor="#FF9933" />
                      <stop offset="100%" stopColor="#FFD700" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>

              {/* Center Om Symbol */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="text-4xl md:text-5xl font-bold text-[#FFD700] drop-shadow-lg" style={{ textShadow: "0 0 20px rgba(255, 215, 0, 0.8)" }}>
                  ॐ
                </span>
              </motion.div>

              {/* Floating Particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-[#FFD700]"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${i * 45}deg) translateY(-60px)`,
                  }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            {/* Loading Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-center"
            >
              <motion.h2
                className="text-xl md:text-2xl font-bold text-white"
                style={{ fontFamily: "var(--font-playfair), serif" }}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Madhuram Sweets
              </motion.h2>
              <motion.p
                className="text-[#FFD700]/80 text-sm mt-2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              >
                Loading...
              </motion.p>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              className="mt-6 w-48 h-1 bg-white/20 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-[#FFD700] via-[#FF9933] to-[#FFD700]"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
