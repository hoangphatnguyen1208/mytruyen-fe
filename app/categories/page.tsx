"use client"

import Link from "next/link"
import { BookOpen, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Thể loại truyện</h1>
        <p className="text-muted-foreground">Khám phá các thể loại truyện đa dạng trên My Truyện</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id}>
            <CardHeader className="pb-3">
              <CardTitle>{category.name}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>{category.storyCount} truyện</span>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/category/${category.slug}`} className="flex items-center">
                    Xem truyện
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

const categories = [
  {
    id: 1,
    name: "Tiên Hiệp",
    slug: "tien-hiep",
    description: "Truyện về con đường tu tiên, đề tài thần tiên, pháp thuật, huyền ảo.",
    storyCount: 1245,
  },
  {
    id: 2,
    name: "Kiếm Hiệp",
    slug: "kiem-hiep",
    description: "Truyện về võ thuật, giang hồ, kiếm khách thời phong kiến Trung Quốc.",
    storyCount: 987,
  },
  {
    id: 3,
    name: "Ngôn Tình",
    slug: "ngon-tinh",
    description: "Truyện tình cảm lãng mạn, tập trung vào mối quan hệ tình cảm nam nữ.",
    storyCount: 1532,
  },
  {
    id: 4,
    name: "Đô Thị",
    slug: "do-thi",
    description: "Truyện lấy bối cảnh đô thị hiện đại, thường có yếu tố tu tiên, dị năng.",
    storyCount: 1123,
  },
  {
    id: 5,
    name: "Huyền Huyễn",
    slug: "huyen-huyen",
    description: "Truyện có yếu tố kỳ ảo, thần bí, ma thuật trong thế giới giả tưởng.",
    storyCount: 876,
  },
  {
    id: 6,
    name: "Kỳ Ảo",
    slug: "ky-ao",
    description: "Truyện có yếu tố kỳ ảo, thần thoại, thường lấy bối cảnh phương Tây.",
    storyCount: 543,
  },
  {
    id: 7,
    name: "Võng Du",
    slug: "vong-du",
    description: "Truyện về thế giới game, người chơi nhập vai vào game thực tế ảo.",
    storyCount: 765,
  },
  {
    id: 8,
    name: "Khoa Huyễn",
    slug: "khoa-huyen",
    description: "Truyện khoa học viễn tưởng, công nghệ tương lai, du hành thời gian.",
    storyCount: 432,
  },
  {
    id: 9,
    name: "Lịch Sử",
    slug: "lich-su",
    description: "Truyện lấy bối cảnh lịch sử, có thể có yếu tố xuyên không, trọng sinh.",
    storyCount: 321,
  },
  {
    id: 10,
    name: "Quân Sự",
    slug: "quan-su",
    description: "Truyện về đề tài quân sự, chiến tranh, binh pháp, quân đội.",
    storyCount: 234,
  },
  {
    id: 11,
    name: "Xuyên Không",
    slug: "xuyen-khong",
    description: "Truyện về nhân vật từ hiện đại xuyên không về quá khứ hoặc thế giới khác.",
    storyCount: 654,
  },
  {
    id: 12,
    name: "Trọng Sinh",
    slug: "trong-sinh",
    description: "Truyện về nhân vật được tái sinh, sống lại từ đầu với ký ức kiếp trước.",
    storyCount: 543,
  },
]
