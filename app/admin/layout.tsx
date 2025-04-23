"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  BarChart3,
  BookOpen,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/contexts/auth-context"

export default function AdminLayout({ children }) {
  const pathname = usePathname()
  const { user, logout, isAdmin } = useAuth()
  const [open, setOpen] = useState(false)
  const router = useRouter()

  // Kiểm tra quyền admin khi trang được tải
  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    if (!isAdmin()) {
      router.push("/")
    }
  }, [user, isAdmin, router])

  // Hiển thị màn hình loading trong khi kiểm tra quyền
  if (!user || !isAdmin()) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Đang kiểm tra quyền truy cập...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <MobileNav pathname={pathname} setOpen={setOpen} />
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Link href="/admin" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            <span className="font-bold">My Truyện Admin</span>
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Button variant="outline" size="sm" asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Về trang chủ
            </Link>
          </Button>
          <Button variant="ghost" size="sm" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Đăng xuất
          </Button>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-background md:block">
          <DesktopNav pathname={pathname} />
        </aside>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

function DesktopNav({ pathname }) {
  return (
    <div className="flex h-full flex-col gap-2 p-4">
      <div className="flex-1 space-y-1">
        <NavItem href="/admin" icon={LayoutDashboard} label="Tổng quan" active={pathname === "/admin"} />
        <NavItem
          href="/admin/stories"
          icon={BookOpen}
          label="Quản lý truyện"
          active={pathname.startsWith("/admin/stories")}
        />
        <NavItem
          href="/admin/chapters"
          icon={FileText}
          label="Quản lý chương"
          active={pathname.startsWith("/admin/chapters")}
        />
        <NavItem
          href="/admin/users"
          icon={Users}
          label="Quản lý người dùng"
          active={pathname.startsWith("/admin/users")}
        />
        <NavItem
          href="/admin/comments"
          icon={MessageSquare}
          label="Quản lý bình luận"
          active={pathname.startsWith("/admin/comments")}
        />
        <NavItem
          href="/admin/analytics"
          icon={BarChart3}
          label="Thống kê"
          active={pathname.startsWith("/admin/analytics")}
        />
        <NavItem
          href="/admin/settings"
          icon={Settings}
          label="Cài đặt"
          active={pathname.startsWith("/admin/settings")}
        />
      </div>
    </div>
  )
}

function MobileNav({ pathname, setOpen }) {
  return (
    <div className="flex h-full flex-col gap-2 py-4">
      <div className="flex-1 space-y-1 px-2">
        <NavItem
          href="/admin"
          icon={LayoutDashboard}
          label="Tổng quan"
          active={pathname === "/admin"}
          onClick={() => setOpen(false)}
        />
        <NavItem
          href="/admin/stories"
          icon={BookOpen}
          label="Quản lý truyện"
          active={pathname.startsWith("/admin/stories")}
          onClick={() => setOpen(false)}
        />
        <NavItem
          href="/admin/chapters"
          icon={FileText}
          label="Quản lý chương"
          active={pathname.startsWith("/admin/chapters")}
          onClick={() => setOpen(false)}
        />
        <NavItem
          href="/admin/users"
          icon={Users}
          label="Quản lý người dùng"
          active={pathname.startsWith("/admin/users")}
          onClick={() => setOpen(false)}
        />
        <NavItem
          href="/admin/comments"
          icon={MessageSquare}
          label="Quản lý bình luận"
          active={pathname.startsWith("/admin/comments")}
          onClick={() => setOpen(false)}
        />
        <NavItem
          href="/admin/analytics"
          icon={BarChart3}
          label="Thống kê"
          active={pathname.startsWith("/admin/analytics")}
          onClick={() => setOpen(false)}
        />
        <NavItem
          href="/admin/settings"
          icon={Settings}
          label="Cài đặt"
          active={pathname.startsWith("/admin/settings")}
          onClick={() => setOpen(false)}
        />
      </div>
    </div>
  )
}

function NavItem({ href, icon: Icon, label, active, onClick }) {
  return (
    <Button
      asChild
      variant={active ? "secondary" : "ghost"}
      className={cn("w-full justify-start", active && "bg-secondary")}
      onClick={onClick}
    >
      <Link href={href}>
        <Icon className="mr-2 h-4 w-4" />
        {label}
      </Link>
    </Button>
  )
}
