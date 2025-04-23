"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, Edit, Eye, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function StoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Filter stories based on search term and filters
  const filteredStories = stories.filter((story) => {
    const matchesSearch =
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.author.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || story.status === statusFilter
    const matchesCategory = categoryFilter === "all" || story.categories.includes(categoryFilter)

    return matchesSearch && matchesStatus && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản lý truyện</h1>
          <p className="text-muted-foreground">Quản lý tất cả các truyện trên trang web My Truyện.</p>
        </div>
        <Button asChild>
          <Link href="/admin/stories/new">
            <Plus className="mr-2 h-4 w-4" />
            Thêm truyện mới
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách truyện</CardTitle>
          <CardDescription>Tổng cộng có {stories.length} truyện trên hệ thống.</CardDescription>
        </CardHeader>
        <CardContent>
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
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="Đang ra">Đang ra</SelectItem>
                  <SelectItem value="Hoàn thành">Hoàn thành</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Thể loại" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả thể loại</SelectItem>
                  <SelectItem value="Tiên Hiệp">Tiên Hiệp</SelectItem>
                  <SelectItem value="Kiếm Hiệp">Kiếm Hiệp</SelectItem>
                  <SelectItem value="Ngôn Tình">Ngôn Tình</SelectItem>
                  <SelectItem value="Đô Thị">Đô Thị</SelectItem>
                  <SelectItem value="Huyền Huyễn">Huyền Huyễn</SelectItem>
                  <SelectItem value="Võ Hiệp">Võ Hiệp</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Truyện</TableHead>
                  <TableHead>Tác giả</TableHead>
                  <TableHead>Chương</TableHead>
                  <TableHead>Thể loại</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Lượt xem</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStories.map((story) => (
                  <TableRow key={story.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-14 bg-muted rounded overflow-hidden">
                          <img
                            src={story.cover || "/placeholder.svg?height=56&width=40"}
                            alt={story.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{story.title}</div>
                          <div className="text-xs text-muted-foreground">ID: {story.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{story.author}</TableCell>
                    <TableCell>{story.chapters}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {story.categories.slice(0, 2).map((category, index) => (
                          <Badge key={index} variant="outline">
                            {category}
                          </Badge>
                        ))}
                        {story.categories.length > 2 && <Badge variant="outline">+{story.categories.length - 2}</Badge>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={story.status === "Hoàn thành" ? "default" : "secondary"}>{story.status}</Badge>
                    </TableCell>
                    <TableCell>{story.views}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Mở menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/story/${story.slug}`} className="flex w-full cursor-pointer items-center">
                              <Eye className="mr-2 h-4 w-4" />
                              <span>Xem truyện</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/admin/stories/${story.id}/chapters`}
                              className="flex w-full cursor-pointer items-center"
                            >
                              <BookOpen className="mr-2 h-4 w-4" />
                              <span>Quản lý chương</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/admin/stories/${story.id}/edit`}
                              className="flex w-full cursor-pointer items-center"
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Chỉnh sửa</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive flex cursor-pointer items-center">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Xóa</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Sample data
const stories = [
  {
    id: 1,
    title: "Đấu Phá Thương Khung",
    slug: "dau-pha-thuong-khung",
    author: "Thiên Tàm Thổ Đậu",
    description:
      "Đấu khí đại lục, một đại lục rộng lớn với đấu khí là sức mạnh chí cao vô thượng. Tiêu Viêm, một thiên tài tu luyện đấu khí, vì một lý do không rõ mà bị mất đi thiên phú tu luyện.",
    cover: "/placeholder.svg?height=56&width=40",
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
    cover: "/placeholder.svg?height=56&width=40",
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
    cover: "/placeholder.svg?height=56&width=40",
    chapters: 986,
    status: "Đang ra",
    views: "5.8M",
    updated: "Hôm nay",
    categories: ["Tiên Hiệp", "Huyền Huyễn"],
    rating: 4.6,
  },
  {
    id: 4,
    title: "Thần Đạo Đan Tôn",
    slug: "than-dao-dan-ton",
    author: "Cô Đơn Địa Phi",
    description:
      "Một thiếu niên bị gia tộc ruồng bỏ, nhưng lại có được kỳ ngộ, từ đó bước lên con đường tu luyện, trở thành một Đan Tôn danh chấn thiên hạ.",
    cover: "/placeholder.svg?height=56&width=40",
    chapters: 1245,
    status: "Đang ra",
    views: "4.5M",
    updated: "Hôm qua",
    categories: ["Tiên Hiệp", "Huyền Huyễn"],
    rating: 4.5,
  },
  {
    id: 5,
    title: "Vạn Cổ Thần Đế",
    slug: "van-co-than-de",
    author: "Phi Thiên Ngư",
    description:
      "Trương Nhược Trần, thiên tài một đời bị hãm hại chết, trùng sinh về thời niên thiếu. Từ một thiếu niên không có căn cơ tu luyện, một bước một bước đi đến đỉnh phong.",
    cover: "/placeholder.svg?height=56&width=40",
    chapters: 3562,
    status: "Đang ra",
    views: "3.9M",
    updated: "2 ngày trước",
    categories: ["Tiên Hiệp", "Huyền Huyễn", "Trùng Sinh"],
    rating: 4.4,
  },
  {
    id: 6,
    title: "Linh Vũ Thiên Hạ",
    slug: "linh-vu-thien-ha",
    author: "Vũ Phong",
    description:
      "Trong thế giới nơi linh khí là nguồn sức mạnh, Tần Vũ là một thiếu niên có ước mơ trở thành một cường giả đứng trên đỉnh cao của thế giới tu luyện.",
    cover: "/placeholder.svg?height=56&width=40",
    chapters: 1789,
    status: "Đang ra",
    views: "3.2M",
    updated: "3 ngày trước",
    categories: ["Tiên Hiệp", "Huyền Huyễn"],
    rating: 4.3,
  },
  {
    id: 7,
    title: "Tiên Nghịch",
    slug: "tien-nghich",
    author: "Nhĩ Căn",
    description:
      "Một câu chuyện về hành trình tu tiên đầy gian nan và kỳ diệu của Vương Lâm, từ một thiếu niên bình thường trở thành một cường giả tiên đạo.",
    cover: "/placeholder.svg?height=56&width=40",
    chapters: 2000,
    status: "Hoàn thành",
    views: "6.9M",
    updated: "15/02/2023",
    categories: ["Tiên Hiệp", "Huyền Huyễn"],
    rating: 4.9,
  },
  {
    id: 8,
    title: "Phàm Nhân Tu Tiên",
    slug: "pham-nhan-tu-tien",
    author: "Vong Ngữ",
    description:
      "Hàn Lập, một thiếu niên bình thường từ một gia đình nông dân, vì muốn đổi đời mà bước lên con đường tu tiên đầy chông gai.",
    cover: "/placeholder.svg?height=56&width=40",
    chapters: 2754,
    status: "Hoàn thành",
    views: "6.2M",
    updated: "20/01/2023",
    categories: ["Tiên Hiệp", "Huyền Huyễn"],
    rating: 4.8,
  },
]
