import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WorkspaceLoader({ isVisible, message = "Preparing your workspace..." }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-50"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center justify-center"
          >
            {/* Animated Logo Container */}
            <div className="relative w-24 h-24 flex items-center justify-center mb-8">
              {/* Subtle Background Pulse */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-sky-100 rounded-3xl blur-xl"
              />
              
              {/* Crisp App Logo Box */}
              <motion.div
                className="relative z-10 w-20 h-20 bg-white rounded-[1.5rem] shadow-sm border border-slate-100 flex items-center justify-center overflow-hidden"
              >
                {/* Smooth Spinner inside Logo */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 rounded-full border-[3px] border-slate-100 border-t-sky-500"
                />
              </motion.div>
            </div>

            {/* Typography Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-2">Vertex Builder</h2>
              <div className="flex items-center justify-center gap-1.5 text-sm font-medium text-slate-500">
                <span>{message}</span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ...
                </motion.span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
