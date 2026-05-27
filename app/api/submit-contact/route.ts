import { NextRequest, NextResponse } from 'next/server'
import { appendRow } from '@/lib/google-sheets'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, type, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: '필수 항목을 입력해주세요.' }, { status: 400 })
    }

    const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })

    await appendRow('문의하기', [
      timestamp,
      name,
      email,
      type ?? '',
      message,
    ])

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[submit-contact]', err)
    return NextResponse.json({ error: '제출 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
