import Link from "next/link"
import Image from "next/image"
import { Facebook, Github, Instagram, Twitter } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <Image
                                src="/favicon.ico"
                                alt="My Truyện Logo"
                                width={32}
                                height={32}
                                className="h-8 w-8"
                            />
                            <h3 className="text-lg font-bold">My Truyện</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Nền tảng chia sẻ truyện chữ trực tuyến. Nội dung do
                            người dùng đóng góp.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-base font-semibold mb-4">
                            Thể Loại
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="/the-loai/tien-hiep"
                                    className="text-muted-foreground hover:text-primary"
                                >
                                    Tiên Hiệp
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/the-loai/kiem-hiep"
                                    className="text-muted-foreground hover:text-primary"
                                >
                                    Kiếm Hiệp
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/the-loai/ngon-tinh"
                                    className="text-muted-foreground hover:text-primary"
                                >
                                    Ngôn Tình
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/the-loai/do-thi"
                                    className="text-muted-foreground hover:text-primary"
                                >
                                    Đô Thị
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/categories"
                                    className="text-muted-foreground hover:text-primary"
                                >
                                    Xem tất cả
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-base font-semibold mb-4">
                            Liên Kết
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="/gioi-thieu"
                                    className="text-muted-foreground hover:text-primary"
                                >
                                    Giới thiệu
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dieu-khoan-su-dung"
                                    className="text-muted-foreground hover:text-primary"
                                >
                                    Điều khoản sử dụng
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/chinh-sach-bao-mat"
                                    className="text-muted-foreground hover:text-primary"
                                >
                                    Chính sách bảo mật
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/lien-he"
                                    className="text-muted-foreground hover:text-primary"
                                >
                                    Liên hệ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-base font-semibold mb-4">
                            Kết Nối
                        </h3>
                        <div className="flex space-x-4">
                            <Link
                                href="https://facebook.com"
                                className="text-muted-foreground hover:text-primary"
                            >
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link
                                href="https://twitter.com"
                                className="text-muted-foreground hover:text-primary"
                            >
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link
                                href="https://instagram.com"
                                className="text-muted-foreground hover:text-primary"
                            >
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link
                                href="https://github.com"
                                className="text-muted-foreground hover:text-primary"
                            >
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm text-muted-foreground">
                                Đăng ký nhận thông báo về truyện mới
                            </p>
                            <div className="flex mt-2">
                                <input
                                    type="email"
                                    placeholder="Email của bạn"
                                    className="px-3 py-2 bg-background border rounded-l-md w-full text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                                <button className="bg-primary text-primary-foreground px-3 py-2 rounded-r-md text-sm">
                                    Đăng ký
                                </button>
                            </div>
                        </div>
                    </div>
                </div>{" "}
                <div className="border-t mt-8 pt-6">
                    <div className="text-center mb-4">
                        <p className="text-xs text-muted-foreground max-w-4xl mx-auto">
                            <strong>Tuyên bố miễn trách nhiệm:</strong> My
                            Truyện là nền tảng chia sẻ nội dung do người dùng
                            tạo ra. Chúng tôi không sở hữu, kiểm soát hoặc chịu
                            trách nhiệm về nội dung được đăng tải. Mọi nội dung
                            chỉ mang tính chất giải trí. Người dùng có trách
                            nhiệm tuân thủ pháp luật khi sử dụng dịch vụ.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-muted-foreground">
                            © {new Date().getFullYear()} My Truyện. Website chỉ
                            cung cấp nền tảng kỹ thuật.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
