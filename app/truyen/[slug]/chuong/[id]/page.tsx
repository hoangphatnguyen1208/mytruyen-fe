import { useState, useEffect } from "react"
import Link from "next/link"
// import { useParams } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export async function generateMetadata({
    params
}: {
    params: { slug: string; id: string }
}): Promise<Metadata> {
    const { slug, id } = params
    const res = await fetch(
        `https://backend.metruyencv.com/api/books/search?keyword=${slug}&page=1`
    )
    const json = await res.json()
    const story = json.data[0]
    return {
        title: story?.name ? `${story.name} - Chương ${id}` : `Chương ${id}`
    }
}

interface Props {
    params: {
        slug: string
        id: string
    }
}

export default async function ChapterPage({ params }: Props) {
    const { slug, id } = params
    const chapterId = Number.parseInt(id)

    const story = getStoryBySlug(slug)
    const chapter = await fetch(
        `http://localhost:3000/api/stories/${slug}/chapter/${chapterId}`
    ).then((res) => res.text())

    // const [fontSize, setFontSize] = useState("medium")
    // const [progress, setProgress] = useState(0)

    if (!story || !chapter) {
        return (
            <div className="container mx-auto px-4 py-10">
                <div className="text-center py-20">
                    <h1 className="text-2xl font-bold mb-4">
                        Chương không tồn tại
                    </h1>
                    <Button asChild>
                        <Link href="/">Quay về trang chủ</Link>
                    </Button>
                </div>
            </div>
        )
    }

    const fontSizeClasses = {
        small: "text-sm",
        medium: "text-base",
        large: "text-lg",
        xlarge: "text-xl"
    }

    return (
        <div></div>
        // <div className="max-w-3xl mx-auto px-4 py-6">
        //     {/* Reading progress bar */}
        //     <div className="w-full h-1 bg-muted mb-6">
        //         <div
        //             className="h-full bg-primary"
        //             style={{ width: `${progress}%` }}
        //         ></div>
        //     </div>

        //     <div className="flex justify-between mb-6">
        //         <Button
        //             variant="outline"
        //             size="sm"
        //             disabled={chapterId <= 1}
        //             asChild
        //         >
        //             <Link
        //                 href={
        //                     chapterId > 1
        //                         ? `/story/${slug}/chapter/${chapterId - 1}`
        //                         : "#"
        //                 }
        //             >
        //                 <ArrowLeft className="h-4 w-4 mr-2" />
        //                 Chương trước
        //             </Link>
        //         </Button>
        //         <Button
        //             variant="outline"
        //             size="sm"
        //             disabled={chapterId >= story.chapters}
        //             asChild
        //         >
        //             <Link
        //                 href={
        //                     chapterId < story.chapters
        //                         ? `/story/${slug}/chapter/${chapterId + 1}`
        //                         : "#"
        //                 }
        //             >
        //                 Chương sau
        //                 <ArrowRight className="h-4 w-4 ml-2" />
        //             </Link>
        //         </Button>
        //     </div>

        //     <div className="bg-card rounded-lg p-6 shadow-sm border">
        //         <h2 className="text-xl font-semibold text-center mb-6">
        //             Chương {chapterId}: {chapter.title}
        //         </h2>

        //         <div className={`prose dark:prose-invert max-w-none`}>
        //             {chapter.content.map((paragraph, index) => (
        //                 <p key={index} className="mb-4 leading-relaxed">
        //                     {paragraph}
        //                 </p>
        //             ))}
        //         </div>
        //     </div>

        //     <div className="flex justify-between mt-6">
        //         <Button
        //             variant="outline"
        //             size="sm"
        //             disabled={chapterId <= 1}
        //             asChild
        //         >
        //             <Link
        //                 href={
        //                     chapterId > 1
        //                         ? `/story/${slug}/chapter/${chapterId - 1}`
        //                         : "#"
        //                 }
        //             >
        //                 <ArrowLeft className="h-4 w-4 mr-2" />
        //                 Chương trước
        //             </Link>
        //         </Button>
        //         <Button
        //             variant="outline"
        //             size="sm"
        //             disabled={chapterId >= story.chapters}
        //             asChild
        //         >
        //             <Link
        //                 href={
        //                     chapterId < story.chapters
        //                         ? `/story/${slug}/chapter/${chapterId + 1}`
        //                         : "#"
        //                 }
        //             >
        //                 Chương sau
        //                 <ArrowRight className="h-4 w-4 ml-2" />
        //             </Link>
        //         </Button>
        //     </div>

        //     <div className="mt-8 border-t pt-6">
        //         <h3 className="font-semibold mb-4">Bình luận</h3>
        //         <div className="space-y-4">
        //             <div className="border rounded-lg p-4">
        //                 <div className="flex items-center gap-2 mb-2">
        //                     <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs">
        //                         TH
        //                     </div>
        //                     <div>
        //                         <div className="font-medium text-sm">
        //                             TruyenHayFan
        //                         </div>
        //                         <div className="text-xs text-muted-foreground">
        //                             2 giờ trước
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <p className="text-sm">
        //                     Chương này hay quá! Không thể đợi đến chương tiếp
        //                     theo.
        //                 </p>
        //             </div>
        //         </div>
        //         <div className="mt-4">
        //             <textarea
        //                 placeholder="Viết bình luận của bạn..."
        //                 className="w-full p-3 border rounded-lg text-sm"
        //                 rows={3}
        //             ></textarea>
        //             <Button className="mt-2">Gửi bình luận</Button>
        //         </div>
        //     </div>
        // </div>
    )
}

// Helper functions and sample data
function getStoryBySlug(slug: string) {
    const stories = [
        {
            id: 1,
            title: "Đấu Phá Thương Khung",
            slug: "dau-pha-thuong-khung",
            author: "Thiên Tàm Thổ Đậu",
            chapters: 1665
        },
        {
            id: 2,
            title: "Vũ Động Càn Khôn",
            slug: "vu-dong-can-khon",
            author: "Thiên Tàm Thổ Đậu",
            chapters: 1321
        },
        {
            id: 3,
            title: "Nguyên Tôn",
            slug: "nguyen-ton",
            author: "Thiên Tằm Thổ Đậu",
            chapters: 986
        }
    ]

    return stories.find((story) => story.slug === slug)
}

function getChapter(slug: string, id: number) {
    const chapterTitles = [
        "Thiếu Niên Mất Đi Thiên Phú",
        "Thần Bí Lão Nhân",
        "Đấu Khí Công Pháp",
        "Bí Mật Hắc Viêm",
        "Gặp Gỡ Nữ Chính",
        "Tham Gia Khảo Hạch",
        "Đột Phá Đấu Giả",
        "Rời Khỏi Gia Tộc",
        "Bái Nhập Học Viện",
        "Kẻ Thù Cũ"
    ]

    const content = [
        "Tiêu Viêm, mười lăm tuổi, từng được coi là thiên tài tu luyện của gia tộc Tiêu, nhưng ba năm trước, thiên phú tu luyện của hắn đột nhiên mất đi, từ đó trở thành trò cười của mọi người.",
        "Trong một đêm mưa gió, Tiêu Viêm ngồi một mình trong phòng, nhìn chiếc nhẫn màu đen trên ngón tay. Đây là vật kỷ niệm duy nhất mà mẹ để lại cho hắn trước khi qua đời.",
        '"Tiểu tử, ngươi đang buồn phiền vì điều gì?" Một giọng nói già nua đột nhiên vang lên trong đầu Tiêu Viêm, khiến hắn giật mình.',
        '"Ai?" Tiêu Viêm hoảng hốt nhìn quanh, nhưng không thấy ai cả.',
        '"Ta ở trong chiếc nhẫn này. Ta đã ngủ quá lâu, cuối cùng cũng tỉnh lại." Giọng nói già nua lại vang lên.',
        "Tiêu Viêm nhìn chiếc nhẫn đen trên tay, kinh ngạc. Hóa ra, trong chiếc nhẫn này có một linh hồn đang tồn tại.",
        '"Ngươi là ai?" Tiêu Viêm hỏi.',
        '"Ta là Dược Lão, một luyện dược sư từng nổi danh thiên hạ. Nhưng đó là chuyện của mấy trăm năm trước rồi." Giọng nói đáp.',
        '"Luyện dược sư? Là người có thể luyện chế đan dược sao?" Tiêu Viêm tò mò hỏi.',
        '"Đúng vậy. Và ta có thể giúp ngươi lấy lại thiên phú tu luyện đã mất." Dược Lão nói, khiến Tiêu Viêm vô cùng kinh ngạc và mừng rỡ.',
        "Từ đó, cuộc đời của Tiêu Viêm bước sang một trang mới. Dưới sự chỉ dạy của Dược Lão, hắn dần lấy lại được thiên phú tu luyện, và còn mạnh mẽ hơn trước đây rất nhiều.",
        "Nhưng con đường phía trước vẫn còn nhiều chông gai. Tiêu Viêm phải đối mặt với những kẻ thù mạnh mẽ, những thế lực bí ẩn, và cả những bí mật về thân thế của mình.",
        "Đây là câu chuyện về hành trình trưởng thành của Tiêu Viêm, từ một thiếu niên yếu đuối trở thành một cường giả đứng trên đỉnh cao của thế giới tu luyện."
    ]

    return {
        title: chapterTitles[id % 10],
        content: content
    }
}
