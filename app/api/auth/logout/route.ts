// Tạo API route cho đăng xuất để xóa cookie

import { NextResponse } from "next/server"

export async function POST() {
  // Tạo response
  const response = NextResponse.json({ success: true })

  // Xóa cookie người dùng
  response.cookies.set({
    name: "user",
    value: "",
    httpOnly: true,
    path: "/",
    expires: new Date(0),
    sameSite: "strict",
  })

  return response
}
