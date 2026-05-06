"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sparkles, Search, Filter, Heart, Bookmark, Share2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getDesigns, getDesigners } from "@/lib/mock-data"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [styleFilter, setStyleFilter] = useState("all")
  const [searchType, setSearchType] = useState<"designs" | "designers">("designs")

  const filteredDesigns = getDesigns({
    search: searchQuery,
    style: styleFilter,
  })

  const filteredDesigners = getDesigners().filter((designer) =>
    designer.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">AI Interior Recommender</span>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost">Dashboard</Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold text-foreground">Search & Filter</h1>

        {/* Search Controls */}
        <Card className="mb-8 border-border">
          <CardContent className="space-y-4 pt-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search designs or designers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-border pl-10"
                />
              </div>
              <Select value={searchType} onValueChange={(value: "designs" | "designers") => setSearchType(value)}>
                <SelectTrigger className="w-40 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="designs">Designs</SelectItem>
                  <SelectItem value="designers">Designers</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {searchType === "designs" && (
              <div className="flex items-center gap-4">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <Select value={styleFilter} onValueChange={setStyleFilter}>
                  <SelectTrigger className="w-48 border-border">
                    <SelectValue placeholder="All Styles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Styles</SelectItem>
                    <SelectItem value="minimalist">Minimalist</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                    <SelectItem value="scandinavian">Scandinavian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4 text-muted-foreground">
          {searchType === "designs"
            ? `${filteredDesigns.length} design(s) found`
            : `${filteredDesigners.length} designer(s) found`}
        </div>

        {searchType === "designs" ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredDesigns.map((design) => (
              <Card key={design.id} className="overflow-hidden border-border">
                <img
                  src={design.imageUrl || "/placeholder.svg"}
                  alt={design.title}
                  className="h-48 w-full object-cover"
                />
                <CardContent className="p-4">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{design.title}</h3>
                      <p className="text-sm text-muted-foreground">{design.userName}</p>
                    </div>
                    {design.isPremium && (
                      <span className="rounded-full bg-accent px-2 py-1 text-xs text-accent-foreground">Premium</span>
                    )}
                  </div>
                  <p className="mb-4 text-sm text-muted-foreground">{design.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                      <button className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary">
                        <Heart className="h-4 w-4" />
                        {design.likes}
                      </button>
                      <button className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-accent">
                        <Bookmark className="h-4 w-4" />
                      </button>
                      <button className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="rounded-full bg-muted px-3 py-1 text-xs capitalize text-foreground">
                      {design.style}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredDesigners.map((designer) => (
              <Link key={designer.id} href={`/designers/${designer.id}`}>
                <Card className="border-border cursor-pointer transition-all hover:border-primary hover:shadow-md">
                  <CardContent className="p-6 text-center">
                    <img
                      src={designer.avatar || "/placeholder.svg"}
                      alt={designer.name}
                      className="mx-auto mb-4 h-24 w-24 rounded-full object-cover"
                    />
                    <h3 className="mb-2 text-xl font-semibold text-foreground">{designer.name}</h3>
                    <p className="mb-4 text-sm text-muted-foreground">{designer.bio}</p>
                    <div className="flex justify-center gap-6 text-sm text-muted-foreground">
                      <div>
                        <p className="font-semibold text-foreground">{designer.followers.length}</p>
                        <p>Followers</p>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{getDesigns({ userId: designer.id }).length}</p>
                        <p>Designs</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {((searchType === "designs" && filteredDesigns.length === 0) ||
          (searchType === "designers" && filteredDesigners.length === 0)) && (
          <div className="py-16 text-center">
            <p className="text-lg text-muted-foreground">No results found. Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}
