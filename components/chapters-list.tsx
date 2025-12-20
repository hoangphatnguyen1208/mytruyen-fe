'use client'

import { useEffect, useState, useCallback, useTransition } from 'react'
import { ChevronRight, Loader, Search, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { ChapterDetail } from '@/types/api'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Clock } from 'lucide-react'
import { api } from '@/lib/api'
import { useDebounce } from '@/lib/hooks/use-debounce'
import { usePagination } from '@/lib/hooks/use-pagination'
import {
  ChapterListSkeleton,
  ChapterListLoadingOverlay,
} from './chapter-list-skeleton'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Input } from './ui/input'
import { Button } from './ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { cn } from '@/lib/utils'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'

interface Props {
  story: {
    id: number | string
    slug?: string
    chapter_count?: number
  }
}

export function ChaptersList({ story }: Props) {
  const [isPending, startTransition] = useTransition()
  const [searchInputValue, setSearchInputValue] = useState('')
  const debouncedSearchTerm = useDebounce(searchInputValue, 300) // 300ms debounce

  // Define the fetch function for our pagination hook
  const fetchChapters = useCallback(
    async (
      page: number,
      filters: { searchTerm: string; sortOrder: 'asc' | 'desc' },
    ) => {
      const data = await api.story.getPaginatedChapters(
        story.id,
        page,
        30, // chaptersPerPage
        filters.sortOrder,
        filters.searchTerm,
      )
      // Transform the data to match our hook's expected format
      return {
        data: data.chapters,
        total: data.total,
        page: data.page,
        totalPages: data.totalPages,
      }
    },
    [story.id],
  )
  // Use our custom pagination hook
  const {
    data: chapters,
    page: currentPage,
    totalPages,
    total,
    filters,
    isLoading,
    error,
    setPage,
    setFilters,
    refresh,
  } = usePagination<
    ChapterDetail,
    { searchTerm: string; sortOrder: 'asc' | 'desc' }
  >({
    fetchFn: fetchChapters,
    initialPage: 1,
    initialFilters: { searchTerm: '', sortOrder: 'desc' },
    perPage: 30,
  }) // Effect to update filters when search term changes (with debounce)
  useEffect(() => {
    startTransition(() => {
      setFilters({
        ...filters,
        searchTerm: debouncedSearchTerm,
      })
    })
  }, [debouncedSearchTerm, setFilters])

  // Handle sort order change
  const handleSortChange = useCallback(
    (value: 'asc' | 'desc') => {
      startTransition(() => {
        setFilters({
          ...filters,
          sortOrder: value,
        })
      })
    },
    [filters, setFilters],
  )

  const handlePageChange = (page: number) => {
    if (page === currentPage) return // Don't reload if already on this page

    setPage(page)
    // Scroll to top of chapter list with a slight offset to account for sticky header
    const chaptersListElement = document.getElementById('chapters-list')
    if (chaptersListElement) {
      const offset = chaptersListElement.offsetTop - 20 // 20px offset for better visibility
      window.scrollTo({
        top: offset,
        behavior: 'smooth',
      })
    }
  }

  // Handle search - updates the input value immediately for UX, but API call is debounced
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value)
  }

  // Handle retry on error
  const handleRetry = () => {
    refresh()
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Lỗi</AlertTitle>
        <AlertDescription>
          Không thể tải danh sách chương.
          <Button
            variant="link"
            onClick={handleRetry}
            className="px-2 underline"
          >
            Thử lại
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="flex flex-col space-y-4" id="chapters-list">
      <div className="mb-2 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Tìm kiếm chương..."
            className="pl-8"
            value={searchInputValue}
            onChange={handleSearchChange}
          />
        </div>{' '}
        <Select
          value={filters.sortOrder}
          onValueChange={handleSortChange}
          disabled={isLoading || isPending}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sắp xếp" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Mới nhất</SelectItem>
            <SelectItem value="asc">Cũ nhất</SelectItem>
          </SelectContent>
        </Select>
      </div>{' '}
      <div className="relative">
        {/* Loading overlay */}
        {(isLoading || isPending) && <ChapterListLoadingOverlay />}
        <div className="grid min-h-[200px] grid-cols-1 gap-2 md:grid-cols-3">
          {chapters.length > 0 ? (
            chapters.map((chapter: ChapterDetail) => (
              <Link
                key={chapter.id}
                href={`/truyen/${story.slug}/chuong/${chapter.index}`}
                className="w-full flex-col rounded p-2 text-base hover:bg-muted"
              >
                <span className="line-clamp-1 font-semibold">
                  {chapter.name}
                </span>
                <div className="flex">
                  <Clock className="ml-1 mr-1 inline h-4 w-3 text-muted-foreground" />
                  <div className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(chapter.created_at), {
                      addSuffix: true,
                      locale: vi,
                    })}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-3 py-8 text-center">
              <p className="text-muted-foreground">Không tìm thấy chương nào</p>
            </div>
          )}
        </div>{' '}
        {totalPages > 1 && (
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage > 1 && !isLoading && !isPending) {
                      handlePageChange(currentPage - 1)
                    }
                  }}
                  className={cn(
                    currentPage === 1 || isLoading || isPending
                      ? 'pointer-events-none opacity-50'
                      : 'cursor-pointer',
                  )}
                />
              </PaginationItem>
              {/* First page */}
              {currentPage > 2 && (
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (!isLoading && !isPending) {
                        handlePageChange(1)
                      }
                    }}
                    className={cn(
                      isLoading || isPending
                        ? 'pointer-events-none opacity-50'
                        : 'cursor-pointer',
                    )}
                    size="icon"
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
              )}{' '}
              {/* Ellipsis if needed */}
              {currentPage > 3 && (
                <PaginationItem>
                  <div className="flex h-9 w-9 items-center justify-center">
                    …
                  </div>
                </PaginationItem>
              )}
              {/* Previous page if not first */}
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (!isLoading && !isPending) {
                        handlePageChange(currentPage - 1)
                      }
                    }}
                    className={cn(
                      isLoading || isPending
                        ? 'pointer-events-none opacity-50'
                        : 'cursor-pointer',
                    )}
                    size="icon"
                  >
                    {currentPage - 1}
                  </PaginationLink>
                </PaginationItem>
              )}
              {/* Current page */}
              <PaginationItem>
                <PaginationLink
                  href="#"
                  isActive
                  className={cn(isLoading || isPending ? 'opacity-50' : '')}
                  size="icon"
                >
                  {currentPage}
                </PaginationLink>
              </PaginationItem>
              {/* Next page if not last */}
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (!isLoading && !isPending) {
                        handlePageChange(currentPage + 1)
                      }
                    }}
                    className={cn(
                      isLoading || isPending
                        ? 'pointer-events-none opacity-50'
                        : 'cursor-pointer',
                    )}
                    size="icon"
                  >
                    {currentPage + 1}
                  </PaginationLink>
                </PaginationItem>
              )}{' '}
              {/* Ellipsis if needed */}
              {currentPage < totalPages - 2 && (
                <PaginationItem>
                  <div className="flex h-9 w-9 items-center justify-center">
                    …
                  </div>
                </PaginationItem>
              )}
              {/* Last page if not current */}
              {currentPage < totalPages - 1 && (
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (!isLoading && !isPending) {
                        handlePageChange(totalPages)
                      }
                    }}
                    className={cn(
                      isLoading || isPending
                        ? 'pointer-events-none opacity-50'
                        : 'cursor-pointer',
                    )}
                    size="icon"
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage < totalPages && !isLoading && !isPending) {
                      handlePageChange(currentPage + 1)
                    }
                  }}
                  className={cn(
                    currentPage === totalPages || isLoading || isPending
                      ? 'pointer-events-none opacity-50'
                      : 'cursor-pointer',
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
      {/* Show total chapters info */}
      <div className="mt-2 text-right text-sm text-muted-foreground">
        {total > 0 ? (
          <p>
            Hiển thị {(currentPage - 1) * 30 + 1} -{' '}
            {Math.min(currentPage * 30, total)} trong {total} chương
          </p>
        ) : (
          <p>0 chương</p>
        )}
      </div>
    </div>
  )
}
