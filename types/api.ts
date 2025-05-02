export interface Poster {
    default: string
    "600": string
    "300": string
    "150": string
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
    object_type: string
}

export interface Genre {
    id: number
    name: string
    object_type: string
}

export interface Story {
    id: number
    name: string
    slug: string
    kind: number
    sex: number
    state: string
    status: number
    link: string
    note: string
    status_name: string
    first_chapter: number
    latest_chapter: number
    latest_index: number
    high_quality: number
    manager_pick: number
    poster: Poster
    synopsis: string
    vote_count: number
    review_score: string
    review_count: number
    comment_count: number
    chapter_count: number
    view_count: number
    word_count: number
    created_at: string
    updated_at: string
    new_chap_at: string
    published_at: string
    published: number
    user_id: number
    object_type: string
    bookmark_count: number
    chapter_per_week: number
    ready_for_sale: number
    discount_price: number
    discount: number
    creator: Creator
    author: Author
    genres: Genre[]
    reading_count: number
}

export interface HotStory {
    book: Story
    reading_count: number
}

export interface ChapterTitle {
    id : number
    name : string
    index : number
    word_count : number
    view_count : number
    user_id : number
    published_at : string
    unlock_price : number
    unlock_key_price : number
    is_locked : null
    object_type : string
}