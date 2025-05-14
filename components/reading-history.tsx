"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Clock, BookOpen } from "lucide-react"
import { ReadingHistoryItem, getReadingHistory } from "@/lib/reading-history"
import { formatDistanceToNow } from "date-fns"
import { vi } from "date-fns/locale"

export function ReadingHistory() {
    const [history, setHistory] = useState<ReadingHistoryItem[]>([])

    useEffect(() => {
        // Load reading history from localStorage
        const loadedHistory = getReadingHistory()
        setHistory(loadedHistory)
    }, [])

    if (history.length === 0) {
        return (
            <div className="text-center py-6 text-muted-foreground">
                <p>Bạn chưa đọc truyện nào gần đây</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {history.slice(0, 6).map((item, index) => (
                <div
                    key={index}
                    className="flex border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                    <div className="w-[60px] h-[80px] flex-shrink-0">
                        <img
                            src={item.storyPoster || "/placeholder.svg"}
                            alt={item.storyName}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex-1 p-3">
                        <Link
                            href={`/truyen/${item.storySlug}`}
                            className="font-medium text-sm hover:text-primary hover:underline line-clamp-1"
                        >
                            {item.storyName}
                        </Link>
                        <div className="flex justify-between items-center mt-1">
                            <Link
                                href={`/truyen/${item.storySlug}/chuong/${item.chapterId}`}
                                className="text-xs text-muted-foreground hover:text-primary"
                            >
                                {item.chapterName}
                            </Link>
                            <div className="flex items-center text-xs text-muted-foreground">
                                <Clock className="h-3 w-3 mr-1" />
                                {formatDistanceToNow(new Date(item.readAt), {
                                    addSuffix: true,
                                    locale: vi
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {history.length > 6 && (
                <div className="md:col-span-2 text-center mt-2">
                    <Link
                        href="/lich-su-doc"
                        className="text-sm text-muted-foreground hover:text-primary inline-flex items-center"
                    >
                        <BookOpen className="h-3 w-3 mr-1" />
                        Xem tất cả lịch sử đọc
                    </Link>
                </div>
            )}
        </div>
    )
}
