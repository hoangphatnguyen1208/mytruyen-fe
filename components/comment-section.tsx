"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp, Reply, Send } from "lucide-react"

interface User {
  id: string
  name: string
  avatar: string
}

interface CommentReply {
  id: string
  user: User
  content: string
  createdAt: string
  likes: number
  isLiked: boolean
}

interface Comment {
  id: string
  user: User
  content: string
  createdAt: string
  likes: number
  isLiked: boolean
  replies?: CommentReply[]
}

interface CommentSectionProps {
  storyId: string
  initialComments?: Comment[]
}

export function CommentSection({ storyId, initialComments = [] }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitComment = () => {
    if (!newComment.trim()) return

    setIsSubmitting(true)

    // In a real app, this would be an API call
    setTimeout(() => {
      const comment: Comment = {
        id: `comment-${Date.now()}`,
        user: {
          id: "current-user",
          name: "Bạn",
          avatar: "",
        },
        content: newComment,
        createdAt: new Date().toISOString(),
        likes: 0,
        isLiked: false,
      }

      setComments([comment, ...comments])
      setNewComment("")
      setIsSubmitting(false)
    }, 500)
  }

  const handleSubmitReply = (commentId: string) => {
    if (!replyContent.trim()) return

    setIsSubmitting(true)

    // In a real app, this would be an API call
    setTimeout(() => {
      const reply: CommentReply = {
        id: `reply-${Date.now()}`,
        user: {
          id: "current-user",
          name: "Bạn",
          avatar: "",
        },
        content: replyContent,
        createdAt: new Date().toISOString(),
        likes: 0,
        isLiked: false,
      }

      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), reply],
          }
        }
        return comment
      })

      setComments(updatedComments)
      setReplyingTo(null)
      setReplyContent("")
      setIsSubmitting(false)
    }, 500)
  }

  const toggleLike = (commentId: string, isReply = false, parentId?: string) => {
    if (isReply && parentId) {
      const updatedComments = comments.map((comment) => {
        if (comment.id === parentId && comment.replies) {
          return {
            ...comment,
            replies: comment.replies.map((reply) => {
              if (reply.id === commentId) {
                return {
                  ...reply,
                  likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                  isLiked: !reply.isLiked,
                }
              }
              return reply
            }),
          }
        }
        return comment
      })
      setComments(updatedComments)
    } else {
      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked,
          }
        }
        return comment
      })
      setComments(updatedComments)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.round(diffMs / 60000)
    const diffHours = Math.round(diffMs / 3600000)
    const diffDays = Math.round(diffMs / 86400000)

    if (diffMins < 60) {
      return `${diffMins} phút trước`
    } else if (diffHours < 24) {
      return `${diffHours} giờ trước`
    } else {
      return `${diffDays} ngày trước`
    }
  }

  return (
    <div className="space-y-6">
      <div className="border rounded-lg p-4">
        <h3 className="text-sm font-medium mb-2">Thêm bình luận</h3>
        <Textarea
          placeholder="Viết bình luận của bạn..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="mb-3 min-h-[100px]"
        />
        <div className="flex justify-end">
          <Button
            onClick={handleSubmitComment}
            disabled={!newComment.trim() || isSubmitting}
            className="flex items-center gap-1"
          >
            <Send className="h-4 w-4" />
            Gửi bình luận
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs">
                  {comment.user.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="font-medium text-sm">{comment.user.name}</div>
                  <div className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</div>
                </div>
              </div>

              <p className="text-sm mb-3">{comment.content}</p>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <button
                  onClick={() => toggleLike(comment.id)}
                  className={`flex items-center gap-1 hover:text-primary ${comment.isLiked ? "text-primary" : ""}`}
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span>{comment.likes > 0 ? comment.likes : ""} Thích</span>
                </button>
                <button
                  onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  className="flex items-center gap-1 hover:text-primary"
                >
                  <Reply className="h-3.5 w-3.5" />
                  <span>Trả lời</span>
                </button>
              </div>

              {replyingTo === comment.id && (
                <div className="mt-3 pl-4 border-l-2">
                  <Textarea
                    placeholder="Viết trả lời của bạn..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="mb-2 min-h-[80px] text-sm"
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => setReplyingTo(null)}>
                      Hủy
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleSubmitReply(comment.id)}
                      disabled={!replyContent.trim() || isSubmitting}
                    >
                      Trả lời
                    </Button>
                  </div>
                </div>
              )}

              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-3 pl-4 border-l-2 space-y-3">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="pt-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs">
                          {reply.user.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium text-xs">{reply.user.name}</div>
                          <div className="text-xs text-muted-foreground">{formatDate(reply.createdAt)}</div>
                        </div>
                      </div>

                      <p className="text-sm mb-2">{reply.content}</p>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <button
                          onClick={() => toggleLike(reply.id, true, comment.id)}
                          className={`flex items-center gap-1 hover:text-primary ${reply.isLiked ? "text-primary" : ""}`}
                        >
                          <ThumbsUp className="h-3 w-3" />
                          <span>{reply.likes > 0 ? reply.likes : ""} Thích</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
