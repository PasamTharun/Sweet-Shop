import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ShoppingBag } from 'lucide-react';
import { NeonSweet } from '../components/NeonSweet';
import { useSweets } from '../hooks/useSweets';

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [priceFilter, setPriceFilter] = useState(10);
  
  const { sweets, isLoading } = useSweets();

  const filteredSweets = sweets.data?.filter(sweet => 
    sweet.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter === 'All' || sweet.category === categoryFilter) &&
    sweet.price <= priceFilter
  ) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header - EXACT screenshot */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Sweet Shop
            </h1>
            <p className="text-gray-600 text-lg">Discover our sweet collection</p>
          </div>
          <div className="p-3 bg-white/50 backdrop-blur-sm rounded-2xl border border-purple-200">
            <ShoppingBag className="w-6 h-6 text-purple-600" />
          </div>
        </div>

        {/* Filters - EXACT 3-column layout */}
        <div className="glass-card p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            {/* Search */}
            <div className="md:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for sweets, treats..."
                className="glass-input pl-12 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters Column */}
            <div className="grid grid-cols-2 gap-4">
              {/* Category Dropdown */}
              <select className="glass-input" defaultValue="All">
                <option>All Categories</option>
                <option>Chocolate</option>
                <option>Gummy</option>
                <option>Lollipop</option>
              </select>

              {/* Price Slider */}
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(parseFloat(e.target.value))}
                  className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <div className="absolute -bottom-8 right-0 text-sm font-mono text-gray-600">
                  Max: ${priceFilter}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sweets Grid - EXACT 4 columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {isLoading ? (
            Array(8).fill(0).map((_, i) => (
              <div key={i} className="sweet-card animate-pulse">
                <div className="h-32 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-12 bg-gray-200 rounded-xl"></div>
              </div>
            ))
          ) : filteredSweets.length === 0 ? (
            <div className="col-span-full text-center py-24">
              <div className="text-6xl mb-6">🍭</div>
              <p className="text-2xl text-gray-600 font-semibold mb-4">No sweets found</p>
              <button className="btn-primary px-8 py-3">Clear Filters</button>
            </div>
          ) : (
            filteredSweets.map((sweet: any, index: number) => (
              <motion.div
                key={sweet.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <NeonSweet sweet={sweet} />
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Footer - EXACT screenshot */}
      <div className="mt-24 text-center text-xs text-gray-500 pt-12 border-t border-purple-200">
        © 2025 Sweet Shop. Crafted with love ❤️
      </div>
    </div>
  );
}
