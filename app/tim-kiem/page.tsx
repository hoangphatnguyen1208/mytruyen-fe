'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SearchResult, Story } from '@/types/api'
import { StoriesList } from '@/components/stories-list'
import { SearchResults } from '@/components/search-results'
import { api } from '@/lib/api'
import { Search, BookOpen } from 'lucide-react'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [contentResults, setContentResults] = useState<SearchResult[]>([])
  const [storyResults, setStoryResults] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('content')

  useEffect(() => {
    async function fetchSearchResults() {
      setLoading(true)
      try {
        // Fetch both content search and story search in parallel
        const [content, stories] = await Promise.all([
          api.search.content(query),
          api.search.stories(query),
        ])

        setContentResults(content)
        setStoryResults(stories)
      } catch (error) {
        console.error('Error fetching search results:', error)
      } finally {
        setLoading(false)
      }
    }

    if (query) {
      fetchSearchResults()
    } else {
      setContentResults([])
      setStoryResults([])
      setLoading(false)
    }
  }, [query])

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <CardContent className="p-4">
            <Skeleton className="mb-2 h-6 w-3/4" />
            <Skeleton className="mb-4 h-4 w-1/2" />
            <Skeleton className="h-20 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="mb-2 flex items-center gap-2 text-3xl font-bold">
          <Search className="h-8 w-8 text-primary" />
          Kết quả tìm kiếm
        </h1>
        <p className="text-muted-foreground">
          Tìm kiếm cho:{' '}
          <span className="font-semibold text-foreground">"{query}"</span>
        </p>
      </div>

      {!query ? (
        <div className="py-12 text-center">
          <Search className="mx-auto mb-4 h-16 w-16 text-muted-foreground/50" />
          <p className="text-xl text-muted-foreground">
            Nhập từ khóa để tìm kiếm
          </p>
        </div>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="content" className="gap-2">
              <Search className="h-4 w-4" />
              Tìm theo nội dung ({contentResults.length})
            </TabsTrigger>
            <TabsTrigger value="stories" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Tìm theo tên truyện ({storyResults.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            {loading ? (
              <LoadingSkeleton />
            ) : (
              <SearchResults results={contentResults} />
            )}
          </TabsContent>

          <TabsContent value="stories">
            {loading ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="relative aspect-[2/3]">
                      <Skeleton className="h-full w-full" />
                    </div>
                    <CardContent className="p-4">
                      <Skeleton className="mb-2 h-6 w-3/4" />
                      <Skeleton className="mb-4 h-4 w-1/2" />
                      <Skeleton className="h-20 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : storyResults.length > 0 ? (
              <StoriesList stories={storyResults} vertical={false} />
            ) : (
              <div className="py-12 text-center">
                <BookOpen className="mx-auto mb-4 h-16 w-16 text-muted-foreground/50" />
                <p className="text-xl text-muted-foreground">
                  Không tìm thấy truyện phù hợp
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
