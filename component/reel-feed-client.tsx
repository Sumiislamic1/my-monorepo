'use client'

import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { Heart, MessageCircle, Share2, Bookmark, Eye, Check, Home, Menu, X, Sparkles, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  getPosts,
  togglePostLike,
  togglePostSave,
  addPostComment,
  sharePost,
  incrementPostView,
  getCurrentUser,
  getUserById,
  type Post,
} from '@/lib/mock-data'

interface ReelFeedClientProps {
  initialPost?: string
}

export default function ReelFeedClient({ initialPost = undefined }: ReelFeedClientProps = {}) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPostIndex, setCurrentPostIndex] = useState(0)
  const [commentText, setCommentText] = useState('')
  const [showCommentModal, setShowCommentModal] = useState(false)
  const [shareMessage, setShareMessage] = useState('')
  const [filters, setFilters] = useState({ style: 'all', roomType: 'all' })
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const feedRef = useRef<HTMLDivElement>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()
  const currentUser = getCurrentUser()

  // Debounced scroll handler
  const handleScrollDebounced = useCallback((direction: 'up' | 'down') => {
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    
    scrollTimeoutRef.current = setTimeout(() => {
      if (direction === 'down' && currentPostIndex < posts.length - 1) {
        setCurrentPostIndex((prev) => prev + 1)
      } else if (direction === 'up' && currentPostIndex > 0) {
        setCurrentPostIndex((prev) => prev - 1)
      }
    }, 100)
  }, [currentPostIndex, posts.length])

  // Initialize posts with filtering
  useEffect(() => {
    setLoading(true)
    const filtered = getPosts({
      style: filters.style !== 'all' ? filters.style : undefined,
      roomType: filters.roomType !== 'all' ? filters.roomType : undefined,
    })
    setPosts(filtered)
    
    // Set initial post if provided
    if (initialPost && filtered.length > 0) {
      const index = filtered.findIndex((p) => p.id === initialPost)
      if (index !== -1) {
        setCurrentPostIndex(index)
      }
    }
    setLoading(false)
  }, [filters, initialPost])

  // Increment view count
  useEffect(() => {
    if (posts.length > 0 && !loading) {
      incrementPostView(posts[currentPostIndex].id)
    }
  }, [currentPostIndex, posts.length, loading])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showCommentModal) return
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        handleScrollDebounced('down')
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        handleScrollDebounced('up')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showCommentModal, handleScrollDebounced])

  // Wheel scroll handling with debounce
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault()
      if (e.deltaY > 0) {
        handleScrollDebounced('down')
      } else {
        handleScrollDebounced('up')
      }
    },
    [handleScrollDebounced]
  )

  useEffect(() => {
    const container = feedRef.current
    if (!container) return
    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => container.removeEventListener('wheel', handleWheel)
  }, [handleWheel])

  const toggleLike = useCallback(() => {
    if (!currentUser) return
    const updated = togglePostLike(posts[currentPostIndex].id, currentUser.id)
    if (updated) {
      const newPosts = [...posts]
      newPosts[currentPostIndex] = updated
      setPosts(newPosts)
    }
  }, [currentUser, currentPostIndex, posts])

  const toggleSave = useCallback(() => {
    if (!currentUser) return
    const updated = togglePostSave(posts[currentPostIndex].id, currentUser.id)
    if (updated) {
      const newPosts = [...posts]
      newPosts[currentPostIndex] = updated
      setPosts(newPosts)
    }
  }, [currentUser, currentPostIndex, posts])

  const handleComment = useCallback(() => {
    if (!currentUser || !commentText.trim()) return
    const updated = addPostComment(posts[currentPostIndex].id, {
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      text: commentText,
    })
    if (updated) {
      const newPosts = [...posts]
      newPosts[currentPostIndex] = updated
      setPosts(newPosts)
      setCommentText('')
    }
  }, [currentUser, currentPostIndex, posts, commentText])

  const handleShare = useCallback(() => {
    if (!posts[currentPostIndex]) return
    const updated = sharePost(posts[currentPostIndex].id)
    if (updated) {
      const newPosts = [...posts]
      newPosts[currentPostIndex] = updated
      setPosts(newPosts)
      setShareMessage('Copied to clipboard!')
      setTimeout(() => setShareMessage(''), 2000)
    }
  }, [currentPostIndex, posts])

  // Memoized designer info
  const designerInfo = useMemo(() => {
    if (posts.length === 0 || !posts[currentPostIndex]) return null
    const post = posts[currentPostIndex]
    return post ? getUserById(post.userId) : null
  }, [posts, currentPostIndex])

  // Check if user is authenticated
  if (!currentUser) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold text-white mb-4">Authentication Required</p>
          <p className="text-gray-400 mb-6">Please log in to view reels</p>
          <Link href="/" className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            Go to Home
          </Link>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="h-screen w-full bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading posts...</p>
        </div>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="h-screen w-full bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold mb-2">No posts found</p>
          <p className="text-muted-foreground">Check back later for new content</p>
        </div>
      </div>
    )
  }

  const currentPost = posts[currentPostIndex]
  const isLiked = currentUser ? currentPost.likedBy.includes(currentUser.id) : false
  const isSaved = currentUser ? currentPost.savedBy.includes(currentUser.id) : false

  return (
    <div className="h-screen w-full bg-black overflow-hidden flex flex-col relative">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10 px-4 py-3 md:px-6 md:py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo & Home */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="p-1.5 bg-primary/20 rounded-lg">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <span className="hidden sm:inline text-white font-bold text-lg">AI Interior</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-1.5">
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link href="/social" className="text-sm text-primary font-medium border-b-2 border-primary pb-1">
              Reels
            </Link>
            <Link href="/trending" className="text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4" />
              Trending
            </Link>
            <Link href="/designers" className="text-sm text-gray-300 hover:text-white transition-colors">
              Designers
            </Link>
            <Link href="/dashboard" className="text-sm text-gray-300 hover:text-white transition-colors">
              Dashboard
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden text-white hover:text-primary transition-colors"
          >
            {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <nav className="md:hidden mt-4 space-y-3 pb-4 border-t border-white/10 pt-4">
            <Link href="/" className="block text-sm text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/social" className="block text-sm text-primary font-medium">
              Reels
            </Link>
            <Link href="/trending" className="block text-sm text-gray-300 hover:text-white transition-colors">
              Trending
            </Link>
            <Link href="/designers" className="block text-sm text-gray-300 hover:text-white transition-colors">
              Designers
            </Link>
            <Link href="/dashboard" className="block text-sm text-gray-300 hover:text-white transition-colors">
              Dashboard
            </Link>
          </nav>
        )}
      </header>

      {/* Main Reel Container */}
      <div ref={feedRef} className="flex-1 overflow-hidden snap-y snap-mandatory">
        <div className="h-full flex items-center justify-center p-4">
          <div className="w-full max-w-4xl h-full rounded-lg overflow-hidden bg-black shadow-2xl flex flex-col sm:flex-row">
            {/* Image Side - Lazy Loading Ready */}
            <div className="flex-1 relative overflow-hidden bg-black">
              <img
                src={currentPost.imageUrl}
                alt={currentPost.caption}
                className="w-full h-full object-cover animate-fade-in"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = '/minimalist-living-room.png'
                }}
              />

              {/* AI Badge */}
              {currentPost.isAIGenerated && (
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-primary/80 backdrop-blur-sm text-white rounded-full text-xs font-bold flex items-center gap-1.5 z-10">
                  <Sparkles className="h-3 w-3" />
                  AI Generated
                </div>
              )}

              {/* View Count */}
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm z-10">
                <Eye className="h-4 w-4" />
                {currentPost.viewCount.toLocaleString()}
              </div>
            </div>

            {/* Info & Interactions Side */}
            <div className="flex-1 sm:max-w-md p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-b sm:bg-gradient-to-l from-black/95 to-black/50 text-white overflow-y-auto max-h-[50vh] sm:max-h-screen">
              {/* Designer Header - Clickable */}
              <div>
                <Link href={`/profile/${currentPost.userId}`}>
                  <div className="flex items-center gap-3 mb-6 group cursor-pointer">
                    <img
                      src={currentPost.userAvatar || '/default-avatar.jpg'}
                      alt={currentPost.userName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white/20 group-hover:border-primary transition-colors"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = '/female-designer.png'
                      }}
                    />
                    <div className="group-hover:text-primary transition-colors">
                      <h3 className="font-bold text-lg">{currentPost.userName}</h3>
                      <p className="text-sm text-gray-400">@{currentPost.userName.toLowerCase().replace(' ', '')}</p>
                    </div>
                  </div>
                </Link>

                {/* Caption */}
                <p className="text-base mb-4 leading-relaxed text-gray-100 line-clamp-4">{currentPost.caption}</p>

                {/* Tags */}
                {currentPost.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {currentPost.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-white/10 rounded-full text-xs font-medium hover:bg-white/20 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Metadata */}
                <div className="flex gap-2 text-xs text-gray-400 mb-6">
                  <span className="bg-white/10 px-2.5 py-1 rounded-full capitalize">{currentPost.roomType}</span>
                  <span className="bg-white/10 px-2.5 py-1 rounded-full capitalize">{currentPost.style}</span>
                </div>
              </div>

              {/* Engagement Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6 pb-6 border-b border-white/10">
                <div className="text-center">
                  <div className="text-lg font-bold">{currentPost.likes}</div>
                  <div className="text-xs text-gray-400">Likes</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold">{currentPost.comments.length}</div>
                  <div className="text-xs text-gray-400">Comments</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold">{currentPost.shares}</div>
                  <div className="text-xs text-gray-400">Shares</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={toggleLike}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg transition-all font-medium text-sm ${
                    isLiked
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                  Like
                </button>

                <button
                  onClick={() => setShowCommentModal(true)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-white/10 text-white hover:bg-white/20 border border-white/10 transition-all font-medium text-sm"
                >
                  <MessageCircle className="h-4 w-4" />
                  Reply
                </button>

                <button
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-white/10 text-white hover:bg-white/20 border border-white/10 transition-all font-medium text-sm"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </button>

                <button
                  onClick={toggleSave}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg transition-all font-medium text-sm ${
                    isSaved
                      ? 'bg-primary/20 text-primary border border-primary/30'
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                  }`}
                >
                  <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                </button>
              </div>

              {shareMessage && (
                <div className="flex items-center gap-2 text-green-400 text-sm p-2 bg-green-500/10 rounded-lg border border-green-500/20">
                  <Check className="h-4 w-4" />
                  {shareMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Comments Modal */}
      {showCommentModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-black border border-white/10 rounded-t-2xl sm:rounded-2xl w-full max-w-lg max-h-[80vh] sm:max-h-96 flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 sticky top-0 z-10">
              <h3 className="font-bold text-white text-lg">Comments ({currentPost.comments.length})</h3>
              <button
                onClick={() => setShowCommentModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Comments List - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentPost.comments.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400 text-sm">No comments yet. Be the first to reply!</p>
                </div>
              ) : (
                currentPost.comments.map((comment) => (
                  <div key={comment.id} className="text-sm">
                    <div className="flex items-start gap-3">
                      <img
                        src={comment.userAvatar || '/default-avatar.jpg'}
                        alt={comment.userName}
                        className="w-8 h-8 rounded-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = '/female-designer.png'
                        }}
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-white text-sm">{comment.userName}</p>
                        <p className="text-gray-300 mt-1 text-sm break-words">{comment.text}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input - Sticky Bottom */}
            <div className="border-t border-white/10 p-4 flex gap-2 sticky bottom-0 bg-black">
              <Input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleComment()
                  }
                }}
                placeholder="Add a comment..."
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-primary"
              />
              <Button
                onClick={handleComment}
                disabled={!commentText.trim()}
                className="bg-primary hover:bg-primary/90 disabled:opacity-50"
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      )}



      {/* Post Counter */}
      <div className="absolute top-24 left-4 z-20 text-white text-sm font-medium bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-lg">
        {currentPostIndex + 1} / {posts.length}
      </div>

      {/* Scroll Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-white/50 text-xs text-center pointer-events-none hidden sm:block">
        Scroll down for more posts • Arrow keys to navigate
      </div>
    </div>
  )
}
