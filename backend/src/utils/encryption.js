import crypto from 'crypto';
import { env } from '../config/env.js';

const algorithm = 'aes-256-gcm';
const key = crypto
  .createHash('sha256')
  .update(env.encryptionKey || 'fallback-dev-key-change-immediately')
  .digest();

export function encryptSensitivePayload(payload) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  const encrypted = Buffer.concat([
    cipher.update(JSON.stringify(payload), 'utf8'),
    cipher.final()
  ]);

  const tag = cipher.getAuthTag();

  return {
    iv: iv.toString('hex'),
    authTag: tag.toString('hex'),
    encryptedData: encrypted.toString('hex')
  };
}

export function decryptSensitivePayload({ iv, authTag, encryptedData }) {
  const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'));
  decipher.setAuthTag(Buffer.from(authTag, 'hex'));

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedData, 'hex')),
    decipher.final()
  ]);

  return JSON.parse(decrypted.toString('utf8'));
}
