import { motion } from "framer-motion";
import { UserPlus, Settings, Zap, CheckCircle, ArrowRight } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Sign Up & Verify",
      description: "Create your account in minutes with our streamlined verification process",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      step: "01"
    },
    {
      icon: Settings,
      title: "Integrate & Configure",
      description: "Connect your platform using our simple APIs and customization tools",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      step: "02"
    },
    {
      icon: Zap,
      title: "Start Processing",
      description: "Begin accepting payments instantly with automatic settlement",
      color: "from-[#7DC400] to-green-600",
      bgColor: "bg-green-50",
      step: "03"
    }
  ];

  return (
    <section id="how-it-works" className="relative py-24 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-[#7DC400]/4 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-green-500/3 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="mb-4">
            <span className="inline-block bg-gradient-to-r from-[#7DC400] to-green-500 text-white px-6 py-2 rounded-full text-sm font-semibold tracking-wide uppercase shadow-lg">
              <CheckCircle className="w-4 h-4 inline mr-2" />
              How It Works
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            Get Started in{" "}
            <span className="bg-gradient-to-r from-[#7DC400] via-green-500 to-green-600 bg-clip-text text-transparent">
              3 Simple Steps
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From signup to your first payment in <span className="font-semibold text-[#7DC400]">under 24 hours</span>
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative group"
            >
              {/* Connection Line (for large screens) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-10">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.4 }}
                    className="h-0.5 w-12 bg-gradient-to-r from-[#7DC400] to-green-500 origin-left"
                  />
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2"
                  >
                    <ArrowRight className="w-4 h-4 text-[#7DC400]" />
                  </motion.div>
                </div>
              )}

              {/* Step Card */}
              <div className="relative bg-white/90 backdrop-blur-sm border-2 border-gray-100 group-hover:border-[#7DC400]/30 rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                {/* Step Number Background */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#7DC400]/10 to-transparent rounded-bl-full"></div>
                
                {/* Step Number */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-[#7DC400] to-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  {step.step}
                </div>

                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 rounded-2xl ${step.bgColor} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className={`w-8 h-8 bg-gradient-to-r ${step.color} bg-clip-text text-transparent`} />
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-0 left-0 w-2 h-2 bg-[#7DC400] rounded-full animate-ping"></div>
                    <div className="absolute bottom-0 right-0 w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#7DC400] transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#7DC400]/0 to-green-500/0 group-hover:from-[#7DC400]/5 group-hover:to-green-500/5 transition-all duration-500 rounded-3xl pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-20"
        >
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 md:p-12 shadow-xl max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready to <span className="text-[#7DC400]">Get Started</span>?
            </h3>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already processing payments with Chapa
            </p>
            <button className="bg-gradient-to-r from-[#7DC400] to-green-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-[#6BB000] hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-xl inline-flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>Start Integration</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
