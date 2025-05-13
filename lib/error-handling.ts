/**
 * API Error class with structured information
 */
export class ApiError extends Error {
    status: number = 500
    statusText: string = "Unknown Error"
    data: any = null

    constructor(message: string, response?: Response, data?: any) {
        super(message)
        this.name = "ApiError"

        if (response) {
            this.status = response.status
            this.statusText = response.statusText
        }

        if (data) {
            this.data = data
        }
    }

    static async fromResponse(response: Response): Promise<ApiError> {
        let errorData
        try {
            errorData = await response.json()
        } catch (e) {
            errorData = null
        }

        return new ApiError(
            `API Error: ${response.status} ${response.statusText}`,
            response,
            errorData
        )
    }
}

/**
 * Global error handler for API errors
 */
export function handleApiError(error: any, context?: string): never {
    // Log the error with context if provided
    if (context) {
        console.error(`Error in ${context}:`, error)
    } else {
        console.error("API Error:", error)
    }

    // You could add additional error handling logic here:
    // - Reporting to error monitoring service
    // - Showing UI notifications
    // - Handling specific error types differently

    throw error
}
