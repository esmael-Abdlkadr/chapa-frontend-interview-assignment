import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote, ArrowRight } from "lucide-react";

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "Chapa has allowed us to benefit from direct bookings, increasing our profit margin on online bookings. Truly an amazing partner for any growth oriented company!",
      author: "Yonaiel Tadiwos",
      role: "COO at Kuriftu Resorts",
      company: "Kuriftu Resorts",
      avatar: "/testkur.webp",
      rating: 5
    },
    {
      quote: "We are grateful to Chapa financial technologies for offering this solution, as it has enabled us to mobilize substantial sum from the diaspora community for communities affected by natural & man-made disasters",
      author: "Ahmed Yimam",
      role: "Head - Resource Mobilization & Expansion Services at Red Cross",
      company: "Ethiopian Red Cross Society",
      avatar: "/redcross.webp",
      rating: 5
    },
  ];

  useEffect(() => {
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="relative py-24 px-4 bg-gradient-to-br from-white via-gray-50 to-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#7DC400]/6 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-green-500/4 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#7DC400]/3 to-green-400/3 rounded-full blur-3xl"></div>
      </div>

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%237DC400' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
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
              <Quote className="w-4 h-4 inline mr-2" />
              Customer Stories
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            What Our <span className="bg-gradient-to-r from-[#7DC400] via-green-500 to-green-600 bg-clip-text text-transparent">Customers</span> Say
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of <span className="font-semibold text-[#7DC400]">satisfied customers</span> across Ethiopia who trust Chapa
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative bg-white/90 backdrop-blur-sm border-2 border-gray-100 rounded-3xl p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 mx-4 overflow-hidden"
                  >
                    {/* Decorative Quote Icon */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#7DC400]/10 to-transparent rounded-bl-full flex items-start justify-end pt-4 pr-4">
                      <Quote className="w-8 h-8 text-[#7DC400]/20" />
                    </div>

                    {/* Rating Stars */}
                    <div className="flex items-center justify-center mb-6">
                      {[...Array(testimonial.rating)].map((_, starIndex) => (
                        <Star key={starIndex} className="w-6 h-6 text-yellow-400 fill-current" />
                      ))}
                    </div>

                    {/* Quote */}
                    <div className="relative z-10 mb-8">
                      <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed text-center italic">
                        "{testimonial.quote}"
                      </blockquote>
                    </div>

                    {/* Author Info */}
                    <div className="relative z-10 flex items-center justify-center space-x-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-[#7DC400]/20 shadow-lg">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900 mb-1">
                          {testimonial.author}
                        </div>
                        <div className="text-sm text-gray-600">
                          {testimonial.role}
                        </div>
                        <div className="text-sm text-[#7DC400] font-semibold">
                          {testimonial.company}
                        </div>
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#7DC400]/0 to-green-500/0 hover:from-[#7DC400]/5 hover:to-green-500/5 transition-all duration-500 rounded-3xl pointer-events-none"></div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <motion.button 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentTestimonial(prev => prev === 0 ? testimonials.length - 1 : prev - 1)}
            className="absolute top-1/2 -left-4 md:-left-6 -translate-y-1/2 bg-white border-2 border-gray-200 hover:border-[#7DC400] rounded-full w-12 h-12 md:w-14 md:h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 hover:text-[#7DC400] z-20"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>

          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentTestimonial(prev => (prev + 1) % testimonials.length)}
            className="absolute top-1/2 -right-4 md:-right-6 -translate-y-1/2 bg-white border-2 border-gray-200 hover:border-[#7DC400] rounded-full w-12 h-12 md:w-14 md:h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 hover:text-[#7DC400] z-20"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-12 space-x-3">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentTestimonial(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? "bg-[#7DC400] w-8 shadow-lg"
                    : "bg-gray-300 hover:bg-gray-400 w-3"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-12"
        >
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 md:p-12 shadow-xl max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready to Join Our <span className="text-[#7DC400]">Success Stories</span>?
            </h3>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Start your journey with Chapa and become our next satisfied customer
            </p>
            <button className="bg-gradient-to-r from-[#7DC400] to-green-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-[#6BB000] hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-xl inline-flex items-center space-x-2">
              <span>Join Our Happy Customers</span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
