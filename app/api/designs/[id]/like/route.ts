import { getCurrentUser, toggleLike } from "@/lib/mock-data"

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const design = toggleLike(id, currentUser.id)

    if (!design) {
      return Response.json({ error: "Design not found" }, { status: 404 })
    }

    const liked = design.likedBy.includes(currentUser.id)
    return Response.json({ success: true, liked })
  } catch (error) {
    console.error("[v0] Error toggling like:", error)
    return Response.json({ error: "Failed to toggle like" }, { status: 500 })
  }
}
