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

export default function HotStoriesPage() {
  const [sortBy, setSortBy] = useState("views")
  const [searchTerm, setSearchTerm] = useState("")

  // Filter stories based on search term and sort
  const filteredStories = hotStories
    .filter((story) => {
      return (
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.author.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
    .sort((a, b) => {
      if (sortBy === "views") return b.views - a.views
      if (sortBy === "rating") return b.rating - a.rating
      if (sortBy === "chapters") return b.chapters - a.chapters
      return 0
    })

  return (
    <div className="container mx-auto px-4 py-3">
      <div className="mb-4">
        <p className="text-muted-foreground">Những truyện được đọc nhiều nhất trên My Truyện</p>
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
              <SelectItem value="views">Lượt đọc</SelectItem>
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
            <Link href={`/truyen/${story.slug}`} className="text-lg font-semibold hover:text-primary hover:underline">
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

const hotStories = [
  {
    id: 1,
    title: "Đấu Phá Thương Khung",
    slug: "dau-pha-thuong-khung",
    author: "Thiên Tàm Thổ Đậu",
    description:
      "Đấu khí đại lục, một đại lục rộng lớn với đấu khí là sức mạnh chí cao vô thượng. Tiêu Viêm, một thiên tài tu luyện đấu khí, vì một lý do không rõ mà bị mất đi thiên ph tu luyện.",
    cover: "/placeholder.svg?height=128&width=96",
    chapters: 1665,
    status: "Hoàn thành",
    rating: 4.8,
    views: 8500000,
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
  },
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
    views: 6900000,
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
    views: 6200000,
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
    views: 5500000,
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
  },
]
