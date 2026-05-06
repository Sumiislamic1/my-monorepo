import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Sparkles, BookOpen, HelpCircle, Mail } from "lucide-react"

export default function HelpPage() {
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

      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-4xl font-bold text-foreground">Help & Documentation</h1>
          <p className="mb-12 text-lg text-muted-foreground">
            Everything you need to know about using the AI Interior Recommender platform
          </p>

          {/* User Guide */}
          <section className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">User Guide</h2>
            </div>

            <div className="space-y-4">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Getting Started</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Learn how to create your account and start using the platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-muted-foreground">
                  <p>1. Create an account by clicking "Sign Up" and choosing your role (Client or Designer)</p>
                  <p>2. Complete your profile with your name and preferences</p>
                  <p>3. Navigate to the Dashboard to access all features</p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Using AI Recommendations</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    How to get personalized design suggestions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-muted-foreground">
                  <p>1. Click "Get Recommendations" from your dashboard</p>
                  <p>2. Upload a clear photo of your room (JPEG or PNG format)</p>
                  <p>3. Select your preferred design style (Minimalist, Industrial, or Scandinavian)</p>
                  <p>4. Click "Generate Recommendations" and wait 3-5 seconds</p>
                  <p>5. Review the AI-generated suggestions and save your favorites</p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Social Features</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Interact with designs and designers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-muted-foreground">
                  <p>• Like designs by clicking the heart icon</p>
                  <p>• Save designs to your favorites by clicking the bookmark icon</p>
                  <p>• Share designs using the share button</p>
                  <p>• Follow designers to see their latest work in your feed</p>
                  <p>• Create custom collections to organize your saved designs</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Designer Guide */}
          <section className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-accent" />
              <h2 className="text-3xl font-bold text-foreground">Designer Guide</h2>
            </div>

            <div className="space-y-4">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Setting Up Your Portfolio</CardTitle>
                  <CardDescription className="text-muted-foreground">Create a professional presence</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-muted-foreground">
                  <p>1. Navigate to "Designer Portfolio" from your dashboard</p>
                  <p>2. Upload your best work with high-quality images</p>
                  <p>3. Add detailed descriptions and categorize by style and room type</p>
                  <p>4. Set premium pricing for exclusive designs</p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Growing Your Audience</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Increase visibility and engagement
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-muted-foreground">
                  <p>• Post regularly to stay visible in the feed</p>
                  <p>• Engage with other designers and clients</p>
                  <p>• Use descriptive titles and tags for better searchability</p>
                  <p>• Respond to comments and inquiries promptly</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <HelpCircle className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-foreground">How does the AI recommendation work?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Our AI analyzes your uploaded room image using advanced computer vision and machine learning
                  algorithms. It identifies key features like layout, lighting, and existing elements, then generates
                  design recommendations based on your selected style preference. The entire process takes under 5
                  seconds.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-foreground">What image formats are supported?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We support JPEG and PNG image formats. For best results, upload clear, well-lit photos taken from a
                  corner of the room to capture the full space.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-foreground">
                  How do I connect with a designer for a custom project?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Browse the Designers page to explore portfolios. When you find a designer you like, follow them to
                  stay updated on their work. You can view their contact information on their profile page to discuss
                  custom projects.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-foreground">What are premium designs?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Premium designs are exclusive, high-quality design concepts created by professional designers. They
                  include detailed specifications, material lists, and implementation guides. Access requires a one-time
                  payment, with designers earning 90% of the sale price.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-foreground">How do collections work?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Collections allow you to organize your saved designs into custom groups. Create collections for
                  different rooms, projects, or style themes. You can add or remove designs from collections at any time
                  from your Favorites page.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-foreground">Is my data secure?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes. We use industry-standard encryption for all data transmission and storage. Payment information is
                  processed through secure gateways and never stored on our servers. Your uploaded images are used only
                  for generating recommendations and are not shared without your permission.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          {/* Contact Form */}
          <section>
            <div className="mb-6 flex items-center gap-3">
              <Mail className="h-8 w-8 text-accent" />
              <h2 className="text-3xl font-bold text-foreground">Contact & Feedback</h2>
            </div>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Send Us a Message</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Have a question or feedback? We'd love to hear from you!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-foreground">
                      Name
                    </Label>
                    <Input id="name" placeholder="Your name" className="border-border" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-foreground">
                      Email
                    </Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" className="border-border" />
                  </div>
                  <div>
                    <Label htmlFor="subject" className="text-foreground">
                      Subject
                    </Label>
                    <Input id="subject" placeholder="What's this about?" className="border-border" />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-foreground">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more..."
                      rows={5}
                      className="border-border resize-none"
                    />
                  </div>
                  <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}
