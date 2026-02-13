/**
 * Simple in-memory cache with TTL support
 */
declare class Cache {
    private cache;
    private defaultTTL;
    constructor(defaultTTL?: number);
    /**
     * Gets a value from the cache
     * @param key - The cache key
     * @returns The cached value or null if not found or expired
     */
    get<T>(key: string): T | null;
    /**
     * Sets a value in the cache
     * @param key - The cache key
     * @param data - The data to cache
     * @param ttl - Time to live in milliseconds (optional)
     */
    set<T>(key: string, data: T, ttl?: number): void;
    /**
     * Checks if a key exists and is not expired
     * @param key - The cache key
     * @returns True if key exists and is valid
     */
    has(key: string): boolean;
    /**
     * Deletes a key from the cache
     * @param key - The cache key
     */
    delete(key: string): void;
    /**
     * Clears all cache entries
     */
    clear(): void;
    /**
     * Gets the number of cached entries
     */
    size(): number;
    /**
     * Removes expired entries from the cache
     */
    private cleanExpired;
    /**
     * Generates a cache key from parameters
     * @param prefix - The key prefix (e.g., 'sleep', 'activity')
     * @param params - Parameters to include in the key
     * @returns Cache key string
     */
    static generateKey(prefix: string, params: Record<string, any>): string;
}
export declare const cache: Cache;
export default cache;
//# sourceMappingURL=cache.d.ts.map