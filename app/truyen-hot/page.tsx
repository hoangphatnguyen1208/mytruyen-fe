"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export default function HotStoriesPage() {
    const [sortBy, setSortBy] = useState("views")
    const [searchTerm, setSearchTerm] = useState("")

    return (
        <div className="container mx-auto px-4 py-3">
            <div className="mb-4">
                <p className="text-muted-foreground">
                    Những truyện được đọc nhiều nhất trên My Truyện
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Tìm kiếm truyện..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-4">
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sắp xếp theo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="views">Lượt đọc</SelectItem>
                            <SelectItem value="rating">Đánh giá</SelectItem>
                            <SelectItem value="chapters">Số chương</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-4 mb-6">
                {/* {filteredStories.length > 0 ? (
                    filteredStories.map((story) => (
                        <StoryCard key={story.id} story={story} />
                    ))
                ) : (
                    <div className="text-center py-8 border rounded-lg">
                        <p className="text-muted-foreground">
                            Không tìm thấy truyện phù hợp
                        </p>
                    </div>
                )} */}
            </div>

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" isActive>
                            1
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
