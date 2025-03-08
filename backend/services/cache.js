import Redis from 'ioredis';
import Logger from '../config/logger.js';

class CacheService {
  constructor() {
    this.memoryCache = new Map();
    this.timeouts = new Map();
    
    if (process.env.NODE_ENV === 'production' && process.env.REDIS_HOST) {
      this.initRedis();
    } else {
      Logger.info('Running in development mode - using in-memory cache');
      this.redis = null;
    }
  }

  initRedis() {
    if (process.env.NODE_ENV !== 'production') {
      return; // Don't initialize Redis in non-production environments
    }

    try {
      this.redis = new Redis({
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379,
        password: process.env.REDIS_PASSWORD,
        retryStrategy: (times) => {
          const delay = Math.min(times * 50, 2000);
          Logger.warn(`Redis connection retry in ${delay}ms...`);
          return delay;
        },
      });

      this.redis.on('connect', () => {
        Logger.info('Redis client connected');
      });

      this.redis.on('error', (error) => {
        Logger.error('Redis client error:', error);
      });
    } catch (error) {
      Logger.error('Failed to initialize Redis:', error);
      this.redis = null;
    }
  }

  async get(key) {
    try {
      if (this.redis) {
        const value = await this.redis.get(key);
        return value ? JSON.parse(value) : null;
      } else {
        return this.memoryCache.get(key) || null;
      }
    } catch (error) {
      Logger.error(`Error getting cache key ${key}:`, error);
      return null;
    }
  }

  async set(key, value, ttlSeconds = 3600) {
    try {
      if (this.redis) {
        await this.redis.setex(key, ttlSeconds, JSON.stringify(value));
      } else {
        this.memoryCache.set(key, value);
        // Clear any existing timeout
        if (this.timeouts.has(key)) {
          clearTimeout(this.timeouts.get(key));
        }
        // Set new timeout
        const timeout = setTimeout(() => {
          this.memoryCache.delete(key);
          this.timeouts.delete(key);
        }, ttlSeconds * 1000);
        this.timeouts.set(key, timeout);
      }
      return true;
    } catch (error) {
      Logger.error(`Error setting cache key ${key}:`, error);
      return false;
    }
  }

  async del(key) {
    try {
      if (this.redis) {
        await this.redis.del(key);
      } else {
        this.memoryCache.delete(key);
        if (this.timeouts.has(key)) {
          clearTimeout(this.timeouts.get(key));
          this.timeouts.delete(key);
        }
      }
      return true;
    } catch (error) {
      Logger.error(`Error deleting cache key ${key}:`, error);
      return false;
    }
  }

  async flush() {
    try {
      if (this.redis) {
        await this.redis.flushall();
      } else {
        this.memoryCache.clear();
        for (const timeout of this.timeouts.values()) {
          clearTimeout(timeout);
        }
        this.timeouts.clear();
      }
      return true;
    } catch (error) {
      Logger.error('Error flushing cache:', error);
      return false;
    }
  }

  generateKey(...args) {
    return args.join(':');
  }
}

export default new CacheService(); 