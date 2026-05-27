import { NextRequest, NextResponse } from 'next/server'
import { getWorkshops, createWorkshop } from '@/lib/admin-sheets'

export async function GET() {
  try {
    return NextResponse.json(await getWorkshops())
  } catch (e) {
    const msg = e instanceof Error ? e.message : '데이터를 불러오지 못했습니다.'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const ws = await createWorkshop(await req.json())
    return NextResponse.json(ws)
  } catch (e) {
    const msg = e instanceof Error ? e.message : '저장에 실패했습니다.'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
