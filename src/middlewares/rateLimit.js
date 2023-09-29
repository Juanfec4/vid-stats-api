import rateLimit from "express-rate-limit";

const TIME_MINUTES = 1;
const MAX_REQUESTS = 5;

const middleware = rateLimit({
  windowMs: TIME_MINUTES * 60 * 1000,
  limit: MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: `Too many requests. The limit is set to ${MAX_REQUESTS} requests every ${TIME_MINUTES} minutes.`,
  },
});

export default middleware;
