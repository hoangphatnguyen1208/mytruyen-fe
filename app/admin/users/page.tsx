"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, MoreHorizontal, Search, Shield, User, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter users based on search term and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quản lý người dùng</h1>
        <p className="text-muted-foreground">Quản lý tất cả người dùng trên trang web My Truyện.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách người dùng</CardTitle>
          <CardDescription>Tổng cộng có {users.length} người dùng trên hệ thống.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Tìm kiếm người dùng..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Vai trò" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả vai trò</SelectItem>
                  <SelectItem value="user">Người dùng</SelectItem>
                  <SelectItem value="admin">Quản trị viên</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="active">Hoạt động</SelectItem>
                  <SelectItem value="inactive">Không hoạt động</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Người dùng</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Vai trò</TableHead>
                  <TableHead>Ngày đăng ký</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-xs text-muted-foreground">ID: {user.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === "admin" ? "default" : "outline"}>
                        {user.role === "admin" ? (
                          <Shield className="mr-1 h-3 w-3" />
                        ) : (
                          <User className="mr-1 h-3 w-3" />
                        )}
                        {user.role === "admin" ? "Quản trị viên" : "Người dùng"}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.registeredAt}</TableCell>
                    <TableCell>
                      <Badge
                        variant={user.status === "active" ? "success" : "secondary"}
                        className={
                          user.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : ""
                        }
                      >
                        {user.status === "active" ? <Check className="mr-1 h-3 w-3" /> : <X className="mr-1 h-3 w-3" />}
                        {user.status === "active" ? "Hoạt động" : "Không hoạt động"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Mở menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/users/${user.id}`} className="flex w-full cursor-pointer items-center">
                              <User className="mr-2 h-4 w-4" />
                              <span>Xem chi tiết</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex cursor-pointer items-center">
                            {user.status === "active" ? (
                              <>
                                <X className="mr-2 h-4 w-4" />
                                <span>Vô hiệu hóa</span>
                              </>
                            ) : (
                              <>
                                <Check className="mr-2 h-4 w-4" />
                                <span>Kích hoạt</span>
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex cursor-pointer items-center">
                            {user.role === "admin" ? (
                              <>
                                <User className="mr-2 h-4 w-4" />
                                <span>Hạ cấp xuống người dùng</span>
                              </>
                            ) : (
                              <>
                                <Shield className="mr-2 h-4 w-4" />
                                <span>Nâng cấp lên quản trị viên</span>
                              </>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Helper function to get initials from name
function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)
}

// Sample data
const users = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    role: "admin",
    registeredAt: "01/01/2023",
    status: "active",
  },
  {
    id: "2",
    name: "Trần Thị B",
    email: "tranthib@example.com",
    role: "user",
    registeredAt: "15/01/2023",
    status: "active",
  },
  {
    id: "3",
    name: "Lê Văn C",
    email: "levanc@example.com",
    role: "user",
    registeredAt: "02/02/2023",
    status: "active",
  },
  {
    id: "4",
    name: "Phạm Thị D",
    email: "phamthid@example.com",
    role: "user",
    registeredAt: "10/02/2023",
    status: "inactive",
  },
  {
    id: "5",
    name: "Hoàng Văn E",
    email: "hoangvane@example.com",
    role: "user",
    registeredAt: "20/02/2023",
    status: "active",
  },
  {
    id: "6",
    name: "Ngô Thị F",
    email: "ngothif@example.com",
    role: "user",
    registeredAt: "05/03/2023",
    status: "active",
  },
  {
    id: "7",
    name: "Đỗ Văn G",
    email: "dovang@example.com",
    role: "user",
    registeredAt: "15/03/2023",
    status: "inactive",
  },
  {
    id: "8",
    name: "Vũ Thị H",
    email: "vuthih@example.com",
    role: "admin",
    registeredAt: "01/04/2023",
    status: "active",
  },
]
