import { apiCache } from "./cache"
import { applyMiddleware, withLogging, withAuth } from "./middleware"
import { Comment } from "@/types/api"
import { API_BASE_URL, CACHE_TTL } from "./config"
import { ApiError, handleApiError } from "./error-handling"

// Create a fetch function with middleware applied - include authentication since comments require auth
const fetchWithMiddleware = applyMiddleware([withLogging, withAuth])

export const commentApi = {
    /**
     * Get comments for a story or chapter
     */
    getAll: async (storyId: number, chapterId?: number): Promise<Comment[]> => {
        try {
            const cacheKey = `comments_${storyId}_${chapterId || "story"}`

            // Check cache first
            const cachedComments = apiCache.get<Comment[]>(cacheKey)
            if (cachedComments) {
                return cachedComments
            }

            const url = chapterId
                ? `${API_BASE_URL}/comments?storyId=${storyId}&chapterId=${chapterId}`
                : `${API_BASE_URL}/comments?storyId=${storyId}`

            const res = await fetchWithMiddleware(url)

            if (!res.ok) {
                throw await ApiError.fromResponse(res)
            }

            const data = await res.json()
            const comments = data.data || []

            // Cache for 5 minutes
            apiCache.set(cacheKey, comments, CACHE_TTL.SHORT)

            return comments
        } catch (error) {
            handleApiError(error, "getComments")
            return []
        }
    },

    /**
     * Create a new comment
     */
    create: async (comment: {
        content: string
        storyId: number
        chapterId?: number
    }): Promise<Comment | null> => {
        try {
            const res = await fetchWithMiddleware(`${API_BASE_URL}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(comment)
            })

            if (!res.ok) {
                throw await ApiError.fromResponse(res)
            }

            const data = await res.json()

            // Invalidate related cache
            apiCache.invalidate(
                `comments_${comment.storyId}_${comment.chapterId || "story"}`
            )

            return data.data
        } catch (error) {
            handleApiError(error, "createComment")
            return null
        }
    },

    /**
     * Update an existing comment
     */
    update: async (
        commentId: number,
        content: string
    ): Promise<Comment | null> => {
        try {
            const res = await fetchWithMiddleware(
                `${API_BASE_URL}/comments/${commentId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ content })
                }
            )

            if (!res.ok) {
                throw await ApiError.fromResponse(res)
            }

            const data = await res.json()

            // We'll need to invalidate all potential caches that could contain this comment
            apiCache.clear()

            return data.data
        } catch (error) {
            handleApiError(error, "updateComment")
            return null
        }
    },

    /**
     * Delete a comment
     */
    delete: async (commentId: number): Promise<boolean> => {
        try {
            const res = await fetchWithMiddleware(
                `${API_BASE_URL}/comments/${commentId}`,
                {
                    method: "DELETE"
                }
            )

            if (!res.ok) {
                throw await ApiError.fromResponse(res)
            }

            // Similar to update, we need to invalidate potentially affected caches
            apiCache.clear()

            return true
        } catch (error) {
            handleApiError(error, "deleteComment")
            return false
        }
    },

    /**
     * Get recent comments across the site (for admin/moderation)
     */
    getRecent: async (
        limit: number = 20,
        page: number = 1
    ): Promise<Comment[]> => {
        try {
            const cacheKey = `comments_recent_${limit}_${page}`

            // Admin functions should have short cache times
            const cachedComments = apiCache.get<Comment[]>(cacheKey)
            if (cachedComments) {
                return cachedComments
            }

            const res = await fetchWithMiddleware(
                `${API_BASE_URL}/comments/recent?limit=${limit}&page=${page}`
            )

            if (!res.ok) {
                throw await ApiError.fromResponse(res)
            }

            const data = await res.json()
            const comments = data.data || []

            // Cache for a short time (2 minutes) since these are admin functions
            apiCache.set(cacheKey, comments, 2 * 60 * 1000)

            return comments
        } catch (error) {
            handleApiError(error, "getRecentComments")
            return []
        }
    }
}

// Legacy exports for backward compatibility
export function getComments(
    storyId: number,
    chapterId?: number
): Promise<Comment[]> {
    return commentApi.getAll(storyId, chapterId)
}

export function createComment(comment: {
    content: string
    storyId: number
    chapterId?: number
}): Promise<Comment | null> {
    return commentApi.create(comment)
}

export function updateComment(
    commentId: number,
    content: string
): Promise<Comment | null> {
    return commentApi.update(commentId, content)
}

export function deleteComment(commentId: number): Promise<boolean> {
    return commentApi.delete(commentId)
}

export function getRecentComments(
    limit: number = 20,
    page: number = 1
): Promise<Comment[]> {
    return commentApi.getRecent(limit, page)
}
