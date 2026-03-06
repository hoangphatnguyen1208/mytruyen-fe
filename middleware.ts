import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Decode JWT token (basic decode without verification)
 */
function decodeJWT(token: string) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload
  } catch {
    return null
  }
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Kiểm tra nếu đường dẫn bắt đầu bằng /admin
  if (path.startsWith('/admin')) {
    // Lấy JWT token từ localStorage (phía client) hoặc từ cookie
    // Vì middleware chạy ở edge/server, cần check token từ cookie hoặc header
    const authHeader = request.headers.get('authorization')
    const tokenFromCookie = request.cookies.get('auth_token')?.value

    const token = authHeader?.replace('Bearer ', '') || tokenFromCookie

    // Nếu không có token, chuyển hướng đến trang đăng nhập
    if (!token) {
      return NextResponse.redirect(new URL('/dang-nhap', request.url))
    }

    try {
      const payload = decodeJWT(token)

      // Kiểm tra token có hợp lệ không
      if (!payload) {
        return NextResponse.redirect(new URL('/dang-nhap', request.url))
      }

      // Kiểm tra token có hết hạn không
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        return NextResponse.redirect(new URL('/dang-nhap', request.url))
      }

      // Kiểm tra quyền admin
      if (payload.role !== 'admin') {
        return NextResponse.redirect(new URL('/unauthorized', request.url))
      }
    } catch (error) {
      console.error('JWT verification error:', error)
      return NextResponse.redirect(new URL('/dang-nhap', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
