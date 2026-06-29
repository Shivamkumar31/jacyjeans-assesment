'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mic, FormInput, Sparkles } from 'lucide-react';

export default function WelcomeScreen() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-2xl w-full">
        {/* Logo/Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <motion.h1
            className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            👖
          </motion.h1>
          <h1 className="text-5xl font-bold text-white mb-2">Jackie Jeans</h1>
          <p className="text-xl text-white/70">Find Your Perfect Fit</p>
        </motion.div>

        {/* Welcome Message */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-3xl p-8 mb-12 shadow-2xl"
        >
          <p className="text-lg text-white/90 text-center leading-relaxed">
            Welcome! We're here to help you find the perfect jeans based on your unique measurements and style preferences.
          </p>
        </motion.div>

        {/* Choose Method */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-12">Choose Your Way</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Manual Option */}
            <Link href="/welcome/manual">
              <motion.div
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md border border-white/20 rounded-3xl p-8 cursor-pointer hover:border-blue-400/50 hover:shadow-2xl transition-all h-full group"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="mb-6"
                >
                  <FormInput className="w-16 h-16 mx-auto text-blue-400 group-hover:text-blue-300 transition-colors" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-3">Manual Quiz</h3>
                <p className="text-white/70 mb-6">
                  Answer questions with intuitive selections. Take your time and adjust as needed.
                </p>
                <div className="inline-block px-6 py-2 bg-blue-600/50 rounded-full text-white/80 text-sm font-semibold">
                  Forms & Dropdowns
                </div>
              </motion.div>
            </Link>

            {/* Voice Option */}
            <Link href="/welcome/voice">
              <motion.div
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-md border border-purple-400/50 rounded-3xl p-8 cursor-pointer hover:border-purple-300/50 hover:shadow-2xl transition-all h-full group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="mb-6"
                  >
                    <Mic className="w-16 h-16 mx-auto text-purple-300 group-hover:text-purple-200 transition-colors" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-3">AI Voice Quiz ✨</h3>
                  <p className="text-white/70 mb-6">
                    Talk to your personal denim stylist. A smooth, natural conversation.
                  </p>
                  <div className="flex items-center gap-2 justify-center">
                    <Sparkles size={16} className="text-yellow-400" />
                    <span className="inline-block px-6 py-2 bg-purple-600/50 rounded-full text-white/80 text-sm font-semibold">
                      Recommended
                    </span>
                    <Sparkles size={16} className="text-yellow-400" />
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 mb-12">
          {[
            { icon: '⚡', text: '2-3 min' },
            { icon: '✅', text: '10 questions' },
            { icon: '🎯', text: 'Smart fit' },
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <p className="text-3xl mb-2">{item.icon}</p>
              <p className="text-white/70 text-sm">{item.text}</p>
            </div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.p variants={itemVariants} className="text-center text-sm text-white/50">
          Both methods ask the same questions • Your profile helps us find the perfect fit
        </motion.p>
      </div>
    </motion.div>
  );
}
