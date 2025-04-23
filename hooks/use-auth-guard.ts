"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

export function useAuthGuard(requireAdmin = false) {
  const { user, isLoading, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login")
      } else if (requireAdmin && !isAdmin()) {
        router.push("/unauthorized")
      }
    }
  }, [user, isLoading, isAdmin, router, requireAdmin])

  return { isAuthorized: user && (!requireAdmin || isAdmin()), isLoading }
}
