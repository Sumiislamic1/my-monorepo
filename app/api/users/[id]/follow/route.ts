import { getCurrentUser, toggleFollow } from "@/lib/mock-data"

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const isFollowing = toggleFollow(id, currentUser.id)

    return Response.json({ success: true, following: isFollowing })
  } catch (error) {
    console.error("[v0] Error toggling follow:", error)
    return Response.json({ error: "Failed to toggle follow" }, { status: 500 })
  }
}
