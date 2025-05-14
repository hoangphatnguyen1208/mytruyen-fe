/**
 * A utility for retry operations in case of failures
 */

/**
 * Retry a function with exponential backoff
 *
 * @param fn The function to retry
 * @param retries Maximum number of retries
 * @param delay Initial delay in milliseconds
 * @param backoff Backoff multiplier (exponential)
 * @returns The result of the function or throws the last error
 */
export async function retry<T>(
    fn: () => Promise<T>,
    retries: number = 3,
    delay: number = 300,
    backoff: number = 1.5
): Promise<T> {
    try {
        return await fn()
    } catch (error) {
        if (retries <= 0) {
            throw error
        }

        // Wait for the specified delay
        await new Promise((resolve) => setTimeout(resolve, delay))

        // Retry with increased delay (exponential backoff)
        return retry(fn, retries - 1, delay * backoff, backoff)
    }
}
