import { apiCache } from "./cache"
import { applyMiddleware, withLogging } from "./middleware"
import { Story, HotStory, ChapterDetail, Banner } from "@/types/api"

const API_BASE_URL = "https://backend.metruyencv.com/api"

// Create a fetch function with middleware applied
const fetchWithMiddleware = applyMiddleware([withLogging])

export const homeApi = {
    /**
     * Get hot stories list
     */
    getHotStories: async (
        duration: number = 60,
        limit: number = 10,
        page: number = 1
    ): Promise<HotStory[]> => {
        try {
            const cacheKey = `hot_stories_${duration}_${limit}_${page}`

            // Check cache first
            const cachedStories = apiCache.get<HotStory[]>(cacheKey)
            if (cachedStories) {
                return cachedStories
            }
            const res = await fetchWithMiddleware(
                `${API_BASE_URL}/readings/realtime?duration=${duration}&limit=${limit}&page=${page}`
            )
            const data = await res.json()
            const stories = data.data || []

            // Cache for 10 minutes
            apiCache.set(cacheKey, stories, 10 * 60 * 1000)

            return stories
        } catch (error) {
            console.error("Error fetching hot stories:", error)
            return []
        }
    },

    /**
     * Get new chapters
     */
    getNewChapters: async (
        limit: number = 15,
        page: number = 1
    ): Promise<Story[]> => {
        try {
            const cacheKey = `new_chapters_${limit}_${page}`

            // Check cache first
            const cachedStories = apiCache.get<Story[]>(cacheKey)
            if (cachedStories) {
                return cachedStories
            }
            const res = await fetchWithMiddleware(
                `${API_BASE_URL}/books?filter%5Bgender%5D=1&filter%5Bstate%5D=published&include=author%2Cgenres%2Ccreator&limit=${limit}&page=${page}&sort=-new_chap_at`
            )
            const data = await res.json()
            const stories = data.data || []

            // Cache for 5 minutes
            apiCache.set(cacheKey, stories, 5 * 60 * 1000)

            return stories
        } catch (error) {
            console.error("Error fetching new chapters:", error)
            return []
        }
    },

    /**
     * Get completed stories
     */
    getCompletedStories: async (
        limit: number = 10,
        page: number = 1
    ): Promise<Story[]> => {
        try {
            const cacheKey = `completed_stories_${limit}_${page}`

            // Check cache first
            const cachedStories = apiCache.get<Story[]>(cacheKey)
            if (cachedStories) {
                return cachedStories
            }
            const res = await fetchWithMiddleware(
                `${API_BASE_URL}/books?filter%5Bgender%5D=1&filter%5Bstate%5D=published&filter%5Bstatus%5D=2&include=author%2Cgenres%2Ccreator&limit=${limit}&page=${page}&sort=-new_chap_at`
            )
            const data = await res.json()
            const stories = data.data || []

            // Cache for 30 minutes (completed stories don't change often)
            apiCache.set(cacheKey, stories, 30 * 60 * 1000)

            return stories
        } catch (error) {
            console.error("Error fetching completed stories:", error)
            return []
        }
    },

    /**
     * Get suggested stories
     */
    getSuggestedStories: async (
        limit: number = 10,
        page: number = 1
    ): Promise<Story[]> => {
        try {
            const cacheKey = `suggested_stories_${limit}_${page}`

            // Check cache first
            const cachedStories = apiCache.get<Story[]>(cacheKey)
            if (cachedStories) {
                return cachedStories
            }
            const res = await fetchWithMiddleware(
                `${API_BASE_URL}/books?filter%5Bgender%5D=1&filter%5Bstate%5D=published&include=author%2Cgenres%2Ccreator&limit=${limit}&page=${page}&sort=-view_count`
            )
            const data = await res.json()
            const stories = data.data || []

            // Cache for 15 minutes
            apiCache.set(cacheKey, stories, 15 * 60 * 1000)

            return stories
        } catch (error) {
            console.error("Error fetching suggested stories:", error)
            return []
        }
    },

    /**
     * Get banners
     */
    getBanners: async (): Promise<Banner[]> => {
        try {
            const cacheKey = "banners"

            // Check cache first
            const cachedBanners = apiCache.get<Banner[]>(cacheKey)
            if (cachedBanners) {
                return cachedBanners
            }
            const res = await fetchWithMiddleware(`${API_BASE_URL}/banners`)
            const data = await res.json()
            const banners = data.data || []

            // Cache for 1 hour (banners don't change often)
            apiCache.set(cacheKey, banners, 60 * 60 * 1000)

            return banners
        } catch (error) {
            console.error("Error fetching banners:", error)
            return []
        }
    }
}

/**
 * Get hot stories list
 * @deprecated Use homeApi.getHotStories instead
 */
export async function getHotStories(
    duration: number = 60,
    limit: number = 10,
    page: number = 1
): Promise<HotStory[]> {
    return homeApi.getHotStories(duration, limit, page)
}

/**
 * Get new chapters
 * @deprecated Use homeApi.getNewChapters instead
 */
export async function getNewChapters(
    limit: number = 15,
    page: number = 1
): Promise<Story[]> {
    return homeApi.getNewChapters(limit, page)
}

/**
 * Get completed stories
 * @deprecated Use homeApi.getCompletedStories instead
 */
export async function getCompletedStories(
    limit: number = 10,
    page: number = 1
): Promise<Story[]> {
    return homeApi.getCompletedStories(limit, page)
}

/**
 * Get suggested stories
 * @deprecated Use homeApi.getSuggestedStories instead
 */
export async function getSuggestedStories(
    limit: number = 10,
    page: number = 1
): Promise<Story[]> {
    return homeApi.getSuggestedStories(limit, page)
}

/**
 * Get banners
 * @deprecated Use homeApi.getBanners instead
 */
export async function getBanners(): Promise<Banner[]> {
    return homeApi.getBanners()
}
