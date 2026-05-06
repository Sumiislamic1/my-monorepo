"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, User, Heart, Eye, CreditCard } from "lucide-react"
import { getUserProfile, updateUserProfile, getDesigns, getCurrentUser } from "@/lib/mock-data"

export default function ProfilePage() {
  const currentUser = getCurrentUser()
  const profile = currentUser ? getUserProfile(currentUser.id) : null
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    bio: currentUser?.bio || "",
  })

  if (!currentUser || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Please log in to view your profile</p>
      </div>
    )
  }

  const handleSave = () => {
    updateUserProfile(currentUser.id, formData)
    setIsEditing(false)
  }

  const likedDesigns = getDesigns().filter((d) => profile.interactionHistory.likedDesigns.includes(d.id))
  const savedDesigns = getDesigns().filter((d) => profile.interactionHistory.savedDesigns.includes(d.id))
  const viewedDesigns = getDesigns().filter((d) => profile.interactionHistory.viewedDesigns.includes(d.id))

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
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-3xl font-bold text-foreground">Profile Management</h1>

          <Tabs defaultValue="details" className="space-y-6">
            <TabsList className="bg-muted">
              <TabsTrigger value="details">
                <User className="mr-2 h-4 w-4" />
                Details
              </TabsTrigger>
              <TabsTrigger value="activity">
                <Heart className="mr-2 h-4 w-4" />
                Activity
              </TabsTrigger>
              <TabsTrigger value="payments">
                <CreditCard className="mr-2 h-4 w-4" />
                Payments
              </TabsTrigger>
            </TabsList>

            {/* Personal Details */}
            <TabsContent value="details">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Personal Information</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Update your profile details and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-foreground">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={!isEditing}
                      className="border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-foreground">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={!isEditing}
                      className="border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bio" className="text-foreground">
                      Bio
                    </Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      disabled={!isEditing}
                      rows={4}
                      className="border-border resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                  <div className="flex gap-3">
                    {!isEditing ? (
                      <Button onClick={() => setIsEditing(true)} className="bg-primary hover:bg-primary/90">
                        Edit Profile
                      </Button>
                    ) : (
                      <>
                        <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                          Save Changes
                        </Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)} className="border-border">
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity History */}
            <TabsContent value="activity">
              <div className="space-y-6">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Heart className="h-5 w-5 text-primary" />
                      Liked Designs ({likedDesigns.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {likedDesigns.length > 0 ? (
                      <div className="grid gap-4 md:grid-cols-2">
                        {likedDesigns.map((design) => (
                          <Card key={design.id} className="border-border">
                            <img
                              src={design.imageUrl || "/placeholder.svg"}
                              alt={design.title}
                              className="h-32 w-full object-cover"
                            />
                            <CardContent className="p-4">
                              <h3 className="font-semibold text-foreground">{design.title}</h3>
                              <p className="text-sm text-muted-foreground">{design.userName}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No liked designs yet</p>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Eye className="h-5 w-5 text-accent" />
                      Recently Viewed ({viewedDesigns.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {viewedDesigns.length > 0 ? (
                      <div className="grid gap-4 md:grid-cols-2">
                        {viewedDesigns.slice(0, 4).map((design) => (
                          <Card key={design.id} className="border-border">
                            <img
                              src={design.imageUrl || "/placeholder.svg"}
                              alt={design.title}
                              className="h-32 w-full object-cover"
                            />
                            <CardContent className="p-4">
                              <h3 className="font-semibold text-foreground">{design.title}</h3>
                              <p className="text-sm text-muted-foreground">{design.userName}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No viewed designs yet</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Payment History */}
            <TabsContent value="payments">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Transaction History</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    View your past purchases and payments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {profile.paymentHistory.length > 0 ? (
                    <div className="space-y-4">
                      {profile.paymentHistory.map((payment) => (
                        <div key={payment.id} className="flex items-center justify-between border-b border-border pb-4">
                          <div>
                            <p className="font-semibold text-foreground">{payment.description}</p>
                            <p className="text-sm text-muted-foreground">{payment.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-foreground">${payment.amount.toFixed(2)}</p>
                            <p className="text-sm capitalize text-primary">{payment.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No payment history yet</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
