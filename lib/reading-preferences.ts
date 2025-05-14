"use client"

// Key for storing reading preferences in localStorage
const READING_PREFS_KEY = "mytruyen_reading_prefs"

export interface ReadingPreferences {
    fontSize: "small" | "medium" | "large" | "xlarge"
    theme: "light" | "dark" | "system"
    fontFamily: string
    lineSpacing: number
}

const DEFAULT_PREFS: ReadingPreferences = {
    fontSize: "medium",
    theme: "system",
    fontFamily: "system-ui, sans-serif",
    lineSpacing: 1.5
}

/**
 * Get reading preferences from localStorage
 */
export function getReadingPrefs(): ReadingPreferences {
    if (typeof window === "undefined") {
        return DEFAULT_PREFS
    }

    try {
        const prefs = localStorage.getItem(READING_PREFS_KEY)
        return prefs
            ? { ...DEFAULT_PREFS, ...JSON.parse(prefs) }
            : DEFAULT_PREFS
    } catch (error) {
        console.error("Error loading reading preferences:", error)
        return DEFAULT_PREFS
    }
}

/**
 * Save reading preferences to localStorage
 */
export function saveReadingPrefs(prefs: Partial<ReadingPreferences>): void {
    if (typeof window === "undefined") {
        return
    }

    try {
        // Get current preferences and merge with new ones
        const currentPrefs = getReadingPrefs()
        const updatedPrefs = { ...currentPrefs, ...prefs }

        localStorage.setItem(READING_PREFS_KEY, JSON.stringify(updatedPrefs))
    } catch (error) {
        console.error("Error saving reading preferences:", error)
    }
}
