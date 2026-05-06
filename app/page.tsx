import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, Users, Zap, ArrowRight, ChevronRight } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] selection:bg-primary/30">
      <header className="sticky top-0 z-50 glass border-b border-black/5">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
              <Sparkles className="h-6 w-6 text-primary animate-pulse" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">AI Interior</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/social" className="text-sm font-medium hover:text-primary transition-colors">
              Social Feed
            </Link>
            <Link href="/trending" className="text-sm font-medium hover:text-primary transition-colors">
              Trending
            </Link>
            <Link href="/designers" className="text-sm font-medium hover:text-primary transition-colors">
              Designers
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              Our Story
            </Link>
          </nav>
          <div className="flex gap-4 items-center">
            <Link href="/dashboard">
              <Button variant="ghost" className="hover:bg-primary/5">
                Dashboard
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button className="rounded-full px-6 bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden pt-24 pb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full" />
        </div>

        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4">
            <Sparkles className="h-4 w-4" />
            <span>AI-Driven Design Intelligence</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground mb-8 leading-[0.9] text-glow animate-in fade-in slide-in-from-bottom-8 duration-700">
            IMMER<span className="text-primary italic">SIVE</span>
            <br />
            SPACES.
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-muted-foreground mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000">
            A highly interactive creative platform that blurs the line between your reality and a designer's vision,
            built with advanced AI.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 animate-in fade-in slide-in-from-bottom-16 duration-1000">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="h-16 px-10 rounded-full text-lg font-bold bg-primary text-primary-foreground shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all group"
              >
                REIMAGINE YOUR SPACE <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="container mx-auto mt-24 px-6">
          <div className="relative aspect-[21/9] rounded-[2rem] overflow-hidden glass group shadow-3xl">
            <img
              src="/ultra-modern-living-room-rendering.jpg"
              alt="Hero Preview"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-12 left-12 right-12 flex items-end justify-between text-white">
              <div className="max-w-md">
                <span className="text-xs font-bold tracking-widest uppercase opacity-70 mb-4 block">
                  Current Concept
                </span>
                <h3 className="text-3xl font-bold mb-4">Biophilic Minimalism</h3>
                <p className="text-lg opacity-80 leading-relaxed">
                  Integrating natural elements with stark minimalist structures to create a serene sanctuary.
                </p>
              </div>
              <Link href="/feed">
                <Button className="rounded-full bg-white text-black hover:bg-white/90 px-8 h-12">
                  VIEW PROJECT <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Curated Aesthetics</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Our AI is trained on thousands of award-winning architectural styles to ensure your space isn't just
                designed, but curated.
              </p>
            </div>
            <Link href="/search">
              <Button variant="link" className="text-lg font-bold p-0 flex items-center group">
                EXPLORE ALL STYLES <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[800px]">
            <div className="md:col-span-8 group relative overflow-hidden rounded-[2rem] cursor-pointer">
              <img
                src="/minimalist-penthouse.jpg"
                alt="Minimalist"
                className="w-full h-full object-cover group-hover:scale-110 duration-700"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <div className="absolute bottom-10 left-10">
                <h3 className="text-4xl font-bold text-white mb-2">The Zen Attic</h3>
                <p className="text-white/70 text-lg">Pure, unadulterated focus on light and space.</p>
              </div>
            </div>
            <div className="md:col-span-4 flex flex-col gap-6">
              <div className="flex-1 group relative overflow-hidden rounded-[2rem] cursor-pointer">
                <img
                  src="/industrial-loft.jpg"
                  alt="Industrial"
                  className="w-full h-full object-cover group-hover:scale-110 duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-2xl font-bold text-white mb-1">Raw Industrial</h3>
                  <p className="text-white/70">Metals & Textures.</p>
                </div>
              </div>
              <div className="flex-1 group relative overflow-hidden rounded-[2rem] cursor-pointer">
                <img
                  src="/scandinavian-cabin.jpg"
                  alt="Scandinavian"
                  className="w-full h-full object-cover group-hover:scale-110 duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-2xl font-bold text-white mb-1">Hygge Living</h3>
                  <p className="text-white/70">Warmth & Wood.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#f8f9f8]">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 md:grid-cols-3">
            {[
              {
                icon: Sparkles,
                title: "Neural Rendering",
                description: "Our proprietary AI engine generates photorealistic renders of your room in seconds.",
                accent: "bg-primary",
              },
              {
                icon: Users,
                title: "Elite Network",
                description: "Direct access to the world's most innovative interior minds for bespoke consulting.",
                accent: "bg-accent",
              },
              {
                icon: Zap,
                title: "Instant Utility",
                description: "Not just images—get actual shoppable links for furniture and decor used in renders.",
                accent: "bg-foreground",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="group glass p-10 rounded-[2.5rem] hover:-translate-y-2 transition-all duration-500"
              >
                <div className={`w-16 h-16 ${f.accent} rounded-2xl flex items-center justify-center mb-8 shadow-xl`}>
                  <f.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-40 text-center container mx-auto px-6">
        <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tight">
          READY TO <span className="text-primary italic">GLOW</span>?
        </h2>
        <Link href="/dashboard">
          <Button
            size="lg"
            className="h-20 px-16 rounded-full text-xl font-bold bg-foreground text-background hover:bg-foreground/90 transition-all scale-100 hover:scale-105"
          >
            START YOUR TRANSFORMATION
          </Button>
        </Link>
      </section>

      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-bold">AI Interior</span>
          </div>
          <div className="flex gap-12 text-sm font-medium text-muted-foreground">
            <Link href="/about" className="hover:text-foreground">
              About
            </Link>
            <Link href="/help" className="hover:text-foreground">
              Help
            </Link>
            <Link href="/search" className="hover:text-foreground">
              Explore
            </Link>
            <Link href="/dashboard" className="hover:text-foreground">
              Get Started
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">&copy; 2025 AI Interior Style. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
