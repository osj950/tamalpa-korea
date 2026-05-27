import { NextRequest, NextResponse } from 'next/server'
import { getArticleById, updateArticle, deleteArticle } from '@/lib/admin-sheets'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const article = await getArticleById(id)
  if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(article)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const body = await req.json()
    await updateArticle(id, body)
    return NextResponse.json({ success: true })
  } catch (e) {
    const msg = e instanceof Error ? e.message : '수정에 실패했습니다.'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    await deleteArticle(id)
    return NextResponse.json({ success: true })
  } catch (e) {
    const msg = e instanceof Error ? e.message : '삭제에 실패했습니다.'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
