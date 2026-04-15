'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Story } from '@/types/api'
import { api } from '@/lib/api'
import { Search } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { StoryCardHorizontal } from '@/components/story-card-horizontal'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  // const youtubeUrl = searchParams.get('youtube') || ''
  // const isAudioSearch = searchParams.get('audio') === '1'
  const [books, setBooks] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const { toast } = useToast()

  // Load audio search results from sessionStorage
  // useEffect(() => {
  //   if (isAudioSearch) {
  //     const savedResults = sessionStorage.getItem('audioSearchResults')
  //     const savedQuery = sessionStorage.getItem('audioSearchQuery')

  //     if (savedResults) {
  //       try {
  //         const parsedResults = JSON.parse(savedResults)
  //         setResults(parsedResults)
  //         setLoading(false)

  //         if (savedQuery) {
  //           setSearchQuery(savedQuery)
  //         }

  //         // Clear from sessionStorage
  //         sessionStorage.removeItem('audioSearchResults')
  //         sessionStorage.removeItem('audioSearchQuery')
  //       } catch (error) {
  //         console.error('Error parsing audio search results:', error)
  //         setLoading(false)
  //       }
  //     } else {
  //       setLoading(false)
  //     }
  //     return
  //   }
  // }, [isAudioSearch])

  // // Handle YouTube URL search
  // useEffect(() => {
  //   async function fetchYouTubeSearchResults() {
  //     if (!youtubeUrl || isAudioSearch) return

  //     setLoading(true)
  //     setSearchQuery(`Tìm kiếm bằng YouTube: "${youtubeUrl}"`)
  //     try {
  //       const content = await api.search.youtube(youtubeUrl)
  //       setResults(content)
  //     } catch (error) {
  //       console.error('Error fetching YouTube search results:', error)
  //       toast({
  //         title: 'Lỗi tìm kiếm',
  //         description: 'Không thể tìm kiếm bằng YouTube URL. Vui lòng thử lại.',
  //         variant: 'destructive',
  //       })
  //       setResults([])
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   fetchYouTubeSearchResults()
  // }, [youtubeUrl, isAudioSearch, toast])

  useEffect(() => {
    async function fetchSearchResults() {
      // if (!query || isAudioSearch || youtubeUrl) return

      setLoading(true)
      setSearchQuery(`Tìm kiếm: "${query}"`)
      try {
        const data = await api.search.meili(query, 1, 20)
        setBooks(data)
      } catch (error) {
        console.error('Error fetching search results:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSearchResults()
  // }, [query, isAudioSearch, youtubeUrl])
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
        {searchQuery && (
          <p className="text-muted-foreground">
            <span className="font-semibold text-foreground">{searchQuery}</span>
          </p>
        )}
      </div>

      {!query ? (
        <div className="py-12 text-center">
          <Search className="mx-auto mb-4 h-16 w-16 text-muted-foreground/50" />
          <p className="text-xl text-muted-foreground">
            Nhập từ khóa vào thanh tìm kiếm hoặc sử dụng tìm kiếm bằng giọng nói
          </p>
        </div>
      ) : (
        <div>
          {loading ? (
            <LoadingSkeleton />
          ) : books.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {books.map((book, index) => (
                <StoryCardHorizontal
                  key={book.id || `search-book-${index}`}
                  story={book}
                />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <Search className="mx-auto mb-4 h-16 w-16 text-muted-foreground/50" />
              <p className="text-xl text-muted-foreground">
                Không tìm thấy kết quả phù hợp
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
