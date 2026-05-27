import { notFound } from 'next/navigation'
import { getWorkshopById } from '@/lib/admin-sheets'
import WorkshopForm from '../WorkshopForm'

export default async function EditWorkshopPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const ws = await getWorkshopById(id)
  if (!ws) notFound()
  return <WorkshopForm mode="edit" initial={ws} />
}
