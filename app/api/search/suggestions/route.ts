import { type NextRequest, NextResponse } from "next/server"

// Mock database of stories and popular search terms
// In a real application, this would come from a database
const stories = [
  {
    id: 1,
    title: "Đấu La Đại Lục",
    slug: "dau-la-dai-luc",
    author: "Đường Gia Tam Thiếu",
  },
  {
    id: 2,
    title: "Tru Tiên",
    slug: "tru-tien",
    author: "Tiêu Đỉnh",
  },
  {
    id: 3,
    title: "Nguyên Tôn",
    slug: "nguyen-ton",
    author: "Thiên Tằm Thổ Đậu",
  },
  {
    id: 4,
    title: "Đế Bá",
    slug: "de-ba",
    author: "Yến Sơn Phiêu Tuyết",
  },
  {
    id: 5,
    title: "Phàm Nhân Tu Tiên",
    slug: "pham-nhan-tu-tien",
    author: "Vong Ngữ",
  },
  {
    id: 6,
    title: "Tiên Nghịch",
    slug: "tien-nghich",
    author: "Nhĩ Căn",
  },
  {
    id: 7,
    title: "Đại Chúa Tể",
    slug: "dai-chua-te",
    author: "Thiên Tằm Thổ Đậu",
  },
  {
    id: 8,
    title: "Vũ Động Càn Khôn",
    slug: "vu-dong-can-khon",
    author: "Thiên Tằm Thổ Đậu",
  },
]

const categories = ["Tiên Hiệp", "Huyền Huyễn", "Võ Hiệp", "Đô Thị", "Tu Tiên", "Xuyên Không", "Trọng Sinh", "Dị Giới"]

const popularSearches = ["tu tiên", "xuyên không", "trọng sinh", "hệ thống", "thiên tằm thổ đậu"]

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("q")?.toLowerCase() || ""

  if (!query || query.length < 2) {
    return NextResponse.json({ suggestions: [] })
  }

  // Search in titles
  const titleSuggestions = stories
    .filter((story) => story.title.toLowerCase().includes(query))
    .map((story) => ({
      type: "story",
      title: story.title,
      slug: story.slug,
      author: story.author,
    }))
    .slice(0, 3)

  // Search in authors
  const authorSuggestions = stories
    .filter((story) => story.author.toLowerCase().includes(query))
    .map((story) => ({
      type: "author",
      title: story.author,
      slug: `author/${story.author.toLowerCase().replace(/\s+/g, "-")}`,
    }))
    .slice(0, 2)

  // Search in categories
  const categorySuggestions = categories
    .filter((category) => category.toLowerCase().includes(query))
    .map((category) => ({
      type: "category",
      title: category,
      slug: `category/${category.toLowerCase().replace(/\s+/g, "-")}`,
    }))
    .slice(0, 2)

  // Search in popular searches
  const popularSuggestions = popularSearches
    .filter((term) => term.toLowerCase().includes(query))
    .map((term) => ({
      type: "popular",
      title: term,
      slug: `search?q=${encodeURIComponent(term)}`,
    }))
    .slice(0, 2)

  // Combine all suggestions
  const suggestions = [...titleSuggestions, ...authorSuggestions, ...categorySuggestions, ...popularSuggestions].slice(
    0,
    8,
  )

  return NextResponse.json({ suggestions })
}
