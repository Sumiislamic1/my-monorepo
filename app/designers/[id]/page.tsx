import DesignerProfileClient from "@/components/designer-profile-client"

export default async function DesignerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <DesignerProfileClient designerId={id} />
}
