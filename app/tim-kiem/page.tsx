"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useLanguage } from "@/contexts/language-context"
import { Story } from "@/types/api"
import { StoriesList } from "@/components/stories-list"
import { api } from "@/lib/api"

export default function SearchPage() {
    const searchParams = useSearchParams()
    const query = searchParams.get("q") || ""
    const [stories, setStories] = useState<Story[]>([])
    const [loading, setLoading] = useState(true)
    const { t } = useLanguage()

    useEffect(() => {
        async function fetchSearchResults() {
            setLoading(true)
            try {
                const searchResults = await api.search.stories(query)
                setStories(searchResults)
            } catch (error) {
                console.error("Error fetching search results:", error)
            } finally {
                setLoading(false)
            }
        }

        if (query) {
            fetchSearchResults()
        } else {
            setStories([])
            setLoading(false)
        }
    }, [query])
    

    return (
        <div className="container mx-auto px-4 py-3">
            <h1 className="text-2xl font-bold mb-4">
                {t("search.title")}: "{query}"
            </h1>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <Card key={i} className="overflow-hidden">
                            <div className="aspect-[2/3] relative">
                                <Skeleton className="h-full w-full" />
                            </div>
                            <CardContent className="p-4">
                                <Skeleton className="h-6 w-3/4 mb-2" />
                                <Skeleton className="h-4 w-1/2 mb-4" />
                                <Skeleton className="h-20 w-full" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : stories.length > 0 ? (
                <StoriesList stories={stories} horizontal={false} />
            ) : (
                <div className="text-center py-12">
                    <p className="text-xl text-muted-foreground">
                        {t("search.noResults")}
                    </p>
                </div>
            )}
        </div>
    )
}
