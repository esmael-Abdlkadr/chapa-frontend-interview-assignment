import { motion } from "framer-motion";
import { Check, Zap, Shield, CreditCard } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Domestic Transactions",
      price: "2.5%",
      period: "per transaction",
      description: "For local Ethiopian payments",
      features: [
        "No setup fees or hidden charges",
        "Real-time transaction reporting",
        "Secure payment processing",
        "All local payment methods",
        "24/7 customer support"
      ],
      popular: false,
      color: "from-[#7DC400] to-green-500",
      bgColor: "bg-green-50",
      badge: "Local"
    },
    {
      name: "International Transactions",
      price: "1%",
      period: "per transaction", 
      description: "For cross-border payments",
      features: [
        "No monthly fees",
        "Hundreds of feature updates each year",
        "Dedicated customer support",
        "Multi-currency support",
        "Advanced fraud protection",
        "Priority processing"
      ],
      popular: true,
      color: "from-[#7DC400] to-green-500",
      bgColor: "bg-green-50",
      badge: "Best Value"
    }
  ];

  return (
    <section id="pricing" className="relative py-24 px-4 bg-gray-50 overflow-hidden">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-[#7DC400]/4 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-green-500/3 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/*  Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="mb-4">
            <span className="inline-block bg-gradient-to-r from-[#7DC400] to-green-500 text-white px-6 py-2 rounded-full text-sm font-semibold tracking-wide uppercase shadow-lg">
              <CreditCard className="w-4 h-4 inline mr-2" />
              Pricing
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            Simple, <span className="bg-gradient-to-r from-[#7DC400] via-green-500 to-green-600 bg-clip-text text-transparent">Transparent</span> Pricing
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            No hidden fees. No surprises. Choose the plan that <span className="font-semibold text-[#7DC400]">fits your</span> needs.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
         
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className={`${plan.popular ? 'bg-gradient-to-r from-[#7DC400] to-green-500 animate-bounce' : 'bg-[#7DC400]'} text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg`}>
                    {plan.badge}
                  </div>
                </div>
              )}

              <div className={`relative ${plan.popular ? 'bg-white border-2 border-[#7DC400]' : 'bg-white border-2 border-gray-200'} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden`}>
            
                {plan.popular && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#7DC400]/5 to-green-500/5 rounded-2xl"></div>
                )}

                {/* Plan Header */}
                <div className="relative z-10 text-center mb-8">
                  <div className={`w-16 h-16 rounded-2xl ${plan.bgColor} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    {plan.popular ? (
                      <Zap className={`w-8 h-8 bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`} />
                    ) : (
                      <Shield className={`w-8 h-8 bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`} />
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <span className={`text-5xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                      {plan.price}
                    </span>
                    <span className="text-gray-500 ml-2">{plan.period}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="relative z-10 mb-8">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 + featureIndex * 0.1 }}
                        className="flex items-center space-x-3"
                      >
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${plan.popular ? 'from-[#7DC400] to-green-600' : 'from-gray-400 to-gray-500'} flex items-center justify-center flex-shrink-0`}>
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="relative z-10">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl ${
                      plan.popular
                        ? 'bg-gradient-to-r from-[#7DC400] to-green-600 text-white hover:from-[#6BB000] hover:to-green-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Get Started
                  </motion.button>
                </div>

                {/* Floating Elements for Popular Plan */}
                {plan.popular && (
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-4 right-4 w-2 h-2 bg-[#7DC400] rounded-full animate-ping"></div>
                    <div className="absolute bottom-4 left-4 w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 md:p-12 shadow-xl max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Need a <span className="text-[#7DC400]">Custom Solution</span>?
            </h3>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Contact our sales team for enterprise pricing and custom integrations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-[#7DC400] to-green-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-[#6BB000] hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-xl inline-flex items-center space-x-2">
                <span>Contact Sales</span>
              </button>
              <button className="border-2 border-[#7DC400] bg-white text-[#7DC400] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#7DC400] hover:text-white transition-all duration-300 inline-flex items-center space-x-2">
                <span>View Calculator</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
