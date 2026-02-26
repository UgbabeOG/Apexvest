"use client";

import React from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bitcoin, Building2, Plus, TrendingUp, TrendingDown, EyeOff } from 'lucide-react';
import { WATCHLIST } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function WatchlistPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-primary">Market Watchlist</h1>
          <p className="text-muted-foreground">Keep track of promising assets across crypto and real estate markets.</p>
        </div>
        <Button className="bg-primary gap-2 shadow-lg">
          <Plus className="h-4 w-4" /> Add Asset
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {WATCHLIST.map((item) => (
          <Card key={item.id} className="hover:shadow-xl transition-all duration-300 group overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2 rounded-lg",
                  item.type === 'crypto' ? "bg-[#f7931a]/10" : "bg-primary/10"
                )}>
                  {item.type === 'crypto' ? <Bitcoin className="h-6 w-6 text-[#f7931a]" /> : <Building2 className="h-6 w-6 text-primary" />}
                </div>
                <div>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <CardDescription className="text-xs uppercase font-bold">{item.symbol}</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              </Button>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-bold">${item.price.toLocaleString()}</div>
                  <div className={cn(
                    "text-sm font-semibold flex items-center gap-1 mt-1",
                    item.change > 0 ? "text-green-600" : "text-red-600"
                  )}>
                    {item.change > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {Math.abs(item.change)}%
                  </div>
                </div>
                <div className="h-10 w-24 bg-muted/30 rounded-md flex items-end p-1 gap-0.5">
                  {/* Mock mini-chart dots */}
                  {[2, 4, 3, 5, 8, 6, 7, 9].map((h, i) => (
                    <div key={i} className="flex-1 bg-accent/40 rounded-t-sm" style={{ height: `${h * 10}%` }} />
                  ))}
                </div>
              </div>
            </CardContent>
            <div className="bg-muted/30 px-6 py-3 border-t">
              <Button variant="link" size="sm" className="p-0 h-auto text-xs text-primary font-bold">
                View Deep Analysis
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}