"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

export function ThemeScript() {
    const { setTheme, theme } = useTheme()

    useEffect(() => {
        try {
            const savedTheme = localStorage.getItem("theme")
            if (savedTheme) {
                setTheme(savedTheme)
            }
        } catch (error) {
            console.error("Error accessing localStorage for theme:", error)
        }
    }, [setTheme])

    useEffect(() => {
        try {
            if (theme) {
                localStorage.setItem("theme", theme)
            }
        } catch (error) {
            console.error("Error setting theme in localStorage:", error)
        }
    }, [theme])

    return null
}
