import { NextRequest, NextResponse } from 'next/server'
import { appendRow } from '@/lib/google-sheets'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, level, background, motivation, experience } = body

    if (!name || !email || !level || !motivation) {
      return NextResponse.json({ error: '필수 항목을 입력해주세요.' }, { status: 400 })
    }

    const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })

    await appendRow('트레이닝신청', [
      timestamp,
      name,
      email,
      phone ?? '',
      level,
      background ?? '',
      motivation,
      experience ?? '',
    ])

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[submit-training]', err)
    return NextResponse.json({ error: '제출 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
