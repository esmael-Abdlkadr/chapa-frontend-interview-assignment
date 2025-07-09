import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Features", href: "#features" },
    { label: "How it Works", href: "#how-it-works" },
    { label: "Services", href: "#services" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <nav className="relative z-50 bg-white/80 backdrop-blur-sm shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src="/logo.jpeg"
              alt="Chapa Logo"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-xl font-bold text-gray-900">Chapa</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-600 hover:text-[#7DC400] font-medium transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => navigate("/auth/login")}
              className="text-gray-600 hover:text-[#7DC400] font-medium transition-colors duration-200"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/auth/register")}
              className="bg-[#7DC400] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#6BB000] transition-colors duration-200"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 py-4"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-600 hover:text-[#7DC400] font-medium transition-colors duration-200 px-2"
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    navigate("/auth/login");
                    setIsMenuOpen(false);
                  }}
                  className="text-left text-gray-600 hover:text-[#7DC400] font-medium transition-colors duration-200 px-2"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    navigate("/auth/register");
                    setIsMenuOpen(false);
                  }}
                  className="bg-[#7DC400] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#6BB000] transition-colors duration-200 mx-2"
                >
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
