# MyTruyen Project Refactoring Plan

## Project Overview

MyTruyen is a Next.js application for reading novels/stories online. The app allows users to browse stories, read chapters, and engage with content through comments. The application follows Next.js 13+ App Router structure.

## Current Structure

-   **API Layer**: Direct API calls in page components
-   **Components**: Mix of UI and business logic
-   **Routing**: Next.js App Router with dynamic routes like `/truyen/[slug]` and `/truyen/[slug]/chuong/[id]`
-   **Data Fetching**: Direct fetch calls with some API abstraction beginning to be implemented

## Refactoring Goals

1. **Improve Code Organization**
2. **Increase Reusability**
3. **Enhance Maintainability**
4. **Optimize Performance**
5. **Ensure Consistent UI/UX**

## Action Plan

### 1. API Layer Refactoring

-   ✅ Extract all API calls to a dedicated service layer (`lib/api.ts` and `lib/home-api.ts`)
-   ✅ Implement proper error handling for all API calls
-   ✅ Add TypeScript types for all API responses
-   ✅ Add caching strategy for API calls
-   ✅ Implement API middleware for common operations (authentication, logging)
-   ✅ Create namespaced API structure (api.story.getBySlug, homeApi.getHotStories)
-   ✅ Create base API client with unified methods (`lib/api-client.ts`)
-   ✅ Add config file for API settings (`lib/config.ts`)
-   ✅ Improve error handling with custom error classes (`lib/error-handling.ts`)
-   ✅ Add utility functions for API operations (`lib/api-utils.ts`)

### 2. Component Refactoring

-   ✅ Create a reusable `NotFound` component for consistent error handling
-   ✅ Create reusable UI components for story display cards
-   ✅ Implement skeleton loading states for all async components
-   ✅ Extract complex logic from components to custom hooks
-   ✅ Ensure proper prop typing for all components
-   ✅ Create reading-related components (ReadingContent, ReadingControls, ReadingTracker)

### 3. Data Fetching & State Management

-   ✅ Implement proper loading states for all async operations
-   ✅ Add fallback UI for failed requests
-   ✅ Add client-side storage for user preferences and history
-   ✅ Implement reading history tracking
-   Consider implementing a global state management solution for app-wide state
-   ✅ Add client-side caching strategy for frequently accessed data

### 4. Route Handling & Metadata

-   ✅ Implement proper metadata for all pages (title, description)
-   Ensure consistent page transitions
-   Add proper SEO optimization for dynamic routes
-   Implement proper navigation between related pages

### 5. UI/UX Improvements

-   Ensure responsive design works across all viewports
-   Implement proper focus states for accessibility
-   Add proper error messages for user actions
-   Ensure consistent styling across the application

### 6. Code Quality Improvements

-   Add proper JSDoc comments for functions and components
-   Implement unit tests for critical functionality
-   Set up linting and formatting rules
-   Add Storybook documentation for UI components

## Implementation Order

1. ✅ **API Layer Refactoring**
2. ✅ **Shared Component Creation**
3. ✅ **Page Component Refactoring**
    - ✅ Homepage
    - ✅ Story Detail Page
    - ✅ Chapter Reading Page
    - ✅ Reading History Page
4. **State Management Implementation**
5. **UI/UX Refinement**
6. **Testing & Documentation**

## Specific Tasks

-   ✅ Create unified API service functions in `lib/api.ts`
-   ✅ Implement proper metadata for story and chapter pages
-   ✅ Extract reusable UI components
-   ✅ Add proper loading/error states for all async operations
-   ✅ Implement client-side caching for API calls
-   ✅ Add pagination for chapter listings
-   ✅ Implement reading history and preferences
-   ✅ Add reading progress tracking
-   ✅ Create reading controls for font size and theme
-   Add unit tests for critical functions
-   Create Storybook documentation for UI components

## Long-term Improvements

-   Consider implementing server components where appropriate
-   Add internationalization support
-   Implement analytics tracking
-   Add performance monitoring
-   Explore PWA capabilities

This plan will be updated as the refactoring progresses, with completed items marked and new tasks added as needed.
