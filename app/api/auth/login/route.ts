// Tạo API route cho đăng nhập để đặt cookie

import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Kiểm tra thông tin đăng nhập (mô phỏng)
    let userData = null

    if (email === "user@example.com" && password === "password") {
      userData = {
        id: "1",
        name: "Độc Giả",
        email: email,
        role: "user",
      }
    } else if (email === "admin@example.com" && password === "admin") {
      userData = {
        id: "2",
        name: "Quản Trị Viên",
        email: email,
        role: "admin",
      }
    } else {
      return NextResponse.json({ success: false, message: "Email hoặc mật khẩu không đúng" }, { status: 401 })
    }

    // Tạo response với cookie
    const response = NextResponse.json({ success: true, user: userData })

    // Đặt cookie với thông tin người dùng
    response.cookies.set({
      name: "user",
      value: JSON.stringify(userData),
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 tuần
      sameSite: "strict",
    })

    return response
  } catch (error) {
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 })
  }
}
