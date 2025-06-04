import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="min-h-[50vh] flex items-center justify-center">
            <div className="text-center space-y-6">
                <div className="flex justify-center">
                    <Image
                        src="/my-truyen-logo.svg"
                        alt="My Truyện Logo"
                        width={80}
                        height={80}
                        className="h-20 w-20 opacity-50"
                    />
                </div>

                <div className="space-y-2">
                    <h1 className="text-4xl font-bold text-muted-foreground">
                        404
                    </h1>
                    <h2 className="text-xl font-semibold">
                        Không tìm thấy trang
                    </h2>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        Trang bạn đang tìm kiếm có thể đã được di chuyển, xóa
                        hoặc không tồn tại.
                    </p>
                </div>

                <div className="space-y-4">
                    <Button asChild>
                        <Link href="/">Về trang chủ</Link>
                    </Button>

                    <div className="text-xs text-muted-foreground">
                        <p>
                            Nếu bạn tin rằng đây là lỗi, vui lòng liên hệ với
                            chúng tôi.
                        </p>
                        <p className="mt-1">
                            <strong>Lưu ý:</strong> Chúng tôi không chịu trách
                            nhiệm về nội dung bị mất hoặc liên kết bị hỏng.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
