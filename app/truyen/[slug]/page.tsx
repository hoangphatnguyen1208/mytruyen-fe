import Link from "next/link"
import {
    BookOpen,
    Calendar,
    Heart,
    List,
    Share2,
    User,
    PenLine,
    Clock,
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
import { api } from "@/lib/api"
import { NotFound } from "@/components/not-found"

export async function generateMetadata({
    params
}: {
    params: { slug: string }
}): Promise<Metadata> {
    const { slug } = await params
    const story = await api.book.getBySlug(slug)
    return { title: story?.name || "Truyện" }
}

interface Props {
    params: {
        slug: string
    }
}

export default async function StoryPage({ params }: Props) {
    const slug = (await params).slug
    const story = await api.book.getBySlug(slug)
    if (!story) {
        return <NotFound message="Truyện không tồn tại" />
    }

    return (
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8 flex flex-col gap-6 md:flex-row">
          <div className="w-full flex-shrink-0 md:w-48">
            <img
              src={story.poster[300] || '/placeholder.svg'}
              alt={story.name}
              className="aspect-[3/4] w-full rounded-lg object-cover shadow-md"
            />
            <div className="mt-4 flex gap-2">
              <Button className="flex-1 gap-1">
                <BookOpen className="h-4 w-4" />
                Đọc truyện
              </Button>
              <Button variant="outline" size="icon" title="Lưu truyện">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" title="Chia sẻ">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1">
            <h1 className="mb-2 text-3xl font-bold">{story.name}</h1>
            <p className="mb-4 text-muted-foreground">
              Tác giả: {story.author.name}
            </p>

            <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3">
              <div className="flex items-center text-sm">
                <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{story.chapter_count} chương</span>
              </div>
              <div className="flex items-center text-sm">
                <User className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{story.view_count} lượt đọc</span>
              </div>
              <div className="flex items-center text-sm">
                <PenLine className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Trạng thái: {story.status.name}</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>
                  Cập nhật:{' '}
                  {formatDistanceToNow(new Date(story.new_chap_at), {
                    addSuffix: true,
                    locale: vi,
                  })}
                </span>
              </div>
              <div className="flex items-center text-sm">
                <List className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Thể loại: {story.genres?.[0].name}</span>
              </div>
              <div className="flex items-center text-sm">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{story.chapter_per_week} chương/tuần</span>
              </div>
            </div>

            <div className="mb-6 flex gap-3">
              <Button asChild>
                <Link href={`/truyen/${story.slug}/chapter/1`}>Đọc từ đầu</Link>
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
              <h2 className="mb-2 font-semibold">Giới thiệu:</h2>
              {story.synopsis?.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
        </div>

        <h2 className="flex items-center text-xl font-semibold">
          <List className="mr-2 h-5 w-5" /> Danh sách chương
        </h2>
        <ChaptersList story={story} />
        <BackToTop />
      </div>
    )
}
