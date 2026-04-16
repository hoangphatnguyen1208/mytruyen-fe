"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, Clock, Search, Star } from "lucide-react"
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

export default function NewStoriesPage() {
  const [sortBy, setSortBy] = useState("newest")
  const [searchTerm, setSearchTerm] = useState("")

  // Filter stories based on search term and sort
  const filteredStories = newStories
    .filter((story) => {
      return (
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.author.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      if (sortBy === "rating") return b.rating - a.rating
      if (sortBy === "chapters") return b.chapters - a.chapters
      return 0
    })

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="mb-6">
        <p className="text-muted-foreground">Những truyện mới nhất trên My Truyện</p>
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
              <SelectItem value="newest">Mới nhất</SelectItem>
              <SelectItem value="rating">Đánh giá</SelectItem>
              <SelectItem value="chapters">Số chương</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {filteredStories.length > 0 ? (
          filteredStories.map((story) => <StoryCard key={story.id} story={story} />)
        ) : (
          <div className="text-center py-8 border rounded-lg">
            <p className="text-muted-foreground">Không tìm thấy truyện phù hợp</p>
          </div>
        )}
      </div>

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
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

function StoryCard({ story } : { story: any }) {
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
        <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
          <div className="flex items-center">
            <BookOpen className="h-3 w-3 mr-1" />
            {story.chapters} chương
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {story.status.name}
          </div>
        </div>
      </div>
    </div>
  )
}

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
    views: 4500000,
    updatedAt: "2023-05-31T14:10:00Z",
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
    views: 3900000,
    updatedAt: "2023-05-29T09:30:00Z",
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
    views: 3200000,
    updatedAt: "2023-05-28T16:45:00Z",
  },
  {
    id: 10,
    title: "Đại Chúa Tể",
    slug: "dai-chua-te",
    author: "Thiên Tàm Thổ Đậu",
    description:
      "Đại thiên thế giới, nơi các vị Chúa Tể ngự trị. Mục Trần, một thiếu niên từ Bắc Linh Cảnh bước vào con đường tu luyện đầy chông gai.",
    cover: "/placeholder.svg?height=128&width=96",
    chapters: 1456,
    status: "Đang ra",
    rating: 4.5,
    views: 2800000,
    updatedAt: "2023-05-27T11:20:00Z",
  },
  {
    id: 11,
    title: "Bách Luyện Thành Thần",
    slug: "bach-luyen-thanh-than",
    author: "Huyền Vũ Thiên",
    description:
      "Một câu chuyện về hành trình tu luyện của Dương Khai, từ một thiếu niên bình thường trở thành một vị thần.",
    cover: "/placeholder.svg?height=128&width=96",
    chapters: 1234,
    status: "Đang ra",
    rating: 4.2,
    views: 2500000,
    updatedAt: "2023-05-26T08:15:00Z",
  },
  {
    id: 12,
    title: "Vô Thượng Thần Đế",
    slug: "vo-thuong-than-de",
    author: "Thiên Tằm Thổ Đậu",
    description:
      "Một câu chuyện về hành trình tu luyện của Trần Phàm, từ một thiếu niên bình thường trở thành một vị thần đế.",
    cover: "/placeholder.svg?height=128&width=96",
    chapters: 1567,
    status: "Đang ra",
    rating: 4.3,
    views: 2300000,
    updatedAt: "2023-05-25T14:30:00Z",
  },
  {
    id: 13,
    title: "Thần Mộ",
    slug: "than-mo",
    author: "Vong Ngữ",
    description: "Một câu chuyện về hành trình khám phá bí ẩn của Thần Mộ của nhân vật chính.",
    cover: "/placeholder.svg?height=128&width=96",
    chapters: 987,
    status: "Đang ra",
    rating: 4.1,
    views: 2100000,
    updatedAt: "2023-05-24T10:45:00Z",
  },
  {
    id: 14,
    title: "Đấu La Đại Lục",
    slug: "dau-la-dai-luc",
    author: "Đường Gia Tam Thiếu",
    description: "Một câu chuyện về hành trình tu luyện của Đường Tam trên Đấu La Đại Lục.",
    cover: "/placeholder.svg?height=128&width=96",
    chapters: 2134,
    status: "Hoàn thành",
    rating: 4.7,
    views: 7800000,
    updatedAt: "2023-05-23T09:20:00Z",
  },
]
