"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type BannerSlide = {
  id: number
  title: string
  description: string
  imageUrl: string
  link: string
}

export function SlidingBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const bannerSlides: BannerSlide[] = [
    {
      id: 1,
      title: "Đấu Phá Thương Khung",
      description: "Hành trình trở thành cường giả của Tiêu Viêm",
      imageUrl: "/placeholder.svg?height=400&width=1200&text=Đấu+Phá+Thương+Khung",
      link: "/story/dau-pha-thuong-khung",
    },
    {
      id: 2,
      title: "Vũ Động Càn Khôn",
      description: "Khám phá thế giới tu luyện kỳ diệu",
      imageUrl: "/placeholder.svg?height=400&width=1200&text=Vũ+Động+Càn+Khôn",
      link: "/story/vu-dong-can-khon",
    },
    {
      id: 3,
      title: "Nguyên Tôn",
      description: "Hành trình trở thành Nguyên Tôn của nhân vật chính",
      imageUrl: "/placeholder.svg?height=400&width=1200&text=Nguyên+Tôn",
      link: "/story/nguyen-ton",
    },
  ]

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === bannerSlides.length - 1 ? 0 : prev + 1))
  }, [bannerSlides.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? bannerSlides.length - 1 : prev - 1))
  }, [bannerSlides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    // Reset auto-play timer when manually changing slides
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 100)
  }

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide()
      }, 5000) // Change slide every 5 seconds
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isAutoPlaying, nextSlide])

  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-md mb-8" style={{ height: "300px" }}>
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {bannerSlides.map((slide) => (
          <div
            key={slide.id}
            className="min-w-full h-full relative bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.imageUrl})` }}
          >
            <Link href={slide.link} className="block w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{slide.title}</h2>
                <p className="text-sm md:text-base text-white/90 max-w-md">{slide.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${currentSlide === index ? "bg-white w-4" : "bg-white/50"}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
