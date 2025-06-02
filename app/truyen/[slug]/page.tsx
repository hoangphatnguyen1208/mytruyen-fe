import Link from "next/link"
import {
    BookOpen,
    Calendar,
    Clock,
    Heart,
    List,
    Share2,
    User
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CommentSection } from "@/components/comment-section"
import { Story, ChapterDetail } from "@/types/api"
import { formatDistanceToNow } from "date-fns"
import { vi } from "date-fns/locale"
import { ChaptersList } from "@/components/chapters-list"
import { BackToTop } from "@/components/back-to-top"
import { Metadata } from "next"
import { serverApi } from "@/lib/server-api"
import { NotFound } from "@/components/not-found"

export async function generateMetadata({
    params
}: {
    params: { slug: string }
}): Promise<Metadata> {
    const { slug } = await params
    const story = await serverApi.story.getBySlug(slug)
    return { title: story?.name || "Truyện" }
}

interface Props {
    params: {
        slug: string
    }
}

export default async function StoryPage({ params }: Props) {
    const slug = (await params).slug
    const story = await serverApi.story.getBySlug(slug)
    if (!story) {
        return <NotFound message="Truyện không tồn tại" />
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="w-full md:w-48 flex-shrink-0">
                    <img
                        src={story.poster[300] || "/placeholder.svg"}
                        alt={story.name}
                        className="w-full aspect-[3/4] object-cover rounded-lg shadow-md"
                    />
                    <div className="flex gap-2 mt-4">
                        <Button className="flex-1 gap-1">
                            <BookOpen className="h-4 w-4" />
                            Đọc truyện
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            title="Lưu truyện"
                        >
                            <Heart className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" title="Chia sẻ">
                            <Share2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">{story.name}</h1>
                    <p className="text-muted-foreground mb-4">
                        Tác giả: {story.author.name}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                        <div className="flex items-center text-sm">
                            <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{story.chapter_count} chương</span>
                        </div>
                        <div className="flex items-center text-sm">
                            <User className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{story.view_count} lượt đọc</span>
                        </div>
                        <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{story.status}</span>
                        </div>
                        <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>
                                Cập nhật:{" "}
                                {formatDistanceToNow(
                                    new Date(story.new_chap_at),
                                    {
                                        addSuffix: true,
                                        locale: vi
                                    }
                                )}
                            </span>
                        </div>
                        <div className="flex items-center text-sm">
                            <List className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>Thể loại: {story.genres[0].name}</span>
                        </div>
                    </div>

                    <div className="flex gap-3 mb-6">
                        <Button asChild>
                            <Link href={`/truyen/${story.slug}/chapter/1`}>
                                Đọc từ đầu
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link
                                href={`/truyen/${story.slug}/chapter/${story.chapter_count}`}
                            >
                                Chương mới nhất
                            </Link>
                        </Button>
                    </div>

                    <div>
                        <h2 className="font-semibold mb-2">Giới thiệu:</h2>
                        {story.synopsis.split("\n").map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                    </div>
                </div>
            </div>

            <h2 className="text-xl font-semibold flex items-center">
                <List className="mr-2 h-5 w-5" /> Danh sách chương
            </h2>
            <ChaptersList story={story} />
            <BackToTop />
        </div>
    )
}
