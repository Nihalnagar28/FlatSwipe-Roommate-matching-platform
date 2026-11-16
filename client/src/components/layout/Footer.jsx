import React from 'react';
import { Sparkles, Heart, Shield, Lock, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-white">FlatMate</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Find someone who matches not just your rent budget, but your way of living. Tinder for flatmates.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Product</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/discover" className="hover:text-white transition-colors">Lifestyle Discovery</Link></li>
              <li><Link to="/listings" className="hover:text-white transition-colors">Verified Flats</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Meet Before Move</Link></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing Plans</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Trust & Safety</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-indigo-400" /> Government ID Check</li>
              <li className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-emerald-400" /> Private Document Vault</li>
              <li><a href="#safety" className="hover:text-white transition-colors">Safety Guidelines</a></li>
              <li><a href="#safety" className="hover:text-white transition-colors">Community Standards</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Popular Cities</h4>
            <ul className="space-y-2 text-xs">
              <li className="text-slate-400">Bangalore (Indiranagar, Koramangala, HSR)</li>
              <li className="text-slate-400">Mumbai (Bandra, Andheri, Powai)</li>
              <li className="text-slate-400">Delhi NCR (Gurgaon, Noida)</li>
              <li className="text-slate-400">Pune (Viman Nagar, Baner)</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} FlatMate Technologies Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Cookie Preferences</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
