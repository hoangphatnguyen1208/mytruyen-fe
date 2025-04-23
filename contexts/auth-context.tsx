"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id: string
  name: string
  email: string
  role: "user" | "admin" // Thêm trường role
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  isAdmin: () => boolean // Thêm hàm kiểm tra vai trò admin
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, you would make an API call to verify credentials
      // This is a mock implementation
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

      // Mock user data - in a real app, this would come from your backend
      if (email === "user@example.com" && password === "password") {
        const userData = {
          id: "1",
          name: "Độc Giả",
          email: email,
          role: "user", // Người dùng thường
        }
        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
        setIsLoading(false)
        return true
      } else if (email === "admin@example.com" && password === "admin") {
        const userData = {
          id: "2",
          name: "Quản Trị Viên",
          email: email,
          role: "admin", // Quản trị viên
        }
        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
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

  // Signup function
  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, you would make an API call to create a user
      // This is a mock implementation
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

      // Mock user creation - in a real app, this would be handled by your backend
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        role: "user", // Người dùng mới luôn có vai trò "user"
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

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  // Function to check if user is admin
  const isAdmin = () => {
    return user?.role === "admin"
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
