import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()

    if (
      username !== process.env.ADMIN_USERNAME ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return NextResponse.json({ error: '아이디 또는 비밀번호가 올바르지 않습니다.' }, { status: 401 })
    }

    const exp = (Date.now() + 86400000).toString()
    const secret = process.env.ADMIN_SECRET ?? 'change-me'
    const sig = crypto.createHmac('sha256', secret).update(exp).digest('hex')
    const token = `${exp}:${sig}`

    const res = NextResponse.json({ success: true })
    res.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400,
      path: '/',
    })
    return res
  } catch {
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}
