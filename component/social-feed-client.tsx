'use client'

import { useState, useRef, useEffect } from 'react'
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
  Post,
} from '@/lib/mock-data'

export default function SocialFeedClient() {
  const [posts, setPosts] = useState<Post[]>([])
  const [currentPostIndex, setCurrentPostIndex] = useState(0)
  const [commentText, setCommentText] = useState('')
  const [showComments, setShowComments] = useState(false)
  const [shareMessage, setShareMessage] = useState('')
  const [filters, setFilters] = useState({ style: 'all', roomType: 'all' })
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const currentUser = getCurrentUser()

  useEffect(() => {
    const filtered = getPosts({
      style: filters.style !== 'all' ? filters.style : undefined,
      roomType: filters.roomType !== 'all' ? filters.roomType : undefined,
    })
    setPosts(filtered)
  }, [filters])

  useEffect(() => {
    if (posts.length > 0) {
      incrementPostView(posts[currentPostIndex].id)
    }
  }, [currentPostIndex, posts])

  const handleScroll = (e: WheelEvent | React.WheelEvent) => {
    e.preventDefault()
    if (e.deltaY > 0 && currentPostIndex < posts.length - 1) {
      setCurrentPostIndex(currentPostIndex + 1)
    } else if (e.deltaY < 0 && currentPostIndex > 0) {
      setCurrentPostIndex(currentPostIndex - 1)
    }
  }

  const toggleLike = () => {
    if (!currentUser) return
    const updated = togglePostLike(posts[currentPostIndex].id, currentUser.id)
    if (updated) {
      const newPosts = [...posts]
      newPosts[currentPostIndex] = updated
      setPosts(newPosts)
    }
  }

  const toggleSave = () => {
    if (!currentUser) return
    const updated = togglePostSave(posts[currentPostIndex].id, currentUser.id)
    if (updated) {
      const newPosts = [...posts]
      newPosts[currentPostIndex] = updated
      setPosts(newPosts)
    }
  }

  const handleComment = () => {
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
  }

  const handleShare = async () => {
    if (!posts[currentPostIndex]) return
    const updated = sharePost(posts[currentPostIndex].id)
    if (updated) {
      const newPosts = [...posts]
      newPosts[currentPostIndex] = updated
      setPosts(newPosts)
      setShareMessage('Shared to clipboard!')
      setTimeout(() => setShareMessage(''), 2000)
    }
  }

  if (posts.length === 0) {
    return (
      <div className="h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">No posts found</p>
      </div>
    )
  }

  const currentPost = posts[currentPostIndex]
  const isLiked = currentUser ? currentPost.likedBy.includes(currentUser.id) : false
  const isSaved = currentUser ? currentPost.savedBy.includes(currentUser.id) : false

  return (
    <div
      ref={containerRef}
      onWheel={handleScroll}
      className="relative h-screen w-full overflow-hidden bg-black flex flex-col"
    >
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
              Social Feed
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
              Social Feed
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

      {/* Background blur effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Current Post */}
      <div className="flex-1 flex items-center justify-center snap-center">
        <div className="relative w-full h-full max-w-2xl flex flex-col sm:flex-row">
          {/* Image */}
          <div className="flex-1 relative overflow-hidden">
            <img
              src={currentPost.imageUrl}
              alt={currentPost.caption}
              className="w-full h-full object-cover"
            />
            {currentPost.isAIGenerated && (
              <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-white rounded-full text-xs font-bold flex items-center gap-1.5">
                <Sparkles className="h-3 w-3" />
                AI Generated
              </div>
            )}

            {/* View Count */}
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white bg-black/50 px-3 py-1.5 rounded-full text-sm">
              <Eye className="h-4 w-4" />
              {currentPost.viewCount.toLocaleString()}
            </div>
          </div>

          {/* Post Info & Interaction */}
          <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-t sm:bg-gradient-to-l from-black to-transparent text-white relative z-10">
            {/* User Info */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img
                  src={currentPost.userAvatar || '/default-avatar.jpg'}
                  alt={currentPost.userName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white"
                />
                <div>
                  <h3 className="font-bold text-lg">{currentPost.userName}</h3>
                  <p className="text-sm text-gray-300">@{currentPost.userName.toLowerCase().replace(' ', '')}</p>
                </div>
              </div>

              {/* Caption */}
              <p className="text-lg mb-4 leading-relaxed">{currentPost.caption}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {currentPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Room Type & Style */}
              <div className="flex gap-2 text-sm text-gray-300 mb-6">
                <span className="bg-white/10 px-3 py-1 rounded-full">{currentPost.roomType}</span>
                <span className="bg-white/10 px-3 py-1 rounded-full">{currentPost.style}</span>
              </div>
            </div>

            {/* Interactions */}
            <div className="space-y-4">
              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={toggleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    isLiked
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                  <span className="text-sm font-semibold">{currentPost.likes}</span>
                </button>

                <button
                  onClick={() => setShowComments(!showComments)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-sm font-semibold">{currentPost.comments.length}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
                >
                  <Share2 className="h-5 w-5" />
                  <span className="text-sm font-semibold">{currentPost.shares}</span>
                </button>

                <button
                  onClick={toggleSave}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    isSaved
                      ? 'bg-primary/20 text-primary'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
                </button>
              </div>

              {shareMessage && (
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <Check className="h-4 w-4" />
                  {shareMessage}
                </div>
              )}

              {/* Comments Section */}
              {showComments && (
                <div className="mt-6 space-y-4 max-h-64 overflow-y-auto">
                  <div className="text-sm font-semibold">Comments ({currentPost.comments.length})</div>
                  {currentPost.comments.map((comment) => (
                    <div key={comment.id} className="text-sm bg-white/5 p-3 rounded-lg">
                      <p className="font-semibold text-sm">{comment.userName}</p>
                      <p className="text-gray-300 mt-1">{comment.text}</p>
                    </div>
                  ))}

                  {/* Add Comment */}
                  <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
                    <Input
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') handleComment()
                      }}
                      placeholder="Add a comment..."
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                    <Button
                      onClick={handleComment}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Post
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {posts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPostIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentPostIndex ? 'w-8 bg-primary' : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Filters */}
      <div className="absolute top-20 right-4 md:top-6 z-20 flex gap-2 flex-col sm:flex-row max-w-xs">
        <select
          value={filters.style}
          onChange={(e) => setFilters({ ...filters, style: e.target.value })}
          className="px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-sm hover:bg-white/20 transition-colors"
        >
          <option value="all">All Styles</option>
          <option value="minimalist">Minimalist</option>
          <option value="industrial">Industrial</option>
          <option value="scandinavian">Scandinavian</option>
        </select>

        <select
          value={filters.roomType}
          onChange={(e) => setFilters({ ...filters, roomType: e.target.value })}
          className="px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-sm hover:bg-white/20 transition-colors"
        >
          <option value="all">All Rooms</option>
          <option value="living room">Living Room</option>
          <option value="bedroom">Bedroom</option>
          <option value="kitchen">Kitchen</option>
        </select>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white/40 text-sm pointer-events-none">
        <div className="animate-bounce">↓</div>
      </div>

      {/* Post Counter */}
      <div className="absolute top-20 left-4 md:top-6 z-20 text-white text-sm font-medium bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-lg">
        {currentPostIndex + 1} / {posts.length}
      </div>
    </div>
  )
}

