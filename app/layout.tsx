import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeScript } from "./theme-script"
import { AuthProvider } from "@/contexts/auth-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BackToTop } from "@/components/back-to-top"
import { Toaster } from "@/components/ui/toaster"
import { LanguageProvider } from "@/contexts/language-context"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "My Truyện - Nền tảng chia sẻ truyện chữ trực tuyến",
    description:
        "Nền tảng chia sẻ truyện chữ do người dùng đóng góp. Đọc truyện miễn phí với nhiều thể loại đa dạng. Nội dung chỉ mang tính giải trí.",
    generator: "v0.dev",
    verification: {
        google: "QMfZdkAI3Z76eZ9z2LiHgGi--wt5x1V1UPFISsdC8Bg"
    },
    icons: {
        icon: [
            { url: "/favicon.ico" },
            { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
            { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
        ],
        apple: "/apple-touch-icon.png"
    },
    openGraph: {
        title: "My Truyện - Nền tảng chia sẻ truyện chữ",
        description:
            "Nền tảng chia sẻ truyện chữ do người dùng đóng góp. Nội dung chỉ mang tính giải trí."
    }
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="vi" suppressHydrationWarning>
            <body className={`${inter.className} min-h-screen flex flex-col`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ThemeScript />
                    <LanguageProvider>
                        <AuthProvider>
                            <div className="container mx-auto px-4">
                                <Header />
                            </div>
                            <main className="flex-1 pt-2">{children}</main>
                            <Footer />
                            <BackToTop />
                            <Toaster />
                        </AuthProvider>
                    </LanguageProvider>{" "}
                </ThemeProvider>
                {/* Wrap analytics in error boundaries */}
                <div suppressHydrationWarning>
                    {/* @ts-ignore */}
                    <SpeedInsights fallback={<></>} />
                </div>
                <div suppressHydrationWarning>
                    {/* @ts-ignore */}
                    <Analytics fallback={<></>} />
                </div>
            </body>
        </html>
    )
}
