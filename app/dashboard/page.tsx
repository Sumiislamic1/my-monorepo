import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, ImageIcon, Heart, Users, TrendingUp, Palette } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">AI Interior Recommender</span>
          </Link>
          <div className="flex gap-3">
            <Link href="/search">
              <Button variant="ghost">Search</Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost">Profile</Button>
            </Link>
            <Link href="/help">
              <Button variant="ghost">Help</Button>
            </Link>
            <Link href="/">
              <Button variant="ghost">Home</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Welcome Back!</h1>
          <p className="text-muted-foreground">Ready to transform your space with AI-powered design?</p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Link href="/recommend">
            <Card className="border-border cursor-pointer transition-all hover:border-primary hover:shadow-md">
              <CardHeader>
                <ImageIcon className="h-10 w-10 text-primary mb-2" />
                <CardTitle className="text-lg text-foreground">Get Recommendations</CardTitle>
                <CardDescription className="text-muted-foreground">Upload a room image for AI designs</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/favorites">
            <Card className="border-border cursor-pointer transition-all hover:border-primary hover:shadow-md">
              <CardHeader>
                <Heart className="h-10 w-10 text-accent mb-2" />
                <CardTitle className="text-lg text-foreground">My Favorites</CardTitle>
                <CardDescription className="text-muted-foreground">View saved designs and collections</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/feed">
            <Card className="border-border cursor-pointer transition-all hover:border-primary hover:shadow-md">
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-primary mb-2" />
                <CardTitle className="text-lg text-foreground">Explore Feed</CardTitle>
                <CardDescription className="text-muted-foreground">Discover trending designs</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/designers">
            <Card className="border-border cursor-pointer transition-all hover:border-primary hover:shadow-md">
              <CardHeader>
                <Users className="h-10 w-10 text-accent mb-2" />
                <CardTitle className="text-lg text-foreground">Find Designers</CardTitle>
                <CardDescription className="text-muted-foreground">Connect with professionals</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/search">
            <Card className="border-border cursor-pointer transition-all hover:border-primary hover:shadow-md">
              <CardHeader>
                <ImageIcon className="h-10 w-10 text-primary mb-2" />
                <CardTitle className="text-lg text-foreground">Search & Filter</CardTitle>
                <CardDescription className="text-muted-foreground">Find designs and designers</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* Designer section */}
        <div className="mb-8 grid gap-4 md:grid-cols-2">
          <Link href="/portfolio">
            <Card className="border-border cursor-pointer transition-all hover:border-primary hover:shadow-md">
              <CardHeader>
                <Palette className="h-10 w-10 text-primary mb-2" />
                <CardTitle className="text-lg text-foreground">Designer Portfolio</CardTitle>
                <CardDescription className="text-muted-foreground">View and manage design portfolios</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/designers">
            <Card className="border-border cursor-pointer transition-all hover:border-primary hover:shadow-md">
              <CardHeader>
                <Users className="h-10 w-10 text-accent mb-2" />
                <CardTitle className="text-lg text-foreground">Browse Designers</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Discover talented interior designers
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
