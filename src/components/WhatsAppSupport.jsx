import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppSupport() {
  const [showTooltip, setShowTooltip] = useState(false);
  const whatsappNumber = "919348083401"; // Replace with your actual WhatsApp number
  const defaultMessage = "Hi! I need help with the AI Resume Builder.";

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 10, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full right-0 mb-4 bg-white dark:bg-slate-800 px-4 py-3 rounded-xl shadow-2xl border-2 border-green-200 dark:border-green-700"
          >
            <div className="relative">
              <p className="text-sm font-semibold text-gray-800 dark:text-white whitespace-nowrap">
                Help & Support
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                Chat with us on WhatsApp
              </p>
              {/* Arrow pointer */}
              <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white dark:bg-slate-800 border-r-2 border-b-2 border-green-200 dark:border-green-700 transform rotate-45"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="relative w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full shadow-2xl flex items-center justify-center group overflow-hidden"
      >
        {/* Animated background circles */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-green-400 rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute inset-0 bg-green-300 rounded-full"
        />

        {/* WhatsApp Icon */}
        <FaWhatsapp className="relative text-white text-3xl z-10 group-hover:scale-110 transition-transform duration-200" />

        {/* Notification dot */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
        />
      </motion.button>
    </div>
  );
}
