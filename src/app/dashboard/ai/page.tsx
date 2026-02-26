"use client";

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BrainCircuit, Cpu, ShieldAlert, Zap, Loader2, Sparkles, RefreshCcw } from 'lucide-react';
import { analyzeMarketImpact, type AIMarketImpactAnalysisOutput } from '@/ai/flows/ai-market-impact-analysis';
import { MOCK_CRYPTO, MOCK_REAL_ESTATE } from '@/lib/mock-data';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function AIInsightsPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AIMarketImpactAnalysisOutput | null>(null);

  const portfolioSummary = `My portfolio includes ${MOCK_CRYPTO.map(c => `${c.quantity} ${c.symbol}`).join(', ')} and real estate assets at ${MOCK_REAL_ESTATE.map(r => r.address).join(', ')} worth approximately $${MOCK_REAL_ESTATE.reduce((a, b) => a + b.estimatedValueUsd, 0).toLocaleString()}.`;

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeMarketImpact({
        marketEvents: "Crypto markets are experiencing moderate volatility due to upcoming regulatory announcements. US Real estate market remains stable but high interest rates are cooling demand in luxury segments.",
        userPortfolio: portfolioSummary
      });
      setAnalysis(result);
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
            <Cpu className="h-8 w-8 text-accent" />
            AI Investment Strategist
          </h1>
          <p className="text-muted-foreground">Get personalized insights and potential strategies based on your unique portfolio.</p>
        </div>
        <Button 
          onClick={runAnalysis} 
          disabled={isAnalyzing}
          className="bg-primary hover:bg-primary/90 shadow-lg px-8 h-12"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing Data...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Generate Insights
            </>
          )}
        </Button>
      </div>

      {!analysis && !isAnalyzing && (
        <Card className="border-dashed bg-muted/30 p-12 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center">
            <BrainCircuit className="h-10 w-10 text-primary/30" />
          </div>
          <div className="max-w-md">
            <h3 className="text-xl font-bold text-primary">Ready to Optimize Your Portfolio?</h3>
            <p className="text-muted-foreground mt-2">Our AI analyzes thousands of data points across global markets to find opportunities specific to your holdings.</p>
          </div>
          <Button onClick={runAnalysis} variant="outline">Run Initial Analysis</Button>
        </Card>
      )}

      {analysis && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in zoom-in-95 duration-500">
          <Card className="shadow-xl overflow-hidden border-none">
            <CardHeader className="bg-primary text-white">
              <CardTitle className="flex items-center gap-2">
                <Bitcoin className="h-5 w-5 text-accent" />
                Crypto Asset Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-sm leading-relaxed text-muted-foreground">{analysis.cryptoImpact}</p>
            </CardContent>
          </Card>

          <Card className="shadow-xl overflow-hidden border-none">
            <CardHeader className="bg-accent text-primary">
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Opportunities Identified
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-sm leading-relaxed text-muted-foreground">{analysis.overallOpportunities}</p>
            </CardContent>
          </Card>

          <Card className="shadow-xl overflow-hidden border-none">
            <CardHeader className="bg-[#f59e0b] text-white">
              <CardTitle className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5" />
                Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <p className="text-sm leading-relaxed text-muted-foreground font-semibold">Overall Risks:</p>
                <p className="text-sm text-muted-foreground italic">{analysis.overallRisks}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl overflow-hidden border-none">
            <CardHeader className="bg-green-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <RefreshCcw className="h-5 w-5" />
                Suggested Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-3">
                {analysis.suggestedStrategies.map((strategy, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-muted-foreground border-b pb-2 last:border-0">
                    <div className="h-5 w-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center shrink-0 font-bold text-xs">{idx + 1}</div>
                    {strategy}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="md:col-span-2">
            <Alert className="bg-blue-50 border-blue-200">
              <ShieldAlert className="h-4 w-4 text-primary" />
              <AlertTitle className="text-primary font-bold">Important Disclaimer</AlertTitle>
              <AlertDescription className="text-primary/70 text-xs">
                This analysis is generated by an artificial intelligence and is for informational purposes only. Investment involve risks. Always consult with a certified financial advisor before making significant financial decisions.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}