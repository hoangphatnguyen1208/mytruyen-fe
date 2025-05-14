"use client"

import { useState, useEffect } from "react"
import { ReadingControls } from "./reading-controls"
import { ChapterUpdateNotifier } from "./chapter-update-notifier"
import { getReadingPrefs } from "@/lib/reading-preferences"

interface Props {
    content: string
    slug?: string
    chapterId?: string | number
}

export function ReadingContent({ content, slug, chapterId }: Props) {
    const [fontSize, setFontSize] = useState<
        "small" | "medium" | "large" | "xlarge"
    >("medium")
    const [currentContent, setCurrentContent] = useState(content)

    // Load saved font size preference on component mount
    useEffect(() => {
        const prefs = getReadingPrefs()
        setFontSize(prefs.fontSize)
    }, [])

    // Update content when props change
    useEffect(() => {
        setCurrentContent(content)
    }, [content])

    const fontSizeClasses = {
        small: "text-sm leading-relaxed",
        medium: "text-base leading-relaxed",
        large: "text-lg leading-relaxed",
        xlarge: "text-xl leading-relaxed"
    }

    const handleFontSizeChange = (
        size: "small" | "medium" | "large" | "xlarge"
    ) => {
        setFontSize(size)
    } // Handler for content updates from ChapterUpdateNotifier
    const handleContentUpdate = (updatedContent: string) => {
        setCurrentContent(updatedContent)
    }

    return (
        <div className="mb-6">
            <div className="flex justify-end mb-2">
                <ReadingControls onFontSizeChange={handleFontSizeChange} />
            </div>

            {slug && chapterId && (
                <div className="mb-4">
                    <ChapterUpdateNotifier
                        slug={slug}
                        chapterId={chapterId}
                        onUpdateAvailable={handleContentUpdate}
                    />
                </div>
            )}

            <div className="bg-card rounded-lg p-6 shadow-sm border">
                <div
                    className={`prose prose-sm dark:prose-invert max-w-none ${fontSizeClasses[fontSize]}`}
                >
                    {" "}
                    {currentContent ? (
                        currentContent
                            .split("\n")
                            .map((paragraph: string, index: number) => (
                                <p key={index}>{paragraph}</p>
                            ))
                    ) : (
                        <p className="text-center text-muted-foreground">
                            Nội dung chương đang được cập nhật...
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
