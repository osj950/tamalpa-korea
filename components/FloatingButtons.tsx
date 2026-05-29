'use client'

import { usePathname } from 'next/navigation'

export default function FloatingButtons() {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')
  if (isAdmin) return null

  const contactHref = pathname === '/' ? '#contact' : '/#contact'

  return (
    <div className="floating-btns">
      <a
        href="https://tamalpa.org"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn floating-btn--hq"
      >
        <span className="floating-btn-icon">🌐</span>
        <span className="floating-btn-label">미국 본사</span>
      </a>
      <a href={contactHref} className="floating-btn floating-btn--contact">
        <span className="floating-btn-icon">✉</span>
        <span className="floating-btn-label">문의하기</span>
      </a>
    </div>
  )
}
