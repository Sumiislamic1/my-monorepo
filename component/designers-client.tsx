"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sparkles, Search, Users, UserPlus, UserCheck } from "lucide-react"

interface Designer {
  id: string
  name: string
  email: string
  bio?: string
  avatar?: string
  followers: string[]
  following: string[]
}

export default function DesignersClient() {
  const [designers, setDesigners] = useState<Designer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchDesigners()
  }, [])

  async function fetchDesigners() {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (searchQuery) {
        params.append("search", searchQuery)
      }
      const response = await fetch(`/api/designers?${params}`)
      const data = await response.json()
      setDesigners(data.designers || [])
    } catch (error) {
      console.error("[v0] Error fetching designers:", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleFollow(designerId: string) {
    try {
      const response = await fetch(`/api/users/${designerId}/follow`, {
        method: "POST",
      })
      const data = await response.json()
      if (data.success) {
        fetchDesigners()
      }
    } catch (error) {
      console.error("[v0] Error following designer:", error)
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    fetchDesigners()
  }

  const currentUserId = "1"

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">AI Interior Recommender</span>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost">Dashboard</Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Find Designers</h1>
          <p className="text-muted-foreground">Connect with talented interior designers</p>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search designers by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </form>

        {/* Designers Grid */}
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="border-border animate-pulse">
                <CardContent className="p-6">
                  <div className="h-16 w-16 bg-muted rounded-full mb-4"></div>
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : designers.length === 0 ? (
          <Card className="border-border">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No designers found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {designers.map((designer) => {
              const isFollowing = designer.followers?.includes(currentUserId)
              const nameParts = designer.name.split(" ")
              const initials = nameParts.length >= 2 ? `${nameParts[0][0]}${nameParts[1][0]}` : nameParts[0][0]

              return (
                <Card key={designer.id} className="border-border hover:border-primary transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <Link href={`/designers/${designer.id}`}>
                        <Avatar className="h-16 w-16 cursor-pointer">
                          {designer.avatar ? (
                            <img src={designer.avatar || "/placeholder.svg"} alt={designer.name} />
                          ) : (
                            <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                              {initials}
                            </AvatarFallback>
                          )}
                        </Avatar>
                      </Link>
                      <Button
                        size="sm"
                        variant={isFollowing ? "outline" : "default"}
                        className={
                          isFollowing
                            ? "border-primary text-primary"
                            : "bg-primary text-primary-foreground hover:bg-primary/90"
                        }
                        onClick={() => handleFollow(designer.id)}
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
                    <Link href={`/designers/${designer.id}`}>
                      <h3 className="mb-1 font-semibold text-foreground hover:text-primary transition-colors cursor-pointer">
                        {designer.name}
                      </h3>
                    </Link>
                    <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                      {designer.bio || "Professional interior designer"}
                    </p>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {designer.followers?.length || 0} followers
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
