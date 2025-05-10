import Link from "next/link"
import {
    BookOpen,
    Calendar,
    Clock,
    Heart,
    List,
    Share2,
    User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CommentSection } from "@/components/comment-section"
import { Story, ChapterDetail } from "@/types/api"
import { formatDistanceToNow } from "date-fns"
import { vi } from "date-fns/locale"
import { ChaptersList } from "@/components/chapters-list"

interface Props {
    params: {
        slug: string
    }
}

export default async function StoryPage({ params }: Props) {
    const slug = (await params).slug
    const story_res = await fetch(
        `https://backend.metruyencv.com/api/books/search?keyword=${slug}&page=1`
    )
    const data = await story_res.json()
    const story: Story = data.data[0]

    const chapter_res = await fetch(
        `https://backend.metruyencv.com/api/chapters?filter%5Bbook_id%5D=${story.id}&filter%5Btype%5D=published`
    )

    const chapter_data = await chapter_res.json()
    const chapters_detail: ChapterDetail[] = chapter_data.data
    if (!story) {
        return (
            <div className="container mx-auto px-4 py-10">
                <div className="text-center py-20">
                    <h1 className="text-2xl font-bold mb-4">
                        Truyện không tồn tại
                    </h1>
                    <Button asChild>
                        <Link href="/">Quay về trang chủ</Link>
                    </Button>
                </div>
            </div>
        )
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
                                        locale: vi,
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

            {/* <Tabs defaultValue="chapters">
                <TabsList className="mb-4">
                    <TabsTrigger value="chapters">Danh sách chương</TabsTrigger>
                    <TabsTrigger value="comments">Bình luận</TabsTrigger>
                </TabsList>
                <TabsContent value="chapters">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {chapters_detail
                            .slice(0, 30)
                            .map((data: ChapterDetail) => (
                                <Link
                                    key={data.id}
                                    href={`/truyen/${story.slug}/chuong/${data.index}`}
                                    className="p-2 hover:bg-muted rounded text-sm w-full flex-col"
                                >
                                    <span className="font-semibold">
                                        {data.name}
                                    </span>
                                    <div className="flex">
                                        <Clock className="h-4 w-3 inline mr-1 ml-1 text-muted-foreground" />
                                        <div className="text-xs text-muted-foreground">
                                            {formatDistanceToNow(
                                                new Date(data.published_at),
                                                {
                                                    addSuffix: true,
                                                    locale: vi,
                                                }
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                    </div>
                    {story.chapter_count > 30 && (
                        <div className="mt-4 text-center">
                            <Button variant="outline">Xem thêm</Button>
                        </div>
                    )}
                </TabsContent>
                <TabsContent value="comments">
                    <CommentSection
                        storyId={story.id.toString()}
                        initialComments={[
                            {
                                id: "comment-1",
                                user: {
                                    id: "user-1",
                                    name: "TruyenHayFan",
                                    avatar: "",
                                },
                                content:
                                    "Truyện hay quá! Mong tác giả ra chương mới sớm.",
                                createdAt: new Date(
                                    Date.now() - 2 * 24 * 60 * 60 * 1000
                                ).toISOString(),
                                likes: 5,
                                isLiked: false,
                                replies: [
                                    {
                                        id: "reply-1",
                                        user: {
                                            id: "user-2",
                                            name: "NguyenVanA",
                                            avatar: "",
                                        },
                                        content:
                                            "Đồng ý! Tôi đang rất háo hức chờ đợi chương tiếp theo.",
                                        createdAt: new Date(
                                            Date.now() - 1 * 24 * 60 * 60 * 1000
                                        ).toISOString(),
                                        likes: 2,
                                        isLiked: false,
                                    },
                                ],
                            },
                            {
                                id: "comment-2",
                                user: {
                                    id: "user-3",
                                    name: "ĐộcGiả123",
                                    avatar: "",
                                },
                                content:
                                    "Nhân vật chính quá mạnh, mong có thêm nhiều thử thách hơn.",
                                createdAt: new Date(
                                    Date.now() - 5 * 24 * 60 * 60 * 1000
                                ).toISOString(),
                                likes: 3,
                                isLiked: true,
                            },
                        ]}
                    />
                </TabsContent>
            </Tabs> */}

            <h2 className="text-xl font-semibold flex items-center">
                <List className="mr-2 h-5 w-5" />
                Danh sách chương
            </h2>
            <ChaptersList story={story} />
        </div>
    )
}

function getChapterDetail(chapterNumber: number) {
    const titles = [
        "Thiếu Niên Mất Đi Thiên Phú",
        "Thần Bí Lão Nhân",
        "Đấu Khí Công Pháp",
        "Bí Mật Hắc Viêm",
        "Gặp Gỡ Nữ Chính",
        "Tham Gia Khảo Hạch",
        "Đột Phá Đấu Giả",
        "Rời Khỏi Gia Tộc",
        "Bái Nhập Học Viện",
        "Kẻ Thù Cũ",
    ]

    return titles[chapterNumber % 10]
}
