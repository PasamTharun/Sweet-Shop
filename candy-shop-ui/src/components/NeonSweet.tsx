import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import {useSweets} from '../hooks/useSweets';

interface SweetProps {
  sweet: {
    id: number;
    name: string;
    category: string;
    price: number;
    quantity: number;
  };
}

export const NeonSweet = ({ sweet }: SweetProps) => {
  const { purchaseSweet } = useSweets();
  const isOutOfStock = sweet.quantity === 0;
  const stockPercent = Math.min((sweet.quantity / 20) * 100, 100);

  const getCandyEmoji = () => {
    switch (sweet.category.toLowerCase()) {
      case 'chocolate': return '🍫';
      case 'gummy': return '🍬';
      case 'lollipop': return '🍭';
      case 'candy': return '🍭';
      default: return '🍬';
    }
  };

  const handlePurchase = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isOutOfStock) {
      // ✅ FIXED: purchaseSweet.mutate({ sweetId: sweet.id })
      purchaseSweet.mutate({ 
        sweetId: sweet.id,
        quantity: 1 
      });
    }
  };

  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.02 }}
      className="group relative w-full max-w-sm mx-auto p-1 rounded-3xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-neon hover:shadow-pink-500/50 transition-all duration-500 overflow-hidden cursor-pointer"
      onClick={handlePurchase}
    >
      {/* Neon Glow Ring */}
      <motion.div
        className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Sweet Image */}
      <div className="relative h-52 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-2xl overflow-hidden flex items-center justify-center group-hover:bg-indigo-900/30 transition-all">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="text-7xl z-10 drop-shadow-neon"
        >
          {getCandyEmoji()}
        </motion.div>
        
        {/* Stock Badge */}
        <motion.div
          className={`absolute top-4 right-4 p-3 rounded-2xl shadow-lg text-xs font-bold ${
            isOutOfStock 
              ? 'bg-red-500/90 text-white' 
              : stockPercent > 50 ? 'bg-emerald-500/90 text-white' : 'bg-amber-500/90 text-white'
          }`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {isOutOfStock ? '✖️' : stockPercent > 50 ? '🔥' : '⚡'}
          <div>{sweet.quantity}</div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-8 space-y-4 relative z-10">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent line-clamp-1">
            {sweet.name}
          </h3>
          <div className="flex items-center space-x-2 text-sm opacity-80">
            <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse" />
            <span className="capitalize font-medium tracking-wide">{sweet.category}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-3xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text tracking-tight">
            ${sweet.price.toFixed(2)}
          </div>
          <div className="flex items-center space-x-1 text-yellow-400">
            <Star fill="currentColor" size={20} />
            <span className="font-bold text-sm">4.9</span>
          </div>
        </div>

        {/* Stock Bar */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-white/80 font-mono">
            <span>Stock: {sweet.quantity}</span>
            <span className="text-xs opacity-70">/{20} max</span>
          </div>
          <div className="w-full bg-white/20 rounded-2xl h-4 overflow-hidden backdrop-blur-sm">
            <motion.div
              className={`h-4 rounded-2xl shadow-neon-sm flex items-center bg-gradient-to-r ${
                isOutOfStock 
                  ? 'from-red-400 to-red-600' 
                  : stockPercent > 50 ? 'from-emerald-400 to-emerald-600' : 'from-amber-400 to-orange-500'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${stockPercent}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <span className="ml-2 text-xs font-bold text-white drop-shadow-sm">
                {Math.round(stockPercent)}%
              </span>
            </motion.div>
          </div>
        </div>

        {/* Purchase Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isOutOfStock}
          className={`
            w-full py-5 px-8 rounded-2xl font-bold text-lg flex items-center justify-center space-x-3 shadow-2xl border-4 transition-all duration-300 backdrop-blur-md
            ${isOutOfStock 
              ? 'bg-gradient-to-r from-gray-800/50 to-gray-900/50 text-gray-400 border-gray-600/50 cursor-not-allowed shadow-none hover:scale-100' 
              : 'bg-gradient-to-r from-yellow-400/90 via-pink-400/90 to-purple-400/90 text-black border-yellow-400/50 shadow-neon-glow hover:from-yellow-500 hover:to-purple-500 hover:shadow-neon-glow-lg active:scale-95'
            }
          `}
        >
          <ShoppingCart size={24} className={isOutOfStock ? 'text-gray-500' : 'text-black'} />
          <span className="tracking-wide">
            {isOutOfStock ? '🪐 Out of Stock' : `Buy Now $${sweet.price.toFixed(1)}`}
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
};
