# Extending the API Layer

This document provides guidance on how to extend the API layer in MyTruyen.

## Adding a New API Endpoint

### 1. Update the Config

First, add your new endpoint to `lib/config.ts`:

```typescript
export const API_ENDPOINTS = {
    // Existing endpoints...

    // Add your new endpoint category
    comments: {
        getAll: "/comments",
        create: "/comments",
        update: "/comments/{id}",
        delete: "/comments/{id}"
    }
}
```

### 2. Add TypeScript Types

Add any new types to `types/api.ts`:

```typescript
export interface Comment {
    id: number
    content: string
    userId: number
    storyId: number
    chapterId?: number
    createdAt: string
    updatedAt: string
    user: {
        id: number
        name: string
        avatar: string
    }
}
```

### 3. Create API Functions

Extend the existing API namespaces or create a new one in the appropriate file:

```typescript
// In lib/api.ts
export const api = {
    // Existing namespaces...

    comment: {
        /**
         * Get comments for a story or chapter
         */
        getAll: async (
            storyId: number,
            chapterId?: number
        ): Promise<Comment[]> => {
            try {
                const cacheKey = `comments_${storyId}_${chapterId || "story"}`

                // Check cache first
                const cachedComments = apiCache.get<Comment[]>(cacheKey)
                if (cachedComments) {
                    return cachedComments
                }

                const url = chapterId
                    ? `${API_BASE_URL}/comments?storyId=${storyId}&chapterId=${chapterId}`
                    : `${API_BASE_URL}/comments?storyId=${storyId}`

                const res = await fetchWithMiddleware(url)
                const data = await res.json()
                const comments = data.data || []

                // Cache for 5 minutes
                apiCache.set(cacheKey, comments, 5 * 60 * 1000)

                return comments
            } catch (error) {
                console.error("Error fetching comments:", error)
                return []
            }
        },

        /**
         * Create a new comment
         */
        create: async (comment: {
            content: string
            storyId: number
            chapterId?: number
        }): Promise<Comment | null> => {
            try {
                const res = await fetchWithMiddleware(
                    `${API_BASE_URL}/comments`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(comment)
                    }
                )

                const data = await res.json()

                // Invalidate related cache
                apiCache.invalidate(
                    `comments_${comment.storyId}_${
                        comment.chapterId || "story"
                    }`
                )

                return data.data
            } catch (error) {
                console.error("Error creating comment:", error)
                return null
            }
        }
    }
}
```

### 4. Add Legacy Support (Optional)

For backward compatibility, add legacy functions:

```typescript
/**
 * Get comments for a story or chapter
 * @deprecated Use api.comment.getAll instead
 */
export async function getComments(
    storyId: number,
    chapterId?: number
): Promise<Comment[]> {
    return api.comment.getAll(storyId, chapterId)
}
```

## Creating a New API Category

For entirely new API categories, consider creating a new file:

### 1. Create a New File (e.g., `lib/comments-api.ts`)

```typescript
import { apiCache } from "./cache";
import { applyMiddleware, withLogging, withAuth } from "./middleware";
import { Comment } from "@/types/api";
import { API_BASE_URL } from "./config";

// Create a fetch function with middleware applied
const fetchWithMiddleware = applyMiddleware([withLogging, withAuth]);

export const commentApi = {
  // Comment-related API functions here
};

// Legacy exports
export function getComments(...) { /* ... */ }
```

### 2. Import and Use

```typescript
import { commentApi } from "@/lib/comments-api"

// Use the new API
const comments = await commentApi.getAll(storyId, chapterId)
```

## Best Practices

1. **Consistent naming**: Use consistent naming for API functions (get*, create*, update*, delete*)
2. **Error handling**: Always include try/catch blocks
3. **Caching**: Consider what should be cached and for how long
4. **TypeScript types**: Provide accurate types for all functions and return values
5. **Documentation**: Add JSDoc comments to all functions
6. **Middleware**: Use appropriate middleware (auth for protected endpoints, etc.)
7. **Backward compatibility**: Provide deprecated exports for existing code
