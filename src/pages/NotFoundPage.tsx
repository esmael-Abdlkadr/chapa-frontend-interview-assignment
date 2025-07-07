import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Search,
  HelpCircle,
  Coffee,
  ArrowLeft,
  RefreshCw,
  Wifi,
  Frown,
  Smile,
  Wallet,
} from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [isFlipping, setIsFlipping] = useState(false);
  const [showEmoji, setShowEmoji] = useState("frown");

  // Animation for the coin flipping effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsFlipping(true);
        setTimeout(() => {
          setShowEmoji((prev) => (prev === "frown" ? "smile" : "frown"));
          setIsFlipping(false);
        }, 500);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Generate a random suggestion
  const suggestions = [
    "home page",
    "dashboard",
    "send money",
    "wallet",
    "transactions",
    "settings",
  ];

  const randomSuggestion =
    suggestions[Math.floor(Math.random() * suggestions.length)];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        {/* Main Content Container */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-[#7DC400]"></div>
          <div className="absolute top-0 left-0 w-1 h-full bg-[#7DC400]"></div>
          <div className="absolute bottom-0 right-0 w-full h-1 bg-[#7DC400]"></div>
          <div className="absolute top-0 right-0 w-1 h-full bg-[#7DC400]"></div>

          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center mb-8">
              {/* 404 Text */}
              <div className="relative md:w-1/2 mb-8 md:mb-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-9xl md:text-[10rem] font-bold text-gray-100 z-0 select-none"
                >
                  404
                </motion.div>

                <motion.div
                  className="absolute inset-0 flex items-center justify-center z-10"
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: isFlipping ? 180 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative w-24 h-24 bg-[#7DC400] rounded-full flex items-center justify-center shadow-lg">
                    {showEmoji === "frown" ? (
                      <Frown className="w-12 h-12 text-white" />
                    ) : (
                      <Smile className="w-12 h-12 text-white" />
                    )}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow">
                      <div className="w-4 h-4 bg-[#7DC400] rounded-full"></div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Text Content */}
              <div className="md:w-1/2 md:pl-8">
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                >
                  Oops! Page Not Found
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-600 mb-6"
                >
                  We couldn't find the page you're looking for. It might have
                  been moved, deleted, or never existed in the first place.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <button
                    onClick={() => navigate("/")}
                    className="flex items-center justify-center px-6 py-3 bg-[#7DC400] text-white rounded-xl font-medium hover:bg-green-600 transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    <Home className="w-5 h-5 mr-2" />
                    Go Home
                  </button>

                  <button
                    onClick={() => navigate(-1)}
                    className="flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Go Back
                  </button>
                </motion.div>
              </div>
            </div>

            {/* Search Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-gray-50 rounded-2xl p-6 mt-6"
            >
              <div className="text-sm font-medium text-gray-700 mb-3">
                Try searching for what you need:
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={`Try searching for "${randomSuggestion}"...`}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7DC400] focus:border-transparent"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#7DC400] text-white p-1 rounded-lg hover:bg-green-600 transition-colors">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-8 bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="text-sm font-medium text-gray-700 mb-4">
            Popular Destinations:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {["Dashboard", "Send Money", "Wallet", "Help Center"].map(
              (item, index) => (
                <motion.button
                  key={item}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 bg-gray-50 hover:bg-gray-100 rounded-xl text-center transition-colors flex flex-col items-center justify-center"
                  onClick={() =>
                    navigate(`/${item.toLowerCase().replace(" ", "-")}`)
                  }
                >
                  {index === 0 && (
                    <Home className="w-6 h-6 text-[#7DC400] mb-2" />
                  )}
                  {index === 1 && (
                    <RefreshCw className="w-6 h-6 text-[#7DC400] mb-2" />
                  )}
                  {index === 2 && (
                    <Wallet className="w-6 h-6 text-[#7DC400] mb-2" />
                  )}
                  {index === 3 && (
                    <HelpCircle className="w-6 h-6 text-[#7DC400] mb-2" />
                  )}
                  <span className="text-sm font-medium text-gray-900">
                    {item}
                  </span>
                </motion.button>
              )
            )}
          </div>
        </motion.div>

        {/* Connection Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-6 flex justify-between items-center text-sm text-gray-500"
        >
          <div className="flex items-center">
            <Wifi className="w-4 h-4 mr-2 text-[#7DC400]" />
            <span>You're connected to Chapa</span>
          </div>
          <div className="flex items-center">
            <Coffee className="w-4 h-4 mr-2" />
            <span>Need a break? We'll be here when you return</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
