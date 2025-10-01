import ComponentPageClient from "./page-client";

export default async function ComponentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ComponentPageClient id={id} />;
}
