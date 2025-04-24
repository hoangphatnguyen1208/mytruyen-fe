"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, Clock, Search, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export default function MyStoriesPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [sortBy, setSortBy] = useState("recent")
  const [searchTerm, setSearchTerm] = useState("")

  // Redirect if not logged in
  if (!user) {
    router.push("/login")
    return null
  }

  // Filter stories based on search term and sort
  const filteredStories = myStories
    .filter((story) => {
      return (
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.author.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
    .sort((a, b) => {
      if (sortBy === "recent") return new Date(b.lastRead).getTime() - new Date(a.lastRead).getTime()
      if (sortBy === "progress") return b.progress - a.progress
      if (sortBy === "rating") return b.rating - a.rating
      return 0
    })

  return (
    <div className="container mx-auto px-4 py-3">
      <div className="mb-6">
        <p className="text-muted-foreground">Các truyện bạn đã lưu và đang theo dõi</p>
      </div>

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
              <SelectItem value="recent">Đọc gần đây</SelectItem>
              <SelectItem value="progress">Tiến độ</SelectItem>
              <SelectItem value="rating">Đánh giá</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {filteredStories.length > 0 ? (
          filteredStories.map((story) => <StoryCard key={story.id} story={story} />)
        ) : (
          <div className="text-center py-8 border rounded-lg">
            <p className="text-muted-foreground">Bạn chưa có truyện nào trong danh sách</p>
            <Button variant="outline" className="mt-4" asChild>
              <Link href="/">Khám phá truyện</Link>
            </Button>
          </div>
        )}
      </div>

      {filteredStories.length > 0 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}

function StoryCard({ story }) {
  return (
    <div className="flex border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="w-24 h-32 flex-shrink-0">
        <img
          src={story.cover || "/placeholder.svg?height=128&width=96"}
          alt={story.title}
          className="w-full h-full object-cover"
        />
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
        <div className="flex flex-col sm:flex-row sm:justify-between mt-3">
          <div className="flex gap-4 text-xs text-muted-foreground">
            <div className="flex items-center">
              <BookOpen className="h-3 w-3 mr-1" />
              {story.chapters} chương
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {story.status}
            </div>
          </div>
          <div className="mt-2 sm:mt-0">
            <Button size="sm" asChild>
              <Link href={`/story/${story.slug}/chapter/${story.currentChapter}`}>Tiếp tục đọc</Link>
            </Button>
          </div>
        </div>
        <div className="mt-2">
          <div className="text-xs text-muted-foreground mb-1">Tiến độ: {story.progress}%</div>
          <div className="w-full bg-muted rounded-full h-1.5">
            <div className="bg-primary h-1.5 rounded-full" style={{ width: `${story.progress}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

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
    currentChapter: 42,
    progress: 2.5,
    lastRead: "2023-06-01T10:30:00Z",
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
    currentChapter: 78,
    progress: 3.9,
    lastRead: "2023-05-28T15:45:00Z",
  },
  {
    id: 103,
    title: "Phàm Nhân Tu Tiên",
    slug: "pham-nhan-tu-tien",
    author: "Vong Ngữ",
    description:
      "Hàn Lập, một thiếu niên bình thường từ một gia đình nông dân, vì muốn đổi đời mà bước lên con đường tu tiên đầy chông gai.",
    cover: "/placeholder.svg?height=128&width=96",
    chapters: 2754,
    status: "Đang đọc: Chương 156",
    rating: 4.8,
    currentChapter: 156,
    progress: 5.7,
    lastRead: "2023-05-30T20:15:00Z",
  },
]
