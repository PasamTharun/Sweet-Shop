import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, Menu, Star } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';

export const GalaxyNav = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stars, setStars] = useState(50);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-6xl mx-auto px-8 py-6 rounded-3xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-indigo-500/20 backdrop-blur-3xl border border-white/30 shadow-2xl"
    >
      {/* Animated Stars Background */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        {Array.from({ length: stars }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
            animate={{ 
              scale: [0, 1, 0], 
              opacity: [0.3, 1, 0.3],
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 3 + Math.random() * 2, 
              repeat: Infinity, 
              repeatType: 'loop' 
            }}
          />
        ))}
      </div>

      <div className="relative flex items-center justify-between">
        <Link to="/" className="group">
          <div className="flex items-center space-x-3">
            <motion.div 
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity }}
              className="text-4xl group-hover:text-yellow-400 transition-colors"
            >
              🌌
            </motion.div>
            <div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
                Cosmic Candy
              </h1>
              <p className="text-xs text-white/60 font-medium tracking-wider">Galaxy Edition</p>
            </div>
          </div>
        </Link>

        <div className="flex items-center space-x-4">
          {user ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { logout(); navigate('/login'); }}
              className="flex items-center space-x-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 hover:bg-white/30 transition-all hover:shadow-neon"
            >
              <User size={20} />
              <span className="font-semibold text-white">Orbit</span>
              <LogOut size={18} />
            </motion.button>
          ) : (
            <>
              <Link 
                to="/login" 
                className="px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-blue-500/80 to-purple-500/80 backdrop-blur-sm rounded-2xl hover:from-blue-400 hover:to-purple-400 transition-all border border-white/20 hover:shadow-neon"
              >
                Portal
              </Link>
              <Link 
                to="/register"
                className="px-8 py-3 text-sm font-bold bg-gradient-to-r from-yellow-400 to-pink-400 text-black rounded-2xl shadow-neon hover:shadow-neon-glow hover:-translate-y-1 transition-all"
              >
                New Astronaut
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};
