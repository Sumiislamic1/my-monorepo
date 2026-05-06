import { getDesigners } from "@/lib/mock-data"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get("search")

    let designers = getDesigners()

    // Filter by search query
    if (search) {
      const searchLower = search.toLowerCase()
      designers = designers.filter(
        (d) => d.name.toLowerCase().includes(searchLower) || d.bio?.toLowerCase().includes(searchLower),
      )
    }

    return Response.json({ designers })
  } catch (error) {
    console.error("[v0] Error fetching designers:", error)
    return Response.json({ error: "Failed to fetch designers" }, { status: 500 })
  }
}
