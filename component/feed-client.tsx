"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Sparkles, Search, Heart, Bookmark, TrendingUp, Users, Share2, Copy, Check } from "lucide-react"

interface Design {
  id: string
  title: string
  description?: string
  imageUrl: string
  style: string
  likes: number
  likedBy: string[]
  savedBy: string[]
  userId: string
}

export default function FeedClient() {
  const [designs, setDesigns] = useState<Design[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [styleFilter, setStyleFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("trending")
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const currentUserId = "1"

  useEffect(() => {
    fetchDesigns()
  }, [styleFilter])

  async function fetchDesigns() {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (styleFilter !== "all") {
        params.append("style", styleFilter)
      }
      const response = await fetch(`/api/designs?${params}`)
      const data = await response.json()
      setDesigns(data.designs || [])
    } catch (error) {
      console.error("[v0] Error fetching designs:", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleLike(designId: string) {
    try {
      const response = await fetch(`/api/designs/${designId}/like`, {
        method: "POST",
      })
      const data = await response.json()
      if (data.success) {
        fetchDesigns()
      }
    } catch (error) {
      console.error("[v0] Error liking design:", error)
    }
  }

  async function handleSave(designId: string) {
    try {
      const response = await fetch(`/api/designs/${designId}/save`, {
        method: "POST",
      })
      const data = await response.json()
      if (data.success) {
        fetchDesigns()
      }
    } catch (error) {
      console.error("[v0] Error saving design:", error)
    }
  }

  async function handleShare(designId: string, designTitle: string) {
    const shareUrl = `${window.location.origin}/designs/${designId}`

    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopiedId(designId)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (error) {
      console.error("[v0] Error copying to clipboard:", error)
    }
  }

  const filteredDesigns = designs.filter(
    (design) =>
      design.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      design.description?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
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
          <h1 className="mb-2 text-3xl font-bold text-foreground">Explore Designs</h1>
          <p className="text-muted-foreground">Discover trending interior designs and follow talented designers</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search designs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-border"
            />
          </div>
          <Select value={styleFilter} onValueChange={setStyleFilter}>
            <SelectTrigger className="w-full sm:w-[200px] border-border">
              <SelectValue placeholder="Filter by style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Styles</SelectItem>
              <SelectItem value="minimalist">Minimalist</SelectItem>
              <SelectItem value="industrial">Industrial</SelectItem>
              <SelectItem value="scandinavian">Scandinavian</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full max-w-md grid-cols-3 bg-muted">
            <TabsTrigger value="trending">
              <TrendingUp className="mr-2 h-4 w-4" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="following">
              <Users className="mr-2 h-4 w-4" />
              Following
            </TabsTrigger>
            <TabsTrigger value="ai">
              <Sparkles className="mr-2 h-4 w-4" />
              AI Generated
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="mt-6">
            {loading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="border-border animate-pulse">
                    <div className="h-64 bg-muted"></div>
                    <CardContent className="p-4">
                      <div className="h-4 bg-muted rounded mb-2"></div>
                      <div className="h-3 bg-muted rounded w-2/3"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredDesigns.length === 0 ? (
              <Card className="border-border">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <TrendingUp className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">No designs found</p>
                  <Link href="/recommend">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Create Your First Design
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredDesigns.map((design) => (
                  <Card key={design.id} className="border-border overflow-hidden group">
                    <div className="relative">
                      <img
                        src={design.imageUrl || "/placeholder.svg"}
                        alt={design.title}
                        className="h-64 w-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute top-2 right-2 flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                          onClick={() => handleLike(design.id)}
                        >
                          <Heart
                            className={`h-4 w-4 ${design.likedBy?.includes(currentUserId) ? "fill-red-500 text-red-500" : ""}`}
                          />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                          onClick={() => handleSave(design.id)}
                        >
                          <Bookmark
                            className={`h-4 w-4 ${design.savedBy?.includes(currentUserId) ? "fill-primary text-primary" : ""}`}
                          />
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/90 hover:bg-white">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-card border-border">
                            <DialogHeader>
                              <DialogTitle className="text-foreground">Share Design</DialogTitle>
                              <DialogDescription className="text-muted-foreground">
                                Share this design with others
                              </DialogDescription>
                            </DialogHeader>
                            <div className="flex items-center gap-2">
                              <Input
                                readOnly
                                value={`${window.location.origin}/designs/${design.id}`}
                                className="border-border"
                              />
                              <Button
                                size="sm"
                                onClick={() => handleShare(design.id, design.title)}
                                className="bg-primary hover:bg-primary/90"
                              >
                                {copiedId === design.id ? (
                                  <>
                                    <Check className="mr-1 h-4 w-4" />
                                    Copied
                                  </>
                                ) : (
                                  <>
                                    <Copy className="mr-1 h-4 w-4" />
                                    Copy
                                  </>
                                )}
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="mb-1 font-semibold text-foreground">{design.title}</h3>
                      <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                        {design.description || "Beautiful interior design"}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                          {design.style}
                        </span>
                        <div className="flex gap-3 text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {design.likes || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <Bookmark className="h-3 w-3" />
                            {design.savedBy?.length || 0}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="following" className="mt-6">
            <Card className="border-border">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">Follow designers to see their latest work</p>
                <Link href="/designers">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Browse Designers</Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai" className="mt-6">
            <Card className="border-border">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Sparkles className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">AI-generated designs will appear here</p>
                <Link href="/recommend">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Generate AI Designs
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
