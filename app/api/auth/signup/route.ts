// Tạo API route cho đăng ký

import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    // Trong thực tế, kiểm tra email đã tồn tại và lưu vào database

    // Tạo người dùng mới (mô phỏng)
    const userData = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role: "user",
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
