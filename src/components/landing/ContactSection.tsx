import { motion } from "framer-motion";
import { Phone, Mail, Clock, Send, MessageCircle, HelpCircle } from "lucide-react";

const ContactSection = () => {
  const contactInfo = [
   
    {
      icon: Phone,
      title: "Call Us",
      content: "+251960724272\n8911",
      accent: "📞"
    },
    {
      icon: Mail,
      title: "Email Us",
      content: "info@chapa.co",
      accent: "✉️"
    }
  ];

  return (
    <section id="contact" className="relative py-24 px-4 bg-gradient-to-br from-white via-gray-50 to-gray-100 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-[#7DC400]/4 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-green-500/3 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#7DC400]/2 to-green-400/2 rounded-full blur-3xl"></div>
      </div>

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%237DC400' fill-opacity='0.1'%3E%3Cpath d='M40 40c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm20 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px'
        }} />
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
              📞 Get In Touch
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            Let's <span className="bg-gradient-to-r from-[#7DC400] via-green-500 to-green-600 bg-clip-text text-transparent">Connect</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your business with <span className="font-semibold text-[#7DC400]">Ethiopia's leading payment platform</span>?
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="space-y-6">
              {contactInfo.map((contact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="group relative"
                >
                  <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:border-[#7DC400]/30 transition-all duration-500">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#7DC400]/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10 flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="bg-gradient-to-r from-[#7DC400] to-green-500 p-3 rounded-xl text-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                            <contact.icon className="w-6 h-6" />
                          </div>
                          <div className="absolute -top-2 -right-2 text-lg opacity-80 group-hover:scale-110 transition-transform duration-300">
                            {contact.accent}
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-[#7DC400] transition-colors duration-300">
                          {contact.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                          {contact.content}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-[#7DC400] to-green-500 p-2 rounded-lg text-white">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-gray-900">Business Hours</h3>
                <span className="text-lg">🕒</span>
              </div>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-medium">8:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium">9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium text-[#7DC400]">24/7 Support</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="grid grid-cols-2 gap-4"
            >
              <button className="bg-[#7DC400] text-white p-4 rounded-xl font-semibold hover:bg-[#6BB000] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center space-x-2">
                <span>📱</span>
                <span>Call Now</span>
              </button>
              <button className="border-2 border-[#7DC400] bg-white/90 text-[#7DC400] p-4 rounded-xl font-semibold hover:bg-[#7DC400] hover:text-white transition-all duration-300 flex items-center justify-center space-x-2">
                <span>💬</span>
                <span>Live Chat</span>
              </button>
            </motion.div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-white/90 backdrop-blur-sm border-2 border-gray-100 rounded-3xl p-8 md:p-10 shadow-xl hover:shadow-2xl hover:border-[#7DC400]/20 transition-all duration-500">
              {/* Background Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#7DC400]/5 to-transparent rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-500/3 to-transparent rounded-tr-full"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#7DC400] to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Send us a <span className="text-[#7DC400]">Message</span>
                  </h3>
                  <p className="text-gray-600">We'll get back to you within 24 hours</p>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-[#7DC400] focus:ring-4 focus:ring-[#7DC400]/10 transition-all duration-300 bg-white/80 backdrop-blur-sm" 
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-[#7DC400] focus:ring-4 focus:ring-[#7DC400]/10 transition-all duration-300 bg-white/80 backdrop-blur-sm" 
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-[#7DC400] focus:ring-4 focus:ring-[#7DC400]/10 transition-all duration-300 bg-white/80 backdrop-blur-sm" 
                        placeholder="+251 9XX XXX XXX"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">Company</label>
                      <input 
                        type="text" 
                        id="company" 
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-[#7DC400] focus:ring-4 focus:ring-[#7DC400]/10 transition-all duration-300 bg-white/80 backdrop-blur-sm" 
                        placeholder="Your company"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-[#7DC400] focus:ring-4 focus:ring-[#7DC400]/10 transition-all duration-300 bg-white/80 backdrop-blur-sm" 
                      placeholder="How can we help you?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                    <textarea 
                      id="message" 
                      rows={5} 
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-[#7DC400] focus:ring-4 focus:ring-[#7DC400]/10 transition-all duration-300 bg-white/80 backdrop-blur-sm resize-none" 
                      placeholder="Tell us more about your needs..."
                    ></textarea>
                  </div>
                  
                  <motion.button 
                    type="submit" 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-[#7DC400] to-green-600 text-white py-4 rounded-xl font-bold text-lg hover:from-[#6BB000] hover:to-green-700 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-2"
                  >
                    <span>Send Message</span>
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Send className="w-5 h-5" />
                    </motion.div>
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 md:p-12 shadow-xl max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Need <span className="text-[#7DC400]">Immediate</span> Assistance?
            </h3>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Choose the fastest way to get the help you need. Our support team is standing by.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button className="bg-gradient-to-r from-[#7DC400] to-green-600 text-white px-6 py-4 rounded-2xl font-bold hover:from-[#6BB000] hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg inline-flex items-center justify-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>Call Now</span>
              </button>
              
              <button className="border-2 border-[#7DC400] bg-white text-[#7DC400] px-6 py-4 rounded-2xl font-bold hover:bg-[#7DC400] hover:text-white transition-all duration-300 inline-flex items-center justify-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span>Live Chat</span>
              </button>
              
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-4 rounded-2xl font-bold transition-all duration-300 inline-flex items-center justify-center space-x-2">
                <HelpCircle className="w-5 h-5" />
                <span>Help Center</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
