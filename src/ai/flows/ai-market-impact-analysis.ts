'use server';
/**
 * @fileOverview An AI investment insights tool that analyzes market events and their potential impact on a user's portfolio.
 *
 * - analyzeMarketImpact - A function that analyzes market events and provides personalized investment insights.
 * - AIMarketImpactAnalysisInput - The input type for the analyzeMarketImpact function.
 * - AIMarketImpactAnalysisOutput - The return type for the analyzeMarketImpact function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIMarketImpactAnalysisInputSchema = z.object({
  marketEvents: z
    .string()
    .describe(
      'A summary of significant real-time market events (e.g., crypto news, economic indicators, real estate trends).'
    ),
  userPortfolio: z
    .string()
    .describe(
      'A detailed description of the user\'s current investment portfolio, including cryptocurrency holdings and real estate assets. Example: "My portfolio includes 2 BTC, 10 ETH, and a rental property in Austin, Texas worth $500,000."'
    ),
});
export type AIMarketImpactAnalysisInput = z.infer<
  typeof AIMarketImpactAnalysisInputSchema
>;

const AIMarketImpactAnalysisOutputSchema = z.object({
  cryptoImpact: z
    .string()
    .describe('Explanation of potential impact on cryptocurrency holdings.'),
  realEstateImpact: z
    .string()
    .describe('Explanation of potential impact on real estate assets.'),
  overallRisks: z.string().describe('Summary of overall risks identified.'),
  overallOpportunities: z
    .string()
    .describe('Summary of overall opportunities identified.'),
  suggestedStrategies: z
    .array(z.string())
    .describe('List of potential strategies or actions the user could consider.'),
});
export type AIMarketImpactAnalysisOutput = z.infer<
  typeof AIMarketImpactAnalysisOutputSchema
>;

export async function analyzeMarketImpact(
  input: AIMarketImpactAnalysisInput
): Promise<AIMarketImpactAnalysisOutput> {
  return aiMarketImpactAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiMarketImpactAnalysisPrompt',
  input: {schema: AIMarketImpactAnalysisInputSchema},
  output: {schema: AIMarketImpactAnalysisOutputSchema},
  prompt: `You are an expert financial analyst specializing in cryptocurrency and real estate markets. Your task is to analyze significant real-time market events and explain their potential impact on a user's specific investment portfolio.

Provide a comprehensive analysis, including potential impacts on both crypto and real estate assets, identified risks, opportunities, and actionable strategies.

Market Events:
{{{marketEvents}}}

User's Investment Portfolio:
{{{userPortfolio}}}`,
});

const aiMarketImpactAnalysisFlow = ai.defineFlow(
  {
    name: 'aiMarketImpactAnalysisFlow',
    inputSchema: AIMarketImpactAnalysisInputSchema,
    outputSchema: AIMarketImpactAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('AI did not return an output.');
    }
    return output;
  }
);
