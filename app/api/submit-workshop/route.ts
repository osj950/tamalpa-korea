import { NextRequest, NextResponse } from 'next/server'
import { appendRow } from '@/lib/google-sheets'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { workshopTitle, workshopDate, name, email, phone, participants, message } = body

    if (!name || !email || !workshopTitle) {
      return NextResponse.json({ error: '필수 항목을 입력해주세요.' }, { status: 400 })
    }

    const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })

    await appendRow('워크숍신청', [
      timestamp,
      workshopTitle,
      workshopDate ?? '',
      name,
      email,
      phone ?? '',
      participants ?? '1',
      message ?? '',
    ])

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[submit-workshop]', err)
    return NextResponse.json({ error: '제출 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
