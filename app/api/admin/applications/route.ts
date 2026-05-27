import { NextResponse } from 'next/server'
import { getApplications } from '@/lib/admin-sheets'

export async function GET() {
  try {
    const data = await getApplications()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: '데이터를 불러오지 못했습니다.' }, { status: 500 })
  }
}
