import { NextResponse } from "next/server"

export async function POST(request: Request) {
    // get auth code from https://backend.metruyencv.com/api/auth/login
    const response = await fetch(
        "https://backend.metruyencv.com/api/auth/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: "a",
                password: "g",
                remember: 1,
                device_name:
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
            }),
        }
    )
    // return response.json()
    const data = await response.json()
    console.log("data", data)
    return NextResponse.json(data)
}
