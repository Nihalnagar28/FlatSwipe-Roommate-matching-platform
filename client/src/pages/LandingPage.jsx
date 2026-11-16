import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { HeroSection } from '../components/landing/HeroSection';
import { HowItWorks } from '../components/landing/HowItWorks';
import { LifestyleMatching } from '../components/landing/LifestyleMatching';
import { SafetySection } from '../components/landing/SafetySection';
import { Testimonials } from '../components/landing/Testimonials';
import { PricingSection } from '../components/landing/PricingSection';
import { CTASection } from '../components/landing/CTASection';
import { Footer } from '../components/layout/Footer';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <HowItWorks />
        <LifestyleMatching />
        <SafetySection />
        <Testimonials />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};
