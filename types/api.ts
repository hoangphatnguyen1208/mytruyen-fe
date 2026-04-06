export interface Poster {
  default: string
  '600': string
  '300': string
  '150': string
}

export interface Creator {
  id: number
  name: string
  avatar: string[]
  level: number
  exp: number
  object_type: string
}

export interface Author {
  id: number
  name: string
  avatar: string[]
  object_type?: string
}

export interface Genre {
  id: number
  name: string
  object_type: string
}

export interface Story {
  id: number | string
  name: string
  slug: string
  kind: number
  sex: number
  state?: string
  status?: number
  status_id?: number
  link?: string
  note?: string
  status_name?: string
  first_chapter?: number
  latest_chapter?: number
  latest_index?: number
  high_quality?: number
  manager_pick?: number
  poster: Poster
  synopsis: string
  vote_count?: number
  review_score?: string
  review_count?: number
  comment_count: number
  chapter_count: number
  view_count: number
  word_count: number
  new_chap_at: string
  created_at: string
  updated_at: string
  published_at?: string
  published?: number
  user_id?: number
  object_type?: string
  bookmark_count?: number
  chapter_per_week: number
  ready_for_sale?: number
  discount_price?: number
  discount?: number
  creator?: Creator
  author: Author
  genres?: Genre[]
  reading_count?: number
}

export interface HotStory {
  book?: Story
  reading_count?: number
}

export interface ChapterDetail {
  id: number
  name: string
  index: number
  word_count: number
  published: boolean
  comment_count: number
  book_id: number
  view_count: number
  published_at: string
  created_at: string
  updated_at: string
}

export interface Banner {
  id: number
  name: string
  slug: string
  banner_desktop: string
  banner_mobile: string
  created_at: string
  updated_at: string
  owner_name: string
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    current_page: number
    from: number
    last_page: number
    path: string
    per_page: number
    to: number
    total: number
  }
}

export interface Comment {
  id: number
  content: string
  userId: number
  storyId: number
  chapterId?: number
  createdAt: string
  updatedAt: string
  likes: number
  isLiked: boolean
  user: {
    id: number
    name: string
    avatar: string
  }
}

export interface SearchResultMetadata {
  book_id: string
  chapter_id: string
  chapter_index: number
}

export interface SearchResult {
  id: string
  score: number
  text: string
  metadata: SearchResultMetadata
}

export interface SearchResponse {
  status_code: number
  success: boolean
  message: string
  data: SearchResult[]
}
