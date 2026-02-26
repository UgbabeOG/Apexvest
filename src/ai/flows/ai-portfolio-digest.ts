'use server';
/**
 * @fileOverview A Genkit flow that generates a daily investment portfolio digest for a user.
 *
 * - aiPortfolioDigest - A function that handles the generation of the portfolio digest.
 * - AIPortfolioDigestInput - The input type for the aiPortfolioDigest function.
 * - AIPortfolioDigestOutput - The return type for the aiPortfolioDigest function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CryptoHoldingSchema = z.object({
  symbol: z.string().describe('The symbol of the cryptocurrency (e.g., "BTC").'),
  name: z.string().describe('The full name of the cryptocurrency (e.g., "Bitcoin").'),
  quantity: z.number().describe('The quantity of the cryptocurrency held.'),
  currentPriceUsd: z.number().describe('The current price of one unit of the cryptocurrency in USD.'),
  change24hPercent: z.number().describe('The percentage change in price over the last 24 hours.'),
  purchasePriceUsd: z.number().optional().describe('The purchase price of one unit of the cryptocurrency in USD, if available.'),
});

const RealEstateHoldingSchema = z.object({
  address: z.string().describe('The address or identifier of the real estate asset.'),
  estimatedValueUsd: z.number().describe('The current estimated value of the real estate asset in USD.'),
  changeRecentPercent: z.number().describe('The recent percentage change in the estimated value.'),
  purchasePriceUsd: z.number().optional().describe('The purchase price of the real estate asset in USD, if available.'),
});

const WatchlistItemSchema = z.object({
  assetType: z.enum(['crypto', 'real_estate']).describe('The type of asset being watched.'),
  name: z.string().describe('The name or symbol of the asset.'),
  currentValueUsd: z.number().describe('The current value of the asset in USD.'),
  change24hPercent: z.number().optional().describe('The percentage change in price over the last 24 hours for crypto assets. Only for crypto type.'),
  changeRecentPercent: z.number().optional().describe('The recent percentage change in value for real estate assets. Only for real estate type.'),
});

const AIPortfolioDigestInputSchema = z.object({
  userName: z.string().describe('The name of the user for personalization.'),
  cryptoHoldings: z.array(CryptoHoldingSchema).describe('A list of the user\'s cryptocurrency holdings.').default([]),
  realEstateHoldings: z.array(RealEstateHoldingSchema).describe('A list of the user\'s real estate holdings.').default([]),
  watchlistItems: z.array(WatchlistItemSchema).describe('A list of assets the user is tracking on their watchlist.').default([]),
}).describe('Input for generating a daily investment portfolio digest.');

export type AIPortfolioDigestInput = z.infer<typeof AIPortfolioDigestInputSchema>;

const AIPortfolioDigestOutputSchema = z.string().describe('A personalized daily digest summarizing the user\'s portfolio performance, significant changes, and key insights.');

export type AIPortfolioDigestOutput = z.infer<typeof AIPortfolioDigestOutputSchema>;

export async function aiPortfolioDigest(input: AIPortfolioDigestInput): Promise<AIPortfolioDigestOutput> {
  return aiPortfolioDigestFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPortfolioDigestPrompt',
  input: { schema: AIPortfolioDigestInputSchema },
  output: { schema: AIPortfolioDigestOutputSchema },
  prompt: `Hello {{{userName}}}, here is your ApexVest Daily Investment Digest:\n\nYou are a sophisticated financial analyst providing a concise, personalized daily digest of investment portfolio performance. Your goal is to summarize the user's portfolio, highlight significant changes in asset values, and identify key insights or trends relevant to their holdings. Focus on recent changes and provide actionable or reflective commentary.\n\n---\n\n**Current Holdings Overview:**\n\n{{#if cryptoHoldings.length}}\n**Cryptocurrency Holdings:**\n{{#each cryptoHoldings}}\n- {{name}} ({{{symbol}}}): {{quantity}} units, valued at $P{currentPriceUsd}. 24h Change: {{{change24hPercent}}}%.\n{{/each}}\n{{else}}\nYou currently have no cryptocurrency holdings.\n{{/if}}\n\n{{#if realEstateHoldings.length}}\n**Real Estate Holdings:**\n{{#each realEstateHoldings}}\n- Asset at {{{address}}}: Estimated value $P{estimatedValueUsd}. Recent Change: {{{changeRecentPercent}}}%.\n{{/each}}\n{{else}}\nYou currently have no real estate holdings.\n{{/if}}\n\n---\n\n**Performance Summary & Key Insights:**\n\nBased on your current holdings and their recent performance:\n\n1.  **Overall Portfolio Sentiment:** Briefly describe the general performance trend across your crypto and real estate assets.\n    -   If crypto holdings show mostly positive 24-hour changes, describe a positive crypto market sentiment.\n    -   If real estate holdings show mostly positive recent changes, describe a positive real estate market sentiment.\n    -   If mixed or stable, summarize that accordingly.\n\n2.  **Significant Movers:** Identify the 1-2 assets (from either crypto or real estate) that have experienced the largest positive or negative percentage changes.\n    -   For cryptocurrencies, prioritize the 'change24hPercent'.\n    -   For real estate, prioritize the 'changeRecentPercent'.\n    -   Briefly explain the magnitude of these changes and their potential impact on your portfolio.\n\n3.  **Key Trends & Opportunities/Risks:**\n    -   Based on the identified changes, infer any notable market trends (e.g., a sector-specific rally, a general downturn, or a stable period).\n    -   Suggest potential implications for your portfolio or areas to watch. For example, if an asset is performing exceptionally well, it could be an opportunity; if it's dropping significantly, it might be a risk. Consider factors like diversification or concentration.\n\n---\n\n**Watchlist Update:**\n\n{{#if watchlistItems.length}}\nHere's a quick look at your watchlist:\n{{#each watchlistItems}}\n- {{name}} ({{assetType}}): Current value $P{currentValueUsd}.\n  {{#if change24hPercent}}24h Change: {{{change24hPercent}}}%.{{/if}}\n  {{#if changeRecentPercent}}Recent Change: {{{changeRecentPercent}}}%.{{/if}}\n{{/each}}\n{{else}}\nYour watchlist is currently empty.\n{{/if}}\n\n---\n\n**Disclaimer:** This digest is for informational purposes only and does not constitute financial advice. Please consult with a professional financial advisor before making any investment decisions.`,
});

const aiPortfolioDigestFlow = ai.defineFlow(
  {
    name: 'aiPortfolioDigestFlow',
    inputSchema: AIPortfolioDigestInputSchema,
    outputSchema: AIPortfolioDigestOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
