import { Story, ChapterDetail, Comment } from "@/types/api"
import { apiCache } from "./cache"
import { applyMiddleware, withLogging } from "./middleware"

const API_BASE_URL = "https://backend.metruyencv.com/api"

// Create a fetch function with middleware applied
const fetchWithMiddleware = applyMiddleware([withLogging])

export const api = {
    story: {
        /**
         * Get a story by its slug
         */
        getBySlug: async (slug: string): Promise<Story | null> => {
            try {
                const cacheKey = `story_${slug}`

                // Check cache first
                const cachedStory = apiCache.get<Story>(cacheKey)
                if (cachedStory) {
                    return cachedStory
                }
                const res = await fetchWithMiddleware(
                    `${API_BASE_URL}/books/search?keyword=${slug}&page=1`
                )
                const data = await res.json()
                const story = data.data[0] || null

                // Cache the response for 10 minutes
                if (story) {
                    apiCache.set(cacheKey, story, 10 * 60 * 1000)
                }

                return story
            } catch (error) {
                console.error("Error fetching story:", error)
                return null
            }
        },

        /**
         * Get chapters for a story
         */
        getChapters: async (
            storyId: number | string
        ): Promise<ChapterDetail[]> => {
            try {
                const cacheKey = `chapters_${storyId}`

                // Check cache first
                const cachedChapters = apiCache.get<ChapterDetail[]>(cacheKey)
                if (cachedChapters) {
                    return cachedChapters
                }
                const res = await fetchWithMiddleware(
                    `${API_BASE_URL}/chapters?filter%5Bbook_id%5D=${storyId}&filter%5Btype%5D=published`
                )
                const data = await res.json()
                const chapters = data.data || []

                // Cache the response for 5 minutes
                apiCache.set(cacheKey, chapters, 5 * 60 * 1000)

                return chapters
            } catch (error) {
                console.error("Error fetching chapters:", error)
                return []
            }
        }
    },

    chapter: {
        /**
         * Get a chapter by its ID
         */
        getById: async (
            slug: string,
            chapterId: string | number
        ): Promise<string> => {
            try {
                const cacheKey = `chapter_${slug}_${chapterId}`

                // Check cache first
                const cachedChapter = apiCache.get<string>(cacheKey)
                if (cachedChapter) {
                    return cachedChapter
                } // Using local API for chapter content
                const res = await fetchWithMiddleware(
                    `http://localhost:3000/api/stories/${slug}/chapter/${chapterId}`
                )
                const chapterText = await res.text()

                // Cache the response for 10 minutes
                apiCache.set(cacheKey, chapterText, 10 * 60 * 1000)

                return chapterText
            } catch (error) {
                console.error("Error fetching chapter:", error)
                return ""
            }
        }
    },

    search: {
        /**
         * Search stories by keyword
         */
        stories: async (keyword: string, page = 1): Promise<Story[]> => {
            try {
                const cacheKey = `search_${keyword}_${page}`

                // For search queries, use a shorter cache time
                const cachedResults = apiCache.get<Story[]>(cacheKey)
                if (cachedResults) {
                    return cachedResults
                }
                const res = await fetchWithMiddleware(
                    `${API_BASE_URL}/books/search?keyword=${keyword}&page=${page}`
                )
                const data = await res.json()
                const results = data.data || []

                // Cache search results for 3 minutes
                apiCache.set(cacheKey, results, 3 * 60 * 1000)

                return results
            } catch (error) {
                console.error("Error searching stories:", error)
                return []
            }
        }
    },

    comment: {
        /**
         * Get comments for a story or chapter
         */
        getAll: async (
            storyId: number,
            chapterId?: number
        ): Promise<Comment[]> => {
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
                const data = await res.json()
                const comments = data.data || []

                // Cache for 5 minutes
                apiCache.set(cacheKey, comments, 5 * 60 * 1000)

                return comments
            } catch (error) {
                console.error("Error fetching comments:", error)
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
                const res = await fetchWithMiddleware(
                    `${API_BASE_URL}/comments`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(comment)
                    }
                )

                const data = await res.json()

                // Invalidate related cache
                apiCache.invalidate(
                    `comments_${comment.storyId}_${
                        comment.chapterId || "story"
                    }`
                )

                return data.data
            } catch (error) {
                console.error("Error creating comment:", error)
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

                const data = await res.json()

                // We'll need to invalidate all potential caches that could contain this comment
                // Since we don't know which story/chapter this belongs to from this context
                apiCache.clear()

                return data.data
            } catch (error) {
                console.error("Error updating comment:", error)
                return null
            }
        },

        /**
         * Delete a comment
         */
        delete: async (commentId: number): Promise<boolean> => {
            try {
                await fetchWithMiddleware(
                    `${API_BASE_URL}/comments/${commentId}`,
                    {
                        method: "DELETE"
                    }
                )

                // Similar to update, we need to invalidate potentially affected caches
                apiCache.clear()

                return true
            } catch (error) {
                console.error("Error deleting comment:", error)
                return false
            }
        }
    }
}

/**
 * Get a story by its slug
 * @deprecated Use api.story.getBySlug instead
 */
export async function getStoryBySlug(slug: string): Promise<Story | null> {
    return api.story.getBySlug(slug)
}

/**
 * @deprecated Use api.story.getChapters instead
 */
export async function getStoryChapters(
    storyId: number | string
): Promise<ChapterDetail[]> {
    return api.story.getChapters(storyId)
}

/**
 * Get a chapter by its ID
 * @deprecated Use api.chapter.getById instead
 */
export async function getChapterById(
    slug: string,
    chapterId: string | number
): Promise<string> {
    return api.chapter.getById(slug, chapterId)
}

/**
 * Search stories by keyword
 * @deprecated Use api.search.stories instead
 */
export async function searchStories(
    keyword: string,
    page = 1
): Promise<Story[]> {
    return api.search.stories(keyword, page)
}

/**
 * Get comments for a story or chapter
 * @deprecated Use api.comment.getAll instead
 */
export async function getComments(
    storyId: number,
    chapterId?: number
): Promise<Comment[]> {
    return api.comment.getAll(storyId, chapterId)
}

/**
 * Create a new comment
 * @deprecated Use api.comment.create instead
 */
export async function createComment(comment: {
    content: string
    storyId: number
    chapterId?: number
}): Promise<Comment | null> {
    return api.comment.create(comment)
}

/**
 * Update a comment
 * @deprecated Use api.comment.update instead
 */
export async function updateComment(
    commentId: number,
    content: string
): Promise<Comment | null> {
    return api.comment.update(commentId, content)
}

/**
 * Delete a comment
 * @deprecated Use api.comment.delete instead
 */
export async function deleteComment(commentId: number): Promise<boolean> {
    return api.comment.delete(commentId)
}
