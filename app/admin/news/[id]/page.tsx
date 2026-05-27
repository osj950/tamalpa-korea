import { notFound } from 'next/navigation'
import { getNewsItemById } from '@/lib/admin-sheets'
import NewsForm from '../NewsForm'

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const item = await getNewsItemById(id)
  if (!item) notFound()
  return <NewsForm mode="edit" initial={item} />
}
