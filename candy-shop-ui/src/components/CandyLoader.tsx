import { motion } from 'framer-motion';

export const CandyLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      className="w-24 h-24 border-4 border-candy-pink/30 border-t-candy-pink rounded-full"
    />
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="text-4xl animate-bounce-slow"
    >
      🍭
    </motion.div>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-xl text-candy-purple font-medium"
    >
      Loading sweet treats...
    </motion.p>
  </div>
);
