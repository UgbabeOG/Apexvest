
"use client";

import React from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Bitcoin, 
  Building2, 
  Cpu, 
  Globe, 
  ChevronRight,
  BarChart3,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Footer } from '@/components/layout/footer';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center shadow-sm">
              <TrendingUp className="text-primary h-5 w-5" />
            </div>
            ApexVest
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#solutions" className="hover:text-primary transition-colors">Solutions</Link>
            <Link href="#impact" className="hover:text-primary transition-colors">Impact</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/login">
              <Button className="bg-primary shadow-md">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden bg-primary text-primary-foreground">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611974717482-482f01fd43c8?q=80&w=2070')] bg-cover opacity-10 bg-center" />
          <div className="max-w-7xl mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-sm font-semibold">
                <Zap className="h-4 w-4" />
                New: AI-Powered Real Estate Analytics
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
                Mastering Wealth <br />
                <span className="text-accent">Across Frontiers</span>
              </h1>
              <p className="text-xl text-white/70 max-w-lg leading-relaxed">
                A unified platform for managing high-growth cryptocurrency portfolios and premium real estate assets. Powered by AI for smarter decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/login">
                  <Button size="lg" className="bg-accent text-primary hover:bg-accent/90 px-8 h-14 text-lg font-bold shadow-xl group">
                    Start Investing
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 px-8 h-14 text-lg">
                  View Demo
                </Button>
              </div>
              <div className="flex items-center gap-8 pt-8 border-t border-white/10">
                <div>
                  <div className="text-3xl font-bold">$12.5B+</div>
                  <div className="text-sm text-white/50">Assets Managed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">50k+</div>
                  <div className="text-sm text-white/50">Global Investors</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">99.9%</div>
                  <div className="text-sm text-white/50">Security Audit Score</div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block relative animate-in fade-in zoom-in duration-1000">
              <div className="relative z-10 bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 p-8 shadow-2xl">
                <img 
                  src="https://picsum.photos/seed/apex_hero/800/600" 
                  alt="ApexVest Dashboard Preview" 
                  className="rounded-2xl shadow-lg"
                  data-ai-hint="finance dashboard"
                />
                <div className="absolute -bottom-6 -left-6 bg-accent text-primary p-6 rounded-2xl shadow-xl animate-bounce duration-[3000ms]">
                  <TrendingUp className="h-10 w-10" />
                </div>
                <div className="absolute -top-6 -right-6 bg-white text-primary p-6 rounded-2xl shadow-xl">
                  <BarChart3 className="h-10 w-10" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Carousel */}
        <section id="solutions" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-bold tracking-tight text-primary">Integrated Investment Solutions</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Explore our diversified asset classes and sophisticated tools designed for the modern investor.
              </p>
            </div>

            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent>
                <CarouselItem className="md:basis-1/2 lg:basis-1/3 p-4">
                  <Card className="h-full border-2 hover:border-accent transition-colors">
                    <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                      <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center">
                        <Bitcoin className="h-10 w-10 text-orange-600" />
                      </div>
                      <h3 className="text-xl font-bold">Crypto Portfolios</h3>
                      <p className="text-sm text-muted-foreground">Expertly curated digital asset bundles with real-time risk mitigation.</p>
                      <Button variant="link" className="group text-primary font-bold p-0">
                        Explore Crypto <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/3 p-4">
                  <Card className="h-full border-2 hover:border-accent transition-colors">
                    <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                      <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
                        <Building2 className="h-10 w-10 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold">Premium Real Estate</h3>
                      <p className="text-sm text-muted-foreground">Fractional ownership in high-yield commercial and luxury residential assets.</p>
                      <Button variant="link" className="group text-primary font-bold p-0">
                        View Properties <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/3 p-4">
                  <Card className="h-full border-2 hover:border-accent transition-colors">
                    <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                      <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center">
                        <Cpu className="h-10 w-10 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">AI Strategist</h3>
                      <p className="text-sm text-muted-foreground">GenAI-driven market sentiment analysis tailored to your specific holdings.</p>
                      <Button variant="link" className="group text-primary font-bold p-0">
                        Try AI Analyst <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/3 p-4">
                  <Card className="h-full border-2 hover:border-accent transition-colors">
                    <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                      <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">
                        <ShieldCheck className="h-10 w-10 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold">Secure Vault</h3>
                      <p className="text-sm text-muted-foreground">Institutional-grade multi-sig security for all your platform assets.</p>
                      <Button variant="link" className="group text-primary font-bold p-0">
                        Learn Security <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              </CarouselContent>
              <div className="flex justify-center gap-4 mt-8">
                <CarouselPrevious className="static translate-y-0" />
                <CarouselNext className="static translate-y-0" />
              </div>
            </Carousel>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold tracking-tight text-primary">Built for Institutional Excellence</h2>
                <p className="text-muted-foreground text-lg">
                  ApexVest bridges the gap between traditional finance and the decentralized future, providing the tools you need to grow your wealth with confidence.
                </p>
                <div className="grid gap-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Global Asset Access</h4>
                      <p className="text-muted-foreground text-sm">Invest in markets across North America, Europe, and Asia with a single account.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">VIP Advisory Support</h4>
                      <p className="text-muted-foreground text-sm">Dedicated account managers for high-net-worth individual and corporate clients.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-xl border relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-12 opacity-5">
                    <ShieldCheck className="w-64 h-64 text-primary" />
                 </div>
                 <div className="relative z-10 space-y-6">
                    <div className="p-4 bg-accent/10 rounded-xl border border-accent/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold">Portfolio Health</span>
                        <span className="text-green-600 font-bold">Excellent</span>
                      </div>
                      <div className="h-2 w-full bg-accent/20 rounded-full">
                        <div className="h-full w-[92%] bg-accent rounded-full" />
                      </div>
                    </div>
                    <div className="space-y-2">
                       <h3 className="font-bold text-xl">Real-time Risk Monitoring</h3>
                       <p className="text-muted-foreground text-sm italic">"Our automated systems detected a potential liquidity drop in the ETH market and adjusted your hedge positions automatically."</p>
                    </div>
                    <Button className="w-full bg-primary h-12">Learn More About Safety</Button>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-accent text-primary">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">Ready to Redefine Your Portfolio?</h2>
            <p className="text-xl opacity-80">Join thousands of elite investors who trust ApexVest with their financial future.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90 px-10 h-16 text-xl font-bold shadow-2xl">
                  Get Started Now
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary/10 px-10 h-16 text-xl font-bold">
                Contact Sales
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
