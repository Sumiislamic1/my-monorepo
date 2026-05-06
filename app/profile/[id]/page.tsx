'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, MessageSquare, Share2, Grid3x3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getUserById, getUserPosts, Post } from '@/lib/mock-data'

export default function UserProfilePage() {
  const params = useParams()
  const userId = params.id as string
  const [user, setUser] = useState<any>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [tab, setTab] = useState<'posts' | 'about'>('posts')

  useEffect(() => {
    const userData = getUserById(userId)
    if (userData) {
      setUser(userData)
      const userPosts = getUserPosts(userId)
      setPosts(userPosts)
    }
  }, [userId])

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">User not found</p>
      </div>
    )
  }

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
        </div>
      </header>

      {/* Profile Header */}
      <div className="bg-gradient-to-b from-primary/10 to-transparent">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-end">
            {user.avatar && (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-primary object-cover"
              />
            )}

            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
              <p className="text-muted-foreground text-lg mb-4">@{user.name.toLowerCase().replace(' ', '')}</p>
              {user.bio && <p className="text-lg leading-relaxed mb-6">{user.bio}</p>}

              <div className="flex gap-8 mb-6">
                <div>
                  <p className="text-2xl font-bold text-primary">{posts.length}</p>
                  <p className="text-sm text-muted-foreground">Posts</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{user.followers?.length || 0}</p>
                  <p className="text-sm text-muted-foreground">Followers</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{user.following?.length || 0}</p>
                  <p className="text-sm text-muted-foreground">Following</p>
                </div>
              </div>

              {user.role === 'designer' && (
                <span className="inline-block px-4 py-2 bg-primary text-white rounded-full text-sm font-semibold">
                  ✓ Verified Designer
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex gap-8 border-b border-border mb-8">
          <button
            onClick={() => setTab('posts')}
            className={`pb-4 font-semibold flex items-center gap-2 transition-colors ${
              tab === 'posts'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Grid3x3 className="h-5 w-5" />
            Posts
          </button>
          <button
            onClick={() => setTab('about')}
            className={`pb-4 font-semibold flex items-center gap-2 transition-colors ${
              tab === 'about'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <MessageSquare className="h-5 w-5" />
            About
          </button>
        </div>

        {tab === 'posts' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <p className="text-muted-foreground">No posts yet</p>
              </div>
            ) : (
              posts.map((post) => (
                <Link key={post.id} href={`/social?post=${post.id}`}>
                  <div className="group glass rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer">
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      <img
                        src={post.imageUrl}
                        alt={post.caption}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      {post.isAIGenerated && (
                        <div className="absolute top-2 left-2 px-2 py-1 bg-primary text-white rounded text-xs font-bold">
                          AI
                        </div>
                      )}

                      {/* Overlay Stats */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <div className="flex gap-6 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex flex-col items-center">
                            <p className="text-2xl font-bold">{post.likes}</p>
                            <p className="text-sm">Likes</p>
                          </div>
                          <div className="flex flex-col items-center">
                            <p className="text-2xl font-bold">{post.comments.length}</p>
                            <p className="text-sm">Comments</p>
                          </div>
                          <div className="flex flex-col items-center">
                            <p className="text-2xl font-bold">{post.shares}</p>
                            <p className="text-sm">Shares</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}

        {tab === 'about' && (
          <div className="max-w-2xl">
            <div className="glass rounded-xl p-8">
              <h3 className="text-lg font-bold mb-4">About</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {user.bio || 'No bio provided'}
              </p>

              <div className="space-y-4 pt-6 border-t border-border">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">Member Since</p>
                  <p className="text-lg">2024</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">Specialties</p>
                  <p className="text-lg">Interior Design, Architecture, Aesthetics</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">Location</p>
                  <p className="text-lg">Global</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
