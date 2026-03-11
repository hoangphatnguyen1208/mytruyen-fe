"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuthGuard } from "@/hooks/use-auth-guard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/user-nav"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { isAuthorized, isLoading } = useAuthGuard()
  const { toast } = useToast()
  const [readingSettings, setReadingSettings] = useState({
    fontSize: "medium",
    lineSpacing: "normal",
    theme: "system",
    autoScroll: false,
    saveProgress: true,
    showReadingTime: true,
  })
  const [notificationSettings, setNotificationSettings] = useState({
    newChapters: true,
    comments: false,
    updates: true,
    newsletter: false,
  })

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Đang tải...</div>
  }

  if (!isAuthorized) {
    return null // Sẽ được chuyển hướng bởi useAuthGuard
  }

  const handleReadingChange = (key, value) => {
    setReadingSettings((prev) => ({ ...prev, [key]: value }))
    toast({
      title: "Cài đặt đã được lưu",
      description: "Cài đặt đọc truyện của bạn đã được cập nhật.",
    })
  }

  const handleNotificationChange = (key, value) => {
    setNotificationSettings((prev) => ({ ...prev, [key]: value }))
    toast({
      title: "Cài đặt đã được lưu",
      description: "Cài đặt thông báo của bạn đã được cập nhật.",
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
        <h1 className="text-3xl font-bold mb-6">Cài đặt</h1>

        <Tabs defaultValue="reading" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="reading">Cài đặt đọc truyện</TabsTrigger>
            <TabsTrigger value="notifications">Thông báo</TabsTrigger>
          </TabsList>

          <TabsContent value="reading">
            <Card>
              <CardHeader>
                <CardTitle>Cài đặt đọc truyện</CardTitle>
                <CardDescription>Tùy chỉnh trải nghiệm đọc truyện của bạn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fontSize">Cỡ chữ</Label>
                  <Select
                    value={readingSettings.fontSize}
                    onValueChange={(value) => handleReadingChange("fontSize", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn cỡ chữ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Nhỏ</SelectItem>
                      <SelectItem value="medium">Vừa</SelectItem>
                      <SelectItem value="large">Lớn</SelectItem>
                      <SelectItem value="xlarge">Rất lớn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lineSpacing">Khoảng cách dòng</Label>
                  <Select
                    value={readingSettings.lineSpacing}
                    onValueChange={(value) => handleReadingChange("lineSpacing", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn khoảng cách dòng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tight">Hẹp</SelectItem>
                      <SelectItem value="normal">Bình thường</SelectItem>
                      <SelectItem value="relaxed">Rộng</SelectItem>
                      <SelectItem value="loose">Rất rộng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="theme">Giao diện</Label>
                  <Select value={readingSettings.theme} onValueChange={(value) => handleReadingChange("theme", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn giao diện" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Sáng</SelectItem>
                      <SelectItem value="dark">Tối</SelectItem>
                      <SelectItem value="system">Theo hệ thống</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoScroll">Tự động cuộn</Label>
                    <p className="text-sm text-muted-foreground">Tự động cuộn trang khi đọc truyện</p>
                  </div>
                  <Switch
                    id="autoScroll"
                    checked={readingSettings.autoScroll}
                    onCheckedChange={(value) => handleReadingChange("autoScroll", value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="saveProgress">Lưu tiến độ đọc</Label>
                    <p className="text-sm text-muted-foreground">Tự động lưu vị trí đọc của bạn</p>
                  </div>
                  <Switch
                    id="saveProgress"
                    checked={readingSettings.saveProgress}
                    onCheckedChange={(value) => handleReadingChange("saveProgress", value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="showReadingTime">Hiển thị thời gian đọc</Label>
                    <p className="text-sm text-muted-foreground">Hiển thị ước tính thời gian đọc cho mỗi chương</p>
                  </div>
                  <Switch
                    id="showReadingTime"
                    checked={readingSettings.showReadingTime}
                    onCheckedChange={(value) => handleReadingChange("showReadingTime", value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Cài đặt thông báo</CardTitle>
                <CardDescription>Quản lý thông báo bạn nhận được</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="newChapters">Chương mới</Label>
                    <p className="text-sm text-muted-foreground">
                      Nhận thông báo khi truyện bạn theo dõi có chương mới
                    </p>
                  </div>
                  <Switch
                    id="newChapters"
                    checked={notificationSettings.newChapters}
                    onCheckedChange={(value) => handleNotificationChange("newChapters", value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="comments">Bình luận</Label>
                    <p className="text-sm text-muted-foreground">
                      Nhận thông báo khi có người trả lời bình luận của bạn
                    </p>
                  </div>
                  <Switch
                    id="comments"
                    checked={notificationSettings.comments}
                    onCheckedChange={(value) => handleNotificationChange("comments", value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="updates">Cập nhật hệ thống</Label>
                    <p className="text-sm text-muted-foreground">Nhận thông báo về các cập nhật và tính năng mới</p>
                  </div>
                  <Switch
                    id="updates"
                    checked={notificationSettings.updates}
                    onCheckedChange={(value) => handleNotificationChange("updates", value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="newsletter">Bản tin</Label>
                    <p className="text-sm text-muted-foreground">Đăng ký nhận bản tin hàng tuần về truyện mới</p>
                  </div>
                  <Switch
                    id="newsletter"
                    checked={notificationSettings.newsletter}
                    onCheckedChange={(value) => handleNotificationChange("newsletter", value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
