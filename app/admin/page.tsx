"use client"

import { useEffect, useState } from "react"
import { BookOpen, Eye, FileText, TrendingUp, Users } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tổng quan</h1>
        <p className="text-muted-foreground">Xem thống kê và quản lý nội dung của trang web My Truyện.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng số truyện</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground">+12 truyện mới trong tháng này</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng số chương</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15,234</div>
            <p className="text-xs text-muted-foreground">+342 chương mới trong tháng này</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Người dùng</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+78 người dùng mới trong tháng này</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lượt xem</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573,245</div>
            <p className="text-xs text-muted-foreground">+24% so với tháng trước</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent">
        <TabsList>
          <TabsTrigger value="recent">Truyện mới cập nhật</TabsTrigger>
          <TabsTrigger value="popular">Truyện phổ biến</TabsTrigger>
          <TabsTrigger value="comments">Bình luận gần đây</TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Truyện mới cập nhật</CardTitle>
              <CardDescription>Danh sách các truyện mới được cập nhật trong 7 ngày qua.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentStories.map((story) => (
                  <div key={story.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-14 bg-muted rounded overflow-hidden">
                        <img
                          src={story.cover || "/placeholder.svg?height=56&width=40"}
                          alt={story.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{story.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {story.chapters} chương • Cập nhật {story.updated}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <TrendingUp className="mr-1 h-4 w-4" />
                      {story.views} lượt xem
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="popular" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Truyện phổ biến</CardTitle>
              <CardDescription>Danh sách các truyện có nhiều lượt xem nhất trong 30 ngày qua.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {popularStories.map((story) => (
                  <div key={story.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-14 bg-muted rounded overflow-hidden">
                        <img
                          src={story.cover || "/placeholder.svg?height=56&width=40"}
                          alt={story.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{story.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {story.chapters} chương • {story.status}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Eye className="mr-1 h-4 w-4" />
                      {story.views} lượt xem
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="comments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bình luận gần đây</CardTitle>
              <CardDescription>Danh sách các bình luận mới nhất trên trang web.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentComments.map((comment) => (
                  <div key={comment.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs">
                          {comment.user.initials}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{comment.user.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {comment.story} • Chương {comment.chapter}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{comment.time}</p>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Sample data
const recentStories = [
  {
    id: 1,
    title: "Đấu Phá Thương Khung",
    chapters: 1665,
    updated: "2 giờ trước",
    views: "8.5K",
    cover: "/placeholder.svg?height=56&width=40",
  },
  {
    id: 2,
    title: "Vũ Động Càn Khôn",
    chapters: 1321,
    updated: "5 giờ trước",
    views: "6.2K",
    cover: "/placeholder.svg?height=56&width=40",
  },
  {
    id: 3,
    title: "Nguyên Tôn",
    chapters: 986,
    updated: "1 ngày trước",
    views: "4.7K",
    cover: "/placeholder.svg?height=56&width=40",
  },
  {
    id: 4,
    title: "Thần Đạo Đan Tôn",
    chapters: 1245,
    updated: "2 ngày trước",
    views: "3.9K",
    cover: "/placeholder.svg?height=56&width=40",
  },
]

const popularStories = [
  {
    id: 1,
    title: "Đấu Phá Thương Khung",
    chapters: 1665,
    status: "Hoàn thành",
    views: "1.2M",
    cover: "/placeholder.svg?height=56&width=40",
  },
  {
    id: 7,
    title: "Tiên Nghịch",
    chapters: 2000,
    status: "Hoàn thành",
    views: "985K",
    cover: "/placeholder.svg?height=56&width=40",
  },
  {
    id: 8,
    title: "Phàm Nhân Tu Tiên",
    chapters: 2754,
    status: "Hoàn thành",
    views: "876K",
    cover: "/placeholder.svg?height=56&width=40",
  },
  {
    id: 2,
    title: "Vũ Động Càn Khôn",
    chapters: 1321,
    status: "Hoàn thành",
    views: "754K",
    cover: "/placeholder.svg?height=56&width=40",
  },
]

const recentComments = [
  {
    id: 1,
    user: {
      name: "TruyenHayFan",
      initials: "TH",
    },
    story: "Đấu Phá Thương Khung",
    chapter: 42,
    time: "30 phút trước",
    content: "Truyện hay quá! Mong tác giả ra chương mới sớm.",
  },
  {
    id: 2,
    user: {
      name: "ĐộcGiả123",
      initials: "ĐG",
    },
    story: "Vũ Động Càn Khôn",
    chapter: 15,
    time: "2 giờ trước",
    content: "Nhân vật chính quá mạnh, mong có thêm nhiều thử thách hơn.",
  },
  {
    id: 3,
    user: {
      name: "TiênHiệpLover",
      initials: "TL",
    },
    story: "Nguyên Tôn",
    chapter: 78,
    time: "5 giờ trước",
    content: "Cốt truyện rất hấp dẫn, không thể ngừng đọc!",
  },
]
