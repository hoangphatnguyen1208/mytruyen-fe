"use client"

import Link from "next/link"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Loader2, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function NewChapterPage() {
  const params = useParams()
  const router = useRouter()
  const storyId = params.id
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  })

  // In a real app, you would fetch the story data based on the storyId
  const story = getStoryById(storyId)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // In a real app, you would make an API call to save the chapter
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    router.push(`/admin/stories/${storyId}/chapters`)
  }

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
            <h1 className="text-3xl font-bold tracking-tight">Thêm chương mới</h1>
            <p className="text-muted-foreground">Thêm chương mới cho truyện: {story.title}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin chương</CardTitle>
              <CardDescription>Nhập thông tin cho chương mới.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Tiêu đề chương</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Nhập tiêu đề chương"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="chapterNumber">Số chương</Label>
                <Input id="chapterNumber" type="number" defaultValue={story.chapters + 1} disabled />
                <p className="text-xs text-muted-foreground">
                  Số chương được tự động tạo dựa trên số lượng chương hiện có.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Nội dung chương</CardTitle>
              <CardDescription>Nhập nội dung cho chương mới.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                name="content"
                placeholder="Nhập nội dung chương..."
                value={formData.content}
                onChange={handleInputChange}
                className="min-h-[400px]"
                required
              />
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang lưu...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Lưu chương
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
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
