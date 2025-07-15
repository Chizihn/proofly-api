import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const JWT_SECRET = process.env.JWT_SECRET || '';
export const CIVIC_JWKS_URI = process.env.CIVIC_JWKS_URI || 'https://auth.civic.com/.well-known/jwks.json';
export const SOLANA_RPC_URL = process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com';
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/proofly'; 