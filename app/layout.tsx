import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { ThemeScript } from "./theme-script"
import { Footer } from "@/components/footer"
import { BackToTop } from "@/components/back-to-top"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "My Truyện - Kho truyện chữ online lớn nhất",
  description: "Đọc truyện chữ online miễn phí, cập nhật nhanh nhất",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        {/* Add a script to prevent theme flickering */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'system';
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  document.documentElement.classList.add(theme === 'system' ? systemTheme : theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ThemeScript />
          <AuthProvider>
            <main className="flex-1">{children}</main>
            <Footer />
            <BackToTop />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
