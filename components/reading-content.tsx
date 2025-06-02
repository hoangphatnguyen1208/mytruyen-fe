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
        "small" | "medium" | "large" | "xlarge" | "xxlarge" | "xxxlarge"
    >("xlarge")
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
        xlarge: "text-xl leading-relaxed",
        xxlarge: "text-2xl leading-relaxed",
        xxxlarge: "text-3xl leading-relaxed"
    }

    const handleFontSizeChange = (
        size: "small" | "medium" | "large" | "xlarge" | "xxlarge" | "xxxlarge"
    ) => {
        setFontSize(size)
    }

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
                <div className={`max-w-none`}>
                    {currentContent ? (
                        currentContent
                            .split("\n")
                            .map((paragraph: string, index: number) => {
                                if (paragraph.trim() == "") {
                                    return <p key={index} className={fontSizeClasses[fontSize]}>&nbsp;</p>;
                                }
                                else {
                                    return (
                                        <p
                                            key={index}
                                            className={fontSizeClasses[fontSize]}
                                        >
                                            {paragraph}
                                        </p>
                                    )
                                }
                            })
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
