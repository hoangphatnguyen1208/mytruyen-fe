import {
  Story,
  ChapterDetail,
  Comment,
  SearchResponse,
  SearchResult,
} from '@/types/api'
import { apiCache } from './cache'
import { applyMiddleware, withLogging } from './middleware'
import { retry } from './retry'

// const API_BASE_URL = "https://backend.metruyencv.com/api"
const API_BASE_URL_V1 =
  process.env.MYTTRUYEN_API_BASE_URL || 'http://localhost:8000/api/v1'
const API_BASE_URL_V2 =
  process.env.MYTTRUYEN_API_BASE_URL_V2 || 'http://localhost:8000/api/v2'

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
          `/api/books/search?keyword=${slug}&page=1`,
        )
        const data = await res.json()
        const story = data.data[0] || null
        console.log('story', story)

        // Cache the response for 10 minutes
        if (story) {
          apiCache.set(cacheKey, story, 10 * 60 * 1000)
        }

        return story
      } catch (error) {
        console.error('Error fetching story:', error)
        return null
      }
    },

    /**
     * Get a story by its ID
     */
    getById: async (bookId: string): Promise<Story | null> => {
      try {
        const cacheKey = `book_${bookId}`

        // Check cache first
        const cachedBook = apiCache.get<Story>(cacheKey)
        if (cachedBook) {
          return cachedBook
        }

        const res = await fetch(`${API_BASE_URL_V2}/books/${bookId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.METRUYEN_TOKEN}`,
          },
          next: { revalidate: 300 },
        })

        if (!res.ok) {
          throw new Error('Failed to fetch book')
        }

        const data = await res.json()
        const book = data.data || null

        // Cache the response for 10 minutes
        if (book) {
          apiCache.set(cacheKey, book, 10 * 60 * 1000)
        }

        return book
      } catch (error) {
        console.error('Error fetching book:', error)
        return null
      }
    },

    /**
     * Get chapters for a story
     */ getChapters: async (
      storyId: number | string,
    ): Promise<ChapterDetail[]> => {
      try {
        // const cacheKey = `chapters_${storyId}`

        // // Check cache first
        // const cachedChapters = apiCache.get<ChapterDetail[]>(cacheKey)
        // if (cachedChapters) {
        //   return cachedChapters
        // }
        // Use our local API proxy instead of calling the external API directly
        // const res = await fetchWithMiddleware(
        //     `/api/chapters?filter[book_id]=${storyId}&filter[type]=published`
        // )
        const res = await fetch(`${API_BASE_URL_V2}/chapters/${storyId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.METRUYEN_TOKEN}`,
          },
          next: { revalidate: 300 },
        })
        const data = await res.json()
        console.log('Chapters data', data)
        const chapters = data.data || []

        // Cache the response for 5 minutes
        // apiCache.set(cacheKey, chapters, 5 * 60 * 1000)

        return chapters
      } catch (error) {
        console.error('Error fetching chapters:', error)
        return []
      }
    },

    /**
     * Get chapters for a story by page from API
     * This method prepares for direct server-side pagination when the API supports it
     */
    getChaptersByPage: async (
      storyId: number | string,
      page: number = 1,
      limit: number = 30,
    ): Promise<{
      chapters: ChapterDetail[]
      pagination: {
        total: number
        currentPage: number
        perPage: number
        totalPages: number
      }
    }> => {
      try {
        const cacheKey = `chapters_page_${storyId}_${page}_${limit}`

        // Check cache first
        const cachedResponse = apiCache.get<{
          chapters: ChapterDetail[]
          pagination: {
            total: number
            currentPage: number
            perPage: number
            totalPages: number
          }
        }>(cacheKey)

        if (cachedResponse) {
          return cachedResponse
        } // Currently, we simulate pagination by getting all chapters and slicing
        // In the future, this should be replaced with a direct API call that supports pagination
        const res = await retry(
          async () => {
            return await fetchWithMiddleware(
              `/api/chapters?filter[book_id]=${storyId}&filter[type]=published`,
            )
          },
          3, // 3 retries
          300, // 300ms initial delay
        )

        const data = await res.json()
        const chapters = data.data || []

        // Calculate total from the full list (server should provide this)
        const total = chapters.length
        const totalPages = Math.max(1, Math.ceil(total / limit))

        // Create pagination data
        const result = {
          chapters: chapters.slice((page - 1) * limit, page * limit),
          pagination: {
            total,
            currentPage: page,
            perPage: limit,
            totalPages,
          },
        }

        // Cache the response for 5 minutes
        apiCache.set(cacheKey, result, 5 * 60 * 1000)

        return result
      } catch (error) {
        console.error('Error fetching chapters by page:', error)
        return {
          chapters: [],
          pagination: {
            total: 0,
            currentPage: page,
            perPage: limit,
            totalPages: 0,
          },
        }
      }
    },
    /**
     * Get chapters for a story with pagination
     */
    getPaginatedChapters: async (
      storyId: number | string,
      page: number = 1,
      limit: number = 30,
      sortOrder: 'asc' | 'desc' = 'desc',
      searchTerm: string = '',
    ): Promise<{
      chapters: ChapterDetail[]
      total: number
      page: number
      totalPages: number
    }> => {
      try {
        // For paginated requests, build a unique cache key
        const cacheKey = `chapters_paginated_${storyId}_${page}_${limit}_${sortOrder}_${searchTerm}`
        const allChaptersCacheKey = `chapters_${storyId}`

        // Check cache first
        const cachedResponse = apiCache.get<{
          chapters: ChapterDetail[]
          total: number
          page: number
          totalPages: number
        }>(cacheKey)

        if (cachedResponse) {
          return cachedResponse
        }

        // First, we need to get all chapters to perform proper pagination
        // In a real API, this would be handled server-side
        // Use retry mechanism for resilience
        let allChapters = await retry(
          () => api.story.getChapters(storyId),
          3, // 3 retries
          300, // 300ms initial delay
        )

        // Filter by search term if provided
        if (searchTerm) {
          const searchLower = searchTerm.toLowerCase()
          allChapters = allChapters.filter(
            (chapter) =>
              chapter.name.toLowerCase().includes(searchLower) ||
              `Chương ${chapter.index}`.toLowerCase().includes(searchLower),
          )
        }
        console.log('All chapters after search filter', allChapters)

        // Sort the chapters
        const sortedChapters = [...allChapters].sort((a, b) => {
          if (sortOrder === 'asc') {
            return a.index - b.index
          } else {
            return b.index - a.index
          }
        })

        // Calculate pagination values
        const total = sortedChapters.length
        const totalPages = Math.max(1, Math.ceil(total / limit))
        const startIndex = (page - 1) * limit
        const endIndex = startIndex + limit

        // Get the paginated chapters
        const paginatedChapters = sortedChapters.slice(startIndex, endIndex)

        const result = {
          chapters: paginatedChapters,
          total,
          page,
          totalPages,
        }

        // Cache the response for 5 minutes
        // Also register it as related to the main chapters cache
        apiCache.set(cacheKey, result, 5 * 60 * 1000, [allChaptersCacheKey])

        return result
      } catch (error) {
        console.error('Error fetching paginated chapters:', error)
        return {
          chapters: [],
          total: 0,
          page: page,
          totalPages: 0,
        }
      }
    },
  },
  chapter: {
    /**
     * Get a chapter by its ID
     */
    getById: async (
      slug: string,
      chapterId: string | number,
    ): Promise<string> => {
      try {
        const cacheKey = `chapter_${slug}_${chapterId}`

        // Check cache first
        const cachedChapter = apiCache.get<string>(cacheKey)
        if (cachedChapter) {
          return cachedChapter
        } // Using local API for chapter content
        const res = await fetchWithMiddleware(
          `/api/stories/${slug}/chapter/${chapterId}`,
        )
        const chapterText = await res.text()

        // Cache the response for 10 minutes
        apiCache.set(cacheKey, chapterText, 10 * 60 * 1000)

        return chapterText
      } catch (error) {
        console.error('Error fetching chapter:', error)
        return ''
      }
    },

    /**
     * Check for updates to a chapter's content
     * Returns true if the content has been updated since the last fetch
     */
    checkForUpdates: async (
      slug: string,
      chapterId: string | number,
    ): Promise<{ hasUpdates: boolean; updatedContent?: string }> => {
      try {
        const cacheKey = `chapter_${slug}_${chapterId}`

        // Get the current timestamp for ETag/If-Modified-Since headers
        const cachedChapterData = apiCache.getWithMetadata<string>(cacheKey)

        // If we don't have cached data, there's nothing to compare
        if (!cachedChapterData) {
          return { hasUpdates: false }
        }

        // Check if the content has been updated
        const res = await fetchWithMiddleware(
          `/api/stories/${slug}/chapter/${chapterId}/check-updates`,
          {
            headers: {
              'If-Modified-Since': new Date(
                cachedChapterData.timestamp,
              ).toUTCString(),
            },
          },
        )

        // If server returns 304 Not Modified, no updates available
        if (res.status === 304) {
          return { hasUpdates: false }
        }

        // If we get here, content has been updated
        const updatedContent = await res.text()

        // Update the cache with the new content
        apiCache.set(cacheKey, updatedContent, 10 * 60 * 1000)

        return {
          hasUpdates: true,
          updatedContent,
        }
      } catch (error) {
        console.error('Error checking for chapter updates:', error)
        return { hasUpdates: false }
      }
    },

    /**
     * Get chapter navigation information (previous and next chapters)
     */
    getNavigation: async (
      storyId: number | string,
      currentChapterId: number,
    ): Promise<{
      prev: ChapterDetail | null
      next: ChapterDetail | null
    }> => {
      try {
        const chapters = await api.story.getChapters(storyId)

        // Sort chapters by index
        const sortedChapters = [...chapters].sort((a, b) => a.index - b.index)

        // Find current chapter index in the sorted array
        const currentIndex = sortedChapters.findIndex(
          (c) => c.index === currentChapterId,
        )

        // If chapter not found, return null for both
        if (currentIndex === -1) {
          return { prev: null, next: null }
        }

        const prevChapter =
          currentIndex > 0 ? sortedChapters[currentIndex - 1] : null
        const nextChapter =
          currentIndex < sortedChapters.length - 1
            ? sortedChapters[currentIndex + 1]
            : null

        return {
          prev: prevChapter,
          next: nextChapter,
        }
      } catch (error) {
        console.error('Error fetching chapter navigation:', error)
        return { prev: null, next: null }
      }
    },
  },

  search: {
    /**
     * Search content by query text using vector search
     */
    content: async (queryText: string): Promise<SearchResult[]> => {
      try {
        const cacheKey = `search_content_${queryText}`

        // For search queries, use a shorter cache time
        const cachedResults = apiCache.get<SearchResult[]>(cacheKey)
        if (cachedResults) {
          return cachedResults
        }

        const url = `${API_BASE_URL_V1}/search?query_text=${encodeURIComponent(queryText)}`
        const res = await fetch(url)
        const data: SearchResponse = await res.json()

        if (!data.success) {
          throw new Error(data.message || 'Search failed')
        }

        const results = data.data || []

        // Cache search results for 3 minutes
        apiCache.set(cacheKey, results, 3 * 60 * 1000)

        return results
      } catch (error) {
        console.error('Error searching content:', error)
        return []
      }
    },

    /**
     * Search stories by keyword (legacy method)
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
          `/api/books/search?keyword=${keyword}&page=${page}`,
        )
        const data = await res.json()
        const results = data.data || []

        // Cache search results for 3 minutes
        apiCache.set(cacheKey, results, 3 * 60 * 1000)

        return results
      } catch (error) {
        console.error('Error searching stories:', error)
        return []
      }
    },
  },

  comment: {
    /**
     * Get comments for a story or chapter
     */
    getAll: async (storyId: number, chapterId?: number): Promise<Comment[]> => {
      try {
        const cacheKey = `comments_${storyId}_${chapterId || 'story'}`

        // Check cache first
        const cachedComments = apiCache.get<Comment[]>(cacheKey)
        if (cachedComments) {
          return cachedComments
        }
        const url = chapterId
          ? `/api/comments?storyId=${storyId}&chapterId=${chapterId}`
          : `/api/comments?storyId=${storyId}`

        const res = await fetchWithMiddleware(url)
        const data = await res.json()
        const comments = data.data || []

        // Cache for 5 minutes
        apiCache.set(cacheKey, comments, 5 * 60 * 1000)

        return comments
      } catch (error) {
        console.error('Error fetching comments:', error)
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
        const res = await fetchWithMiddleware(`/api/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(comment),
        })

        const data = await res.json()

        // Invalidate related cache
        apiCache.invalidate(
          `comments_${comment.storyId}_${comment.chapterId || 'story'}`,
        )

        return data.data
      } catch (error) {
        console.error('Error creating comment:', error)
        return null
      }
    },

    /**
     * Update an existing comment
     */
    update: async (
      commentId: number,
      content: string,
    ): Promise<Comment | null> => {
      try {
        const res = await fetchWithMiddleware(`/api/comments/${commentId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content }),
        })

        const data = await res.json()

        // We'll need to invalidate all potential caches that could contain this comment
        // Since we don't know which story/chapter this belongs to from this context
        apiCache.clear()

        return data.data
      } catch (error) {
        console.error('Error updating comment:', error)
        return null
      }
    },

    /**
     * Delete a comment
     */
    delete: async (commentId: number): Promise<boolean> => {
      try {
        await fetchWithMiddleware(`/api/comments/${commentId}`, {
          method: 'DELETE',
        })

        // Similar to update, we need to invalidate potentially affected caches
        apiCache.clear()

        return true
      } catch (error) {
        console.error('Error deleting comment:', error)
        return false
      }
    },
  },
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
  storyId: number | string,
): Promise<ChapterDetail[]> {
  return api.story.getChapters(storyId)
}

/**
 * Get a chapter by its ID
 * @deprecated Use api.chapter.getById instead
 */
export async function getChapterById(
  slug: string,
  chapterId: string | number,
): Promise<string> {
  return api.chapter.getById(slug, chapterId)
}

/**
 * Search stories by keyword
 * @deprecated Use api.search.stories instead
 */
export async function searchStories(
  keyword: string,
  page = 1,
): Promise<Story[]> {
  return api.search.stories(keyword, page)
}

/**
 * Get comments for a story or chapter
 * @deprecated Use api.comment.getAll instead
 */
export async function getComments(
  storyId: number,
  chapterId?: number,
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
  content: string,
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
