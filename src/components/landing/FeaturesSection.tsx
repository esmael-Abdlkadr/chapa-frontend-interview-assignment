import { motion } from "framer-motion";
import { Shield, Zap, Globe, Smartphone, BarChart3, Wrench, Star, ArrowRight } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Advanced encryption and fraud detection technology protects every transaction",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process payments in milliseconds with our optimized infrastructure",
      color: "from-yellow-500 to-orange-600",
      bgColor: "bg-yellow-50"
    },
    {
      icon: Globe,
      title: "Pan-African Reach",
      description: "Accept payments from across Ethiopia and beyond Africa",
      color: "from-green-500 to-[#7DC400]",
      bgColor: "bg-green-50"
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Seamless experience across all devices and platforms",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: BarChart3,
      title: "Smart Analytics",
      description: "Detailed insights and reporting to grow your business",
      color: "from-red-500 to-pink-600",
      bgColor: "bg-red-50"
    },
    {
      icon: Wrench,
      title: "Easy Integration",
      description: "Simple APIs and SDKs for quick implementation",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50"
    }
  ];

  return (
    <section id="features" className="relative py-24 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
 
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-[#7DC400]/4 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-green-500/3 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#7DC400]/2 to-green-400/2 rounded-full blur-3xl"></div>
      </div>

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%237DC400' fill-opacity='0.15'%3E%3Cpath d='M40 40c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm20 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px'
          }} 
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="mb-4">
            <span className="inline-block bg-gradient-to-r from-[#7DC400] to-green-500 text-white px-6 py-2 rounded-full text-sm font-semibold tracking-wide uppercase shadow-lg">
              <Star className="w-4 h-4 inline mr-2" />
              Features
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-[#7DC400] via-green-500 to-green-600 bg-clip-text text-transparent">
              Chapa
            </span>?
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Built with <span className="font-semibold text-[#7DC400]">cutting-edge technology</span> and designed for the African market
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative bg-white/90 backdrop-blur-sm border-2 border-gray-100 group-hover:border-[#7DC400]/30 rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full">
          
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#7DC400]/5 to-transparent rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-green-500/3 to-transparent rounded-tr-full"></div>

                
                <div className="relative mb-6 z-10">
                  <div className={`w-16 h-16 rounded-2xl ${feature.bgColor} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-8 h-8 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`} />
                  </div>
                  
                 
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-0 left-0 w-2 h-2 bg-[#7DC400] rounded-full animate-ping"></div>
                    <div className="absolute bottom-0 right-0 w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#7DC400] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  {/* CTA Link */}
                  <div className="inline-flex items-center text-[#7DC400] font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    <span className="mr-2">Learn more</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

            
                <div className="absolute inset-0 bg-gradient-to-r from-[#7DC400]/0 to-green-500/0 group-hover:from-[#7DC400]/5 group-hover:to-green-500/5 transition-all duration-500 rounded-3xl pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </div>

    
      </div>
    </section>
  );
};

export default FeaturesSection;
