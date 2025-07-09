import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Shield, Zap, Globe, TrendingUp } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 overflow-hidden">
      {/* Professional Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%237DC400' fill-opacity='0.4'%3E%3Cpath d='M0 0h50v50H0z' stroke='%23000' stroke-width='0.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#7DC400]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-green-50 border border-green-200 rounded-full px-4 py-2"
            >
              <Shield className="w-4 h-4 text-[#7DC400]" />
              <span className="text-sm font-medium text-green-800">Trusted by 50K+ businesses</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Accept payments with
                <span className="block text-[#7DC400]">Chapa</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                Ethiopia's most trusted payment gateway. Fast, secure, and reliable payment processing for your business.
              </p>
            </motion.div>

            {/* Key Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: Zap, text: "Instant Processing" },
                { icon: Shield, text: "Bank-Level Security" },
                { icon: Globe, text: "Multiple Channels" },
                { icon: TrendingUp, text: "Real-time Analytics" }
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#7DC400]/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-4 h-4 text-[#7DC400]" />
                  </div>
                  <span className="text-gray-700 font-medium">{feature.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                onClick={() => navigate("/auth/register")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#7DC400] hover:bg-[#6BB000] text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-gray-300 hover:border-[#7DC400] text-gray-700 hover:text-[#7DC400] px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
              >
                View Demo
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-200"
            >
              {[
                { value: "30B+", label: "ETB Processed" },
                { value: "100M+", label: "Transactions" },
                { value: "480M+", label: "API Calls" },
                { value: "50K+", label: "Users" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Main Hero Image */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="/hero.jpg"
                alt="Chapa Payment Solutions"
                className="w-full h-auto object-cover"
              />
              
              {/* Overlay with Chapa branding */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Chapa Logo Overlay */}
              <div className="absolute bottom-6 left-6 flex items-center space-x-3">
                <img
                  src="/logo.jpeg"
                  alt="Chapa Logo"
                  className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
                />
                <div className="text-white">
                  <h3 className="text-xl font-bold">Chapa</h3>
                  <p className="text-sm opacity-90">Payment Gateway</p>
                </div>
              </div>
            </div>

            {/* Floating Stats Cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-white text-gray-900 p-4 rounded-xl shadow-lg border border-gray-100"
            >
              <div className="text-sm text-gray-600">Live Transactions</div>
              <div className="text-lg font-bold text-[#7DC400]">30B+ ETB</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 -left-4 bg-white text-gray-900 p-4 rounded-xl shadow-lg border border-gray-100"
            >
              <div className="text-sm text-gray-600">Success Rate</div>
              <div className="text-lg font-bold text-green-600">99.8%</div>
            </motion.div>

            {/* Trust Badge */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 2 }}
              className="absolute top-4 left-4 bg-[#7DC400] text-white px-3 py-2 rounded-full text-sm font-semibold shadow-lg"
            >
              ✓ Trusted & Secure
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
