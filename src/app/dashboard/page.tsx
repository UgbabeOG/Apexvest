"use client";

import React from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet, 
  Building2, 
  Bitcoin, 
  ChevronRight,
  TrendingUp,
  Activity,
  Cpu
} from 'lucide-react';
import { MOCK_CRYPTO, MOCK_REAL_ESTATE, MOCK_TRANSACTIONS } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function UserDashboard() {
  const totalCrypto = MOCK_CRYPTO.reduce((acc, curr) => acc + (curr.quantity * curr.currentPriceUsd), 0);
  const totalRE = MOCK_REAL_ESTATE.reduce((acc, curr) => acc + curr.estimatedValueUsd, 0);
  const totalValue = totalCrypto + totalRE + 154200; // Including cash balance

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Portfolio Overview</h1>
        <p className="text-muted-foreground">Welcome back, Jane. Here's what's happening with your assets today.</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-primary text-primary-foreground border-none shadow-xl relative overflow-hidden group">
          <div className="absolute right-0 top-0 p-8 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
            <Wallet className="w-32 h-32" />
          </div>
          <CardHeader className="pb-2">
            <CardDescription className="text-primary-foreground/70 font-medium">Consolidated Balance</CardDescription>
            <CardTitle className="text-4xl font-extrabold">${totalValue.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1.5 text-accent font-semibold text-sm">
              <ArrowUpRight className="h-4 w-4" />
              +4.2% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-muted/20 hover:border-accent transition-colors duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Crypto Portfolio</CardTitle>
            <Bitcoin className="h-5 w-5 text-[#f7931a]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCrypto.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <span className="text-green-600 font-bold flex items-center"><ArrowUpRight className="h-3 w-3" /> 2.4%</span> (24h)
            </p>
            <Progress value={65} className="h-1.5 mt-4" />
          </CardContent>
        </Card>

        <Card className="shadow-lg border-muted/20 hover:border-accent transition-colors duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Real Estate Assets</CardTitle>
            <Building2 className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRE.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <span className="text-green-600 font-bold flex items-center"><ArrowUpRight className="h-3 w-3" /> 1.2%</span> (30d)
            </p>
            <Progress value={82} className="h-1.5 mt-4" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column - Asset List */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Top Holdings</CardTitle>
                <CardDescription>Your highest performing assets</CardDescription>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {[...MOCK_CRYPTO, ...MOCK_REAL_ESTATE].slice(0, 4).map((asset, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-accent/5 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-primary">
                        {'symbol' in asset ? asset.symbol[0] : 'RE'}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{'name' in asset ? asset.name : asset.address.split(',')[0]}</div>
                        <div className="text-xs text-muted-foreground">{'symbol' in asset ? asset.symbol : 'Premium Real Estate'}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-sm">
                        ${('quantity' in asset ? asset.quantity * asset.currentPriceUsd : asset.estimatedValueUsd).toLocaleString()}
                      </div>
                      <div className={cn(
                        "text-xs font-semibold flex items-center justify-end gap-1",
                        ('change24hPercent' in asset ? asset.change24hPercent : asset.changeRecentPercent) > 0 ? "text-green-600" : "text-red-600"
                      )}>
                        {('change24hPercent' in asset ? asset.change24hPercent : asset.changeRecentPercent) > 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                        {Math.abs(('change24hPercent' in asset ? asset.change24hPercent : asset.changeRecentPercent))}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest transactions and account updates</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {MOCK_TRANSACTIONS.slice(0, 4).map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        tx.type === 'deposit' ? "bg-green-100 text-green-700" : tx.type === 'withdrawal' ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                      )}>
                        {tx.type === 'deposit' ? <ArrowDownRight className="h-5 w-5 rotate-180" /> : tx.type === 'withdrawal' ? <ArrowUpRight className="h-5 w-5" /> : <Activity className="h-5 w-5" />}
                      </div>
                      <div>
                        <div className="font-semibold text-sm capitalize">{tx.type} • {tx.assetName}</div>
                        <div className="text-xs text-muted-foreground">{tx.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-sm">
                        {tx.type === 'withdrawal' ? '-' : '+'}${tx.amount.toLocaleString()}
                      </div>
                      <Badge variant={tx.status === 'completed' ? 'secondary' : 'outline'} className="text-[10px] h-4 mt-1">
                        {tx.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Column - Watchlist & Quick Actions */}
        <div className="space-y-6">
          <Card className="bg-accent/10 border-accent/20 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Button size="sm" className="bg-primary hover:bg-primary/90">Deposit</Button>
              <Button size="sm" variant="outline">Withdraw</Button>
              <Button size="sm" variant="outline" className="col-span-2">New Investment</Button>
            </CardContent>
          </Card>

          <Card className="shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Watchlist</CardTitle>
              <ChevronRight className="h-5 w-5 text-muted-foreground cursor-pointer" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Bitcoin className="h-5 w-5 text-[#f7931a]" />
                  <span className="text-sm font-semibold">Cardano (ADA)</span>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold">$0.45</div>
                  <div className="text-[10px] text-red-500 font-bold">-2.1%</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold">Bali Villa</span>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold">$1.25M</div>
                  <div className="text-[10px] text-green-500 font-bold">+0.8%</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-none">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Cpu className="h-5 w-5 text-accent" />
                AI Strategy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-white/70 italic">
                "Based on recent market volatility, increasing your Solana (SOL) position might be beneficial for long-term growth..."
              </p>
              <Button variant="secondary" size="sm" className="w-full text-xs font-bold bg-accent text-primary border-none">
                Unlock Full Analysis
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}