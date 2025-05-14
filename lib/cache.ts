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
     * Get a value from cache with its metadata
     * @param key The cache key
     * @returns The cached value with metadata or null if not found or expired
     */
    getWithMetadata<T>(
        key: string
    ): { data: T; timestamp: number; expiresAt: number } | null {
        const entry = this.cache.get(key)

        if (!entry) {
            return null
        }

        // Check if cached data has expired
        if (Date.now() > entry.expiresAt) {
            this.cache.delete(key)
            return null
        }

        return {
            data: entry.data as T,
            timestamp: entry.timestamp,
            expiresAt: entry.expiresAt
        }
    }

    /**
     * Set a value in cache
     * @param key The cache key
     * @param data The data to cache
     * @param ttl Time to live in milliseconds, defaults to 5 minutes
     * @param relatedKeys Array of related keys that should be invalidated when this key is invalidated
     */
    set<T>(
        key: string,
        data: T,
        ttl: number = this.defaultTTL,
        relatedKeys: string[] = []
    ): void {
        const timestamp = Date.now()
        const expiresAt = timestamp + ttl

        this.cache.set(key, {
            data,
            timestamp,
            expiresAt
        })

        // Store this key as related to other keys for chain invalidation
        if (relatedKeys.length > 0) {
            this.registerRelatedKeys(key, relatedKeys)
        }
    }

    /**
     * Register key relationships for chain invalidation
     * @param key The primary key
     * @param relatedKeys Keys that are related to the primary key
     */
    private registerRelatedKeys(key: string, relatedKeys: string[]): void {
        // The key format for storing relationships
        const relationKey = `__rel:${key}`
        this.cache.set(relationKey, {
            data: relatedKeys,
            timestamp: Date.now(),
            expiresAt: Infinity // Relationships don't expire
        })
    }

    /**
     * Invalidate a key and its related keys
     * @param key The key to invalidate
     * @param invalidateRelated Whether to invalidate related keys
     */
    private invalidateWithRelated(
        key: string,
        invalidateRelated: boolean = true
    ): void {
        this.cache.delete(key)

        if (invalidateRelated) {
            // Check if we have relations for this key
            const relationKey = `__rel:${key}`
            const relatedKeys = this.get<string[]>(relationKey)

            if (relatedKeys) {
                // Invalidate all related keys
                relatedKeys.forEach((relKey) => {
                    this.cache.delete(relKey)
                })

                // Remove the relationship entry
                this.cache.delete(relationKey)
            }
        }
    }

    /**
     * Clear a specific key from cache
     * @param key The cache key to remove
     * @param invalidateRelated Whether to invalidate related keys
     */
    invalidate(key: string, invalidateRelated: boolean = true): void {
        this.invalidateWithRelated(key, invalidateRelated)
    }

    /**
     * Clear all cache entries that match a specific prefix
     * @param prefix The key prefix to match
     */
    invalidateByPrefix(prefix: string): void {
        const keysToInvalidate: string[] = []

        for (const key of this.cache.keys()) {
            if (key.startsWith(prefix) && !key.startsWith("__rel:")) {
                keysToInvalidate.push(key)
            }
        }

        // Invalidate all matched keys
        keysToInvalidate.forEach((key) => {
            this.invalidateWithRelated(key, true)
        })
    }

    /**
     * Clear all cache entries
     */
    clear(): void {
        this.cache.clear()
    }

    /**
     * Invalidate all paginated cache entries for a resource
     * @param resourceId The resource identifier (e.g., story ID)
     */
    invalidatePaginatedResource(resourceId: string | number): void {
        this.invalidateByPrefix(`chapters_paginated_${resourceId}`)
        this.invalidateByPrefix(`chapters_${resourceId}`)
    }
}

// Create a singleton instance
export const apiCache = new ApiCache()
