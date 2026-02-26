export type Role = 'admin' | 'investor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  balance: number;
  status: 'active' | 'suspended';
  createdAt: string;
}

export interface CryptoHolding {
  symbol: string;
  name: string;
  quantity: number;
  currentPriceUsd: number;
  change24hPercent: number;
  purchasePriceUsd: number;
}

export interface RealEstateHolding {
  address: string;
  estimatedValueUsd: number;
  changeRecentPercent: number;
  purchasePriceUsd: number;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'investment';
  assetType: 'crypto' | 'real_estate' | 'cash';
  amount: number;
  assetName: string;
  date: string;
  status: 'completed' | 'pending' | 'rejected';
}

export const INITIAL_USERS: User[] = [
  {
    id: '1',
    name: 'Admin Apex',
    email: 'admin@apexvest.com',
    role: 'admin',
    balance: 0,
    status: 'active',
    createdAt: '2023-01-01',
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'jane@example.com',
    role: 'investor',
    balance: 154200,
    status: 'active',
    createdAt: '2023-05-12',
  },
  {
    id: '3',
    name: 'John Investor',
    email: 'john@invest.com',
    role: 'investor',
    balance: 8500,
    status: 'suspended',
    createdAt: '2023-08-20',
  }
];

export const MOCK_CRYPTO: CryptoHolding[] = [
  { symbol: 'BTC', name: 'Bitcoin', quantity: 1.25, currentPriceUsd: 64200.50, change24hPercent: 2.4, purchasePriceUsd: 45000 },
  { symbol: 'ETH', name: 'Ethereum', quantity: 15.0, currentPriceUsd: 3450.20, change24hPercent: -1.2, purchasePriceUsd: 2800 },
  { symbol: 'SOL', name: 'Solana', quantity: 120.0, currentPriceUsd: 145.75, change24hPercent: 5.8, purchasePriceUsd: 90 },
];

export const MOCK_REAL_ESTATE: RealEstateHolding[] = [
  { address: '123 Luxury Ave, Miami, FL', estimatedValueUsd: 850000, changeRecentPercent: 1.5, purchasePriceUsd: 720000 },
  { address: '789 Tech Plaza, Austin, TX', estimatedValueUsd: 420000, changeRecentPercent: 4.2, purchasePriceUsd: 350000 },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'tx1', type: 'deposit', assetType: 'cash', amount: 50000, assetName: 'USD Wallet', date: '2024-01-15', status: 'completed' },
  { id: 'tx2', type: 'investment', assetType: 'crypto', amount: 15000, assetName: 'Bitcoin (BTC)', date: '2024-01-20', status: 'completed' },
  { id: 'tx3', type: 'withdrawal', assetType: 'cash', amount: 5000, assetName: 'Bank Account', date: '2024-02-01', status: 'pending' },
  { id: 'tx4', type: 'investment', assetType: 'real_estate', amount: 120000, assetName: 'Miami Condo', date: '2024-02-10', status: 'completed' },
];

export const WATCHLIST = [
  { id: 'w1', name: 'Cardano', symbol: 'ADA', price: 0.45, change: -2.1, type: 'crypto' },
  { id: 'w2', name: 'Polkadot', symbol: 'DOT', price: 7.20, change: 1.5, type: 'crypto' },
  { id: 'w3', name: 'Beachfront Villa, Bali', symbol: 'RE-BALI', price: 1250000, change: 0.8, type: 'real_estate' },
];