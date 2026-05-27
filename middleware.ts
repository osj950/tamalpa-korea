import { NextRequest, NextResponse } from 'next/server'

const COOKIE = 'admin_token'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (!pathname.startsWith('/admin')) return NextResponse.next()
  if (pathname === '/admin/login') return NextResponse.next()

  const token = req.cookies.get(COOKIE)?.value
  if (!token || !(await verifyToken(token))) {
    const url = new URL('/admin/login', req.url)
    const res = NextResponse.redirect(url)
    res.cookies.delete(COOKIE)
    return res
  }

  return NextResponse.next()
}

async function verifyToken(token: string): Promise<boolean> {
  try {
    const [expStr, sigHex] = token.split(':')
    if (!expStr || !sigHex) return false
    if (Date.now() > parseInt(expStr)) return false

    const secret = process.env.ADMIN_SECRET ?? 'change-me'
    const enc = new TextEncoder()
    const key = await crypto.subtle.importKey(
      'raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
    )
    const sig = await crypto.subtle.sign('HMAC', key, enc.encode(expStr))
    const expected = [...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, '0')).join('')
    return sigHex === expected
  } catch {
    return false
  }
}

export const config = { matcher: ['/admin/:path*'] }
