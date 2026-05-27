import { notFound } from 'next/navigation'
import { getLibraryItemById } from '@/lib/admin-sheets'
import LibraryForm from '../LibraryForm'

export default async function EditLibraryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const item = await getLibraryItemById(id)
  if (!item) notFound()
  return <LibraryForm mode="edit" initial={item} />
}
