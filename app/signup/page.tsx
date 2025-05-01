"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Mail, Lock, User, BookOpen } from "lucide-react"

export default function SignupPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [agreeTerms, setAgreeTerms] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { signup } = useAuth()
    const router = useRouter()
    const { toast } = useToast()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!agreeTerms) {
            toast({
                title: "Vui lòng đồng ý với điều khoản",
                description:
                    "Bạn cần đồng ý với điều khoản dịch vụ để tiếp tục",
                variant: "destructive",
            })
            return
        }

        if (password !== confirmPassword) {
            toast({
                title: "Mật khẩu không khớp",
                description: "Vui lòng kiểm tra lại mật khẩu xác nhận",
                variant: "destructive",
            })
            return
        }

        setIsSubmitting(true)

        try {
            const success = await signup(name, email, password)

            if (success) {
                toast({
                    title: "Đăng ký thành công",
                    description: "Chào mừng bạn đến với My Truyện!",
                })
                router.push("/")
            } else {
                toast({
                    title: "Đăng ký thất bại",
                    description: "Đã xảy ra lỗi, vui lòng thử lại sau",
                    variant: "destructive",
                })
            }
        } catch (error) {
            toast({
                title: "Đăng ký thất bại",
                description: "Đã xảy ra lỗi, vui lòng thử lại sau",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            <div className="w-full flex items-center justify-center p-20">
                <div className="w-full max-w-md">
                    <div className="mb-8 text-center">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-2xl font-bold text-primary"
                        >
                            <BookOpen className="h-6 w-6" />
                            <span>My Truyện</span>
                        </Link>
                        <h1 className="mt-6 text-2xl font-bold">
                            Tạo tài khoản
                        </h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Đăng ký để trải nghiệm đầy đủ tính năng của My
                            Truyện
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Họ tên</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="name"
                                    placeholder="Nguyễn Văn A"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="pl-10"
                                    autoCapitalize="words"
                                    autoComplete="name"
                                    autoCorrect="off"
                                    disabled={isSubmitting}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    placeholder="name@example.com"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    autoCorrect="off"
                                    disabled={isSubmitting}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Mật khẩu</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    placeholder="••••••••"
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="pl-10"
                                    autoCapitalize="none"
                                    autoComplete="new-password"
                                    autoCorrect="off"
                                    disabled={isSubmitting}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">
                                Xác nhận mật khẩu
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="confirmPassword"
                                    placeholder="••••••••"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    className="pl-10"
                                    autoCapitalize="none"
                                    autoComplete="new-password"
                                    autoCorrect="off"
                                    disabled={isSubmitting}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="terms"
                                checked={agreeTerms}
                                onCheckedChange={(checked) =>
                                    setAgreeTerms(checked as boolean)
                                }
                                required
                            />
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Tôi đồng ý với{" "}
                                <Link
                                    href="/terms"
                                    className="text-primary underline-offset-4 hover:underline"
                                >
                                    điều khoản dịch vụ
                                </Link>
                            </label>
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Đang đăng ký...
                                </>
                            ) : (
                                "Đăng ký"
                            )}
                        </Button>

                        <div className="text-center">
                            <p className="text-sm text-muted-foreground">
                                Đã có tài khoản?{" "}
                                <Link
                                    href="/login"
                                    className="font-medium text-primary underline-offset-4 hover:underline"
                                >
                                    Đăng nhập
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
