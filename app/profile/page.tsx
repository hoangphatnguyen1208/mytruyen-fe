"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useAuthGuard } from "@/hooks/use-auth-guard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/user-nav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookMarked, Clock } from "lucide-react"

export default function ProfilePage() {
  const { isAuthorized, isLoading } = useAuthGuard()
  const { user } = useAuth()
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [message, setMessage] = useState("")

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Đang tải...</div>
  }

  if (!isAuthorized) {
    return null // Sẽ được chuyển hướng bởi useAuthGuard
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would make an API call to update the user profile
    setMessage("Cập nhật thông tin thành công!")
    setTimeout(() => setMessage(""), 3000)
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
        <h1 className="text-3xl font-bold mb-6">Hồ sơ của tôi</h1>

        <Tabs defaultValue="profile" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="profile">Thông tin cá nhân</TabsTrigger>
            <TabsTrigger value="reading">Lịch sử đọc</TabsTrigger>
            <TabsTrigger value="bookmarks">Truyện đã lưu</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin cá nhân</CardTitle>
                <CardDescription>Cập nhật thông tin cá nhân của bạn</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {message && (
                    <Alert className="bg-green-50 text-green-800 border-green-200">
                      <AlertDescription>{message}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="name">Họ tên</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled />
                    <p className="text-xs text-muted-foreground">Email không thể thay đổi</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Vai trò</Label>
                    <Input id="role" value={user?.role === "admin" ? "Quản trị viên" : "Người dùng"} disabled />
                  </div>

                  <Button type="submit">Cập nhật</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reading">
            <Card>
              <CardHeader>
                <CardTitle>Lịch sử đọc</CardTitle>
                <CardDescription>Các truyện bạn đã đọc gần đây</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Đấu Phá Thương Khung",
                      slug: "dau-pha-thuong-khung",
                      chapter: 42,
                      time: "2 giờ trước",
                    },
                    {
                      title: "Vũ Động Càn Khôn",
                      slug: "vu-dong-can-khon",
                      chapter: 15,
                      time: "Hôm qua",
                    },
                    {
                      title: "Tiên Nghịch",
                      slug: "tien-nghich",
                      chapter: 78,
                      time: "3 ngày trước",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-3">
                      <div>
                        <Link href={`/story/${item.slug}`} className="font-medium hover:text-primary hover:underline">
                          {item.title}
                        </Link>
                        <div className="text-sm text-muted-foreground">Chương {item.chapter}</div>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {item.time}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookmarks">
            <Card>
              <CardHeader>
                <CardTitle>Truyện đã lưu</CardTitle>
                <CardDescription>Các truyện bạn đã đánh dấu để đọc sau</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Nguyên Tôn",
                      slug: "nguyen-ton",
                      chapters: 986,
                      status: "Đang ra",
                    },
                    {
                      title: "Phàm Nhân Tu Tiên",
                      slug: "pham-nhan-tu-tien",
                      chapters: 2754,
                      status: "Hoàn thành",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-3">
                      <div>
                        <Link href={`/story/${item.slug}`} className="font-medium hover:text-primary hover:underline">
                          {item.title}
                        </Link>
                        <div className="text-sm text-muted-foreground">
                          {item.chapters} chương • {item.status}
                        </div>
                      </div>
                      <div className="flex items-center text-sm">
                        <BookMarked className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
