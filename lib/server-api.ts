import { Story, ChapterDetail, Comment } from '@/types/api'
import { retry } from './retry'
import { METHODS } from 'http'

// const API_BASE_URL = "https://backend.metruyencv.com/api"
const API_BASE_URL =
  process.env.NEXT_PUBLIC_MYTRUYEN_API_BASE_URL || 'http://localhost:8000/api/v1'
const API_BASE_URL_V2 =
  process.env.NEXT_PUBLIC_MYTRUYEN_API_BASE_URL_V2 || 'http://localhost:8000/api/v2'

/**
 * Server-side API client for direct backend access
 * This should only be used in server components to avoid CORS issues
 */
export const serverApi = {
  story: {
    /**
     * Get a story by its slug
     */
    getBySlug: async (slug: string): Promise<Story | null> => {
      try {
        const res = await fetch(
          // `${API_BASE_URL}/books/search?keyword=${slug}&page=1&limit=5`,
          `${API_BASE_URL}/books/${slug}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.METRUYEN_TOKEN}`,
            },
            // Next.js cache options
            next: { revalidate: 600 }, // Revalidate every 10 minutes
          },
        )
        const data = await res.json()
        return data.data[0] || data.data || null
      } catch (error) {
        console.error('Error fetching story:', error)
        return null
      }
    },

    /**
     * Get chapters for a story
     */
    getChapters: async (storyId: number | string): Promise<ChapterDetail[]> => {
      try {
        const res = await fetch(
          //   `${API_BASE_URL}/chapters?filter%5Bbook_id%5D=${storyId}&filter%5Btype%5D=published`,
          `${API_BASE_URL_V2}/chapters/${storyId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.METRUYEN_TOKEN}`,
            },
            next: { revalidate: 300 }, // Revalidate every 5 minutes
          },
        )
        const data = await res.json()
        return data.data || []
      } catch (error) {
        console.error('Error fetching chapters:', error)
        return []
      }
    },

    /**
     * Get chapters for a story by page from API
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
        // Currently, we simulate pagination by getting all chapters and slicing
        const res = await retry(
          async () => {
            return await fetch(
              `${API_BASE_URL}/chapters?filter%5Bbook_id%5D=${storyId}&filter%5Btype%5D=published`,
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${process.env.METRUYEN_TOKEN}`,
                },
                next: { revalidate: 300 }, // Revalidate every 5 minutes
              },
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
        return {
          chapters: chapters.slice((page - 1) * limit, page * limit),
          pagination: {
            total,
            currentPage: page,
            perPage: limit,
            totalPages,
          },
        }
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
        const res = await fetch(
          `${API_BASE_URL}/chapters/content/${slug}/${chapterId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.METRUYEN_TOKEN}`,
            },
            next: { revalidate: 300 }, // Revalidate every 5 minutes
          },
        )
        console.log('Chapter fetch response', res)
        const data = await res.json()
        return data.data.content
      } catch (error) {
        console.error('Error fetching chapter:', error)
        return ''
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
        const chapters = await serverApi.story.getChapters(storyId)

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
     * Search stories by keyword
     */
    stories: async (keyword: string, page = 1): Promise<Story[]> => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/books/search?keyword=${keyword}&page=${page}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.METRUYEN_TOKEN}`,
            },
          },
        )
        const data = await res.json()
        return data.data || []
      } catch (error) {
        console.error('Error searching stories:', error)
        return []
      }
    },
  },
}
