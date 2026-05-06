import { getCurrentUser, toggleSave } from "@/lib/mock-data"

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const design = toggleSave(id, currentUser.id)

    if (!design) {
      return Response.json({ error: "Design not found" }, { status: 404 })
    }

    const saved = design.savedBy.includes(currentUser.id)
    return Response.json({ success: true, saved })
  } catch (error) {
    console.error("[v0] Error toggling save:", error)
    return Response.json({ error: "Failed to toggle save" }, { status: 500 })
  }
}
