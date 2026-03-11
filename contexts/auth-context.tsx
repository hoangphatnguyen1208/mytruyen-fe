// Auth Context với JWT authentication

'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'
import {
  decodeJWT,
  getUserFromToken,
  setToken,
  removeToken,
  getToken,
  isTokenExpired,
} from '@/lib/jwt'

type User = {
  id: string
  email: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  isLoading: boolean
  getToken: () => string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const API_BASE_URL =
  process.env.NEXT_PUBLIC_MYTRUYEN_API_BASE_URL ||
  'http://localhost:8000/api/v1'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Kiểm tra người dùng đã đăng nhập khi tải trang
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Kiểm tra JWT token trong localStorage
        const token = getToken()
        if (token && !isTokenExpired(token)) {
          // Decode JWT để lấy thông tin user
          const userData = getUserFromToken(token)
          if (userData) {
            setUser(userData as User)
          } else {
            removeToken()
          }
        } else if (token) {
          // Token hết hạn
          removeToken()
        }
      } catch (error) {
        console.error('Auth check error:', error)
        removeToken()
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
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      // Backend trả về token trong data.access_token
      if (response.ok && data.data.access_token) {
        const token = data.data.access_token

        // Lưu token vào localStorage
        localStorage.setItem('auth_token', token)

        // Decode JWT để lấy thông tin user
        setToken(token)

        // Decode JWT để lấy thông tin user
        const userData = getUserFromToken(token)
        if (userData) {
          setUser({
            ...userData,
            email: userData.email,
          })
          setIsLoading(false)
          return true
        }
      }
      setIsLoading(false)
      return false
    } catch (error) {
      console.error('Login error:', error)
      setIsLoading(false)
      return false
    }
  }

  // Hàm đăng ký
  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      // Backend trả về token sau khi đăng ký thành công
      if (response.ok && data.data.access_token) {
        const token = data.data.access_token

        // Lưu token vào localStorage
        localStorage.setItem('auth_token', token)

        // Decode JWT để lấy thông tin user
        setToken(token)

        // Decode JWT để lấy thông tin user
        const userData = getUserFromToken(token)
        if (userData) {
          setUser({
            ...userData,
            email: userData.email || email,
          })
          setIsLoading(false)
          return true
        }
      }
      setIsLoading(false)
      return false
    } catch (error) {
      console.error('Signup error:', error)
      setIsLoading(false)
      return false
    }
  }

  // Hàm đăng xuất
  const logout = async () => {
    try {
      // Xóa token và dữ liệu người dùng
      setUser(null)
      removeToken()

      // Có thể gọi API logout nếu backend yêu cầu (để blacklist token)
      // const token = getToken()
      // if (token) {
      //   await fetch(`${API_BASE_URL}/auth/logout`, {
      //     method: "POST",
      //     headers: { "Authorization": `Bearer ${token}` }
      //   })
      // }
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // Hàm lấy JWT token
  const AuthToken = () => {
    return getToken()
  }

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, isLoading, getToken: AuthToken }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
