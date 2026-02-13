/**
 * Simple in-memory cache with TTL support
 */
class Cache {
    cache;
    defaultTTL;
    constructor(defaultTTL = 300000) {
        // Default 5 minutes
        this.cache = new Map();
        this.defaultTTL = defaultTTL;
    }
    /**
     * Gets a value from the cache
     * @param key - The cache key
     * @returns The cached value or null if not found or expired
     */
    get(key) {
        const entry = this.cache.get(key);
        if (!entry) {
            return null;
        }
        // Check if expired
        if (Date.now() > entry.expiresAt) {
            this.cache.delete(key);
            return null;
        }
        return entry.data;
    }
    /**
     * Sets a value in the cache
     * @param key - The cache key
     * @param data - The data to cache
     * @param ttl - Time to live in milliseconds (optional)
     */
    set(key, data, ttl) {
        const expiresAt = Date.now() + (ttl || this.defaultTTL);
        this.cache.set(key, {
            data,
            expiresAt,
        });
    }
    /**
     * Checks if a key exists and is not expired
     * @param key - The cache key
     * @returns True if key exists and is valid
     */
    has(key) {
        return this.get(key) !== null;
    }
    /**
     * Deletes a key from the cache
     * @param key - The cache key
     */
    delete(key) {
        this.cache.delete(key);
    }
    /**
     * Clears all cache entries
     */
    clear() {
        this.cache.clear();
    }
    /**
     * Gets the number of cached entries
     */
    size() {
        // Clean expired entries first
        this.cleanExpired();
        return this.cache.size;
    }
    /**
     * Removes expired entries from the cache
     */
    cleanExpired() {
        const now = Date.now();
        const keysToDelete = [];
        for (const [key, entry] of this.cache.entries()) {
            if (now > entry.expiresAt) {
                keysToDelete.push(key);
            }
        }
        for (const key of keysToDelete) {
            this.cache.delete(key);
        }
    }
    /**
     * Generates a cache key from parameters
     * @param prefix - The key prefix (e.g., 'sleep', 'activity')
     * @param params - Parameters to include in the key
     * @returns Cache key string
     */
    static generateKey(prefix, params) {
        const sortedParams = Object.keys(params)
            .sort()
            .map((key) => `${key}=${params[key]}`)
            .join('&');
        return `${prefix}:${sortedParams}`;
    }
}
// Create and export a singleton cache instance
const defaultTTL = process.env.CACHE_TTL ? parseInt(process.env.CACHE_TTL, 10) * 1000 : 300000;
export const cache = new Cache(defaultTTL);
// Clean expired entries every minute
setInterval(() => {
    cache.cleanExpired();
}, 60000);
export default cache;
//# sourceMappingURL=cache.js.map