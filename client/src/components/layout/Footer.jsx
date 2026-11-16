import React from 'react';
import { Shield, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';

export const Footer = () => {
  return (
    <footer className="bg-[#202622] text-[#737B74] py-14 border-t border-[#2D332E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1 space-y-4">
            <div className="bg-white rounded-xl p-2.5 inline-block shadow-sm">
              <Logo to="/" size="md" />
            </div>
            <p className="text-xs text-[#9EA397] leading-relaxed">
              Find someone who matches not just your rent budget, but your daily lifestyle and values. Human-centered roommate matching.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3.5">Product</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/discover" className="hover:text-white transition-colors">Lifestyle Discovery</Link></li>
              <li><Link to="/listings" className="hover:text-white transition-colors">Verified Flats</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Meet Before You Move</Link></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing Plans</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3.5">Trust & Safety</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2"><Shield className="w-3.5 h-3.5 text-[#527565]" /> <span>Government ID Check</span></li>
              <li className="flex items-center gap-2"><Lock className="w-3.5 h-3.5 text-[#527565]" /> <span>Private Document Vault</span></li>
              <li><a href="#safety" className="hover:text-white transition-colors">Safety Guidelines</a></li>
              <li><a href="#safety" className="hover:text-white transition-colors">Community Standards</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3.5">Popular Metros</h4>
            <ul className="space-y-2.5 text-xs text-[#9EA397]">
              <li>Bangalore (Indiranagar, Koramangala, HSR)</li>
              <li>Mumbai (Bandra, Andheri, Powai)</li>
              <li>Delhi NCR (Gurgaon, Noida, South Delhi)</li>
              <li>Pune (Viman Nagar, Baner, Kharadi)</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#2D332E] flex flex-col sm:flex-row items-center justify-between text-xs text-[#737B74] gap-4">
          <p>© {new Date().getFullYear()} FlatSwipe Technologies. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">Trust & Verification</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
