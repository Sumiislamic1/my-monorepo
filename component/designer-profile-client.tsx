"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sparkles, Users, UserPlus, UserCheck } from "lucide-react"

interface Designer {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
  bio?: string
  followers: string[]
  following: string[]
  followerCount: number
}

interface Design {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  title: string
  description: string
  imageUrl: string
  style: string
  likes: number
  likedBy: string[]
  savedBy: string[]
}

export default function DesignerProfileClient({ designerId }: { designerId: string }) {
  const [designer, setDesigner] = useState<Designer | null>(null)
  const [designs, setDesigns] = useState<Design[]>([])
  const [loading, setLoading] = useState(true)

  const currentUserId = "1"

  useEffect(() => {
    fetchDesignerProfile()
  }, [designerId])

  async function fetchDesignerProfile() {
    try {
      setLoading(true)
      const response = await fetch(`/api/designers/${designerId}`)
      const data = await response.json()

      if (data.designer) {
        setDesigner(data.designer)
        setDesigns(data.designs || [])
      }
    } catch (error) {
      console.error("[v0] Error fetching designer profile:", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleFollow() {
    try {
      const response = await fetch(`/api/users/${designerId}/follow`, {
        method: "POST",
      })
      const data = await response.json()
      if (data.success) {
        fetchDesignerProfile()
      }
    } catch (error) {
      console.error("[v0] Error following designer:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="container mx-auto flex items-center justify-between px-4 py-4">
            <Link href="/designers" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground">AI Interior Recommender</span>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
          </div>
        </header>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-32 w-32 bg-muted rounded-full mb-4"></div>
            <div className="h-8 bg-muted rounded w-48 mb-2"></div>
            <div className="h-4 bg-muted rounded w-64"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!designer) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="container mx-auto flex items-center justify-between px-4 py-4">
            <Link href="/designers" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground">AI Interior Recommender</span>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
          </div>
        </header>
        <div className="container mx-auto px-4 py-8">
          <Card className="border-border">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">Designer not found</p>
              <Link href="/designers">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Browse Designers</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const isFollowing = designer.followers?.includes(currentUserId)
  const nameParts = designer.name.split(" ")
  const initials = nameParts.length >= 2 ? `${nameParts[0][0]}${nameParts[1][0]}` : nameParts[0][0]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/designers" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">AI Interior Recommender</span>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost">Dashboard</Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Designer Header */}
        <div className="mb-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <Avatar className="h-32 w-32">
            {designer.avatar ? (
              <img src={designer.avatar || "/placeholder.svg"} alt={designer.name} />
            ) : (
              <AvatarFallback className="bg-primary text-primary-foreground text-4xl">{initials}</AvatarFallback>
            )}
          </Avatar>
          <div className="flex-1">
            <h1 className="mb-2 text-3xl font-bold text-foreground">{designer.name}</h1>
            <p className="mb-4 text-muted-foreground">{designer.bio || "Professional interior designer"}</p>
            <div className="mb-4 flex gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {designer.followerCount || 0} followers
              </span>
            </div>
            <Button
              variant={isFollowing ? "outline" : "default"}
              className={
                isFollowing ? "border-primary text-primary" : "bg-primary text-primary-foreground hover:bg-primary/90"
              }
              onClick={handleFollow}
            >
              {isFollowing ? (
                <>
                  <UserCheck className="mr-2 h-4 w-4" />
                  Following
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Follow
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Portfolio */}
        <div>
          <h2 className="mb-6 text-2xl font-bold text-foreground">Portfolio</h2>
          {designs.length === 0 ? (
            <Card className="border-border">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Sparkles className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No designs in portfolio yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {designs.map((design) => (
                <Card key={design.id} className="border-border overflow-hidden">
                  <img
                    src={design.imageUrl || "/placeholder.svg"}
                    alt={design.title}
                    className="h-64 w-full object-cover"
                  />
                  <CardContent className="p-4">
                    <h3 className="mb-1 font-semibold text-foreground">{design.title}</h3>
                    <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{design.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                        {design.style}
                      </span>
                      <div className="flex gap-3 text-sm text-muted-foreground">
                        <span>{design.likes} likes</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
