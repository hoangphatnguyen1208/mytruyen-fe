"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Edit, Eye, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ChaptersPage() {
  const params = useParams()
  const router = useRouter()
  const storyId = params.id
  const [searchTerm, setSearchTerm] = useState("")

  // In a real app, you would fetch the story and chapters data based on the storyId
  const story = getStoryById(storyId)
  const allChapters = getChaptersByStoryId(storyId)

  // Filter chapters based on search term
  const filteredChapters = allChapters.filter(
    (chapter) =>
      chapter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `Chương ${chapter.number}`.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (!story) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Truyện không tồn tại</h1>
          <Button asChild>
            <Link href="/admin/stories">Quay lại danh sách truyện</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Quản lý chương</h1>
            <p className="text-muted-foreground">Quản lý các chương của truyện: {story.title}</p>
          </div>
        </div>
        <Button asChild>
          <Link href={`/admin/stories/${storyId}/chapters/new`}>
            <Plus className="mr-2 h-4 w-4" />
            Thêm chương mới
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách chương</CardTitle>
          <CardDescription>Tổng cộng có {allChapters.length} chương trong truyện này.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Tìm kiếm chương..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Số chương</TableHead>
                  <TableHead>Tiêu đề</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead>Cập nhật</TableHead>
                  <TableHead>Lượt xem</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredChapters.map((chapter) => (
                  <TableRow key={chapter.id}>
                    <TableCell>Chương {chapter.number}</TableCell>
                    <TableCell>
                      <div className="font-medium">{chapter.title}</div>
                    </TableCell>
                    <TableCell>{chapter.createdAt}</TableCell>
                    <TableCell>{chapter.updatedAt}</TableCell>
                    <TableCell>{chapter.views}</TableCell>
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
                            <Link
                              href={`/story/${story.slug}/chapter/${chapter.number}`}
                              className="flex w-full cursor-pointer items-center"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              <span>Xem chương</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/admin/stories/${storyId}/chapters/${chapter.id}/edit`}
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

// Helper functions and sample data
function getStoryById(id) {
  const stories = [
    {
      id: "1",
      title: "Đấu Phá Thương Khung",
      slug: "dau-pha-thuong-khung",
      author: "Thiên Tàm Thổ Đậu",
      chapters: 1665,
    },
    {
      id: "2",
      title: "Vũ Động Càn Khôn",
      slug: "vu-dong-can-khon",
      author: "Thiên Tàm Thổ Đậu",
      chapters: 1321,
    },
  ]

  return stories.find((story) => story.id === id)
}

function getChaptersByStoryId(storyId) {
  const chapterTitles = [
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

  // Generate sample chapters
  return Array.from({ length: 30 }, (_, i) => ({
    id: `${storyId}-${i + 1}`,
    number: i + 1,
    title: chapterTitles[i % 10],
    createdAt: `${Math.floor(Math.random() * 28) + 1}/05/2023`,
    updatedAt: `${Math.floor(Math.random() * 28) + 1}/05/2023`,
    views: `${Math.floor(Math.random() * 10000) + 1000}`,
  }))
}
