'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const isPrograms = pathname.startsWith('/programs')
  const [menuOpen, setMenuOpen] = useState(false)

  const a = (hash: string) => isHome ? hash : `/${hash}`

  // 메뉴 열릴 때 스크롤 막기
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <>
      <nav>
        <a href="/" className="nav-logo" onClick={close}>
          <div className="nav-logo-text">
            <span className="en">Tamalpa Korea</span>
            <span className="ko">한국타말파연구소</span>
          </div>
        </a>

        {/* 데스크탑 메뉴 */}
        <ul className="nav-links">
          <li><a href={a('#about')}>Tamalpa란</a></li>
          <li><a href={a('#anna')}>Anna Halprin</a></li>

          <li className="nav-item">
            <a href="/programs/training">
              교육 프로그램<span className="nav-arrow">▾</span>
            </a>
            <div className="nav-dropdown">
              <a href="/programs/training">트레이닝 프로그램</a>
              <a href="/programs/workshops">워크숍</a>
              <a href="/programs/instructors">강사 소개</a>
            </div>
          </li>

          <li className="nav-item">
            <a href="/resources/articles">
              연구 &amp; 자료<span className="nav-arrow">▾</span>
            </a>
            <div className="nav-dropdown">
              <a href="/resources/articles">아티클</a>
              <a href="/resources/library">자료실</a>
            </div>
          </li>

          <li className="nav-item">
            <a href="/community/news">
              커뮤니티<span className="nav-arrow">▾</span>
            </a>
            <div className="nav-dropdown">
              <a href="/community/news">소식</a>
            </div>
          </li>

          <li><a href={a('#contact')} className="nav-cta">문의하기</a></li>
        </ul>

        {/* 햄버거 버튼 */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
        >
          <span style={{ transform: menuOpen ? 'rotate(45deg) translate(4.5px, 4.5px)' : 'none' }} />
          <span style={{ opacity: menuOpen ? 0 : 1, transform: menuOpen ? 'scaleX(0)' : 'none' }} />
          <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'none' }} />
        </button>
      </nav>

      {/* 모바일 메뉴 오버레이 */}
      <div className={`nav-mobile-overlay${menuOpen ? ' open' : ''}`}>
        <div className="nav-mobile-links">
          <a href={a('#about')} className="nav-mobile-link" onClick={close}>Tamalpa란</a>
          <a href={a('#anna')} className="nav-mobile-link" onClick={close}>Anna Halprin</a>

          <div className="nav-mobile-group">
            <span className="nav-mobile-group-label">교육 프로그램</span>
            <div className="nav-mobile-sub">
              <a href="/programs/training" onClick={close}>트레이닝 프로그램</a>
              <a href="/programs/workshops" onClick={close}>워크숍</a>
              <a href="/programs/instructors" onClick={close}>강사 소개</a>
            </div>
          </div>

          <div className="nav-mobile-group">
            <span className="nav-mobile-group-label">연구 &amp; 자료</span>
            <div className="nav-mobile-sub">
              <a href="/resources/articles" onClick={close}>아티클</a>
              <a href="/resources/library" onClick={close}>자료실</a>
            </div>
          </div>

          <div className="nav-mobile-group">
            <span className="nav-mobile-group-label">커뮤니티</span>
            <div className="nav-mobile-sub">
              <a href="/community/news" onClick={close}>소식</a>
            </div>
          </div>

          <a href={a('#contact')} className="nav-mobile-cta" onClick={close}>문의하기</a>
        </div>
      </div>

      {/* 교육 프로그램 서브내비 */}
      {isPrograms && (
        <div className="program-subnav">
          <a href="/programs/training" className={pathname.startsWith('/programs/training') ? 'active' : ''}>
            트레이닝 프로그램
          </a>
          <a href="/programs/workshops" className={pathname === '/programs/workshops' ? 'active' : ''}>
            워크숍
          </a>
          <a href="/programs/instructors" className={pathname === '/programs/instructors' ? 'active' : ''}>
            강사 소개
          </a>
        </div>
      )}
    </>
  )
}
