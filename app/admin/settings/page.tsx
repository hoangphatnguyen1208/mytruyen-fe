"use client"

import { useState } from "react"
import { Loader2, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "My Truyện",
    siteDescription: "Kho truyện chữ online lớn nhất, cập nhật liên tục các truyện hay và mới nhất.",
    contactEmail: "contact@mytruyen.com",
    facebookUrl: "https://facebook.com/mytruyen",
    twitterUrl: "https://twitter.com/mytruyen",
    instagramUrl: "https://instagram.com/mytruyen",
  })

  const [contentSettings, setContentSettings] = useState({
    requireApproval: true,
    allowComments: true,
    showViewCount: true,
    showRating: true,
    storiesPerPage: 10,
    chaptersPerPage: 20,
  })

  const handleGeneralChange = (e) => {
    const { name, value } = e.target
    setGeneralSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleContentChange = (name, value) => {
    setContentSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleNumberChange = (e) => {
    const { name, value } = e.target
    setContentSettings((prev) => ({ ...prev, [name]: Number.parseInt(value) || 0 }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // In a real app, you would make an API call to save the settings
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    toast({
      title: "Cài đặt đã được lưu",
      description: "Các thay đổi của bạn đã được lưu thành công.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Cài đặt</h1>
        <p className="text-muted-foreground">Quản lý cài đặt của trang web My Truyện.</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">Cài đặt chung</TabsTrigger>
          <TabsTrigger value="content">Cài đặt nội dung</TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit}>
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin trang web</CardTitle>
                <CardDescription>Cài đặt thông tin cơ bản của trang web.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Tên trang web</Label>
                  <Input
                    id="siteName"
                    name="siteName"
                    value={generalSettings.siteName}
                    onChange={handleGeneralChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Mô tả trang web</Label>
                  <Textarea
                    id="siteDescription"
                    name="siteDescription"
                    value={generalSettings.siteDescription}
                    onChange={handleGeneralChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email liên hệ</Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={generalSettings.contactEmail}
                    onChange={handleGeneralChange}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mạng xã hội</CardTitle>
                <CardDescription>Cài đặt liên kết mạng xã hội.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="facebookUrl">Facebook URL</Label>
                  <Input
                    id="facebookUrl"
                    name="facebookUrl"
                    value={generalSettings.facebookUrl}
                    onChange={handleGeneralChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitterUrl">Twitter URL</Label>
                  <Input
                    id="twitterUrl"
                    name="twitterUrl"
                    value={generalSettings.twitterUrl}
                    onChange={handleGeneralChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagramUrl">Instagram URL</Label>
                  <Input
                    id="instagramUrl"
                    name="instagramUrl"
                    value={generalSettings.instagramUrl}
                    onChange={handleGeneralChange}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cài đặt nội dung</CardTitle>
                <CardDescription>Cài đặt hiển thị và quản lý nội dung.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="requireApproval">Yêu cầu duyệt bình luận</Label>
                    <p className="text-sm text-muted-foreground">Bình luận cần được duyệt trước khi hiển thị.</p>
                  </div>
                  <Switch
                    id="requireApproval"
                    checked={contentSettings.requireApproval}
                    onCheckedChange={(value) => handleContentChange("requireApproval", value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="allowComments">Cho phép bình luận</Label>
                    <p className="text-sm text-muted-foreground">
                      Cho phép người dùng bình luận trên truyện và chương.
                    </p>
                  </div>
                  <Switch
                    id="allowComments"
                    checked={contentSettings.allowComments}
                    onCheckedChange={(value) => handleContentChange("allowComments", value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="showViewCount">Hiển thị lượt xem</Label>
                    <p className="text-sm text-muted-foreground">Hiển thị số lượt xem trên truyện và chương.</p>
                  </div>
                  <Switch
                    id="showViewCount"
                    checked={contentSettings.showViewCount}
                    onCheckedChange={(value) => handleContentChange("showViewCount", value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="showRating">Hiển thị đánh giá</Label>
                    <p className="text-sm text-muted-foreground">Hiển thị đánh giá trên truyện.</p>
                  </div>
                  <Switch
                    id="showRating"
                    checked={contentSettings.showRating}
                    onCheckedChange={(value) => handleContentChange("showRating", value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cài đặt phân trang</CardTitle>
                <CardDescription>Cài đặt số lượng hiển thị trên mỗi trang.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="storiesPerPage">Số truyện trên mỗi trang</Label>
                  <Input
                    id="storiesPerPage"
                    name="storiesPerPage"
                    type="number"
                    min="1"
                    max="100"
                    value={contentSettings.storiesPerPage}
                    onChange={handleNumberChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chaptersPerPage">Số chương trên mỗi trang</Label>
                  <Input
                    id="chaptersPerPage"
                    name="chaptersPerPage"
                    type="number"
                    min="1"
                    max="100"
                    value={contentSettings.chaptersPerPage}
                    onChange={handleNumberChange}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <div className="mt-6 flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang lưu...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Lưu cài đặt
                </>
              )}
            </Button>
          </div>
        </form>
      </Tabs>
    </div>
  )
}
