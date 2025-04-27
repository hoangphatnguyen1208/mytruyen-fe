import Link from "next/link"
import { BookOpen } from "lucide-react"

export function AuthBanner() {
  return (
    <div
      className="w-full py-8 px-6 flex flex-col items-center justify-center text-center bg-cover bg-center"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("/placeholder.svg?height=200&width=1200")',
        minHeight: "180px",
      }}
    >
      <Link href="/" className="flex items-center gap-2 mb-3">
        <BookOpen className="h-8 w-8 text-white" />
        <span className="text-3xl font-bold text-white">My Truyện</span>
      </Link>
      <div className="text-lg text-white/90 max-w-md">
        Kho truyện chữ online lớn nhất Việt Nam với hàng ngàn truyện hay và cập nhật liên tục
      </div>
    </div>
  )
}
