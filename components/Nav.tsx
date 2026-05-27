'use client'

import { usePathname } from 'next/navigation'

export default function Nav() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const isPrograms = pathname.startsWith('/programs')

  const a = (hash: string) => isHome ? hash : `/${hash}`

  return (
    <>
      <nav>
        <a href="/" className="nav-logo">
          <div className="nav-logo-text">
            <span className="en">Tamalpa Korea</span>
            <span className="ko">한국타말파연구소</span>
          </div>
        </a>

        <ul className="nav-links">
          <li><a href={a('#about')}>Tamalpa란</a></li>
          <li><a href={a('#anna')}>Anna Halprin</a></li>

          {/* 교육 프로그램 드롭다운 */}
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

          {/* 연구 & 자료 드롭다운 */}
          <li className="nav-item">
            <a href="/resources/articles">
              연구 &amp; 자료<span className="nav-arrow">▾</span>
            </a>
            <div className="nav-dropdown">
              <a href="/resources/articles">아티클</a>
              <a href="/resources/library">자료실</a>
            </div>
          </li>

          {/* 커뮤니티 드롭다운 */}
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
      </nav>

      {/* 교육 프로그램 하위 메뉴 */}
      {isPrograms && (
        <div className="program-subnav">
          <a
            href="/programs/training"
            className={pathname.startsWith('/programs/training') ? 'active' : ''}
          >
            트레이닝 프로그램
          </a>
          <a
            href="/programs/workshops"
            className={pathname === '/programs/workshops' ? 'active' : ''}
          >
            워크숍
          </a>
          <a
            href="/programs/instructors"
            className={pathname === '/programs/instructors' ? 'active' : ''}
          >
            강사 소개
          </a>
        </div>
      )}
    </>
  )
}
