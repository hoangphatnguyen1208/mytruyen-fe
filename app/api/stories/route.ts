import { type NextRequest, NextResponse } from "next/server"

// Mock database of stories
// In a real application, this would come from a database
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const response = await fetch(
        `https://backend.metruyencv.com/api/books?${searchParams.toString()}`
    )

    return NextResponse.json(await response.json(), {
        status: response.status,
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store"
        }
    })
}
