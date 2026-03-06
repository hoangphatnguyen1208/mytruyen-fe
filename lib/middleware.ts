/**
 * API request middleware - a function that runs before/after each API request
 * Can be used for logging, authentication, error handling, etc.
 */

/**
 * Middleware that adds authorization headers to requests
 */
export const withAuth = async (url: string, options: RequestInit = {}) => {
    // Get JWT token from localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem("auth_token") : null

    // Add Authorization header if token exists
    if (token) {
        return {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${token}`
            }
        }
    }

    return options
}

/**
 * Middleware for logging requests
 */
export const withLogging = async (url: string, options: RequestInit = {}) => {
    console.log(`[API Request] ${options.method || "GET"} ${url}`)
    return options
}

/**
 * Middleware for handling API errors
 */
export const withErrorHandling = async (
    url: string,
    options: RequestInit = {}
) => {
    // Add a custom handler for the fetch promise
    const originalFetch = globalThis.fetch

    // Return original options - the actual error handling happens after fetch is called
    return {
        ...options
        // We'll catch errors at the API layer instead
    }
}

/**
 * Middleware for adding common headers
 */
export const withCommonHeaders = async (
    url: string,
    options: RequestInit = {}
) => {
    return {
        ...options,
        headers: {
            ...options.headers,
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-Client": "MyTruyenFE"
        }
    }
}

/**
 * Apply multiple middleware functions to a fetch request
 */
export const applyMiddleware = (
    middlewares: Array<
        (url: string, options: RequestInit) => Promise<RequestInit>
    >
) => {
    return async (url: string, options: RequestInit = {}) => {
        let currentOptions = { ...options }

        for (const middleware of middlewares) {
            currentOptions = await middleware(url, currentOptions)
        }

        return fetch(url, currentOptions)
    }
}

// Example usage:
// const fetchWithMiddleware = applyMiddleware([withLogging, withAuth])
// fetchWithMiddleware('/api/endpoint')
