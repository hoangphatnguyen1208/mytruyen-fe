"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define available languages
export type Language = "vi" | "en"

// Define translation keys and their values for each language
type Translations = {
  [key: string]: {
    [lang in Language]: string
  }
}

// Define our translations
const translations: Translations = {
  // Header
  "site.title": {
    vi: "My Truyện",
    en: "My Truyện", // Keep consistent across languages
  },
  "site.tagline": {
    vi: "Kho truyện chữ online lớn nhất",
    en: "The largest online story collection",
  },
  "search.placeholder": {
    vi: "Tìm kiếm truyện...",
    en: "Search stories...",
  },
  // Navigation
  "nav.home": {
    vi: "Trang chủ",
    en: "Home",
  },
  "nav.hot": {
    vi: "Truyện Hot",
    en: "Hot Stories",
  },
  "nav.new": {
    vi: "Truyện Mới",
    en: "New Stories",
  },
  "nav.complete": {
    vi: "Truyện Hoàn Thành",
    en: "Completed Stories",
  },
  "nav.categories": {
    vi: "Thể Loại",
    en: "Categories",
  },
  // User menu
  "user.profile": {
    vi: "Hồ sơ",
    en: "Profile",
  },
  "user.bookmarks": {
    vi: "Đánh dấu",
    en: "Bookmarks",
  },
  "user.settings": {
    vi: "Cài đặt",
    en: "Settings",
  },
  "user.login": {
    vi: "Đăng nhập",
    en: "Login",
  },
  "user.signup": {
    vi: "Đăng ký",
    en: "Sign up",
  },
  "user.logout": {
    vi: "Đăng xuất",
    en: "Logout",
  },
  // Search
  "search.title": {
    vi: "Kết quả tìm kiếm",
    en: "Search Results",
  },
  "search.noResults": {
    vi: "Không tìm thấy kết quả nào",
    en: "No results found",
  },
  "search.button": {
    vi: "Tìm kiếm",
    en: "Search",
  },
  "search.suggestions": {
    vi: "Gợi ý tìm kiếm",
    en: "Search suggestions",
  },
}

// Create context
type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Create provider
export function LanguageProvider({ children }: { children: ReactNode }) {
  // Initialize with browser language or default to Vietnamese
  const [language, setLanguage] = useState<Language>("vi")

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "vi" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  // Translation function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`)
      return key
    }
    return translations[key][language]
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
