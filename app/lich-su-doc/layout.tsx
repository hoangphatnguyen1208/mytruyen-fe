import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Lịch sử đọc truyện - MyTruyen",
    description: "Xem lại lịch sử đọc truyện của bạn trên MyTruyen"
}

export default function ReadingHistoryLayout({
    children
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
