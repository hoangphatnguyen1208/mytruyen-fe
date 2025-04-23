"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, MessageSquare, MoreHorizontal, Search, Trash2, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function CommentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter comments based on search term and filters
  const filteredComments = comments.filter((comment) => {
    const matchesSearch =
      comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.story.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || comment.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quản lý bình luận</h1>
        <p className="text-muted-foreground">Quản lý tất cả bình luận trên trang web My Truyện.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách bình luận</CardTitle>
          <CardDescription>Tổng cộng có {comments.length} bình luận trên hệ thống.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Tìm kiếm bình luận..."
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
                  <SelectItem value="approved">Đã duyệt</SelectItem>
                  <SelectItem value="pending">Chờ duyệt</SelectItem>
                  <SelectItem value="rejected">Đã từ chối</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Người dùng</TableHead>
                  <TableHead>Bình luận</TableHead>
                  <TableHead>Truyện</TableHead>
                  <TableHead>Thời gian</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredComments.map((comment) => (
                  <TableRow key={comment.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>{getInitials(comment.user.name)}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{comment.user.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate">{comment.content}</div>
                    </TableCell>
                    <TableCell>
                      <Link href={`/story/${comment.storySlug}`} className="hover:underline">
                        {comment.story}
                      </Link>
                      <div className="text-xs text-muted-foreground">Chương {comment.chapter}</div>
                    </TableCell>
                    <TableCell>{comment.time}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          comment.status === "approved"
                            ? "success"
                            : comment.status === "rejected"
                              ? "destructive"
                              : "secondary"
                        }
                        className={
                          comment.status === "approved"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : comment.status === "rejected"
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                              : ""
                        }
                      >
                        {comment.status === "approved" && <Check className="mr-1 h-3 w-3" />}
                        {comment.status === "rejected" && <X className="mr-1 h-3 w-3" />}
                        {comment.status === "pending" && <MessageSquare className="mr-1 h-3 w-3" />}
                        {comment.status === "approved" && "Đã duyệt"}
                        {comment.status === "rejected" && "Đã từ chối"}
                        {comment.status === "pending" && "Chờ duyệt"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Mở menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex cursor-pointer items-center">
                            <Check className="mr-2 h-4 w-4" />
                            <span>Duyệt bình luận</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex cursor-pointer items-center">
                            <X className="mr-2 h-4 w-4" />
                            <span>Từ chối bình luận</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive flex cursor-pointer items-center">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Xóa bình luận</span>
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

// Helper function to get initials from name
function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)
}

// Sample data
const comments = [
  {
    id: "1",
    user: {
      name: "TruyenHayFan",
      initials: "TH",
    },
    content: "Truyện hay quá! Mong tác giả ra chương mới sớm.",
    story: "Đấu Phá Thương Khung",
    storySlug: "dau-pha-thuong-khung",
    chapter: 42,
    time: "30 phút trước",
    status: "approved",
  },
  {
    id: "2",
    user: {
      name: "ĐộcGiả123",
      initials: "ĐG",
    },
    content: "Nhân vật chính quá mạnh, mong có thêm nhiều thử thách hơn.",
    story: "Vũ Động Càn Khôn",
    storySlug: "vu-dong-can-khon",
    chapter: 15,
    time: "2 giờ trước",
    status: "approved",
  },
  {
    id: "3",
    user: {
      name: "TiênHiệpLover",
      initials: "TL",
    },
    content: "Cốt truyện rất hấp dẫn, không thể ngừng đọc!",
    story: "Nguyên Tôn",
    storySlug: "nguyen-ton",
    chapter: 78,
    time: "5 giờ trước",
    status: "pending",
  },
  {
    id: "4",
    user: {
      name: "BookWorm",
      initials: "BW",
    },
    content: "Tình tiết này hơi vô lý, không phù hợp với tính cách nhân vật.",
    story: "Đấu Phá Thương Khung",
    storySlug: "dau-pha-thuong-khung",
    chapter: 56,
    time: "1 ngày trước",
    status: "rejected",
  },
  {
    id: "5",
    user: {
      name: "TruyệnChữLover",
      initials: "TC",
    },
    content: "Chương này quá ngắn, mong tác giả viết dài hơn.",
    story: "Tiên Nghịch",
    storySlug: "tien-nghich",
    chapter: 120,
    time: "2 ngày trước",
    status: "approved",
  },
  {
    id: "6",
    user: {
      name: "NgônTìnhFan",
      initials: "NT",
    },
    content: "Tình cảm giữa hai nhân vật chính phát triển quá nhanh, không tự nhiên.",
    story: "Phàm Nhân Tu Tiên",
    storySlug: "pham-nhan-tu-tien",
    chapter: 89,
    time: "3 ngày trước",
    status: "pending",
  },
]
