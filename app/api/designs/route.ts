import { getDesigns } from "@/lib/mock-data"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const style = searchParams.get("style")
    const search = searchParams.get("search")

    const designs = getDesigns({
      style: style || undefined,
      search: search || undefined,
    })

    return Response.json({ designs })
  } catch (error) {
    console.error("[v0] Error fetching designs:", error)
    return Response.json({ error: "Failed to fetch designs" }, { status: 500 })
  }
}
