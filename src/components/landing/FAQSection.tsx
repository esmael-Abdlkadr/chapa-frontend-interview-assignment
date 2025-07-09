import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, BookOpen, MessageSquare } from "lucide-react";

const FAQSection = () => {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  const faqs = [
    {
      question: "Which payment methods does Chapa support?",
      answer: "Chapa supports all major Ethiopian payment methods including mobile money (TeleBirr), bank transfers from CBE, Dashen Bank, Bank of Abyssinia, Awash Bank, and more, plus international card payments (Visa, Mastercard)."
    },
    {
      question: "How long does it take to integrate Chapa?",
      answer: "Most businesses can integrate Chapa within 24-48 hours using our simple APIs and comprehensive documentation. Our technical team is also available to assist with custom integrations."
    },
    {
      question: "What are the transaction fees?",
      answer: "Our fees start at 2.9% per transaction for the Starter plan and 2.5% for the Business plan. There are no hidden fees, setup costs, or monthly charges. You only pay when you receive payments."
    },
    {
      question: "Is Chapa secure for online payments?",
      answer: "Yes, Chapa uses bank-level security with end-to-end encryption, fraud detection, and is compliant with international payment standards. All transactions are processed through secure, encrypted channels."
    },
    {
      question: "Do you provide customer support?",
      answer: "Yes, we offer comprehensive support including email support for all users, priority support for Business plan users, and dedicated account management for enterprise clients. Our support team is available 24/7."
    },
    {
      question: "Can I use Chapa for international payments?",
      answer: "Currently, Chapa focuses on the Ethiopian market, but we support international card payments (Visa/Mastercard) and are expanding to other African countries. Contact us for more information about cross-border payment solutions."
    }
  ];

  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  return (
    <section className="relative py-24 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      {/* Background Elements */}
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
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%237DC400' fill-opacity='0.1'%3E%3Cpath d='M40 40c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm20 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px'
          }} 
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
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
              <HelpCircle className="w-4 h-4 inline mr-2" />
              Get Answers
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            Frequently <span className="bg-gradient-to-r from-[#7DC400] via-green-500 to-green-600 bg-clip-text text-transparent">Asked Questions</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about our <span className="font-semibold text-[#7DC400]">payment solutions</span> and services
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              key={index} 
              className="group relative"
            >
              <div className="relative bg-white/90 backdrop-blur-sm border-2 border-gray-100 rounded-2xl shadow-lg hover:shadow-xl hover:border-[#7DC400]/30 transition-all duration-500 overflow-hidden">
                {/* Question Button */}
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full text-left p-6 md:p-8 focus:outline-none focus:ring-2 focus:ring-[#7DC400]/20 rounded-2xl"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-[#7DC400] transition-colors duration-300 pr-4">
                      {faq.question}
                    </h3>
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r from-[#7DC400] to-green-500 flex items-center justify-center shadow-lg transform transition-all duration-300 ${
                      activeQuestion === index ? 'rotate-180' : 'group-hover:scale-110'
                    }`}>
                      {activeQuestion === index ? (
                        <Minus className="w-4 h-4 text-white" />
                      ) : (
                        <Plus className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {activeQuestion === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-6 md:pb-8">
                        <div className="h-px bg-gradient-to-r from-[#7DC400]/20 to-green-500/20 mb-4"></div>
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#7DC400]/0 to-green-500/0 group-hover:from-[#7DC400]/5 group-hover:to-green-500/5 transition-all duration-500 rounded-2xl pointer-events-none"></div>
              </div>

              {/* Floating Elements */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-2 right-2 w-1 h-1 bg-[#7DC400] rounded-full animate-ping"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 md:p-12 shadow-xl max-w-4xl mx-auto">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-[#7DC400] to-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Still Have <span className="text-[#7DC400]">Questions</span>?
            </h3>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Our expert support team is here to help you 24/7. Get personalized assistance for your business needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-gradient-to-r from-[#7DC400] to-green-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-[#6BB000] hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-xl inline-flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Contact Support</span>
              </button>
              
              <button className="border-2 border-[#7DC400] bg-white/90 text-[#7DC400] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#7DC400] hover:text-white transition-all duration-300 inline-flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>View Documentation</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
