import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL_V1 =
  process.env.NEXT_PUBLIC_MYTRUYEN_API_BASE_URL ||
  'http://localhost:8000/api/v1'

/**
 * POST /api/v1/search/audio
 * Search stories using audio file
 */
export async function POST(request: NextRequest) {
  try {
    // Get form data from request
    const formData = await request.formData()
    const audioFile = formData.get('audio_file') as File | null
    const language = formData.get('language') as string | null

    // Validate audio file
    if (!audioFile) {
      return NextResponse.json(
        { success: false, message: 'Audio file is required' },
        { status: 400 },
      )
    }

    // Validate file type
    const allowedTypes = [
      'audio/mpeg', // .mp3
      'audio/wav', // .wav
      'audio/x-m4a', // .m4a
      'audio/mp4', // .m4a, .mp4
      'audio/ogg', // .ogg
      'audio/flac', // .flac
      'audio/webm', // .webm
      'video/webm', // .webm
      'video/mp4', // .mp4
    ]

    if (!allowedTypes.includes(audioFile.type)) {
      return NextResponse.json(
        {
          success: false,
          message: `Unsupported file type: ${audioFile.type}. Allowed types: .mp3, .wav, .m4a, .ogg, .flac, .webm, .mp4`,
        },
        { status: 400 },
      )
    }

    // Create form data for backend API
    const backendFormData = new FormData()
    backendFormData.append('audio_file', audioFile)
    if (language) {
      backendFormData.append('language', language)
    } else {
      backendFormData.append('language', 'vi') // Default to Vietnamese
    }

    // Forward request to backend API
    const response = await fetch(`${API_BASE_URL_V1}/search/audio`, {
      method: 'POST',
      body: backendFormData,
      // Don't set Content-Type header - let fetch set it with boundary
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json(
        {
          success: false,
          message: errorData.message || 'Failed to search with audio',
        },
        { status: response.status },
      )
    }

    const data = await response.json()

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    })
  } catch (error) {
    console.error('Error in audio search:', error)
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 },
    )
  }
}
