import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Kiểm tra nếu đường dẫn bắt đầu bằng /admin
  if (path.startsWith("/admin")) {
    // Lấy thông tin người dùng từ localStorage (trong thực tế, bạn nên sử dụng cookies hoặc JWT)
    const user = request.cookies.get("user")?.value

    // Nếu không có người dùng hoặc không phải admin, chuyển hướng đến trang đăng nhập
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    try {
      const userData = JSON.parse(user)
      if (userData.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url))
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
