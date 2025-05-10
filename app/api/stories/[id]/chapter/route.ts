import { NextResponse } from "next/server"

interface Props {
    params: {
        id: string
    }
}

export async function GET(request: Request, { params }: Props) {
    const url = `https://backend.metruyencv.com/api/chapters?filter%5Bbook_id%5D=${params.id}&filter%5Btype%5D=published`

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (!response.ok) {
            throw new Error("Network response was not ok")
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error("Error fetching chapter:", error)
        return NextResponse.json(
            { error: "Failed to fetch chapter" },
            { status: 500 }
        )
    }
}
