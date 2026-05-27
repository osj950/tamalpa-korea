import { notFound } from 'next/navigation'
import { getInstructorById } from '@/lib/admin-sheets'
import InstructorForm from '../InstructorForm'

export default async function EditInstructorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const instructor = await getInstructorById(id)
  if (!instructor) notFound()
  return <InstructorForm mode="edit" initial={instructor} />
}
