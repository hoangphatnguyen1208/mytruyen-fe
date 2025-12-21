'use client'

import { SearchResult, Story } from '@/types/api'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { FileText, Book, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

interface SearchResultsProps {
  results: SearchResult[]
}

interface BookMap {
  [bookId: string]: Story | null
}

export function SearchResults({ results }: SearchResultsProps) {
  const [books, setBooks] = useState<BookMap>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true)
      const bookMap: BookMap = {}

      // Get unique book IDs
      const uniqueBookIds = [...new Set(results.map((r) => r.metadata.book_id))]

      // Fetch all book info in parallel
      await Promise.all(
        uniqueBookIds.map(async (bookId) => {
          try {
            const book = await api.story.getById(bookId)
            bookMap[bookId] = book
          } catch (error) {
            console.error(`Error fetching book ${bookId}:`, error)
            bookMap[bookId] = null
          }
        }),
      )

      setBooks(bookMap)
      setLoading(false)
    }

    if (results.length > 0) {
      fetchBooks()
    } else {
      setLoading(false)
    }
  }, [results])

  if (results.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-xl text-muted-foreground">
          Không tìm thấy kết quả phù hợp
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {results.map((result) => {
        const book = books[result.metadata.book_id]
        const bookSlug = book?.slug
        const bookHref = bookSlug
          ? `/truyen/${bookSlug}`
          : `/truyen/${result.metadata.book_id}`
        const chapterHref = bookSlug
          ? `/truyen/${bookSlug}/chuong/${result.metadata.chapter_index}`
          : `/truyen/${result.metadata.book_id}/chuong/${result.metadata.chapter_index}`

        return (
          <Card key={result.id} className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {loading ? (
                    <div className="inline-flex items-center gap-2 text-lg font-semibold">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Đang tải...
                    </div>
                  ) : (
                    <Link
                      href={bookHref}
                      className="inline-flex items-center gap-2 text-lg font-semibold transition-colors hover:text-primary"
                    >
                      <Book className="h-5 w-5" />
                      {book?.name || 'Truyện'}
                    </Link>
                  )}
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      <FileText className="mr-1 h-3 w-3" />
                      Chương {result.metadata.chapter_index}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Độ phù hợp: {(result.score * 100).toFixed(2)}%
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <p className="line-clamp-4 text-muted-foreground">
                  {result.text}
                </p>
              </div>
              <div className="mt-4">
                {loading ? (
                  <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Đang tải...
                  </span>
                ) : (
                  <Link
                    href={chapterHref}
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    Đọc chương này →
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
