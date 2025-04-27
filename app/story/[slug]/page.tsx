"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { BookOpen, Calendar, Clock, Heart, List, Share2, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CommentSection } from "@/components/comment-section"

export default function StoryPage() {
  const params = useParams()
  const slug = params.slug as string

  // In a real app, you would fetch the story data based on the slug
  const story = getStoryBySlug(slug)

  if (!story) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold mb-4">Truyện không tồn tại</h1>
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
            src={story.cover || "/placeholder.svg"}
            alt={story.title}
            className="w-full aspect-[3/4] object-cover rounded-lg shadow-md"
          />
          <div className="flex gap-2 mt-4">
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
          <h1 className="text-3xl font-bold mb-2">{story.title}</h1>
          <p className="text-muted-foreground mb-4">Tác giả: {story.author}</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center text-sm">
              <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{story.chapters} chương</span>
            </div>
            <div className="flex items-center text-sm">
              <User className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{story.views} lượt đọc</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{story.status}</span>
            </div>
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Cập nhật: {story.updated}</span>
            </div>
            <div className="flex items-center text-sm">
              <List className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Thể loại: {story.categories.join(", ")}</span>
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <Button asChild>
              <Link href={`/story/${story.slug}/chapter/1`}>Đọc từ đầu</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/story/${story.slug}/chapter/${story.chapters}`}>Chương mới nhất</Link>
            </Button>
          </div>

          <div>
            <h2 className="font-semibold mb-2">Giới thiệu:</h2>
            <p className="text-sm">{story.description}</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="chapters">
        <TabsList className="mb-4">
          <TabsTrigger value="chapters">Danh sách chương</TabsTrigger>
          <TabsTrigger value="comments">Bình luận (2)</TabsTrigger>
        </TabsList>
        <TabsContent value="chapters">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {Array.from({ length: Math.min(30, story.chapters) }, (_, i) => (
              <Link
                key={i}
                href={`/story/${story.slug}/chapter/${i + 1}`}
                className="p-2 hover:bg-muted rounded text-sm"
              >
                Chương {i + 1}: {getChapterTitle(i + 1)}
              </Link>
            ))}
          </div>
          {story.chapters > 30 && (
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
                content: "Truyện hay quá! Mong tác giả ra chương mới sớm.",
                createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
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
                    content: "Đồng ý! Tôi đang rất háo hức chờ đợi chương tiếp theo.",
                    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
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
                content: "Nhân vật chính quá mạnh, mong có thêm nhiều thử thách hơn.",
                createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                likes: 3,
                isLiked: true,
              },
            ]}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Helper functions and sample data
function getStoryBySlug(slug: string) {
  const stories = [
    {
      id: 1,
      title: "Đấu Phá Thương Khung",
      slug: "dau-pha-thuong-khung",
      author: "Thiên Tàm Thổ Đậu",
      description:
        "Đấu khí đại lục, một đại lục rộng lớn với đấu khí là sức mạnh chí cao vô thượng. Tiêu Viêm, một thiên tài tu luyện đấu khí, vì một lý do không rõ mà bị mất đi thiên phú tu luyện. Trong một lần tình cờ, Tiêu Viêm gặp được Dược Lão, từ đó bước vào con đường tu luyện đầy gian nan nhưng cũng vô cùng hấp dẫn. Trên con đường đó, Tiêu Viêm từng bước trưởng thành, không ngừng đối mặt với những thế lực mạnh mẽ, từng bước khám phá ra những bí mật về võ đạo, về thế giới, về thân thế của mình.",
      cover: "/placeholder.svg?height=400&width=300",
      chapters: 1665,
      status: "Hoàn thành",
      views: "8.5M",
      updated: "12/05/2023",
      categories: ["Tiên Hiệp", "Huyền Huyễn", "Võ Hiệp"],
      rating: 4.8,
    },
    {
      id: 2,
      title: "Vũ Động Càn Khôn",
      slug: "vu-dong-can-khon",
      author: "Thiên Tàm Thổ Đậu",
      description:
        "Vũ động càn khôn, vạn vật vận hành. Vũ Động Càn Khôn là một thế giới kỳ diệu, nơi con người có thể tu luyện để đạt đến những cảnh giới siêu phàm.",
      cover: "/placeholder.svg?height=400&width=300",
      chapters: 1321,
      status: "Hoàn thành",
      views: "7.2M",
      updated: "10/03/2023",
      categories: ["Tiên Hiệp", "Huyền Huyễn"],
      rating: 4.7,
    },
    {
      id: 3,
      title: "Nguyên Tôn",
      slug: "nguyen-ton",
      author: "Thiên Tằm Thổ Đậu",
      description:
        "Một tác phẩm mới của Thiên Tằm Thổ Đậu, tác giả của Đấu Phá Thương Khung và Vũ Động Càn Khôn. Câu chuyện về hành trình trở thành Nguyên Tôn của nhân vật chính.",
      cover: "/placeholder.svg?height=400&width=300",
      chapters: 986,
      status: "Đang ra",
      views: "5.8M",
      updated: "Hôm nay",
      categories: ["Tiên Hiệp", "Huyền Huyễn"],
      rating: 4.6,
    },
  ]

  return stories.find((story) => story.slug === slug)
}

function getChapterTitle(chapterNumber: number) {
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
