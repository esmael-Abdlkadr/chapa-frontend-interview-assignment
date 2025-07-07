import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/logo.jpeg";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      quote:
        "Chapa has revolutionized our payment processing. The speed and security are unmatched!",
      author: "Abebe Kebede",
      role: "CEO, TechCorp Ethiopia",
      avatar: "👨‍💼",
    },
    {
      quote:
        "The seamless integration saved us months of development time. Exceptional platform!",
      author: "Sarah Johnson",
      role: "CTO, PayFlow Solutions",
      avatar: "👩‍💻",
    },
    {
      quote:
        "Outstanding customer support and rock-solid reliability. Highly recommended!",
      author: "Michael Chen",
      role: "Founder, EcommercePlus",
      avatar: "👨‍🚀",
    },
  ];

  const features = [
    {
      icon: "🔒",
      title: "Bank-Level Security",
      description:
        "Advanced encryption and fraud detection protect every transaction",
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description:
        "Process payments in milliseconds with our optimized infrastructure",
    },
    {
      icon: "🌍",
      title: "Global Reach",
      description: "Accept payments from anywhere in Africa and beyond",
    },
    {
      icon: "📱",
      title: "Mobile First",
      description: "Seamless experience across all devices and platforms",
    },
    {
      icon: "🎯",
      title: "Smart Analytics",
      description: "Detailed insights and reporting to grow your business",
    },
    {
      icon: "🔧",
      title: "Easy Integration",
      description: "Simple APIs and SDKs for quick implementation",
    },
  ];

  const services = [
    {
      title: "Payment Processing",
      description:
        "Accept payments via mobile money, cards, and bank transfers",
      icon: "💳",
    },
    {
      title: "Merchant Solutions",
      description: "Complete toolkit for businesses of all sizes",
      icon: "🏪",
    },
    {
      title: "API Integration",
      description: "Robust APIs for custom implementations",
      icon: "🔌",
    },
    {
      title: "Multi-Currency",
      description: "Support for multiple African currencies",
      icon: "💰",
    },
  ];

  const stats = [
    { number: "1M+", label: "Transactions Processed" },
    { number: "10K+", label: "Active Merchants" },
    { number: "99.9%", label: "Uptime Guarantee" },
    { number: "24/7", label: "Customer Support" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#7DC400] rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-blue-500 rounded-full opacity-10 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-purple-500 rounded-full opacity-10 animate-ping"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 bg-white/80 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img
                src="/logo.jpeg"
                alt="Chapa Logo"
                className="w-10 h-10 rounded-full"
              />
              <span className="text-2xl font-bold text-gray-900">Chapa</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a
                href="#features"
                className="text-gray-700 hover:text-[#7DC400] transition-colors"
              >
                Features
              </a>
              <a
                href="#services"
                className="text-gray-700 hover:text-[#7DC400] transition-colors"
              >
                Services
              </a>
              <a
                href="#testimonials"
                className="text-gray-700 hover:text-[#7DC400] transition-colors"
              >
                Testimonials
              </a>
            </div>
            <button
              onClick={() => navigate("/auth/login")}
              className="bg-[#7DC400] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#6BB000] transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div
          className={`text-center max-w-4xl mx-auto transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="mb-8 relative">
            <img
              src="/logo.jpeg"
              alt="Chapa Logo"
              className="w-32 h-32 mx-auto rounded-full shadow-2xl animate-pulse"
            />
            <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full bg-[#7DC400] opacity-20 animate-ping"></div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Payment Solutions
            <span className="bg-gradient-to-r from-[#7DC400] to-green-600 bg-clip-text text-transparent block">
              Reimagined
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience the future of digital payments in Africa. Fast, secure,
            and incredibly simple.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/auth/login")}
              className="bg-[#7DC400] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#6BB000] transform hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Start Your Journey
            </button>
            <button className="border-2 border-[#7DC400] text-[#7DC400] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#7DC400] hover:text-white transform hover:scale-105 transition-all duration-300">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Floating Cards Animation */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-16 h-16 bg-white rounded-lg shadow-lg opacity-60 animate-float`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#7DC400] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center transform hover:scale-110 transition-transform duration-300"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-[#7DC400]">Chapa</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're not just another payment processor. We're your partner in
              growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-[#7DC400]">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive payment solutions tailored for African businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-start space-x-6"
              >
                <div className="text-4xl">{service.icon}</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-lg">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our <span className="text-[#7DC400]">Customers</span> Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied customers across Africa
            </p>
          </div>

          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
              <div className="text-6xl mb-6">
                {testimonials[currentTestimonial].avatar}
              </div>
              <blockquote className="text-2xl text-gray-700 mb-8 italic">
                "{testimonials[currentTestimonial].quote}"
              </blockquote>
              <div className="font-bold text-gray-900 text-lg">
                {testimonials[currentTestimonial].author}
              </div>
              <div className="text-[#7DC400] font-semibold">
                {testimonials[currentTestimonial].role}
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? "bg-[#7DC400] w-8"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#7DC400] to-green-600 text-white px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of businesses already using Chapa to grow their
            revenue
          </p>
          <button
            onClick={() => navigate("/auth/login")}
            className="bg-white text-[#7DC400] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl"
          >
            Get Started Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src="/logo.jpeg"
                  alt="Chapa Logo"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-xl font-bold">Chapa</span>
              </div>
              <p className="text-gray-400">
                Leading payment solutions for African businesses
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Careers
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Blog
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Help Center
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  API Docs
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Security
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2025 Chapa Financial Technologies. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
