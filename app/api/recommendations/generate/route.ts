import { getCurrentUser } from "@/lib/mock-data"
import { generateText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await req.formData()
    const image = formData.get("image") as File
    const style = formData.get("style") as string

    if (!image || !style) {
      return Response.json({ error: "Image and style are required" }, { status: 400 })
    }

    // Convert image to base64
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Image = buffer.toString("base64")
    const imageUrl = `data:${image.type};base64,${base64Image}`

    console.log("[v0] Generating AI recommendations for style:", style)

    // Generate AI recommendations using the AI SDK
    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze this interior room image and provide 3 detailed ${style} style design recommendations. For each recommendation, describe:
1. Color palette changes
2. Furniture suggestions
3. Lighting improvements
4. Decor elements
5. Overall aesthetic transformation

Format the response as JSON with this structure:
{
  "recommendations": [
    {
      "title": "Recommendation title",
      "description": "Detailed description",
      "confidence": 0.95
    }
  ]
}`,
            },
            {
              type: "image",
              image: imageUrl,
            },
          ],
        },
      ],
    })

    console.log("[v0] AI response received, parsing recommendations")

    // Parse AI response
    let recommendations
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        recommendations = parsed.recommendations || []
      } else {
        // Fallback: create recommendations from text
        recommendations = [
          {
            title: `${style.charAt(0).toUpperCase() + style.slice(1)} Design Recommendation`,
            description: text,
            confidence: 0.85,
          },
        ]
      }
    } catch (e) {
      console.error("[v0] Failed to parse AI response:", e)
      recommendations = [
        {
          title: `${style.charAt(0).toUpperCase() + style.slice(1)} Design Recommendation`,
          description: text,
          confidence: 0.85,
        },
      ]
    }

    const formattedRecommendations = recommendations.map((rec: any) => ({
      imageUrl: `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(rec.title + " " + style + " interior design")}`,
      description: rec.description,
      confidence: rec.confidence || 0.8,
    }))

    console.log("[v0] Recommendations generated successfully")

    return Response.json({
      success: true,
      recommendations: formattedRecommendations,
    })
  } catch (error) {
    console.error("[v0] Error generating recommendations:", error)
    return Response.json({ error: "Failed to generate recommendations" }, { status: 500 })
  }
}
