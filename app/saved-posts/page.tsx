'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, MessageCircle, Share2, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getSavedPosts, getCurrentUser, Post } from '@/lib/mock-data'

export default function SavedPostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const currentUser = getCurrentUser()

  useEffect(() => {
    if (currentUser) {
      const saved = getSavedPosts(currentUser.id)
      setPosts(saved)
    }
  }, [currentUser])

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 glass border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/social">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Saved Posts</h1>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-4">No saved posts yet</p>
            <Link href="/social">
              <Button>Explore the Feed</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="group glass rounded-xl overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <img
                    src={post.imageUrl}
                    alt={post.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {post.isAIGenerated && (
                    <div className="absolute top-2 left-2 px-2 py-1 bg-primary text-white rounded text-xs font-bold flex items-center gap-1">
                      AI
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {post.userAvatar && (
                      <img
                        src={post.userAvatar}
                        alt={post.userName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-sm">{post.userName}</p>
                      <p className="text-xs text-muted-foreground">{post.style}</p>
                    </div>
                  </div>

                  <p className="text-sm line-clamp-2 mb-3">{post.caption}</p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {post.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        {post.comments.length}
                      </div>
                      <div className="flex items-center gap-1">
                        <Share2 className="h-4 w-4" />
                        {post.shares}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
