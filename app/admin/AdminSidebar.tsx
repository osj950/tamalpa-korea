'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

const NAV = [
  { href: '/admin/articles', label: '아티클 관리' },
  { href: '/admin/library', label: '자료실 관리' },
  { href: '/admin/news', label: '소식 관리' },
  { href: '/admin/workshops', label: '워크숍 관리' },
  { href: '/admin/instructors', label: '강사 관리' },
  {
    href: '/admin/applications',
    label: '신청 목록',
    children: [
      { href: '/admin/applications?tab=training', tab: 'training', label: '트레이닝 신청' },
      { href: '/admin/applications?tab=workshops', tab: 'workshops', label: '워크숍 신청' },
      { href: '/admin/applications?tab=contact', tab: 'contact', label: '문의하기' },
    ],
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentTab = searchParams.get('tab')

  const handleLogout = useCallback(async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    window.location.href = '/admin/login'
  }, [])

  return (
    <aside style={{
      width: '230px',
      minWidth: '230px',
      background: 'var(--dark)',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      zIndex: 100,
      overflowY: 'auto',
    }}>
      {/* 로고 */}
      <div style={{
        padding: '28px 24px 20px',
        borderBottom: '1px solid rgba(158,138,107,0.15)',
        flexShrink: 0,
      }}>
        <a href="/admin" style={{ textDecoration: 'none' }}>
          <div style={{
            fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
            fontSize: '11px',
            color: 'var(--gold)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '6px',
          }}>
            Admin Panel
          </div>
          <div style={{
            fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
            fontSize: '15px',
            color: 'var(--gold-pale)',
            lineHeight: 1.5,
          }}>
            한국타말파연구소
          </div>
        </a>
      </div>

      {/* 네비게이션 */}
      <div style={{ flex: 1, padding: '12px 0' }}>
        {NAV.map(item => {
          const isActive = pathname.startsWith(item.href)

          return (
            <div key={item.href}>
              {/* 상위 메뉴 */}
              <a
                href={item.children ? item.href + '?tab=training' : item.href}
                style={{
                  display: 'block',
                  padding: '11px 24px',
                  fontSize: '13px',
                  color: isActive ? 'var(--gold-pale)' : 'rgba(255,255,255,0.55)',
                  background: isActive && !item.children ? 'rgba(158,138,107,0.12)' : 'transparent',
                  textDecoration: 'none',
                  letterSpacing: '0.05em',
                  borderLeft: isActive && !item.children ? '2px solid var(--gold)' : '2px solid transparent',
                  transition: 'all 0.15s',
                  fontWeight: isActive ? 400 : 300,
                }}
              >
                {item.label}
              </a>

              {/* 하위 메뉴 (신청 목록) */}
              {item.children && isActive && (
                <div style={{
                  background: 'rgba(0,0,0,0.15)',
                  borderLeft: '2px solid var(--gold)',
                }}>
                  {item.children.map(child => {
                    const isChildActive = pathname === item.href && currentTab === child.tab
                    return (
                      <a
                        key={child.href}
                        href={child.href}
                        style={{
                          display: 'block',
                          padding: '9px 24px 9px 32px',
                          fontSize: '12px',
                          color: isChildActive ? 'var(--gold)' : 'rgba(255,255,255,0.4)',
                          textDecoration: 'none',
                          letterSpacing: '0.04em',
                          transition: 'color 0.15s',
                          borderBottom: '1px solid rgba(158,138,107,0.06)',
                        }}
                      >
                        {isChildActive ? '▸ ' : '  '}{child.label}
                      </a>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}

        {/* 구분선 */}
        <div style={{ borderTop: '1px solid rgba(158,138,107,0.12)', margin: '12px 0' }} />

        {/* 콘텐츠 작성 바로가기 */}
        <div style={{ padding: '4px 24px 8px' }}>
          <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px', fontFamily: 'var(--font-cormorant), serif' }}>
            새 글 작성
          </p>
          {[
            { href: '/admin/articles/new', label: '+ 아티클' },
            { href: '/admin/library/new', label: '+ 자료실' },
            { href: '/admin/news/new', label: '+ 소식' },
            { href: '/admin/workshops/new', label: '+ 워크숍' },
            { href: '/admin/instructors/new', label: '+ 강사' },
          ].map(link => (
            <a
              key={link.href}
              href={link.href}
              style={{
                display: 'block',
                padding: '6px 0',
                fontSize: '12px',
                color: 'rgba(255,255,255,0.3)',
                textDecoration: 'none',
                letterSpacing: '0.04em',
                transition: 'color 0.15s',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* 하단 */}
      <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(158,138,107,0.15)', flexShrink: 0 }}>
        <a
          href="/"
          style={{
            display: 'block',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.3)',
            textDecoration: 'none',
            marginBottom: '10px',
            letterSpacing: '0.04em',
          }}
        >
          ← 사이트로 이동
        </a>
        <button
          onClick={handleLogout}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.3)',
            padding: 0,
            letterSpacing: '0.04em',
          }}
        >
          로그아웃
        </button>
      </div>
    </aside>
  )
}
