/**
 * Base model interface for API entities
 */
export interface BaseModel {
    id: number | string
    createdAt?: string
    updatedAt?: string
}

/**
 * API response format
 */
export interface ApiResponse<T> {
    data: T
    meta?: {
        current_page: number
        last_page: number
        per_page: number
        total: number
    }
    status?: number
    message?: string
    errors?: Record<string, string[]>
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
    page?: number
    limit?: number
    sort?: string
}

/**
 * Filter parameters
 */
export interface FilterParams {
    [key: string]: string | number | boolean | undefined
}

/**
 * Converts an object to URL query parameters
 */
export function objectToQueryParams(obj: Record<string, any>): string {
    const params = new URLSearchParams()

    Object.entries(obj).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            params.append(key, String(value))
        }
    })

    const queryString = params.toString()
    return queryString ? `?${queryString}` : ""
}

/**
 * Extract data from API response
 */
export function extractApiData<T>(response: ApiResponse<T>): T {
    return response.data
}

/**
 * Helper to create a filter string for MyTruyen API
 */
export function createFilterParam(filters: Record<string, any>): string {
    return Object.entries(filters)
        .filter(([_, value]) => value !== undefined && value !== null)
        .map(
            ([key, value]) =>
                `filter%5B${key}%5D=${encodeURIComponent(String(value))}`
        )
        .join("&")
}
