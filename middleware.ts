import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Kiểm tra nếu đường dẫn bắt đầu bằng /admin
  if (path.startsWith("/admin")) {
    // Lấy thông tin người dùng từ cookie
    const userCookie = request.cookies.get("user")?.value

    // Nếu không có cookie người dùng, chuyển hướng đến trang đăng nhập
    if (!userCookie) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    try {
      const userData = JSON.parse(userCookie)
      // Kiểm tra quyền admin
      if (!userData || userData.role !== "admin") {
        // Nếu không phải admin, chuyển hướng đến trang chủ
        return NextResponse.redirect(new URL("/unauthorized", request.url))
      }
    } catch (error) {
      // Nếu có lỗi khi parse JSON, chuyển hướng đến trang đăng nhập
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
