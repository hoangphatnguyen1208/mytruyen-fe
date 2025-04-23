"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, Clock, Search, Star, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/user-nav"
import { useAuthGuard } from "@/hooks/use-auth-guard"
import { useToast } from "@/hooks/use-toast"

export default function BookmarksPage() {
  const { isAuthorized, isLoading } = useAuthGuard()
  const { toast } = useToast()
  const [sortBy, setSortBy] = useState("recent")
  const [searchTerm, setSearchTerm] = useState("")
  const [bookmarks, setBookmarks] = useState(initialBookmarks)

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Đang tải...</div>
  }

  if (!isAuthorized) {
    return null // Sẽ được chuyển hướng bởi useAuthGuard
  }

  // Filter bookmarks based on search term and sort
  const filteredBookmarks = bookmarks
    .filter((bookmark) => {
      return (
        bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bookmark.author.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
    .sort((a, b) => {
      if (sortBy === "recent") return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
      if (sortBy === "title") return a.title.localeCompare(b.title)
      if (sortBy === "author") return a.author.localeCompare(b.author)
      return 0
    })

  const removeBookmark = (id) => {
    setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id))
    toast({
      title: "Đã xóa đánh dấu",
      description: "Truyện đã được xóa khỏi danh sách đánh dấu của bạn.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="flex justify-between items-center mb-8">
        <Link href="/" className="text-2xl font-bold">
          TruyệnHay
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <UserNav />
        </div>
      </header>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Truyện đã đánh dấu</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm truyện..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sắp xếp theo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Mới nhất</SelectItem>
                <SelectItem value="title">Tên truyện</SelectItem>
                <SelectItem value="author">Tác giả</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredBookmarks.length > 0 ? (
            filteredBookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className="flex border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="w-24 h-32 flex-shrink-0">
                  <img
                    src={bookmark.cover || "/placeholder.svg?height=128&width=96"}
                    alt={bookmark.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link
                        href={`/story/${bookmark.slug}`}
                        className="text-lg font-semibold hover:text-primary hover:underline"
                      >
                        {bookmark.title}
                      </Link>
                      <p className="text-sm text-muted-foreground">{bookmark.author}</p>
                    </div>
                    <div className="flex items-center text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm ml-1">{bookmark.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm mt-2 line-clamp-2">{bookmark.description}</p>
                  <div className="flex flex-col sm:flex-row sm:justify-between mt-3">
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <BookOpen className="h-3 w-3 mr-1" />
                        {bookmark.chapters} chương
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {bookmark.status}
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-0 flex gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/story/${bookmark.slug}`}>Đọc truyện</Link>
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => removeBookmark(bookmark.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 border rounded-lg">
              <p className="text-muted-foreground">Bạn chưa đánh dấu truyện nào</p>
              <Button variant="outline" className="mt-4" asChild>
                <Link href="/">Khám phá truyện</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const initialBookmarks = [
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
    addedAt: "2023-06-01T10:30:00Z",
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
    addedAt: "2023-05-28T15:45:00Z",
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
    addedAt: "2023-05-30T20:15:00Z",
  },
]
