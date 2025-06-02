import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams

        // Forward the request to the external API
        const response = await fetch(
            `https://backend.metruyencv.com/api/chapters?${searchParams.toString()}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.METRUYEN_TOKEN}`
                }
            }
        )

        if (!response.ok) {
            return NextResponse.json(
                { error: `Failed to fetch chapters: ${response.statusText}` },
                { status: response.status }
            )
        }

        // Get the data from the external API
        const data = await response.json()

        // Return the data with appropriate headers
        return NextResponse.json(data, {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            }
        })
    } catch (error) {
        console.error("Error fetching chapters:", error)
        return NextResponse.json(
            { error: "Failed to fetch chapters" },
            { status: 500 }
        )
    }
}
