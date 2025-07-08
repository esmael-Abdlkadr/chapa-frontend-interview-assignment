import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FiChevronRight, FiChevronLeft, FiCheck, FiPhone, FiMail, FiMapPin } from "react-icons/fi";

const LandingPage= () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

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
        "Chapa has completely revolutionized our payment system. Their speed and security are unmatched in the Ethiopian market!",
      author: "Abebe Kebede",
      role: "CEO, Getch Technology",
      company: "Getch Technology",
      avatar: "/avatars/abebe.png",
    },
    {
      quote:
        "Their seamless integration saved us months of development time. It's an exceptional platform for Ethiopian businesses!",
      author: "Selam Mekonnen",
      role: "CTO, Demaq Ecommerce",
      company: "Demaq Ecommerce",
      avatar: "/avatars/selam.png",
    },
    {
      quote:
        "Their customer support team is excellent! Whenever we face an issue, it takes just minutes to get support. Perfect for small businesses.",
      author: "Fikre Tadesse",
      role: "Owner, Abeba Cafe",
      company: "Abeba Cafe",
      avatar: "/avatars/fikre.png",
    },
    {
      quote: "Of all payment options, Chapa is the only reliable service. Zero issues since we integrated it last year!",
      author: "Birhane Girma",
      role: "COO, Mesk Amazing Marketing",
      company: "Mesk Marketing",
      avatar: "/avatars/birhane.png",
    },
  ];

  const features = [
    {
      icon: "🔒",
      title: "Bank-Level Security",
      description:
        "Advanced encryption and fraud detection technology protects every transaction",
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description:
        "Process payments in milliseconds with our optimized infrastructure",
    },
    {
      icon: "🌍",
      title: "Pan-African Reach",
      description: "Accept payments from across Ethiopia and beyond Africa",
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
      cta: "View Details",
    },
    {
      title: "Merchant Solutions",
      description: "Complete toolkit for businesses of all sizes",
      icon: "🏪",
      cta: "Grow Your Business",
    },
    {
      title: "API Integration",
      description: "Robust APIs for custom implementations",
      icon: "🔌",
      cta: "View API Docs",
    },
    {
      title: "Multi-Currency",
      description: "Support for multiple African currencies",
      icon: "💰",
      cta: "Supported Currencies",
    },
  ];

  const stats = [
    { number: "5M+", label: "Transactions Processed" },
    { number: "25K+", label: "Active Merchants" },
    { number: "99.9%", label: "Uptime Guarantee" },
    { number: "24/7", label: "Customer Support" },
    { number: "7+", label: "Payment Methods" },
    { number: "15+", label: "Partner Banks" },
  ];

  // Ethiopian businesses using Chapa
  const clients = [
    { name: "Desie Ecommerce", logo: "/client-logos/desie.png" },
    { name: "Amazone Acha", logo: "/client-logos/amazone-acha.png" },
    { name: "Tena Pharmacy", logo: "/client-logos/tena.png" },
    { name: "Zemen Digital", logo: "/client-logos/zemen.png" },
    { name: "Arat Kilo Mart", logo: "/client-logos/aratkilo.png" },
    { name: "Gobez Travel", logo: "/client-logos/gobez.png" },
    { name: "Henok Insurance", logo: "/client-logos/henok.png" },
    { name: "Semayehu Supermarket", logo: "/client-logos/semayehu.png" },
  ];

  const faqs = [
    {
      question: "What do I need to use Chapa?",
      answer: "To register your business, you'll only need your business name, business license, bank information, and verification documents. Our process is simple and fast, with most businesses getting started within 24 hours.",
    },
    {
      question: "Which payment methods does Chapa support?",
      answer: "We currently support TeleBirr, CBE Birr, Amole, HelloCash, Walta, Visa, Mastercard, American Express, and bank transfers across Ethiopia's major banks.",
    },
    {
      question: "How much do you charge per transaction?",
      answer: "The amount collected varies depending on transaction volume and type. In general, we collect between 1% and 3.5% fee. Visit our pricing page for detailed rates or contact our customer service for assistance.",
    },
    {
      question: "How do I create checkout pages for mobile payments?",
      answer: "From your Chapa dashboard, go to 'Payments' > 'Create Checkout'. Then enter the product name, price, and purchase description. A payment checkout page ready for online and mobile use will be created instantly.",
    },
    {
      question: "How do I integrate my own website with Chapa services?",
      answer: "We provide full Dev API access, WordPress plugins, WooCommerce integration, and Shopify integration, to name a few. If you want to use our API, start with our API documentation which provides step-by-step instructions.",
    },
    {
      question: "How long does it take to receive my money?",
      answer: "Payments are deposited into your bank account within 1-3 business days. Our partner banks include CBE, Dashen, Abyssinia, Awash, Birhan, Wegagen and others.",
    },
  ];

  const paymentMethods = [
    { name: "TeleBirr", icon: "/telebirr.webp" },
    { name: "CBE Birr", icon: "/cbe.webp" },
    { name: "Coop", icon: "/coop.webp" },
    { name: "Buna Bank", icon: "/bunna_bank.webp" },
    { name: "BOA", icon: "/boa.webp" },
    { name: "Awash", icon: "/awash_bank.webp" },
    {name:"Wegagen", icon: "/wegagen_bank.webp" },
  ];

  const integrations = [
    { name: "Shopify", icon: "/integration-icons/shopify.png" },
    { name: "WooCommerce", icon: "/integration-icons/woocommerce.png" },
    { name: "Magento", icon: "/integration-icons/magento.png" },
    { name: "React", icon: "/integration-icons/react.png" },
    { name: "WordPress", icon: "/integration-icons/wordpress.png" },
    { name: "Wix", icon: "/integration-icons/wix.png" },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "Free",
      features: [
        "Up to 100,000 Birr monthly transaction",
        "3.5% + 2 Birr per transaction",
        "Basic dashboard access",
        "Basic reports",
        "Email support",
      ],
      popular: false,
    },
    {
      name: "Business",
      price: "1,500 Birr / month",
      features: [
        "Up to 500,000 Birr monthly transaction",
        "2.7% + 2 Birr per transaction",
        "Full dashboard access",
        "Advanced reporting and analytics",
        "Customer support team",
        "Custom receipt templates",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom pricing",
      features: [
        "Unlimited monthly transaction",
        "Custom commission rates",
        "Dedicated account manager",
        "API development support",
        "24/7 support",
        "White-label payment platform co-designed with us",
      ],
      popular: false,
    },
  ];

  const howItWorks = [
    {
      title: "Sign Up",
      description: "Set up your account and verify your information",
      icon: "📝",
    },
    {
      title: "Integrate",
      description: "Integrate the API or use our plugins",
      icon: "🔄",
    },
    {
      title: "Accept Payments",
      description: "Start receiving payments from customers",
      icon: "💰",
    },
    {
      title: "Track",
      description: "Monitor transactions on your dashboard",
      icon: "📊",
    },
    {
      title: "Withdraw",
      description: "Transfer your funds to your bank account",
      icon: "🏦",
    },
  ];
  
  // News highlights about Ethiopia's digital economy
  const news = [
    {
      title: "Ethiopia's Digital Payments Grow by 35%",
      excerpt: "A recent National Bank of Ethiopia report shows digital payment adoption has increased by 35% in the first half of 2025...",
      date: "July 1, 2025",
      image: "/news/digital-payments-growth.jpg",
    },
    {
      title: "Chapa Announces $5M International Investment for Ethiopian SMEs",
      excerpt: "Payment technology firm Chapa has announced a $5 million strategic investment from Aspen Venture Capital...",
      date: "June 20, 2025",
      image: "/news/investment-announcement.jpg",
    },
    {
      title: "Chapa Partners with TeleBirr",
      excerpt: "Two Ethiopian payment providers, Chapa and TeleBirr, have announced a new strategic partnership to expand digital payment adoption...",
      date: "May 15, 2025",
      image: "/news/chapa-telebirr.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#7DC400] rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-blue-500 rounded-full opacity-10 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-purple-500 rounded-full opacity-10 animate-ping"></div>
        <div className="absolute top-1/2 right-1/4 w-36 h-36 bg-yellow-500 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-28 h-28 bg-green-300 rounded-full opacity-10 animate-ping" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 bg-white/80 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <img
                src="/logo.jpeg"
                alt="Chapa Logo"
                className="w-12 h-12 rounded-full border-2 border-[#7DC400]"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-[#7DC400] to-green-600 bg-clip-text text-transparent">Chapa</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a
                href="#features"
                className="text-gray-700 hover:text-[#7DC400] transition-colors font-medium"
              >
                Features
              </a>
              <a
                href="#services"
                className="text-gray-700 hover:text-[#7DC400] transition-colors font-medium"
              >
                Services
              </a>
              <a
                href="#how-it-works"
                className="text-gray-700 hover:text-[#7DC400] transition-colors font-medium"
              >
                How It Works
              </a>
              <a
                href="#pricing"
                className="text-gray-700 hover:text-[#7DC400] transition-colors font-medium"
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="text-gray-700 hover:text-[#7DC400] transition-colors font-medium"
              >
                Testimonials
              </a>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate("/auth/login")}
                className="bg-white text-[#7DC400] px-4 py-2 rounded-full font-semibold border-2 border-[#7DC400] hover:bg-gray-50 transition-colors duration-300"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/auth/register")}
                className="bg-[#7DC400] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#6BB000] transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center px-4">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className={`text-center max-w-5xl mx-auto transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="mb-8 relative">
            <motion.img
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              src="/logo.jpeg"
              alt="Chapa Logo"
              className="w-32 h-32 mx-auto rounded-full shadow-2xl border-4 border-white"
            />
            <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-[#7DC400] to-green-500 opacity-20 animate-pulse"></div>
          </div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Advanced
              <span className="bg-gradient-to-r from-[#7DC400] to-green-600 bg-clip-text text-transparent block my-2">
                Payment Solutions
              </span>
              for Ethiopia
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Experience the future of digital payments in Africa. Fast, secure, and incredibly simple.
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => navigate("/auth/register")}
              className="bg-gradient-to-r from-[#7DC400] to-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-[#6BB000] hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-xl flex items-center justify-center space-x-2 group"
            >
              <span>Start Your Journey</span>
              <FiChevronRight className="group-hover:translate-x-2 transition-transform duration-300" />
            </button>
            <button className="border-2 border-[#7DC400] bg-white text-[#7DC400] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#7DC400] hover:text-white transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
              </svg>
              Watch Demo
            </button>
          </motion.div>
        </motion.div>

        {/* Floating Payment Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() < 0.5 ? -100 : window.innerWidth + 100, 
                y: Math.random() * window.innerHeight,
                rotate: Math.random() * 360
              }}
              animate={{ 
                x: Math.random() < 0.5 ? window.innerWidth + 100 : -100,
                y: Math.random() * window.innerHeight,
                rotate: Math.random() * 360
              }}
              transition={{
                duration: 15 + Math.random() * 20,
                delay: i * 0.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute w-12 h-12 rounded-lg shadow-lg opacity-20 bg-white p-2 flex items-center justify-center"
            >
              <img 
                src={paymentMethods[i % paymentMethods.length].icon} 
                alt={paymentMethods[i % paymentMethods.length].name} 
                className="w-full h-full object-contain" 
              />
            </motion.div>
          ))}
        </div>

      </section>

      {/* Ethiopian Pattern Divider */}
      <div className="relative h-24 overflow-hidden bg-gradient-to-r from-[#7DC400] via-green-500 to-[#7DC400]">
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: "url('/patterns/ethiopian-pattern.svg')", 
          backgroundSize: "200px", 
          backgroundRepeat: "repeat" 
        }}></div>
      </div>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={index}
                className="text-center transform hover:scale-110 transition-transform duration-300 p-6 rounded-xl hover:bg-[#7DC400]/10"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-[#7DC400] to-green-600 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods Section */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Supported <span className="text-[#7DC400]">Payment Methods</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Give your customers all payment options in one platform
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {paymentMethods.map((method, index) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center"
              >
                <img src={method.icon} alt={method.name} className="h-16 mb-4 object-contain" />
                <h3 className="text-lg font-semibold text-gray-900">{method.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-[#7DC400]">How</span> It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Accepting payments for your business has never been this easy
            </p>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#7DC400] to-green-600 transform -translate-y-1/2 hidden md:block"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
              {howItWorks.map((step, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center relative z-10"
                >
                  <div className="text-5xl mb-4 bg-[#7DC400]/10 w-20 h-20 flex items-center justify-center rounded-full mx-auto">
                    {step.icon}
                  </div>
                  <div className="text-2xl font-bold mb-2 text-gray-900">
                    {index + 1}. {step.title}
                  </div>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-[#7DC400]">Chapa</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're not just another payment processor. We're your partner in growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
              </motion.div>
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
              Comprehensive payment solutions tailored for Ethiopian businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <div className="flex items-start space-x-6 mb-6">
                  <div className="text-4xl bg-[#7DC400]/10 p-4 rounded-full">{service.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-lg">{service.description}</p>
                  </div>
                </div>
                <button className="mt-auto self-start text-[#7DC400] font-medium flex items-center hover:underline">
                  {service.cta}
                  <FiChevronRight className="ml-1" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    


   
{/* Pricing Section */}
<section id="pricing" className="relative py-24 px-4 bg-gradient-to-br from-[#e9fbe5] via-[#f5fdf7] to-[#e9fbe5] overflow-hidden">
  {/* Animated background blobs */}
  <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#7DC400]/20 rounded-full blur-3xl animate-pulse z-0"></div>
  <div className="absolute top-1/2 right-0 w-80 h-80 bg-green-400/10 rounded-full blur-2xl animate-ping z-0"></div>
  <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-[#7DC400]/30 rounded-full blur-2xl animate-bounce z-0"></div>

  <div className="relative z-10 max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 drop-shadow-lg">
        <span className="bg-gradient-to-r from-[#7DC400] to-green-600 bg-clip-text text-transparent">Transparent</span> Pricing
      </h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        No hidden fees. No surprises. Just simple, fair pricing for every business size.
      </p>
    </div>

    <div className="flex flex-col md:flex-row gap-12 justify-center items-center">
      {/* Domestic Pricing Plan */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="relative bg-white/70 backdrop-blur-lg shadow-2xl rounded-3xl p-10 w-full max-w-md border-2 border-[#7DC400]/10 hover:scale-105 transition-transform duration-300"
      >
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#7DC400] text-white px-4 py-1 rounded-full shadow-lg text-xs font-bold tracking-widest uppercase">
          Local
        </div>
        <div className="flex items-center justify-center mb-6">
          <svg className="w-12 h-12 text-[#7DC400]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeOpacity="0.2" />
            <path d="M8 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Domestic Transactions</h3>
        <div className="text-4xl font-extrabold text-[#7DC400] mb-4 drop-shadow">2.5% <span className="text-lg font-medium text-gray-500">/ transaction</span></div>
        <ul className="space-y-3 mb-8">
          <li className="flex items-center">
            <span className="inline-block w-6 h-6 mr-2 bg-[#7DC400]/10 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-[#7DC400]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
            </span>
            No setup fees or hidden charges
          </li>
          <li className="flex items-center">
            <span className="inline-block w-6 h-6 mr-2 bg-[#7DC400]/10 rounded-full items-center justify-center">
              <svg className="w-4 h-4 text-[#7DC400]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
            </span>
            Real-time transaction reporting
          </li>
          <li className="flex items-center">
            <span className="inline-block w-6 h-6 mr-2 bg-[#7DC400]/10 rounded-full items-center justify-center">
              <svg className="w-4 h-4 text-[#7DC400]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
            </span>
            Secure payment processing
          </li>
        </ul>
        <button className="w-full py-3 rounded-xl font-bold bg-[#7DC400] text-white hover:bg-[#6BB000] transition-colors duration-300 shadow-lg text-lg">
          Get Started
        </button>
      </motion.div>

      {/* International Pricing Plan */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-10 w-full max-w-md border-2 border-[#7DC400]/20 hover:scale-105 transition-transform duration-300"
      >
        {/* Best Value Badge */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#7DC400] to-green-500 text-white px-6 py-1 rounded-full shadow-xl text-xs font-bold tracking-widest uppercase animate-bounce">
          Best Value
        </div>
        <div className="flex items-center justify-center mb-6">
          <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <rect x="4" y="4" width="16" height="16" rx="4" strokeOpacity="0.2" />
            <path d="M8 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">International Transactions</h3>
        <div className="text-4xl font-extrabold text-green-500 mb-4 drop-shadow">1% <span className="text-lg font-medium text-gray-500">/ transaction</span></div>
        <ul className="space-y-3 mb-8">
          <li className="flex items-center">
            <span className="inline-block w-6 h-6 mr-2 bg-green-500/10 rounded-full items-center justify-center">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
            </span>
            No monthly fees
          </li>
          <li className="flex items-center">
            <span className="inline-block w-6 h-6 mr-2 bg-green-500/10 rounded-full items-center justify-center">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
            </span>
            Hundreds of feature updates each year
          </li>
          <li className="flex items-center">
            <span className="inline-block w-6 h-6 mr-2 bg-green-500/10 rounded-full items-center justify-center">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
            </span>
            Dedicated customer support
          </li>
        </ul>
        <button className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-[#7DC400] to-green-500 text-white hover:from-green-600 hover:to-[#7DC400] transition-colors duration-300 shadow-lg text-lg">
          Get Started
        </button>
      </motion.div>
    </div>
  </div>
</section>

      {/* Testimonials Section with 3D Card Effect */}
      <section id="testimonials" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our <span className="text-[#7DC400]">Customers</span> Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied customers across Ethiopia
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    key={index}
                    className="min-w-full px-4"
                  >
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl p-8 md:p-12 text-center mx-auto max-w-3xl hover:shadow-2xl transition-shadow duration-300 transform perspective-1000">
                      <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden border-4 border-[#7DC400]/20">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <blockquote className="text-2xl text-gray-700 mb-8 italic relative">
                        <span className="text-5xl text-[#7DC400]/20 absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">"</span>
                        {testimonial.quote}
                        <span className="text-5xl text-[#7DC400]/20 absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2">"</span>
                      </blockquote>
                      <div>
                        <div className="font-bold text-gray-900 text-lg">
                          {testimonial.author}
                        </div>
                        <div className="text-[#7DC400] font-semibold">
                          {testimonial.role}
                        </div>
                        <div className="text-sm text-gray-500">{testimonial.company}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setCurrentTestimonial(prev => prev === 0 ? testimonials.length - 1 : prev - 1)}
              className="absolute top-1/2 left-0 -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors duration-300"
            >
              <FiChevronLeft />
            </button>

            <button 
              onClick={() => setCurrentTestimonial(prev => (prev + 1) % testimonials.length)}
              className="absolute top-1/2 right-0 -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors duration-300"
            >
              <FiChevronRight />
            </button>

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

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently <span className="text-[#7DC400]">Asked Questions</span>
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our services
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={index} 
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <button
                  onClick={() => setActiveQuestion(activeQuestion === index ? null : index)}
                  className="w-full text-left p-6 focus:outline-none flex justify-between items-center"
                >
                  <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  <span className={`transform transition-transform duration-300 ${activeQuestion === index ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#7DC400]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <AnimatePresence>
                  {activeQuestion === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-gray-600 border-t border-gray-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Get in <span className="text-[#7DC400]">Touch</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Have questions? Our team is here to help you with anything you need.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#7DC400]/10 p-3 rounded-full text-[#7DC400]">
                    <FiMapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Our Office</h3>
                    <p className="text-gray-600">Bole Road, Friendship Building, 4th Floor, Addis Ababa, Ethiopia</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-[#7DC400]/10 p-3 rounded-full text-[#7DC400]">
                    <FiPhone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600">+251 911 234 567</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-[#7DC400]/10 p-3 rounded-full text-[#7DC400]">
                    <FiMail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">support@chapa.co</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>
              <form>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input type="text" id="name" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7DC400] focus:border-transparent" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input type="email" id="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7DC400] focus:border-transparent" />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input type="text" id="subject" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7DC400] focus:border-transparent" />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea id="message" rows={5} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7DC400] focus:border-transparent"></textarea>
                </div>
                <button type="submit" className="w-full bg-[#7DC400] text-white py-3 rounded-lg font-semibold hover:bg-[#6BB000] transition-colors duration-300">
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#7DC400] to-green-600 text-white px-4 relative overflow-hidden">
        <div className="absolute inset-0" style={{ 
          backgroundImage: "url('/patterns/ethiopian-pattern.svg')", 
          backgroundSize: "200px", 
          backgroundRepeat: "repeat",
          opacity: 0.1
        }}></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Ready to Transform Your Business?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl mb-8 opacity-90"
          >
            Join thousands of businesses already using Chapa to grow their revenue
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={() => navigate("/auth/register")}
            className="bg-white text-[#7DC400] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl"
          >
            Get Started Today
          </motion.button>
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
                Leading payment solutions for Ethiopian businesses
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"></path>
                  </svg>
                </a>
              </div>
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
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Partners
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
                  Contact Us
                </a>
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
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Documentation
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  API Reference
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Developer Portal
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-6 text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Chapa. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Built with ❤️ in Ethiopia
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
 export default LandingPage;