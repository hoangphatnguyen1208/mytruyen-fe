export const dynamic = 'force-dynamic'

import { homeApi } from "@/lib/home-api"
import SlidingBannerClient from "./sliding-banner.client"

export async function SlidingBanner() {
    const banners = await homeApi.getBanners()
    return <SlidingBannerClient banners={banners} />
}
