import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowLeft, Eye, EyeOff, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { GalaxyNav } from '../components/GalaxyNav';
import { useAuth } from '../hooks/useAuth';

export const Register = () => {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    setLoading(true);
    const success = await register(formData.email, formData.password);
    setLoading(false);
    if (success) navigate('/');
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <GalaxyNav />
      <div className="min-h-screen flex items-center justify-center p-4 pt-28 bg-gradient-to-br from-candy-mint via-pink-100 to-candy-peach">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="glass-card w-full max-w-md p-10 mx-auto"
        >
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-candy-purple transition-colors mb-8 group"
          >
            <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Kingdom</span>
          </Link>
          
          <div className="text-center mb-10">
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-7xl mx-auto mb-6"
            >
              🍬
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent mb-4">
              Join the Kingdom
            </h1>
            <p className="text-gray-600 text-lg">Create your candy account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full pl-12 pr-4 py-5 bg-white/60 border border-white/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-candy-pink/30 focus:border-transparent transition-all text-lg placeholder-gray-400"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password (8+ characters)"
                className="w-full pl-12 pr-12 py-5 bg-white/60 border border-white/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-candy-purple/30 focus:border-transparent transition-all text-lg placeholder-gray-400"
                value={formData.password}
                onChange={(e) => updateFormData('password', e.target.value)}
                required
                minLength={8}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-candy-purple transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                className="w-full pl-12 pr-12 py-5 bg-white/60 border border-white/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-candy-peach/30 focus:border-transparent transition-all text-lg placeholder-gray-400"
                value={formData.confirmPassword}
                onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-candy-peach transition-colors"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full candy-button text-lg py-6 shadow-2xl bg-gradient-to-r from-candy-mint to-candy-peach"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </div>
              ) : (
                'Create Account 🍭'
              )}
            </motion.button>
          </form>

          <div className="text-center mt-10 pt-8 border-t border-white/30">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="font-bold text-candy-purple hover:text-candy-pink transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};
