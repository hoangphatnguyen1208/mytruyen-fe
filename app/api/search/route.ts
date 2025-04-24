import { type NextRequest, NextResponse } from "next/server"

// Mock database of stories
// In a real application, this would come from a database
const stories = [
  {
    id: 1,
    title: "Đấu La Đại Lục",
    slug: "dau-la-dai-luc",
    author: "Đường Gia Tam Thiếu",
    description: "Một tác phẩm tiên hiệp nổi tiếng",
    coverImage: "/placeholder.svg?height=300&width=200",
    categories: ["Tiên Hiệp", "Huyền Huyễn"],
    status: "ongoing",
    views: 15000,
    rating: 4.8,
  },
  {
    id: 2,
    title: "Tru Tiên",
    slug: "tru-tien",
    author: "Tiêu Đỉnh",
    description: "Câu chuyện về con đường tu tiên",
    coverImage: "/placeholder.svg?height=300&width=200",
    categories: ["Tiên Hiệp", "Võ Hiệp"],
    status: "completed",
    views: 12000,
    rating: 4.7,
  },
  {
    id: 3,
    title: "Nguyên Tôn",
    slug: "nguyen-ton",
    author: "Thiên Tằm Thổ Đậu",
    description: "Hành trình trở thành Nguyên Tôn",
    coverImage: "/placeholder.svg?height=300&width=200",
    categories: ["Huyền Huyễn", "Tu Tiên"],
    status: "ongoing",
    views: 10000,
    rating: 4.6,
  },
  {
    id: 4,
    title: "Đế Bá",
    slug: "de-ba",
    author: "Yến Sơn Phiêu Tuyết",
    description: "Con đường trở thành Đế Bá",
    coverImage: "/placeholder.svg?height=300&width=200",
    categories: ["Đô Thị", "Huyền Huyễn"],
    status: "ongoing",
    views: 9000,
    rating: 4.5,
  },
  {
    id: 5,
    title: "Phàm Nhân Tu Tiên",
    slug: "pham-nhan-tu-tien",
    author: "Vong Ngữ",
    description: "Hành trình tu tiên của một phàm nhân",
    coverImage: "/placeholder.svg?height=300&width=200",
    categories: ["Tiên Hiệp", "Tu Tiên"],
    status: "completed",
    views: 11000,
    rating: 4.9,
  },
]

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("q")?.toLowerCase()

  if (!query) {
    return NextResponse.json({ stories: [] })
  }

  // Search in title, author, description, and categories
  const results = stories.filter(
    (story) =>
      story.title.toLowerCase().includes(query) ||
      story.author.toLowerCase().includes(query) ||
      story.description.toLowerCase().includes(query) ||
      story.categories.some((category) => category.toLowerCase().includes(query)),
  )

  return NextResponse.json({ stories: results })
}
