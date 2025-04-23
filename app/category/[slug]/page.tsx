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

export default function CategoryPage({ params }) {
  const { slug } = params
  const category = categories.find((c) => c.slug === slug) || { name: "Không tìm thấy", description: "" }
  const [sortBy, setSortBy] = useState("newest")
  const [status, setStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Filter stories based on search term, sort, and status
  const filteredStories = categoryStories
    .filter((story) => {
      const matchesSearch =
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.author.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = status === "all" || story.status === status
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      if (sortBy === "popular") return b.views - a.views
      if (sortBy === "rating") return b.rating - a.rating
      return 0
    })

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{category.name}</h1>
        <p className="text-muted-foreground">{category.description}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Tìm kiếm trong thể loại này..."
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
              <SelectItem value="popular">Phổ biến nhất</SelectItem>
              <SelectItem value="rating">Đánh giá cao</SelectItem>
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="Đang ra">Đang ra</SelectItem>
              <SelectItem value="Hoàn thành">Hoàn thành</SelectItem>
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
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
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

const categories = [
  {
    id: 1,
    name: "Tiên Hiệp",
    slug: "tien-hiep",
    description: "Truyện về con đường tu tiên, đề tài thần tiên, pháp thuật, huyền ảo.",
  },
  {
    id: 2,
    name: "Kiếm Hiệp",
    slug: "kiem-hiep",
    description: "Truyện về võ thuật, giang hồ, kiếm khách thời phong kiến Trung Quốc.",
  },
  {
    id: 3,
    name: "Ngôn Tình",
    slug: "ngon-tinh",
    description: "Truyện tình cảm lãng mạn, tập trung vào mối quan hệ tình cảm nam nữ.",
  },
  {
    id: 4,
    name: "Đô Thị",
    slug: "do-thi",
    description: "Truyện lấy bối cảnh đô thị hiện đại, thường có yếu tố tu tiên, dị năng.",
  },
  {
    id: 5,
    name: "Huyền Huyễn",
    slug: "huyen-huyen",
    description: "Truyện có yếu tố kỳ ảo, thần bí, ma thuật trong thế giới giả tưởng.",
  },
]

const categoryStories = [
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
    views: 8500000,
    updatedAt: "2023-05-12T10:30:00Z",
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
    views: 7200000,
    updatedAt: "2023-03-10T15:45:00Z",
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
    views: 5800000,
    updatedAt: "2023-06-01T08:20:00Z",
  },
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
]
