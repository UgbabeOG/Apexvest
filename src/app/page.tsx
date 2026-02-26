"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TrendingUp, Lock, ArrowRight, ShieldCheck, Globe, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock Authentication
    setTimeout(() => {
      if (email === 'admin@apexvest.com') {
        router.push('/admin');
      } else if (email === 'jane@example.com') {
        router.push('/dashboard');
      } else {
        toast({
          title: "Authentication Failed",
          description: "Invalid credentials. Try admin@apexvest.com or jane@example.com",
          variant: "destructive"
        });
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side: Branding & Visuals */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611974717482-482f01fd43c8?q=80&w=2070')] bg-cover opacity-10 bg-center" />
        <div className="relative z-10 flex items-center gap-3 text-3xl font-bold tracking-tight">
          <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center shadow-lg">
            <TrendingUp className="text-primary h-8 w-8" />
          </div>
          ApexVest
        </div>

        <div className="relative z-10 max-w-lg space-y-6">
          <h1 className="text-5xl font-extrabold leading-tight">Mastering Wealth Across Frontiers</h1>
          <p className="text-lg text-white/70">
            A unified platform for managing high-growth cryptocurrency portfolios and premium real estate assets. Powered by AI for smarter decisions.
          </p>
          <div className="grid grid-cols-2 gap-6 pt-6">
            <div className="space-y-2">
              <ShieldCheck className="h-8 w-8 text-accent" />
              <h3 className="font-bold">Institutional Security</h3>
              <p className="text-sm text-white/50">Multi-layer protection for all assets.</p>
            </div>
            <div className="space-y-2">
              <Zap className="h-8 w-8 text-accent" />
              <h3 className="font-bold">Real-time Insights</h3>
              <p className="text-sm text-white/50">Market-leading data analytics.</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-sm text-white/30">
          &copy; 2024 ApexVest Global Management Ltd. All rights reserved.
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex flex-col justify-center items-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="text-center lg:hidden flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-xl mb-4">
              <TrendingUp className="text-accent h-10 w-10" />
            </div>
            <h2 className="text-3xl font-bold text-primary">ApexVest</h2>
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight">Welcome Back</h2>
            <p className="text-muted-foreground">Log in to your secure investor portal</p>
          </div>

          <Card className="border-none shadow-none bg-transparent">
            <CardContent className="p-0">
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    className="h-12 border-muted-foreground/20 focus:border-accent transition-colors"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="text-xs text-primary hover:underline font-medium">Forgot password?</a>
                  </div>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type="password" 
                      className="h-12 pr-10 border-muted-foreground/20 focus:border-accent transition-colors"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                    />
                    <Lock className="absolute right-3 top-3.5 h-5 w-5 text-muted-foreground/50" />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-12 text-md font-semibold bg-primary hover:bg-primary/90 shadow-xl group"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : (
                    <>
                      Secure Sign In
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="text-center text-sm text-muted-foreground pt-4">
            New investor? <span className="text-primary font-semibold">Contact your administrator</span> for account creation.
          </div>
        </div>
      </div>
    </div>
  );
}