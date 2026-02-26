
"use client";

import React from 'react';
import Link from 'next/link';
import { TrendingUp, Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-muted py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center shadow-sm">
              <TrendingUp className="text-primary h-5 w-5" />
            </div>
            ApexVest
          </Link>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Revolutionizing wealth management through a unified platform for high-growth digital assets and premium real estate.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
              <Facebook className="h-4 w-4" />
            </Link>
            <Link href="#" className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
              <Twitter className="h-4 w-4" />
            </Link>
            <Link href="#" className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
              <Linkedin className="h-4 w-4" />
            </Link>
            <Link href="#" className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
              <Instagram className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-primary mb-6">Solutions</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-accent transition-colors">Crypto Portfolios</Link></li>
            <li><Link href="#" className="hover:text-accent transition-colors">Real Estate Assets</Link></li>
            <li><Link href="#" className="hover:text-accent transition-colors">AI Investment Strategies</Link></li>
            <li><Link href="#" className="hover:text-accent transition-colors">Risk Assessment</Link></li>
            <li><Link href="#" className="hover:text-accent transition-colors">Wealth Advisory</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-primary mb-6">Company</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-accent transition-colors">About ApexVest</Link></li>
            <li><Link href="#" className="hover:text-accent transition-colors">Institutional Partners</Link></li>
            <li><Link href="#" className="hover:text-accent transition-colors">Market Insights</Link></li>
            <li><Link href="#" className="hover:text-accent transition-colors">Global Presence</Link></li>
            <li><Link href="#" className="hover:text-accent transition-colors">Privacy & Legal</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-primary mb-6">Contact Us</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-accent" />
              support@apexvest.com
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-accent" />
              +1 (800) 123-4567
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-accent" />
              123 Finance Plaza, New York, NY 10001
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-muted text-center text-xs text-muted-foreground">
        <p>&copy; 2024 ApexVest Global Management Ltd. Licensed as a global investment provider. Investments involve risk. Past performance is not indicative of future results.</p>
      </div>
    </footer>
  );
}
