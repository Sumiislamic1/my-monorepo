'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, MessageCircle, Share2, Eye, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getPosts, Post } from '@/lib/mock-data'

export default function TrendingPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [sortBy, setSortBy] = useState<'views' | 'likes' | 'comments'>('views')

  useEffect(() => {
    const allPosts = getPosts()
    const sorted = [...allPosts].sort((a, b) => {
      switch (sortBy) {
        case 'views':
          return b.viewCount - a.viewCount
        case 'likes':
          return b.likes - a.likes
        case 'comments':
          return b.comments.length - a.comments.length
        default:
          return 0
      }
    })
    setPosts(sorted)
  }, [sortBy])

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 glass border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <Link href="/social">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Trending Now</h1>
            <div className="flex gap-2">
              {(['views', 'likes', 'comments'] as const).map((option) => (
                <Button
                  key={option}
                  variant={sortBy === option ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy(option)}
                  className="capitalize"
                >
                  Top {option}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="space-y-6">
          {posts.map((post, index) => (
            <div
              key={post.id}
              className="glass rounded-2xl overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-80 h-64 md:h-auto bg-muted flex-shrink-0">
                  <img
                    src={post.imageUrl}
                    alt={post.caption}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
                    #{index + 1}
                  </div>
                  {post.isAIGenerated && (
                    <div className="absolute top-4 right-4 bg-accent text-white px-2.5 py-1 rounded text-xs font-bold">
                      AI
                    </div>
                  )}
                </div>

                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      {post.userAvatar && (
                        <img
                          src={post.userAvatar}
                          alt={post.userName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <p className="font-bold">{post.userName}</p>
                        <p className="text-sm text-muted-foreground">@{post.userName.toLowerCase().replace(' ', '')}</p>
                      </div>
                    </div>

                    <p className="text-lg mb-4 leading-relaxed">{post.caption}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2 text-sm text-muted-foreground">
                      <span className="px-2.5 py-1 bg-muted rounded-full">{post.roomType}</span>
                      <span className="px-2.5 py-1 bg-muted rounded-full">{post.style}</span>
                    </div>
                  </div>

                  <div className="flex gap-6 mt-6 pt-6 border-t border-border">
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <Heart className="h-5 w-5 fill-current" />
                      {post.likes}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MessageCircle className="h-5 w-5" />
                      {post.comments.length}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Share2 className="h-5 w-5" />
                      {post.shares}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground ml-auto">
                      <Eye className="h-5 w-5" />
                      {post.viewCount.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
