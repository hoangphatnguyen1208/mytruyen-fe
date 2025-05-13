import {
    applyMiddleware,
    withLogging,
    withCommonHeaders,
    withErrorHandling
} from "./middleware"
import { apiCache } from "./cache"

/**
 * Configuration options for API client
 */
interface ApiClientConfig {
    baseUrl: string
    defaultCacheTTL?: number // in milliseconds
    middlewares?: Array<
        (url: string, options: RequestInit) => Promise<RequestInit>
    >
}

/**
 * Create a consistent API client with middleware and caching
 */
export function createApiClient(config: ApiClientConfig) {
    const {
        baseUrl,
        defaultCacheTTL = 5 * 60 * 1000, // 5 minutes default
        middlewares = [withLogging, withCommonHeaders]
    } = config

    // Create a fetch function with middleware applied
    const fetchWithMiddleware = applyMiddleware(middlewares)

    return {
        /**
         * Make a GET request with caching
         */
        async get<T>(
            path: string,
            options?: {
                cacheTTL?: number
                cacheKey?: string
                params?: Record<string, string | number | boolean>
                skipCache?: boolean
            }
        ): Promise<T> {
            const {
                cacheTTL = defaultCacheTTL,
                cacheKey,
                params,
                skipCache = false
            } = options || {}

            // Build URL with query parameters
            let url = `${baseUrl}${path}`
            if (params && Object.keys(params).length > 0) {
                const searchParams = new URLSearchParams()
                Object.entries(params).forEach(([key, value]) => {
                    searchParams.append(key, String(value))
                })
                url = `${url}?${searchParams.toString()}`
            }

            // Generate cache key
            const key = cacheKey || `get_${url}`

            // Check cache first if not explicitly skipped
            if (!skipCache) {
                const cachedData = apiCache.get<T>(key)
                if (cachedData) {
                    return cachedData
                }
            }

            try {
                const res = await fetchWithMiddleware(url)

                if (!res.ok) {
                    throw new Error(
                        `API error: ${res.status} ${res.statusText}`
                    )
                }

                const data = await res.json()

                // Cache the response
                if (!skipCache) {
                    apiCache.set(key, data, cacheTTL)
                }

                return data
            } catch (error) {
                console.error(`Error fetching ${url}:`, error)
                throw error
            }
        },

        /**
         * Make a POST request
         */
        async post<T>(
            path: string,
            body: any,
            options?: {
                cacheTTL?: number
                cacheKey?: string
                invalidateCache?: string[]
            }
        ): Promise<T> {
            const {
                cacheTTL = defaultCacheTTL,
                cacheKey,
                invalidateCache = []
            } = options || {}

            const url = `${baseUrl}${path}`
            const key = cacheKey || `post_${url}_${JSON.stringify(body)}`

            try {
                const res = await fetchWithMiddleware(url, {
                    method: "POST",
                    body: JSON.stringify(body)
                })

                if (!res.ok) {
                    throw new Error(
                        `API error: ${res.status} ${res.statusText}`
                    )
                }

                const data = await res.json()

                // Invalidate related cache entries if specified
                invalidateCache.forEach((cacheKey) => {
                    apiCache.invalidate(cacheKey)
                })

                // Cache the response
                apiCache.set(key, data, cacheTTL)

                return data
            } catch (error) {
                console.error(`Error posting to ${url}:`, error)
                throw error
            }
        },

        /**
         * Clear all cached data
         */
        clearCache() {
            apiCache.clear()
        }
    }
}
