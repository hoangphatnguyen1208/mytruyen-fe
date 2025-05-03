"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useLanguage } from "@/contexts/language-context"

type Story = {
  id: number
  title: string
  slug: string
  author: string
  description: string
  coverImage: string
  categories: string[]
  status: string
  views: number
  rating: number
}

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
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await response.json()
        setStories(data.stories)
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {stories.map((story) => (
            <Link href={`/truyen/${story.slug}`} key={story.id}>
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                <div className="aspect-[2/3] relative">
                  <Image src={story.coverImage || "/placeholder.svg"} alt={story.title} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <h2 className="text-xl font-bold line-clamp-1">{story.title}</h2>
                  <p className="text-sm text-muted-foreground mb-2">{story.author}</p>
                  <p className="text-sm line-clamp-3 mb-4">{story.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {story.categories.map((category) => (
                      <Badge key={category} variant="secondary">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="px-4 py-2 border-t flex justify-between">
                  <div className="flex items-center">
                    <span className="text-sm">⭐ {story.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm">👁️ {story.views.toLocaleString()}</span>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">{t("search.noResults")}</p>
        </div>
      )}
    </div>
  )
}
