import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = ((current + 1) / total) * 100;

  return (
    <div className="w-full px-6 py-6 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-white/80">
          Question {current + 1} of {total}
        </span>
        <span className="text-sm font-bold text-white text-xl">{Math.round(percentage)}%</span>
      </div>
      <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden border border-white/20">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
