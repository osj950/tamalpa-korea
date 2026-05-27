import { NextRequest, NextResponse } from 'next/server'
import { getInstructors, createInstructor } from '@/lib/admin-sheets'

export async function GET() {
  try {
    return NextResponse.json(await getInstructors())
  } catch (e) {
    const msg = e instanceof Error ? e.message : '데이터를 불러오지 못했습니다.'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const ins = await createInstructor(await req.json())
    return NextResponse.json(ins)
  } catch (e) {
    const msg = e instanceof Error ? e.message : '저장에 실패했습니다.'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
