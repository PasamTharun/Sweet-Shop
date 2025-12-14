import { motion } from 'framer-motion';
import { ShoppingCart, PackageCheck } from 'lucide-react';
import { ShopItem } from '../hooks/useShop';
import { useShop } from '../hooks/useShop';

interface PurchaseButtonProps {
  item: ShopItem;
}

export const PurchaseButton = ({ item }: PurchaseButtonProps) => {
  const { buyItem } = useShop();
  const isOutOfStock = item.stock_count === 0;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => buyItem(item.id)}
      disabled={isOutOfStock}
      className={`
        w-full py-4 px-6 rounded-2xl font-bold text-lg flex items-center justify-center space-x-2
        ${isOutOfStock 
          ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-gray-200 cursor-not-allowed' 
          : 'candy-button shadow-2xl hover:shadow-candy-pink/50'
        }
      `}
    >
      {isOutOfStock ? (
        <>
          <PackageCheck size={22} />
          <span>Sold Out</span>
        </>
      ) : (
        <>
          <ShoppingCart size={22} />
          <span>Buy Now (${item.unit_price})</span>
        </>
      )}
    </motion.button>
  );
};
