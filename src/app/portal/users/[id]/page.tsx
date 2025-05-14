export default async function PortalUserDetail({
  params,
}: {
  params: Promise<{
    id: string
  }>
}) {
  const { id } = await params
  return <div>{id}</div>
}
