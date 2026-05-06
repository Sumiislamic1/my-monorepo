import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Cpu, Users, Shield } from "lucide-react"

export default function AboutPage() {
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
            <Link href="/login">
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-4xl font-bold text-foreground text-balance">About Our Platform</h1>
          <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
            AI Interior Style Recommender is a cutting-edge platform that combines artificial intelligence with
            professional interior design expertise to help you transform your living spaces.
          </p>

          <div className="grid gap-8 md:grid-cols-3 mb-12">
            <Card className="border-border">
              <CardContent className="pt-6 text-center">
                <Cpu className="mx-auto h-12 w-12 text-primary mb-4" />
                <h3 className="mb-2 text-xl font-semibold text-foreground">AI-Powered</h3>
                <p className="text-muted-foreground">
                  Advanced AI analyzes your room photos and generates personalized design recommendations in seconds
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6 text-center">
                <Users className="mx-auto h-12 w-12 text-accent mb-4" />
                <h3 className="mb-2 text-xl font-semibold text-foreground">Designer Network</h3>
                <p className="text-muted-foreground">
                  Connect with professional designers who can bring your vision to life with custom projects
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6 text-center">
                <Shield className="mx-auto h-12 w-12 text-primary mb-4" />
                <h3 className="mb-2 text-xl font-semibold text-foreground">Secure Platform</h3>
                <p className="text-muted-foreground">
                  Your data is protected with industry-standard security and encrypted payment processing
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-foreground">How It Works</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Upload Your Room</h3>
                  <p className="text-muted-foreground">Take a photo of your space and upload it to the platform</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Choose Your Style</h3>
                  <p className="text-muted-foreground">
                    Select from minimalist, industrial, scandinavian, and more design styles
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Get AI Recommendations</h3>
                  <p className="text-muted-foreground">
                    Receive multiple design recommendations with detailed suggestions in under 5 seconds
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Connect with Designers</h3>
                  <p className="text-muted-foreground">
                    Browse designer portfolios and hire professionals for custom implementation
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/register">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
