import { NextResponse } from "next/server"
import type { Banner } from "@/types/api"

export async function GET() {
    const response = await fetch(
        "https://backend.metruyencv.com/api/topboxes?filter%5Btopboxable.kind%5D=1&limit=5"
    )
    const rawData = await response.json()

    // Determine the array of items (may be rawData.data or rawData itself)
    const items: any[] = Array.isArray(rawData.data)
        ? rawData.data
        : Array.isArray(rawData)
        ? rawData
        : []

    const banners: Banner[] = items.map((item) => ({
        id: item.id,
        name: item.name,
        // Extract slug from URL
        slug: item.url?.split(".com")[1] || new URL(item.url).pathname,
        banner_desktop: item.banner_desktop || item.bg_desktop,
        banner_mobile: item.banner_mobile,
        created_at: item.created_at,
        updated_at: item.updated_at,
        owner_name: item.owner_name
    }))

    return NextResponse.json({ data: banners })
}
