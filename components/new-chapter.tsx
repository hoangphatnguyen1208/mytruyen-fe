'use client'

import { useEffect, useState } from 'react'
import { Story } from '@/types/api'
import { vi } from 'date-fns/locale/vi'
import { formatDistanceToNow } from 'date-fns'
import { Loader } from 'lucide-react'

const MYTRUYEN_API_BASE_URL =
  process.env.NEXT_PUBLIC_MYTRUYEN_API_BASE_URL || 'http://localhost:3000'

export function NewChapter() {
  const [newChapters, setNewChapters] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchNewChapter = () => {
      const params = new URLSearchParams({
        limit: '10',
        page: '1',
        sort: '-new_chap_at',
      })
      fetch(`${MYTRUYEN_API_BASE_URL}/books?${params.toString()}`)
        .then((res) => res.json())
        .then((data) => {
          setNewChapters(data.data)
          setIsLoading(false)
        })
        .catch((error) => {
          console.error('Error fetching new chapters:', error)
        })
    }

    fetchNewChapter()
    const interval = setInterval(() => {
      fetchNewChapter()
    }, 5000)
    return () => clearInterval(interval)
  }, [])
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    )
  }
  return (
    <div className="container mx-auto my-4">
      {newChapters.map((story: Story) => (
        <div
          className="grid min-h-10 grid-cols-12 gap-2 px-2 hover:bg-muted"
          key={story.id}
        >
          <div className="col-span-1 flex items-center">
            <span className="truncate text-sm text-muted-foreground">
              {story.genres?.[0]?.name}
            </span>
          </div>
          <div className="col-span-6 flex items-center">
            <a
              href={`/truyen/${story.slug}`}
              className="truncate text-sm font-medium hover:text-primary"
            >
              {story.name}
            </a>
          </div>
          <div className="col-span-2 flex items-center">
            <span className="block w-full truncate text-sm text-muted-foreground">
              {story.author?.name}
            </span>
          </div>
          <div className="col-span-2 flex items-center">
            <span className="truncate text-sm text-muted-foreground">
              Chương {story.chapter_count}
            </span>
          </div>
          <div className="col-span-1 flex items-center">
            <span className="truncate text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(story.new_chap_at), {
                addSuffix: true,
                locale: vi,
              })}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
