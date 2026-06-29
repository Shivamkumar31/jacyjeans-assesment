import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface QuestionCardProps {
  label: string;
  children: ReactNode;
  optional?: boolean;
}

export default function QuestionCard({ label, children, optional }: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {label}
        </h2>
        {optional && (
          <p className="text-sm text-gray-500 mb-6">Optional</p>
        )}
        <div className="mt-8">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
