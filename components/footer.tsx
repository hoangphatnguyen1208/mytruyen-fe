import Link from "next/link"
import { Facebook, Github, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">My Truyện</h3>
            <p className="text-sm text-muted-foreground">
              Kho truyện chữ online lớn nhất, cập nhật liên tục các truyện hay và mới nhất.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-4">Thể Loại</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/category/tien-hiep" className="text-muted-foreground hover:text-primary">
                  Tiên Hiệp
                </Link>
              </li>
              <li>
                <Link href="/category/kiem-hiep" className="text-muted-foreground hover:text-primary">
                  Kiếm Hiệp
                </Link>
              </li>
              <li>
                <Link href="/category/ngon-tinh" className="text-muted-foreground hover:text-primary">
                  Ngôn Tình
                </Link>
              </li>
              <li>
                <Link href="/category/do-thi" className="text-muted-foreground hover:text-primary">
                  Đô Thị
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-primary">
                  Xem tất cả
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-4">Liên Kết</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary">
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-4">Kết Nối</h3>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://twitter.com" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://instagram.com" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://github.com" className="text-muted-foreground hover:text-primary">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">Đăng ký nhận thông báo về truyện mới</p>
              <div className="flex mt-2">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="px-3 py-2 bg-background border rounded-l-md w-full text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button className="bg-primary text-primary-foreground px-3 py-2 rounded-r-md text-sm">Đăng ký</button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} My Truyện. Tất cả quyền được bảo lưu.
          </p>
          <p className="text-xs text-muted-foreground mt-2 md:mt-0">
            Được phát triển bởi <span className="text-primary">My Truyện Team</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
