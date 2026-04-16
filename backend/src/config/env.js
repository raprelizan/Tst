import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 4000),
  frontendOrigin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  databaseUrl: process.env.DATABASE_URL || '',
  encryptionKey: process.env.CONFIDENTIAL_ENCRYPTION_KEY || ''
};

if (!env.encryptionKey || env.encryptionKey.length < 32) {
  console.warn('CONFIDENTIAL_ENCRYPTION_KEY should be at least 32 characters.');
}
