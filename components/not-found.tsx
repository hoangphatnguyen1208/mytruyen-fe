import Link from "next/link"
import { Button } from "@/components/ui/button"

interface NotFoundProps {
    message?: string
    linkText?: string
    linkHref?: string
}

export function NotFound({
    message = "Nội dung không tồn tại",
    linkText = "Quay về trang chủ",
    linkHref = "/"
}: NotFoundProps) {
    return (
        <div className="container mx-auto px-4 py-10">
            <div className="text-center py-20">
                <h1 className="text-2xl font-bold mb-4">{message}</h1>
                <Button asChild>
                    <Link href={linkHref}>{linkText}</Link>
                </Button>
            </div>
        </div>
    )
}
