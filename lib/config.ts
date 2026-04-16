/**
 * API Configuration
 */

// Base URL for the main API
export const API_BASE_URL = "https://backend.metruyencv.com/api"

// Base URL for local API
export const LOCAL_API_BASE_URL = "http://localhost:3000/api"

export const API_BASE_URL_V1 = process.env.NEXT_PUBLIC_MYTRUYEN_API_BASE_URL || 'http://localhost:8000/api/v1'

/**
 * Cache TTL (Time-To-Live) configurations in milliseconds
 */
export const CACHE_TTL = {
    SHORT: 3 * 60 * 1000, // 3 minutes
    MEDIUM: 10 * 60 * 1000, // 10 minutes
    LONG: 30 * 60 * 1000, // 30 minutes
    VERY_LONG: 60 * 60 * 1000, // 1 hour

    // Specific cache TTLs
    STORIES: 10 * 60 * 1000, // 10 minutes
    CHAPTERS: 5 * 60 * 1000, // 5 minutes
    SEARCH: 3 * 60 * 1000, // 3 minutes
    BANNERS: 60 * 60 * 1000, // 1 hour
    USER: 30 * 60 * 1000 // 30 minutes
}

/**
 * Default API options
 */
export const DEFAULT_API_OPTIONS = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
    credentials: "include" as const
}

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
    stories: {
        search: "/books/search",
        getById: "/books",
        getChapters: "/chapters"
    },
    home: {
        hotStories: "/readings/realtime",
        banners: "/banners"
    },
    comments: {
        getAll: "/comments",
        create: "/comments",
        update: "/comments/{id}",
        delete: "/comments/{id}"
    },
    auth: {
        login: "/auth/login",
        register: "/auth/register",
        logout: "/auth/logout",
        refreshToken: "/auth/refresh-token"
    },
    user: {
        profile: "/user/profile",
        bookmarks: "/user/bookmarks"
    }
}
