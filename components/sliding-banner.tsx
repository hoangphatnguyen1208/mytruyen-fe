export const dynamic = 'force-dynamic'

import { api } from "@/lib/api" 
import SlidingBannerClient from "./sliding-banner.client"

export async function SlidingBanner() {
    const banners = await api.banner.getBanners()
    return <SlidingBannerClient banners={banners} />
}
