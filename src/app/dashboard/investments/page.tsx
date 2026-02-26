"use client";

import React from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MOCK_CRYPTO, MOCK_REAL_ESTATE } from '@/lib/mock-data';
import { Bitcoin, Building2, ExternalLink, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function InvestmentsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-primary">Your Portfolio</h1>
          <p className="text-muted-foreground">Deep dive into your current holdings across asset classes.</p>
        </div>
        <Button className="bg-primary shadow-lg">Manage Asset Allocation</Button>
      </div>

      <Tabs defaultValue="crypto" className="w-full space-y-6">
        <TabsList className="bg-muted p-1">
          <TabsTrigger value="crypto" className="gap-2 px-6">
            <Bitcoin className="h-4 w-4" /> Cryptocurrency
          </TabsTrigger>
          <TabsTrigger value="realestate" className="gap-2 px-6">
            <Building2 className="h-4 w-4" /> Real Estate
          </TabsTrigger>
        </TabsList>

        <TabsContent value="crypto" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_CRYPTO.map((crypto) => (
              <Card key={crypto.symbol} className="shadow-lg hover:shadow-xl transition-all">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                      {crypto.symbol[0]}
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      +{crypto.change24hPercent}%
                    </Badge>
                  </div>
                  <CardTitle className="mt-4">{crypto.name}</CardTitle>
                  <CardDescription>{crypto.symbol} • {crypto.quantity} units</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 pt-4">
                    <div className="flex justify-between items-end border-b pb-2">
                      <span className="text-sm text-muted-foreground">Market Value</span>
                      <span className="text-lg font-bold">${(crypto.quantity * crypto.currentPriceUsd).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-end text-sm">
                      <span className="text-muted-foreground">Purchase Cost</span>
                      <span className="font-semibold">${(crypto.quantity * crypto.purchasePriceUsd).toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
                <div className="px-6 py-4 bg-muted/20 flex justify-between items-center">
                  <span className="text-xs font-bold text-green-600">Profit: +${((crypto.currentPriceUsd - crypto.purchasePriceUsd) * crypto.quantity).toLocaleString()}</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="realestate" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {MOCK_REAL_ESTATE.map((re, idx) => (
              <Card key={idx} className="shadow-lg overflow-hidden flex flex-col md:flex-row">
                <div className="md:w-1/3 bg-muted relative min-h-[200px]">
                  <img 
                    src={`https://picsum.photos/seed/property${idx}/600/400`} 
                    alt="Property" 
                    className="absolute inset-0 w-full h-full object-cover"
                    data-ai-hint="modern luxury real estate"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-primary text-white">Verified</Badge>
                  </div>
                </div>
                <div className="flex-1 p-6 space-y-4">
                  <div>
                    <CardTitle className="text-xl">{re.address.split(',')[0]}</CardTitle>
                    <CardDescription>{re.address.split(',').slice(1).join(',')}</CardDescription>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground block uppercase font-bold tracking-wider">Valuation</span>
                      <span className="text-xl font-bold text-primary">${re.estimatedValueUsd.toLocaleString()}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground block uppercase font-bold tracking-wider">Recent Trend</span>
                      <span className="text-lg font-bold text-green-600">+{re.changeRecentPercent}%</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground bg-blue-50 p-2 rounded border border-blue-100">
                    <Info className="h-4 w-4 text-primary shrink-0" />
                    Property taxes and maintenance fees are up to date.
                  </div>
                  <Button variant="outline" size="sm" className="w-full">Manage Listing & Rental Docs</Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}