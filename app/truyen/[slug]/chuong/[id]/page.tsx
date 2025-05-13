import Link from "next/link"
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { Metadata } from "next"
import { api } from "@/lib/api"
import { NotFound } from "@/components/not-found"

export async function generateMetadata({
    params
}: {
    params: { slug: string; id: string }
}): Promise<Metadata> {
    const { slug, id } = await params
    const story = await api.story.getBySlug(slug)
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
    const { slug, id } = await params
    const chapterId = Number.parseInt(id)

    const story = await api.story.getBySlug(slug)
    const chapter = await api.chapter.getById(slug, chapterId)

    if (!story || !chapter) {
        return <NotFound message="Chương không tồn tại" />
    }
    const fontSizeClasses = {
        small: "text-sm",
        medium: "text-base",
        large: "text-lg",
        xlarge: "text-xl"
    }

    return <div className="max-w-3xl mx-auto px-4 py-6"></div>
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
