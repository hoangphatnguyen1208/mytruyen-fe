'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Clock, BookOpen } from 'lucide-react'
import { ReadingHistoryItem, getReadingHistory } from '@/lib/reading-history'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'

export function ReadingHistory() {
  const [history, setHistory] = useState<ReadingHistoryItem[]>([])

  useEffect(() => {
    // Load reading history from localStorage
    const loadedHistory = getReadingHistory()
    setHistory(loadedHistory)
  }, [])

  if (history.length === 0) {
    return (
      <div className="py-6 text-center text-muted-foreground">
        <p>Bạn chưa đọc truyện nào gần đây</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {history.slice(0, 6).map((item, index) => (
        <div
          key={index}
          className="flex overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-md"
        >
          <div className="h-[80px] w-[60px] flex-shrink-0">
            <img
              src={item.storyPoster || '/placeholder.svg'}
              alt={item.storyName}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1 p-3">
            <Link
              href={`/truyen/${item.storySlug}`}
              className="line-clamp-1 text-sm font-medium hover:text-primary hover:underline"
            >
              {item.storyName}
            </Link>
            <div className="mt-1 flex items-center justify-between">
              <Link
                href={`/truyen/${item.storySlug}/chuong/${item.chapterId}`}
                className="text-xs text-muted-foreground hover:text-primary"
              >
                {item.chapterName}
              </Link>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                {formatDistanceToNow(new Date(item.readAt), {
                  addSuffix: true,
                  locale: vi,
                })}
              </div>
            </div>
          </div>
        </div>
      ))}

      {history.length > 6 && (
        <div className="mt-2 text-center md:col-span-2">
          <Link
            href="/lich-su-doc"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
          >
            <BookOpen className="mr-1 h-3 w-3" />
            Xem tất cả lịch sử đọc
          </Link>
        </div>
      )}
    </div>
  )
}
