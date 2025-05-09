"use client"

import { useEffect, useState } from "react"
import { Story } from "@/types/api"
import { vi } from "date-fns/locale/vi"
import { formatDistanceToNow } from "date-fns"

export function NewChapter() {
    const [newChapters, setNewChapters] = useState([])

    useEffect(() => {
        const fetchNewChapter = () => {
            const params = new URLSearchParams({
                "filter[gender]": "1",
                include: "author,genres,creator",
                limit: "10",
                page: "1",
                sort: "-new_chap_at",
            })
            fetch(`/api/search?${params.toString()}`)
                .then((res) => res.json())
                .then((data) => setNewChapters(data.data))
                .catch((error) => {
                    console.error("Error fetching new chapters:", error)
                })
        }

        fetchNewChapter()
        const interval = setInterval(() => {
            console.log("Fetching new chapters...")
            fetchNewChapter()
        }, 60000) // 60 seconds
        return () => clearInterval(interval)
    }, [])
    return (
        <div className="container mx-auto">
            {newChapters.map((story: Story) => (
                <div
                    className="grid grid-cols-12 gap-2 min-h-10 hover:bg-muted px-2"
                    key={story.id}
                >
                    <div className="flex items-center col-span-1">
                        <span className="text-sm text-muted-foreground truncate">
                            {story.genres[0].name}
                        </span>
                    </div>
                    <div className="flex items-center col-span-6">
                        <a
                            href={`/truyen/${story.slug}`}
                            className="text-sm font-medium hover:text-primary truncate"
                        >
                            {story.name}
                        </a>
                    </div>
                    <div className="flex items-center col-span-2">
                        <span className="text-sm text-muted-foreground truncate w-full block">
                            {story.author?.name}
                        </span>
                    </div>
                    <div className="flex items-center col-span-2">
                        <span className="text-sm text-muted-foreground truncate">
                            Chương {story.chapter_count}
                        </span>
                    </div>
                    <div className="flex items-center col-span-1">
                        <span className="text-sm text-muted-foreground truncate">
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
