import React from 'react';
import { 
  Navigation, 
  HeroSection, 
  StatsSection,
  PaymentMethodsSection,
  HowItWorksSection,
  FeaturesSection,
  ServicesSection,
  PricingSection,
  TestimonialsSection,
  FAQSection,
  ContactSection, 
  Footer 
} from '../components/landing';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      <Navigation />
      <HeroSection />
      <StatsSection />
      <PaymentMethodsSection />
      <HowItWorksSection />
      <FeaturesSection />
      <ServicesSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default LandingPage;