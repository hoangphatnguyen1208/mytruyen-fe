/**
 * Simple caching utility for API responses
 */

type CacheEntry<T> = {
    data: T
    timestamp: number
    expiresAt: number
}

class ApiCache {
    private cache: Map<string, CacheEntry<any>> = new Map()
    private defaultTTL: number = 5 * 60 * 1000 // 5 minutes in milliseconds

    /**
     * Get a value from cache
     * @param key The cache key
     * @returns The cached value or null if not found or expired
     */
    get<T>(key: string): T | null {
        const entry = this.cache.get(key)

        if (!entry) {
            return null
        }

        // Check if cached data has expired
        if (Date.now() > entry.expiresAt) {
            this.cache.delete(key)
            return null
        }

        return entry.data as T
    }

    /**
     * Set a value in cache
     * @param key The cache key
     * @param data The data to cache
     * @param ttl Time to live in milliseconds, defaults to 5 minutes
     */
    set<T>(key: string, data: T, ttl: number = this.defaultTTL): void {
        const timestamp = Date.now()
        const expiresAt = timestamp + ttl

        this.cache.set(key, {
            data,
            timestamp,
            expiresAt
        })
    }

    /**
     * Clear a specific key from cache
     * @param key The cache key to remove
     */
    invalidate(key: string): void {
        this.cache.delete(key)
    }

    /**
     * Clear all cache entries that match a specific prefix
     * @param prefix The key prefix to match
     */
    invalidateByPrefix(prefix: string): void {
        for (const key of this.cache.keys()) {
            if (key.startsWith(prefix)) {
                this.cache.delete(key)
            }
        }
    }

    /**
     * Clear all cache entries
     */
    clear(): void {
        this.cache.clear()
    }
}

// Create a singleton instance
export const apiCache = new ApiCache()
