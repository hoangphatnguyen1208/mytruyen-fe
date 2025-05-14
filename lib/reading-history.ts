"use client"

// Key for storing the reading history in localStorage
const READING_HISTORY_KEY = "mytruyen_reading_history"

// Maximum history items to store
const MAX_HISTORY_ITEMS = 20

export interface ReadingHistoryItem {
    storyId: number
    storySlug: string
    storyName: string
    storyPoster?: string
    chapterId: number
    chapterName?: string
    readAt: string
}

/**
 * Get the reading history from localStorage
 */
export function getReadingHistory(): ReadingHistoryItem[] {
    if (typeof window === "undefined") {
        return []
    }

    try {
        const history = localStorage.getItem(READING_HISTORY_KEY)
        return history ? JSON.parse(history) : []
    } catch (error) {
        console.error("Error loading reading history:", error)
        return []
    }
}

/**
 * Add a story to the reading history
 */
export function addToReadingHistory(
    item: Omit<ReadingHistoryItem, "readAt">
): void {
    if (typeof window === "undefined") {
        return
    }

    try {
        const history = getReadingHistory()

        // Complete the item with the current timestamp
        const newItem: ReadingHistoryItem = {
            ...item,
            readAt: new Date().toISOString()
        }

        // Remove any existing entry for the same story
        const filteredHistory = history.filter(
            (historyItem) => historyItem.storyId !== item.storyId
        )

        // Add new item at the beginning
        const newHistory = [newItem, ...filteredHistory].slice(
            0,
            MAX_HISTORY_ITEMS
        )

        localStorage.setItem(READING_HISTORY_KEY, JSON.stringify(newHistory))
    } catch (error) {
        console.error("Error saving reading history:", error)
    }
}

/**
 * Clear the reading history
 */
export function clearReadingHistory(): void {
    if (typeof window === "undefined") {
        return
    }

    try {
        localStorage.removeItem(READING_HISTORY_KEY)
    } catch (error) {
        console.error("Error clearing reading history:", error)
    }
}

/**
 * Remove a specific item from reading history
 */
export function removeFromReadingHistory(storyId: number): void {
    if (typeof window === "undefined") {
        return
    }

    try {
        const history = getReadingHistory()
        const filteredHistory = history.filter(
            (historyItem) => historyItem.storyId !== storyId
        )

        localStorage.setItem(
            READING_HISTORY_KEY,
            JSON.stringify(filteredHistory)
        )
    } catch (error) {
        console.error("Error removing item from reading history:", error)
    }
}
