// Tạo API route để kiểm tra phiên đăng nhập

import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Lấy cookie người dùng
    const userCookie = request.cookies.get("user")?.value

    if (!userCookie) {
      return NextResponse.json({ user: null })
    }

    // Parse thông tin người dùng từ cookie
    const userData = JSON.parse(userCookie)

    return NextResponse.json({ user: userData })
  } catch (error) {
    console.error("Session error:", error)
    return NextResponse.json({ user: null })
  }
}
