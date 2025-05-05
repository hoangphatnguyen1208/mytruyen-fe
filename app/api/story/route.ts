import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const response = await fetch("https://backend.metruyencv.com/api/story", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.METRUYEN_TOKEN}`,
        },
    })
    const data = await response.json()
    return NextResponse.json(data)
}
