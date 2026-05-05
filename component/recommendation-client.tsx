"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Sparkles, Upload, Loader2, Heart, Save } from "lucide-react"
import Link from "next/link"

interface Recommendation {
  imageUrl: string
  description: string
  confidence: number
}

export default function RecommendationClient() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [selectedStyle, setSelectedStyle] = useState("minimalist")
  const [loading, setLoading] = useState(false)
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [error, setError] = useState("")

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file (JPEG or PNG)")
        return
      }
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      setError("")
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedImage) {
      setError("Please select an image first")
      return
    }

    setLoading(true)
    setError("")

    try {
      const formData = new FormData()
      formData.append("image", selectedImage)
      formData.append("style", selectedStyle)

      const response = await fetch("/api/recommendations/generate", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate recommendations")
      }

      setRecommendations(data.recommendations)
    } catch (err: any) {
      setError(err.message || "Something went wrong")
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
            <Button variant="ghost">Back to Dashboard</Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-2 text-3xl font-bold text-foreground">AI Design Recommendations</h1>
          <p className="mb-8 text-muted-foreground">
            Upload a photo of your room and select your preferred style to get AI-powered design recommendations
          </p>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Upload Form */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Upload & Configure</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Select your room image and design preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Image Upload */}
                  <div className="space-y-2">
                    <Label>Room Image</Label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="image-upload"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer border-border bg-muted hover:bg-muted/80 transition-colors"
                      >
                        {imagePreview ? (
                          <img
                            src={imagePreview || "/placeholder.svg"}
                            alt="Preview"
                            className="h-full w-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground">PNG or JPG (MAX. 10MB)</p>
                          </div>
                        )}
                        <input
                          id="image-upload"
                          type="file"
                          className="hidden"
                          accept="image/jpeg,image/png"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Style Selection */}
                  <div className="space-y-2">
                    <Label>Interior Style</Label>
                    <RadioGroup value={selectedStyle} onValueChange={setSelectedStyle} className="grid gap-3">
                      {[
                        {
                          value: "minimalist",
                          label: "Minimalist",
                          description: "Clean, simple, and uncluttered",
                        },
                        {
                          value: "industrial",
                          label: "Industrial",
                          description: "Raw materials and exposed elements",
                        },
                        {
                          value: "scandinavian",
                          label: "Scandinavian",
                          description: "Cozy, functional, and light",
                        },
                      ].map((style) => (
                        <label
                          key={style.value}
                          className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${
                            selectedStyle === style.value
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <RadioGroupItem value={style.value} id={style.value} />
                          <div className="flex-1">
                            <div className="font-medium text-foreground">{style.label}</div>
                            <div className="text-sm text-muted-foreground">{style.description}</div>
                          </div>
                        </label>
                      ))}
                    </RadioGroup>
                  </div>

                  {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">{error}</div>}

                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={loading || !selectedImage}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating Recommendations...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Recommendations
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Recommendations Display */}
            <div className="space-y-4">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">AI Recommendations</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {recommendations.length > 0
                      ? `${recommendations.length} design recommendations generated`
                      : "Your recommendations will appear here"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading && (
                    <div className="flex flex-col items-center justify-center py-12">
                      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                      <p className="text-muted-foreground">Analyzing your room with AI...</p>
                    </div>
                  )}

                  {!loading && recommendations.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Sparkles className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Upload an image and select a style to get started</p>
                    </div>
                  )}

                  {!loading && recommendations.length > 0 && (
                    <div className="space-y-4">
                      {recommendations.map((rec, index) => (
                        <Card key={index} className="border-border overflow-hidden">
                          <img
                            src={rec.imageUrl || "/placeholder.svg"}
                            alt="Design recommendation"
                            className="w-full h-48 object-cover"
                          />
                          <CardContent className="p-4">
                            <div className="mb-2 flex items-center justify-between">
                              <span className="text-sm font-medium text-primary">
                                Confidence: {(rec.confidence * 100).toFixed(0)}%
                              </span>
                              <div className="flex gap-2">
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <Heart className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <Save className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">{rec.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
