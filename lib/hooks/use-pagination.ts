import { useState, useEffect, useCallback } from "react"

interface UsePaginationProps<T, F> {
    // Function that fetches data with pagination
    fetchFn: (
        page: number,
        filters: F
    ) => Promise<{
        data: T[]
        total: number
        page: number
        totalPages: number
    }>

    // Initial page
    initialPage?: number

    // Initial filters
    initialFilters?: F

    // Number of items per page
    perPage?: number
}

interface PaginationState<T, F> {
    // Current page of data
    data: T[]

    // Current page number
    page: number

    // Total number of pages
    totalPages: number

    // Total number of items
    total: number

    // Current filters
    filters: F

    // Loading state
    isLoading: boolean

    // Error state
    error: Error | null

    // Set page function
    setPage: (page: number) => void

    // Set filters function
    setFilters: (filters: F) => void

    // Refresh data function
    refresh: () => Promise<void>
}

/**
 * Custom hook for managing paginated data with filters
 */
export function usePagination<T, F extends Record<string, any> = {}>({
    fetchFn,
    initialPage = 1,
    initialFilters = {} as F,
    perPage = 30
}: UsePaginationProps<T, F>): PaginationState<T, F> {
    const [data, setData] = useState<T[]>([])
    const [page, setPage] = useState<number>(initialPage)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)
    const [filters, setFilters] = useState<F>(initialFilters)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error | null>(null)

    // Function to fetch data with current pagination and filters
    const fetchData = useCallback(async () => {
        setIsLoading(true)
        setError(null)

        try {
            const result = await fetchFn(page, filters)

            setData(result.data)
            setTotal(result.total)
            setTotalPages(result.totalPages)
        } catch (err) {
            setError(
                err instanceof Error ? err : new Error("Unknown error occurred")
            )
            setData([])
        } finally {
            setIsLoading(false)
        }
    }, [fetchFn, page, filters])

    // When page or filters change, fetch data
    useEffect(() => {
        fetchData()
    }, [fetchData])

    // Set filters function (also resets page to 1)
    const handleSetFilters = useCallback((newFilters: F) => {
        setPage(1)
        setFilters(newFilters)
    }, [])

    return {
        data,
        page,
        totalPages,
        total,
        filters,
        isLoading,
        error,
        setPage,
        setFilters: handleSetFilters,
        refresh: fetchData
    }
}
