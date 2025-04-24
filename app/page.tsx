"use client"

import Link from "next/link"
import { BookOpen, Clock, Star, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <Tabs defaultValue="hot" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="hot">Truyện Hot</TabsTrigger>
              <TabsTrigger value="new">Truyện Mới</TabsTrigger>
              <TabsTrigger value="complete">Hoàn Thành</TabsTrigger>
              {user && <TabsTrigger value="my">My Truyện</TabsTrigger>}
            </TabsList>
            <TabsContent value="hot" className="space-y-4">
              {hotStories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}

              <div className="flex justify-center mt-6">
                <Button variant="outline" asChild>
                  <Link href="/hot-stories" className="flex items-center gap-1">
                    Xem tất cả
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="new" className="space-y-4">
              {newStories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}

              <div className="flex justify-center mt-6">
                <Button variant="outline" asChild>
                  <Link href="/new-stories" className="flex items-center gap-1">
                    Xem tất cả
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="complete" className="space-y-4">
              {completeStories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}

              <div className="flex justify-center mt-6">
                <Button variant="outline" asChild>
                  <Link href="/complete-stories" className="flex items-center gap-1">
                    Xem tất cả
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="my" className="space-y-4">
              {user && (
                <>
                  <div className="text-center py-4">
                    <h3 className="text-lg font-medium">Truyện của bạn</h3>
                    <p className="text-muted-foreground">Các truyện bạn đã lưu và theo dõi</p>
                  </div>
                  {myStories.length > 0 ? (
                    <>
                      {myStories.map((story) => (
                        <StoryCard key={story.id} story={story} />
                      ))}

                      <div className="flex justify-center mt-6">
                        <Button variant="outline" asChild>
                          <Link href="/my-stories" className="flex items-center gap-1">
                            Xem tất cả
                            <ChevronRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8 border rounded-lg">
                      <p className="text-muted-foreground">Bạn chưa có truyện nào trong danh sách</p>
                    </div>
                  )}
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:col-span-1">
          <div className="border rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold mb-4">Thể Loại</h2>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="text-sm hover:text-primary hover:underline"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Truyện Đọc Nhiều</h2>
            <div className="space-y-4">
              {popularStories.map((story, index) => (
                <div key={story.id} className="flex gap-3">
                  <div className="font-bold text-muted-foreground">{index + 1}</div>
                  <div>
                    <Link href={`/story/${story.slug}`} className="font-medium hover:text-primary hover:underline">
                      {story.title}
                    </Link>
                    <p className="text-xs text-muted-foreground">{story.author}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StoryCard({ story }) {
  return (
    <div className="flex border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="w-24 h-32 flex-shrink-0">
        <img src={story.cover || "/placeholder.svg"} alt={story.title} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 p-4">
        <div className="flex justify-between items-start">
          <div>
            <Link href={`/story/${story.slug}`} className="text-lg font-semibold hover:text-primary hover:underline">
              {story.title}
            </Link>
            <p className="text-sm text-muted-foreground">{story.author}</p>
          </div>
          <div className="flex items-center text-amber-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm ml-1">{story.rating}</span>
          </div>
        </div>
        <p className="text-sm mt-2 line-clamp-2">{story.description}</p>
        <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
          <div className="flex items-center">
            <BookOpen className="h-3 w-3 mr-1" />
            {story.chapters} chương
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {story.status}
          </div>
        </div>
      </div>
    </div>
  )
}

// Sample data
const categories = [
  { id: 1, name: "Tiên Hiệp", slug: "tien-hiep" },
  { id: 2, name: "Kiếm Hiệp", slug: "kiem-hiep" },
  { id: 3, name: "Ngôn Tình", slug: "ngon-tinh" },
  { id: 4, name: "Đô Thị", slug: "do-thi" },
  { id: 5, name: "Huyền Huyễn", slug: "huyen-huyen" },
  { id: 6, name: "Kỳ Ảo", slug: "ky-ao" },
  { id: 7, name: "Võng Du", slug: "vong-du" },
  { id: 8, name: "Khoa Huyễn", slug: "khoa-huyen" },
  { id: 9, name: "Lịch Sử", slug: "lich-su" },
  { id: 10, name: "Quân Sự", slug: "quan-su" },
]

const hotStories = [
  {
    id: 1,
    title: "Đấu Phá Thương Khung",
    slug: "dau-pha-thuong-khung",
    author: "Thiên Tàm Thổ Đậu",
    description:
      "Đấu khí đại lục, một đại lục rộng lớn với đấu khí là sức mạnh chí cao vô thượng. Tiêu Viêm, một thiên tài tu luyện đấu khí, vì một lý do không rõ mà bị mất đi thiên phú tu luyện.",
    cover: "/placeholder.svg?height=128&width=96",
    chapters: 1665,
    status: "Hoàn thành",
    rating: 4.8,
  },
  {
    id: 2,
    title: "Vũ Động Càn Khôn",
    slug: "vu-dong-can-khon",
    author: "Thiên Tàm Thổ Đậu",
    description:
      "Vũ động càn khôn, vạn vật vận hành. Vũ Động Càn Khôn là một thế giới kỳ diệu, nơi con người có thể tu luyện để đạt đến những cảnh giới siêu phàm.",
    cover: "/placeholder.svg?height=128&width=96",
    chapters: 1321,
    status: "Hoàn thành",
    rating: 4.7,
  },
  {
    id: 3,
    title: "Nguyên Tôn",
    slug: "nguyen-ton",
    author: "Thiên Tằm Thổ Đậu",
    description:
      "Một tác phẩm mới của Thiên Tằm Thổ Đậu, tác giả của Đấu Phá Thương Khung và Vũ Động Càn Khôn. Câu chuyện về hành trình trở thành Nguyên Tôn của nhân vật chính.",
    cover: "/placeholder.svg?height=128&width=96",
    chapters: 986,
    status: "Đang ra",
    rating: 4.6,
  },
]

const newStories = [
  {
    id: 4,
    title: "Thần Đạo Đan Tôn",
    slug: "than-dao-dan-ton",
    author: "Cô Đơn Địa Phi",
    description:
      "Một thiếu niên bị gia tộc ruồng bỏ, nhưng lại có được kỳ ngộ, từ đó bước lên con đường tu luyện, trở thành một Đan Tôn danh chấn thiên hạ.",
    cover: "/placeholder.svg?height=128&width=96",
    chapters: 1245,
    status: "Đang ra",
    rating: 4.5,
  },
  {
    id: 5,
    title: "Vạn Cổ Thần Đế",
    slug: "van-co-than-de",
    author: "Phi Thiên Ngư",
    description:
      "Trương Nhược Trần, thiên tài một đời bị hãm hại chết, trùng sinh về thời niên thiếu. Từ một thiếu niên không có căn cơ tu luyện, một bước một bước đi đến đỉnh phong.",
    cover: "/placeholder.svg?height=128&width=96",
    chapters: 3562,
    status: "Đang ra",
    rating: 4.4,
  },
  {
    id: 6,
    title: "Linh Vũ Thiên Hạ",
    slug: "linh-vu-thien-ha",
    author: "Vũ Phong",
    description:
      "Trong thế giới nơi linh khí là nguồn sức mạnh, Tần Vũ là một thiếu niên có ước mơ trở thành một cường giả đứng trên đỉnh cao của thế giới tu luyện.",
    cover: "/placeholder.svg?height=128&width=96",
    chapters: 1789,
    status: "Đang ra",
    rating: 4.3,
  },
]

const completeStories = [
  {
    id: 7,
    title: "Tiên Nghịch",
    slug: "tien-nghich",
    author: "Nhĩ Căn",
    description:
      "Một câu chuyện về hành trình tu tiên đầy gian nan và kỳ diệu của Vương Lâm, từ một thiếu niên bình thường trở thành một cường giả tiên đạo.",
    cover: "/placeholder.svg?height=128&width=96",
    chapters: 2000,
    status: "Hoàn thành",
    rating: 4.9,
  },
  {
    id: 8,
    title: "Phàm Nhân Tu Tiên",
    slug: "pham-nhan-tu-tien",
    author: "Vong Ngữ",
    description:
      "Hàn Lập, một thiếu niên bình thường từ một gia đình nông dân, vì muốn đổi đời mà bước lên con đường tu tiên đầy chông gai.",
    cover: "/placeholder.svg?height=128&width=96",
    chapters: 2754,
    status: "Hoàn thành",
    rating: 4.8,
  },
  {
    id: 9,
    title: "Tru Tiên",
    slug: "tru-tien",
    author: "Tiêu Đỉnh",
    description:
      "Một câu chuyện huyền ảo về tình yêu, tình bạn, và sự trưởng thành của Trương Tiểu Phàm trên con đường tu tiên đầy thử thách.",
    cover: "/placeholder.svg?height=128&width=96",
    chapters: 1872,
    status: "Hoàn thành",
    rating: 4.9,
  },
]

const popularStories = [
  {
    id: 1,
    title: "Đấu Phá Thương Khung",
    slug: "dau-pha-thuong-khung",
    author: "Thiên Tàm Thổ Đậu",
  },
  {
    id: 7,
    title: "Tiên Nghịch",
    slug: "tien-nghich",
    author: "Nhĩ Căn",
  },
  {
    id: 8,
    title: "Phàm Nhân Tu Tiên",
    slug: "pham-nhan-tu-tien",
    author: "Vong Ngữ",
  },
  {
    id: 2,
    title: "Vũ Động Càn Khôn",
    slug: "vu-dong-can-khon",
    author: "Thiên Tàm Thổ Đậu",
  },
  {
    id: 9,
    title: "Tru Tiên",
    slug: "tru-tien",
    author: "Tiêu Đỉnh",
  },
]

const myStories = [
  {
    id: 101,
    title: "Đấu Phá Thương Khung",
    slug: "dau-pha-thuong-khung",
    author: "Thiên Tàm Thổ Đậu",
    description: "Đấu khí đại lục, một đại lục rộng lớn với đấu khí là sức mạnh chí cao vô thượng.",
    cover: "/placeholder.svg?height=128&width=96",
    chapters: 1665,
    status: "Đang đọc: Chương 42",
    rating: 4.8,
  },
  {
    id: 102,
    title: "Tiên Nghịch",
    slug: "tien-nghich",
    author: "Nhĩ Căn",
    description: "Một câu chuyện về hành trình tu tiên đầy gian nan và kỳ diệu của Vương Lâm.",
    cover: "/placeholder.svg?height=128&width=96",
    chapters: 2000,
    status: "Đang đọc: Chương 78",
    rating: 4.9,
  },
]
