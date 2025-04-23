"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function NewStoryPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    status: "Đang ra",
    categories: [],
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (category) => {
    setFormData((prev) => {
      const currentCategories = [...prev.categories]
      if (currentCategories.includes(category)) {
        return { ...prev, categories: currentCategories.filter((c) => c !== category) }
      } else {
        return { ...prev, categories: [...currentCategories, category] }
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // In a real app, you would make an API call to save the story
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    router.push("/admin/stories")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Thêm truyện mới</h1>
            <p className="text-muted-foreground">Tạo một truyện mới trên trang web My Truyện.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
              <CardDescription>Nhập thông tin cơ bản của truyện.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Tên truyện</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Nhập tên truyện"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">Tác giả</Label>
                <Input
                  id="author"
                  name="author"
                  placeholder="Nhập tên tác giả"
                  value={formData.author}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Trạng thái</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Đang ra">Đang ra</SelectItem>
                    <SelectItem value="Hoàn thành">Hoàn thành</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Ảnh bìa</Label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-32 bg-muted rounded-md flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">Chưa có ảnh</span>
                  </div>
                  <Button type="button" variant="outline">
                    Tải ảnh lên
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Thể loại</CardTitle>
              <CardDescription>Chọn thể loại cho truyện.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={formData.categories.includes(category.name)}
                      onCheckedChange={() => handleCategoryChange(category.name)}
                    />
                    <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Giới thiệu</CardTitle>
              <CardDescription>Nhập giới thiệu cho truyện.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                name="description"
                placeholder="Nhập giới thiệu cho truyện..."
                value={formData.description}
                onChange={handleInputChange}
                className="min-h-[200px]"
                required
              />
            </CardContent>
          </Card>

          <div className="md:col-span-2 flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang lưu...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Lưu truyện
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

// Sample data
const categories = [
  { id: 1, name: "Tiên Hiệp" },
  { id: 2, name: "Kiếm Hiệp" },
  { id: 3, name: "Ngôn Tình" },
  { id: 4, name: "Đô Thị" },
  { id: 5, name: "Huyền Huyễn" },
  { id: 6, name: "Kỳ Ảo" },
  { id: 7, name: "Võng Du" },
  { id: 8, name: "Khoa Huyễn" },
  { id: 9, name: "Lịch Sử" },
  { id: 10, name: "Quân Sự" },
  { id: 11, name: "Võ Hiệp" },
  { id: 12, name: "Trùng Sinh" },
]
