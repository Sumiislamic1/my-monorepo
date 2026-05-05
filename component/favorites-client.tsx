"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, Bookmark, FolderOpen, Plus, Trash2, FolderPlus } from "lucide-react"
import {
  getUserCollections,
  addCollection,
  deleteCollection,
  updateCollection,
  getSavedDesigns,
  getCurrentUser,
  getDesigns,
} from "@/lib/mock-data"

interface Design {
  id: string
  title: string
  description?: string
  imageUrl: string
  style: string
  likes: number
  likedBy: string[]
  savedBy: string[]
}

interface Collection {
  id: string
  userId: string
  name: string
  description?: string
  designIds: string[]
  createdAt: string
}

export default function FavoritesClient() {
  const [savedDesigns, setSavedDesigns] = useState<Design[]>([])
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newCollectionName, setNewCollectionName] = useState("")
  const [newCollectionDescription, setNewCollectionDescription] = useState("")
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null)

  const currentUser = getCurrentUser()
  const userId = currentUser?.id || "1"

  useEffect(() => {
    fetchData()
  }, [])

  function fetchData() {
    setLoading(true)
    const saved = getSavedDesigns(userId)
    const userCollections = getUserCollections(userId)
    setSavedDesigns(saved)
    setCollections(userCollections)
    setLoading(false)
  }

  function handleCreateCollection() {
    if (!newCollectionName.trim()) return

    addCollection({
      userId,
      name: newCollectionName,
      description: newCollectionDescription,
      designIds: [],
    })

    setNewCollectionName("")
    setNewCollectionDescription("")
    setIsCreateDialogOpen(false)
    fetchData()
  }

  function handleDeleteCollection(collectionId: string) {
    deleteCollection(collectionId)
    fetchData()
  }

  function handleAddToCollection(collectionId: string, designId: string) {
    const collection = collections.find((c) => c.id === collectionId)
    if (!collection) return

    if (!collection.designIds.includes(designId)) {
      updateCollection(collectionId, {
        designIds: [...collection.designIds, designId],
      })
      fetchData()
    }
  }

  function handleRemoveFromCollection(collectionId: string, designId: string) {
    const collection = collections.find((c) => c.id === collectionId)
    if (!collection) return

    updateCollection(collectionId, {
      designIds: collection.designIds.filter((id) => id !== designId),
    })
    fetchData()
  }

  function getCollectionDesigns(collection: Collection): Design[] {
    return getDesigns().filter((d) => collection.designIds.includes(d.id))
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
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">My Favorites</h1>
          <p className="text-muted-foreground">Your saved designs and collections</p>
        </div>

        <Tabs defaultValue="saved" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-muted">
            <TabsTrigger value="saved">
              <Bookmark className="mr-2 h-4 w-4" />
              Saved Designs ({savedDesigns.length})
            </TabsTrigger>
            <TabsTrigger value="collections">
              <FolderOpen className="mr-2 h-4 w-4" />
              Collections ({collections.length})
            </TabsTrigger>
          </TabsList>

          {/* Saved Designs Tab */}
          <TabsContent value="saved" className="mt-6">
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
            ) : savedDesigns.length === 0 ? (
              <Card className="border-border">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Bookmark className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">No saved designs yet</p>
                  <Link href="/feed">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Explore Designs</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {savedDesigns.map((design) => (
                  <Card key={design.id} className="border-border overflow-hidden">
                    <img
                      src={design.imageUrl || "/placeholder.svg"}
                      alt={design.title}
                      className="h-64 w-full object-cover"
                    />
                    <CardContent className="p-4">
                      <h3 className="mb-1 font-semibold text-foreground">{design.title}</h3>
                      <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                        {design.description || "Beautiful interior design"}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                          {design.style}
                        </span>
                        {collections.length > 0 && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="ghost" className="h-7 text-xs">
                                <FolderPlus className="mr-1 h-3 w-3" />
                                Add to Collection
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-card border-border">
                              <DialogHeader>
                                <DialogTitle className="text-foreground">Add to Collection</DialogTitle>
                                <DialogDescription className="text-muted-foreground">
                                  Choose a collection for this design
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-2">
                                {collections.map((collection) => (
                                  <Button
                                    key={collection.id}
                                    variant="outline"
                                    className="w-full justify-start border-border bg-transparent"
                                    onClick={() => handleAddToCollection(collection.id, design.id)}
                                  >
                                    <FolderOpen className="mr-2 h-4 w-4" />
                                    {collection.name}
                                  </Button>
                                ))}
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Collections Tab */}
          <TabsContent value="collections" className="mt-6">
            <div className="mb-6">
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Collection
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-card border-border">
                  <DialogHeader>
                    <DialogTitle className="text-foreground">Create New Collection</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                      Organize your designs into custom collections
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-foreground">
                        Collection Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="e.g., Living Room Ideas"
                        value={newCollectionName}
                        onChange={(e) => setNewCollectionName(e.target.value)}
                        className="border-border"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description" className="text-foreground">
                        Description (Optional)
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Describe this collection..."
                        value={newCollectionDescription}
                        onChange={(e) => setNewCollectionDescription(e.target.value)}
                        rows={3}
                        className="border-border resize-none"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={handleCreateCollection}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Create
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {collections.length === 0 ? (
              <Card className="border-border">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">Create collections to organize your designs</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {collections.map((collection) => {
                  const collectionDesigns = getCollectionDesigns(collection)
                  return (
                    <Card key={collection.id} className="border-border">
                      <CardContent className="p-6">
                        <div className="mb-4 flex items-start justify-between">
                          <div>
                            <h3 className="mb-1 text-xl font-semibold text-foreground">{collection.name}</h3>
                            {collection.description && (
                              <p className="text-sm text-muted-foreground">{collection.description}</p>
                            )}
                            <p className="mt-2 text-sm text-muted-foreground">{collectionDesigns.length} design(s)</p>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteCollection(collection.id)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {collectionDesigns.length > 0 ? (
                          <div className="grid grid-cols-3 gap-2">
                            {collectionDesigns.slice(0, 3).map((design) => (
                              <div key={design.id} className="group relative">
                                <img
                                  src={design.imageUrl || "/placeholder.svg"}
                                  alt={design.title}
                                  className="aspect-square w-full rounded object-cover"
                                />
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="absolute top-1 right-1 h-6 w-6 p-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() => handleRemoveFromCollection(collection.id, design.id)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex items-center justify-center py-8 border-2 border-dashed border-border rounded">
                            <p className="text-sm text-muted-foreground">No designs yet</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
