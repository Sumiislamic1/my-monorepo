import { getUserById, getDesigns } from "@/lib/mock-data"

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const designer = getUserById(id)

    if (!designer || designer.role !== "designer") {
      return Response.json({ error: "Designer not found" }, { status: 404 })
    }

    const designs = getDesigns({ userId: id })

    return Response.json({
      designer: {
        ...designer,
        followerCount: designer.followers?.length || 0,
      },
      designs,
    })
  } catch (error) {
    console.error("[v0] Error fetching designer:", error)
    return Response.json({ error: "Failed to fetch designer" }, { status: 500 })
  }
}
