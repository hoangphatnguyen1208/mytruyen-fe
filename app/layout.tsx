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

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "My Truyện - Kho truyện chữ online lớn nhất",
    description:
        "Đọc truyện online, truyện hay, truyện chữ, truyện full, truyện convert, truyện dịch, truyện hoàn thành.",
    generator: "v0.dev",
    verification: {
        google: "QMfZdkAI3Z76eZ9z2LiHgGi--wt5x1V1UPFISsdC8Bg",
    },
}

export default function RootLayout({
    children,
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
                    </LanguageProvider>
                </ThemeProvider>
                <SpeedInsights />
            </body>
        </html>
    )
}
