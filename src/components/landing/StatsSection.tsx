import { TrendingUp, Users, DollarSign, Zap } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: DollarSign,
      value: "30B+",
      label: "Volume processed in ETB",
      color: "from-[#7DC400] to-green-500",
      bgColor: "bg-green-50"
    },
    {
      icon: TrendingUp,
      value: "100M+",
      label: "Number of Transactions",
      color: "from-[#7DC400] to-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: Zap,
      value: "480M+",
      label: "Number of API calls",
      color: "from-green-500 to-[#7DC400]",
      bgColor: "bg-green-50"
    },
    {
      icon: Users,
      value: "50K+",
      label: "Registered Users",
      color: "from-[#7DC400] to-green-500",
      bgColor: "bg-green-50"
    }
  ];

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-[#7DC400]/10 to-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-green-400/8 to-[#7DC400]/8 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="mb-4">
            <span className="inline-block bg-gradient-to-r from-[#7DC400] to-green-500 text-white px-6 py-2 rounded-full text-sm font-semibold tracking-wide uppercase shadow-lg">
              📊 Our Impact
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Trusted by <span className="bg-gradient-to-r from-[#7DC400] via-green-500 to-green-600 bg-clip-text text-transparent">Thousands</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            See why businesses across Ethiopia choose <span className="font-semibold text-[#7DC400]">Chapa</span> for their payment needs
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="group relative">
              {/* Main Card */}
              <div className="relative bg-white/90 backdrop-blur-sm border-2 border-gray-100 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
                {/* Icon */}
                <div className="relative z-10 mb-6">
                  <div className={`w-16 h-16 ${stat.bgColor} rounded-2xl flex items-center justify-center mx-auto shadow-lg`}>
                    <stat.icon className={`w-8 h-8 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                  </div>
                </div>

                {/* Value */}
                <div className="relative z-10 text-center mb-4">
                  <div className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                </div>

                {/* Label */}
                <div className="relative z-10 text-center">
                  <p className="text-gray-600 font-medium leading-tight">
                    {stat.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 bg-gray-50 border border-gray-200 rounded-full px-6 py-3">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-gray-600 font-medium">
              Real-time data • Updated every second
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
