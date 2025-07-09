import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";

const PaymentMethodsSection = () => {
  const paymentMethods = [
    { name: "Commercial Bank of Ethiopia", icon: "/cbe.webp" },
    { name: "Dashen Bank", icon: "/dashen.webp" },
    { name: "Bank of Abyssinia", icon: "/boa.webp" },
    { name: "Awash Bank", icon: "/awash_bank.webp" },
    { name: "Wegagen Bank", icon: "/wegagen_bank.webp" },
    { name: "Bunna Bank", icon: "/bunna_bank.webp" },
    { name: "Cooperative Bank", icon: "/coop.webp" },
    { name: "Zemen Bank", icon: "/zemen.webp" },
    { name: "TeleBirr", icon: "/telebirr.webp" },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%237DC400' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} 
        />
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-[#7DC400]/8 to-green-500/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-green-400/6 to-[#7DC400]/6 rounded-full blur-2xl animate-bounce"></div>
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
              <CreditCard className="w-4 h-4 inline mr-2" />
              Payment Solutions
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
              Supported
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#7DC400] via-green-500 to-green-600 bg-clip-text text-transparent">
              Payment Methods
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Give your customers <span className="font-semibold text-[#7DC400]">all payment options</span> in one unified, secure platform
          </p>
        </motion.div>

        {/* Payment Methods Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
          {paymentMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-[#7DC400]/30 overflow-hidden">
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#7DC400]/0 to-green-500/0 group-hover:from-[#7DC400]/5 group-hover:to-green-500/5 transition-all duration-500 rounded-2xl"></div>
                
                {/* Logo Container */}
                <div className="relative z-10 flex items-center justify-center mb-4">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-white transition-colors duration-300 shadow-inner">
                    <img
                      src={method.icon}
                      alt={method.name}
                      className="w-12 h-12 md:w-14 md:h-14 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Method Name */}
                <div className="relative z-10 text-center">
                  <h3 className="font-bold text-gray-800 text-sm md:text-base group-hover:text-[#7DC400] transition-colors duration-300 leading-tight">
                    {method.name}
                  </h3>
                </div>

                {/* Floating Elements */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-2 right-2 w-2 h-2 bg-[#7DC400] rounded-full animate-ping"></div>
                  <div className="absolute bottom-2 left-2 w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 md:p-12 shadow-xl max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready to Accept <span className="text-[#7DC400]">All Payment Methods</span>?
            </h3>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Start accepting payments from all major Ethiopian banks and mobile money providers today.
            </p>
            <button className="bg-gradient-to-r from-[#7DC400] to-green-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-[#6BB000] hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-xl inline-flex items-center space-x-2">
              <CreditCard className="w-5 h-5" />
              <span>Get Started Now</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PaymentMethodsSection;
