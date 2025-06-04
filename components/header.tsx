"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Search, Book, User, Tag, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/user-nav"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/contexts/language-context"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useOnClickOutside } from "@/hooks/use-click-outside"
import { Story } from "@/types/api"

export function Header() {
    const { t } = useLanguage()
    const [searchQuery, setSearchQuery] = useState("")
    const [suggestions, setSuggestions] = useState<Story[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const searchRef = useRef<HTMLDivElement>(null)

    // Close suggestions when clicking outside
    useOnClickOutside(searchRef, () => setShowSuggestions(false))

    // Fetch suggestions when search query changes
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchQuery.length < 2) {
                setSuggestions([])
                return
            }

            setIsLoading(true)
            try {
                const response = await fetch(
                    `/api/search?keyword=${encodeURIComponent(
                        searchQuery
                    )}&limit=5`
                )
                const data = await response.json()
                setSuggestions(data.data)
                setShowSuggestions(true)
            } catch (error) {
                console.error("Error fetching suggestions:", error)
            } finally {
                setIsLoading(false)
            }
        }

        const debounceTimer = setTimeout(() => {
            fetchSuggestions()
        }, 300)

        return () => clearTimeout(debounceTimer)
    }, [searchQuery])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/tim-kiem?q=${encodeURIComponent(searchQuery.trim())}`)
            setShowSuggestions(false)
        }
    }

    const handleSuggestionClick = (suggestion: Story) => {
        router.push(`/truyen/${suggestion.slug}`)

        setShowSuggestions(false)
    }

    // Get icon based on suggestion type
    const getSuggestionIcon = (type: string) => {
        switch (type) {
            case "story":
                return <Book className="h-4 w-4 mr-2 text-muted-foreground" />
            case "author":
                return <User className="h-4 w-4 mr-2 text-muted-foreground" />
            case "category":
                return <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
            case "popular":
                return (
                    <TrendingUp className="h-4 w-4 mr-2 text-muted-foreground" />
                )
            default:
                return <Search className="h-4 w-4 mr-2 text-muted-foreground" />
        }
    }

    return (
        <header className="flex flex-col md:flex-row justify-between items-center mb-2 gap-4 py-3 border-b">
            {" "}
            {/* Logo section */}
            <div className="md:w-1/4">
                {" "}
                <Link href="/" className="flex items-center space-x-3">
                    <Image
                        src="/favicon.ico"
                        alt="My Truyện Logo"
                        width={40}
                        height={40}
                        className="h-10 w-10"
                    />
                    <div>
                        <h1 className="text-2xl font-bold text-primary">
                            My Truyện
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {t("site.tagline")}
                        </p>
                    </div>
                </Link>
            </div>
            {/* Search section - centered */}
            <div className="w-full md:w-2/4 flex justify-center">
                <div ref={searchRef} className="relative w-full max-w-md">
                    <form onSubmit={handleSearch} className="flex">
                        <div className="relative flex-grow">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder={t("search.placeholder")}
                                className="w-full pl-8"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() =>
                                    searchQuery.length >= 2 &&
                                    setShowSuggestions(true)
                                }
                            />
                        </div>
                        <Button type="submit" className="ml-2">
                            {t("search.button")}
                        </Button>
                    </form>

                    {/* Search suggestions dropdown */}
                    {showSuggestions && suggestions.length > 0 && (
                        <div className="absolute z-50 mt-1 w-full bg-background border rounded-md shadow-lg">
                            <div className="p-2 border-b">
                                <h3 className="text-sm font-medium text-muted-foreground">
                                    {t("search.suggestions")}
                                </h3>
                            </div>
                            <ul>
                                {suggestions.map((suggestion, index) => (
                                    <li key={index}>
                                        <button
                                            className="w-full text-left px-3 py-2 hover:bg-muted flex items-center"
                                            onClick={() =>
                                                handleSuggestionClick(
                                                    suggestion
                                                )
                                            }
                                        >
                                            {/* {getSuggestionIcon(suggestion.type)} */}
                                            <div>
                                                <div className="font-medium">
                                                    {suggestion.name}
                                                </div>
                                                {suggestion.author && (
                                                    <div className="text-xs text-muted-foreground">
                                                        {
                                                            suggestion.author
                                                                ?.name
                                                        }
                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            {/* User controls section */}
            <div className="flex justify-end md:w-1/4 gap-2 items-center">
                <LanguageSwitcher />
                <ThemeToggle />
                <UserNav />
            </div>
        </header>
    )
}
