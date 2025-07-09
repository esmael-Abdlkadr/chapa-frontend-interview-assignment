import { Code, Book, Users, CheckCircle, ArrowRight, Terminal, Shield } from "lucide-react";

const ServicesSection = () => {
  const features = [
    {
      icon: Code,
      title: "Powerful APIs",
      description: "Designed to be flexible, scalable, and easy to use, enabling you to seamlessly integrate and accept payments with just a few lines of code.",
      cta: "Learn more",
      highlights: ["RESTful APIs", "Real-time webhooks", "Easy integration", "Comprehensive SDKs"]
    },
    {
      icon: Terminal,
      title: "You don't need to code",
      description: "From pre-built plugins and SDKs detailed for popular languages like JavaScript, Python, Ruby, and more, we've got you covered.",
      cta: "Explore",
      highlights: ["Pre-built plugins", "Multiple SDKs", "No-code solutions", "Quick setup"]
    },
    {
      icon: Shield,
      title: "Test Cards",
      description: "Secure your payment integration by identifying and resolving errors before going live, ensuring a smooth user experience for your customers.",
      cta: "Learn more",
      highlights: ["Sandbox environment", "Test scenarios", "Error simulation", "Safe testing"]
    },
    {
      icon: Users,
      title: "Community and Support",
      description: "Join our vibrant community of developers where you can connect, collaborate, and gain insights from fellow developers while getting answers to your questions.",
      cta: "Join now",
      highlights: ["Developer community", "24/7 support", "Documentation", "Code examples"]
    }
  ];

  const codeExample = `const Chapa = require('chapa')
const myChapa = new Chapa('secret-key')

const customerInfo = {
  amount: 100,
  currency: 'ETB',
  email: 'abebe@gmail.com',
  first_name: 'Abebe',
  last_name: 'Bikila',
  phone_number: '0911123456',
  tx_ref: 'chapa-tx-myecommerce12345',
  callback_url: 'https://chapa.co/',
  customization: {
    title: 'I love e-commerce',
    description: 'It is time to pay'
  }
}`;

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800/20 via-slate-900 to-slate-900"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%237DC400%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M0%200h60v60H0z%22/%3E%3Cpath%20d%3D%22M30%2030m-15%200a15%2015%200%201%201%2030%200a15%2015%200%201%201%20-30%200%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                For{" "}
                <span className="bg-gradient-to-r from-[#7DC400] to-green-400 bg-clip-text text-transparent">
                  Developers
                </span>
                <br />
                by Developers
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed max-w-xl">
                Ready to start building with Chapa? Our developer-friendly platform offers a comprehensive set of APIs, documentation, and libraries that ease the integration process and empower developers to save time and simplify payment functionality.
              </p>
              <div className="pt-4">
                <button className="bg-gradient-to-r from-[#7DC400] to-green-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-[#6BB000] hover:to-green-600 transform hover:scale-105 transition-all duration-300 shadow-lg inline-flex items-center space-x-2">
                  <Book className="w-5 h-5" />
                  <span>Go to Docs</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Code Example */}
          <div className="relative">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-sm text-gray-400">payment.js</div>
              </div>
              <div className="relative">
                <pre className="text-sm text-gray-300 overflow-x-auto">
                  <code className="language-javascript">
                    {codeExample.split('\n').map((line, i) => (
                      <div key={i} className="flex">
                        <span className="text-gray-500 select-none w-8 text-right mr-4">{i + 1}</span>
                        <span className="flex-1">
                          {line.includes('const') && <span className="text-purple-400">const </span>}
                          {line.includes('Chapa') && <span className="text-blue-400">Chapa</span>}
                          {line.includes('require') && <span className="text-pink-400">require</span>}
                          {line.includes('new') && <span className="text-yellow-400">new </span>}
                          {line.includes('=') && <span className="text-gray-300"> = </span>}
                          {line.includes('amount') && <span className="text-green-400">amount</span>}
                          {line.includes('currency') && <span className="text-green-400">currency</span>}
                          {line.includes('email') && <span className="text-green-400">email</span>}
                          {line.includes('callback_url') && <span className="text-green-400">callback_url</span>}
                          {line.includes('customization') && <span className="text-green-400">customization</span>}
                          {line.includes('"') && <span className="text-[#7DC400]">{line.match(/"[^"]*"/g)?.[0]}</span>}
                          {line.includes("'") && <span className="text-[#7DC400]">{line.match(/'[^']*'/g)?.[0]}</span>}
                          {line.includes('100') && <span className="text-orange-400">100</span>}
                          {line.includes('ETB') && <span className="text-[#7DC400]">'ETB'</span>}
                          {line.includes('abebe@gmail.com') && <span className="text-[#7DC400]">'abebe@gmail.com'</span>}
                          {line.includes('https://chapa.co/') && <span className="text-[#7DC400]">'https://chapa.co/'</span>}
                          {line.includes('I love e-commerce') && <span className="text-[#7DC400]">'I love e-commerce'</span>}
                          {line.includes('It is time to pay') && <span className="text-[#7DC400]">'It is time to pay'</span>}
                          {!line.includes('const') && !line.includes('Chapa') && !line.includes('require') && !line.includes('new') && !line.includes('=') && !line.includes('amount') && !line.includes('currency') && !line.includes('email') && !line.includes('callback_url') && !line.includes('customization') && !line.includes('"') && !line.includes("'") && !line.includes('100') && !line.includes('ETB') && !line.includes('abebe@gmail.com') && !line.includes('https://chapa.co/') && !line.includes('I love e-commerce') && !line.includes('It is time to pay') && (
                            <span className="text-gray-300">{line}</span>
                          )}
                        </span>
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-20">
          {features.map((feature, index) => (
            <div key={index} className="group relative">
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 h-full hover:bg-slate-800/50 hover:border-[#7DC400]/30 transition-all duration-300 hover:shadow-2xl hover:shadow-[#7DC400]/10">
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#7DC400] to-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#7DC400] transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2 mb-6">
                  {feature.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-[#7DC400] flex-shrink-0" />
                      <span className="text-sm text-gray-300">{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button className="text-[#7DC400] font-semibold text-sm hover:text-green-400 transition-all duration-300 inline-flex items-center space-x-2 group-hover:translate-x-1 transform">
                  <span>{feature.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#7DC400]/0 via-green-500/0 to-[#7DC400]/0 group-hover:from-[#7DC400]/5 group-hover:via-green-500/5 group-hover:to-[#7DC400]/5 rounded-2xl transition-all duration-300 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
