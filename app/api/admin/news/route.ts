import { NextRequest, NextResponse } from 'next/server'
import { getNewsItems, createNewsItem } from '@/lib/admin-sheets'

export async function GET() {
  try {
    return NextResponse.json(await getNewsItems())
  } catch (e) {
    const msg = e instanceof Error ? e.message : '데이터를 불러오지 못했습니다.'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const item = await createNewsItem(await req.json())
    return NextResponse.json(item)
  } catch (e) {
    const msg = e instanceof Error ? e.message : '저장에 실패했습니다.'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
