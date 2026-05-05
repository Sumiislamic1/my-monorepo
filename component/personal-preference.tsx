"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Sparkles, Plus } from "lucide-react"

interface Design {
  id: string
  title: string
  description?: string
  imageUrl: string
  style: string
  roomType?: string
  likes: number
  likedBy: string[]
  savedBy: string[]
}

export default function PortfolioManagementClient() {
  const [designs, setDesigns] = useState<Design[]>([])
  const [loading, setLoading] = useState(true)
  const [uploadOpen, setUploadOpen] = useState(false)

  const userId = "2" // Mock designer user

  useEffect(() => {
    fetchDesigns()
  }, [])

  async function fetchDesigns() {
    try {
      setLoading(true)
      const response = await fetch("/api/designs")
      const data = await response.json()
      const myDesigns = data.designs.filter((d: Design) => d.userId === userId)
      setDesigns(myDesigns)
    } catch (error) {
      console.error("[v0] Error fetching designs:", error)
    } finally {
      setLoading(false)
    }
  }

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
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-foreground">Designer Portfolio</h1>
            <p className="text-muted-foreground">Browse professional design portfolios</p>
          </div>
          <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Upload Design
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Upload Design</DialogTitle>
                <DialogDescription>This is a demo - uploads are not saved</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <p className="text-sm text-muted-foreground">
                  In the full version, designers can upload their designs here.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Portfolio Grid */}
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="border-border animate-pulse">
                <div className="h-64 bg-muted"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : designs.length === 0 ? (
          <Card className="border-border">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Sparkles className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">No designs in this portfolio yet</p>
              <Link href="/designers">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Browse Designers</Button>
              </Link>
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
                  </div>
                  <div className="mt-3 pt-3 border-t border-border flex gap-4 text-sm text-muted-foreground">
                    <span>{design.likes || 0} likes</span>
                    <span>{design.savedBy?.length || 0} saves</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
