import { notFound } from 'next/navigation'
import { getArticleById } from '@/lib/admin-sheets'
import ArticleForm from '../ArticleForm'

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const article = await getArticleById(id)
  if (!article) notFound()

  return <ArticleForm mode="edit" initial={article} />
}
