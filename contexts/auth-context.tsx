// Cập nhật AuthContext để sử dụng API routes

"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id: string
  name: string
  email: string
  role: "user" | "admin"
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  isLoading: boolean
  isAdmin: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Kiểm tra người dùng đã đăng nhập khi tải trang
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Kiểm tra từ localStorage trước
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
          setIsLoading(false)
          return
        }

        // Nếu không có trong localStorage, kiểm tra session từ API
        const response = await fetch("/api/auth/session")
        if (response.ok) {
          const data = await response.json()
          if (data.user) {
            setUser(data.user)
            localStorage.setItem("user", JSON.stringify(data.user))
          }
        }
      } catch (error) {
        console.error("Auth check error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Hàm đăng nhập
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.success && data.user) {
        setUser(data.user)
        localStorage.setItem("user", JSON.stringify(data.user))
        setIsLoading(false)
        return true
      }

      setIsLoading(false)
      return false
    } catch (error) {
      console.error("Login error:", error)
      setIsLoading(false)
      return false
    }
  }

  // Hàm đăng ký
  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      // Trong thực tế, gọi API đăng ký
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (data.success && data.user) {
        setUser(data.user)
        localStorage.setItem("user", JSON.stringify(data.user))
        setIsLoading(false)
        return true
      }

      // Mô phỏng đăng ký thành công
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        role: "user",
      }
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      setIsLoading(false)
      return true
    } catch (error) {
      console.error("Signup error:", error)
      setIsLoading(false)
      return false
    }
  }

  // Hàm đăng xuất
  const logout = async () => {
    try {
      // Gọi API đăng xuất để xóa cookie
      await fetch("/api/auth/logout", {
        method: "POST",
      })

      // Xóa dữ liệu người dùng khỏi state và localStorage
      setUser(null)
      localStorage.removeItem("user")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  // Hàm kiểm tra quyền admin
  const isAdmin = () => {
    return user !== null && user.role === "admin"
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading, isAdmin }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
