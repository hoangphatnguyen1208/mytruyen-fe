# API Layer Documentation

This document describes the API structure and usage patterns for the MyTruyen project.

## API Structure

The API layer is organized into modular, namespaced functions that provide type-safe access to backend services with built-in caching and error handling.

### Key Files

-   `lib/api.ts`: Core API functions for stories, chapters, and search
-   `lib/home-api.ts`: API functions for home page content (hot stories, banners, etc.)
-   `lib/cache.ts`: Caching mechanism with TTL support
-   `lib/middleware.ts`: Request middleware for logging, auth, etc.
-   `lib/api-client.ts`: Base client for creating API services
-   `lib/config.ts`: Centralized configuration for API endpoints
-   `lib/error-handling.ts`: Error handling utilities
-   `lib/api-utils.ts`: Common API helper functions

## Usage Examples

### Fetching a Story

```typescript
import { api } from "@/lib/api"

// Using namespaced API (recommended)
const story = await api.story.getBySlug("story-slug")

// Using legacy API (deprecated)
const story = await getStoryBySlug("story-slug")
```

### Fetching Home Page Data

```typescript
import { homeApi } from "@/lib/home-api"

// Get hot stories for the last 60 minutes, 10 items, page 1
const hotStories = await homeApi.getHotStories(60, 10, 1)

// Get latest chapters
const newChapters = await homeApi.getNewChapters(15, 1)
```

### Creating a Custom API Client

```typescript
import { createApiClient } from "@/lib/api-client"
import { API_BASE_URL, CACHE_TTL } from "@/lib/config"
import { withLogging, withAuth } from "@/lib/middleware"

// Create a client with custom configuration
const userApi = createApiClient({
    baseUrl: API_BASE_URL,
    defaultCacheTTL: CACHE_TTL.USER,
    middlewares: [withLogging, withAuth]
})

// Use the client
const userData = await userApi.get<UserProfile>("/user/profile")
```

## Error Handling

All API functions include proper error handling and will log errors to the console. You can catch errors using try/catch:

```typescript
try {
    const story = await api.story.getBySlug("story-slug")
    // Handle success case
} catch (error) {
    // Handle error case
    console.error("Failed to fetch story:", error)
}
```

## Caching

The API layer includes automatic caching with configurable TTL (time-to-live) values:

-   Stories: 10 minutes
-   Chapters: 5 minutes
-   Search results: 3 minutes
-   Banners: 1 hour

To clear the cache programmatically:

```typescript
import { apiCache } from "@/lib/cache"

// Clear a specific item
apiCache.invalidate("story_my-story-slug")

// Clear all cache
apiCache.clear()
```
