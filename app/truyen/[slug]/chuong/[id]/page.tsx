import Link from "next/link"
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { Metadata } from "next"
import { serverApi } from "@/lib/server-api"
import { NotFound } from "@/components/not-found"
import { BackToTop } from "@/components/back-to-top"
import { ReadingContent } from "@/components/reading-content"
import { ReadingTracker } from "@/components/reading-tracker"

export async function generateMetadata({
    params
}: {
    params: { slug: string; id: string }
}): Promise<Metadata> {
    const { slug, id } = await params
    const story = await serverApi.story.getBySlug(slug)
    return {
        title: story?.name ? `${story.name} - Chương ${id}` : `Chương ${id}`
    }
}

interface Props {
    params: {
        slug: string
        id: string
    }
}

export default async function ChapterPage({ params }: Props) {
    const { slug, id } = await params
    const chapterId = Number.parseInt(id)

    const story = await serverApi.story.getBySlug(slug)
    const chapterContent = await serverApi.chapter.getById(slug, chapterId)

    // Get chapter details and navigation information
    const chapters_detail = story
        ? await serverApi.story.getChapters(story.id)
        : []
    const chapterDetail = chapters_detail.find((c) => c.index === chapterId)
    const navigation = story
        ? await serverApi.chapter.getNavigation(story.id, chapterId)
        : { prev: null, next: null }

    if (!story || !chapterContent) {
        return <NotFound message="Chương không tồn tại" />
    }

    const fontSizeClasses = {
        small: "text-sm",
        medium: "text-base",
        large: "text-lg",
        xlarge: "text-xl"
    }

    // Get previous and next chapter IDs for navigation
    const prevChapterId = navigation.prev?.index || null
    const nextChapterId = navigation.next?.index || null

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            {" "}
            <header className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">{story.name}</h1>
                    <p className="text-muted-foreground">
                        Chương {chapterId}: {chapterDetail?.name || ""}
                    </p>
                </div>
                <Link
                    href={`/truyen/${slug}`}
                    className="flex items-center text-muted-foreground hover:text-foreground"
                >
                    <BookOpen className="mr-1 h-4 w-4" />
                    <span className="text-sm">Thông tin truyện</span>
                </Link>
            </header>
            {/* Reading progress bar */}
            <div className="w-full h-1 bg-muted mb-6">
                <div
                    className="h-full bg-primary"
                    style={{
                        width: `${(chapterId / story.chapter_count) * 100}%`
                    }}
                ></div>
            </div>
            {/* Chapter navigation */}
            <div className="flex justify-between mb-6">
                {prevChapterId ? (
                    <Button variant="outline" asChild>
                        <Link
                            href={`/truyen/${slug}/chuong/${prevChapterId}`}
                            className="flex items-center"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Chương trước
                        </Link>
                    </Button>
                ) : (
                    <Button variant="outline" disabled>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Chương trước
                    </Button>
                )}

                {nextChapterId ? (
                    <Button variant="outline" asChild>
                        <Link
                            href={`/truyen/${slug}/chuong/${nextChapterId}`}
                            className="flex items-center"
                        >
                            Chương tiếp
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                ) : (
                    <Button variant="outline" disabled>
                        Chương tiếp
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>{" "}
            {/* Invisible component to track reading progress */}
            <ReadingTracker
                story={story}
                chapterId={chapterId}
                chapterName={chapterDetail?.name}
            />
            {/* Chapter content */}
            <ReadingContent
                content={chapterContent}
                slug={slug}
                chapterId={chapterId}
            />
            {/* Bottom chapter navigation */}
            <div className="flex justify-between mb-6">
                {prevChapterId ? (
                    <Button variant="outline" asChild>
                        <Link
                            href={`/truyen/${slug}/chuong/${prevChapterId}`}
                            className="flex items-center"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Chương trước
                        </Link>
                    </Button>
                ) : (
                    <Button variant="outline" disabled>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Chương trước
                    </Button>
                )}

                {nextChapterId ? (
                    <Button variant="outline" asChild>
                        <Link
                            href={`/truyen/${slug}/chuong/${nextChapterId}`}
                            className="flex items-center"
                        >
                            Chương tiếp
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                ) : (
                    <Button variant="outline" disabled>
                        Chương tiếp
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>{" "}
            {/* Return to story link */}
            <div className="text-center">
                <Button variant="link" asChild>
                    <Link
                        href={`/truyen/${slug}`}
                        className="flex items-center justify-center"
                    >
                        <BookOpen className="mr-2 h-4 w-4" />
                        Quay lại trang thông tin truyện
                    </Link>
                </Button>
            </div>
            <BackToTop />
        </div>
    )
}
