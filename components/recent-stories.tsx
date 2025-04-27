import Link from "next/link"
import { Clock, BookOpen } from "lucide-react"

export function RecentStories() {
  // In a real app, this data would come from an API
  const recentStories = [
    {
      id: 1,
      title: "Đấu Phá Thương Khung",
      slug: "dau-pha-thuong-khung",
      cover: "/placeholder.svg?height=80&width=60",
      updatedAt: "2 giờ trước",
      chapter: 1665,
      author: "Thiên Tàm Thổ Đậu",
    },
    {
      id: 2,
      title: "Vũ Động Càn Khôn",
      slug: "vu-dong-can-khon",
      cover: "/placeholder.svg?height=80&width=60",
      updatedAt: "5 giờ trước",
      chapter: 1321,
      author: "Thiên Tàm Thổ Đậu",
    },
    {
      id: 3,
      title: "Nguyên Tôn",
      slug: "nguyen-ton",
      cover: "/placeholder.svg?height=80&width=60",
      updatedAt: "1 ngày trước",
      chapter: 986,
      author: "Thiên Tằm Thổ Đậu",
    },
    {
      id: 4,
      title: "Thần Đạo Đan Tôn",
      slug: "than-dao-dan-ton",
      cover: "/placeholder.svg?height=80&width=60",
      updatedAt: "2 ngày trước",
      chapter: 1245,
      author: "Cô Đơn Địa Phi",
    },
  ]

  return (
    <div className="w-full py-6">
      <div className="container px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center">
            <BookOpen className="mr-2 h-5 w-5 text-primary" />
            Truyện vừa cập nhật
          </h2>
          <Link href="/new-stories" className="text-sm text-primary hover:underline">
            Xem tất cả
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {recentStories.map((story) => (
            <Link
              key={story.id}
              href={`/story/${story.slug}`}
              className="group flex flex-col overflow-hidden rounded-lg border bg-card hover:shadow-md transition-all"
            >
              <div className="relative h-32 w-full overflow-hidden">
                <img
                  src={story.cover || "/placeholder.svg"}
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                  <div className="flex items-center text-xs text-white">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{story.updatedAt}</span>
                  </div>
                </div>
              </div>
              <div className="p-3 flex-1 flex flex-col">
                <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                  {story.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">{story.author}</p>
                <div className="text-xs text-muted-foreground mt-auto pt-2">Chương {story.chapter}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
