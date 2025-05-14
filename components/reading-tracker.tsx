"use client"

import { useEffect } from "react"
import { addToReadingHistory } from "@/lib/reading-history"
import { Story, ChapterDetail } from "@/types/api"

interface Props {
    story: Story
    chapterId: number
    chapterName?: string
}

export function ReadingTracker({ story, chapterId, chapterName }: Props) {
    useEffect(() => {
        // Save reading progress to local storage
        addToReadingHistory({
            storyId: story.id,
            storySlug: story.slug,
            storyName: story.name,
            storyPoster: story.poster[150] || "",
            chapterId: chapterId,
            chapterName: chapterName || `Chương ${chapterId}`
        })
    }, [story, chapterId, chapterName])

    // This component doesn't render anything, it just tracks reading
    return null
}
