import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { getInstructors } from '@/lib/admin-sheets'
import InstructorsClient from './InstructorsClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: '강사 소개 | 한국타말파연구소',
}

export default async function InstructorsPage() {
  const instructors = await getInstructors()

  return (
    <>
      <Nav />
      <main style={{ paddingTop: '88px' }}>
        <section style={{ background: 'var(--dark)', padding: '80px 60px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div className="section-eyebrow" style={{ color: 'var(--gold-light)' }}>Instructors</div>
            <h1 className="section-title" style={{ color: 'var(--gold-pale)' }}>강사 <em>소개</em></h1>
            <p className="section-title-ko" style={{ color: 'rgba(255,255,255,0.5)' }}>미국 본부 · 한국</p>
            <p className="section-desc" style={{ color: 'rgba(255,255,255,0.6)' }}>
              미국 Tamalpa Institute 본부와 한국의 공인 강사진이 함께합니다.
            </p>
          </div>
        </section>
        <InstructorsClient instructors={instructors} />
      </main>
      <Footer />
    </>
  )
}
