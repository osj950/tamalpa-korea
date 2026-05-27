import { NextRequest, NextResponse } from 'next/server'
import { getArticles, createArticle } from '@/lib/admin-sheets'

export async function GET() {
  try {
    const articles = await getArticles()
    return NextResponse.json(articles)
  } catch {
    return NextResponse.json({ error: '데이터를 불러오지 못했습니다.' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const article = await createArticle(body)
    return NextResponse.json(article)
  } catch (e) {
    const msg = e instanceof Error ? e.message : '저장에 실패했습니다.'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
