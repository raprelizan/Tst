import rateLimit from 'express-rate-limit';

export const reportLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    error: 'Too many report submissions from this source. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});
