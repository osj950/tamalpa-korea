import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { getWorkshops } from '@/lib/admin-sheets'
import WorkshopsClient from './WorkshopsClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: '워크숍 | 한국타말파연구소',
}

export default async function WorkshopsPage() {
  const workshops = await getWorkshops()

  return (
    <>
      <Nav />
      <main style={{ paddingTop: '137px' }}>
        <section style={{ background: 'var(--dark)', padding: '80px 60px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div className="section-eyebrow" style={{ color: 'var(--gold-light)' }}>Education</div>
            <h1 className="section-title" style={{ color: 'var(--gold-pale)' }}><em>워크숍</em></h1>
            <p className="section-title-ko" style={{ color: 'rgba(255,255,255,0.5)' }}>Workshops</p>
            <p className="section-desc" style={{ color: 'rgba(255,255,255,0.6)' }}>
              단기 집중 워크숍으로 타말파의 핵심 방법론을 체험합니다. 치료사, 교육자, 예술가 모두 환영합니다.
            </p>
          </div>
        </section>
        <WorkshopsClient workshops={workshops} />
      </main>
      <Footer />
    </>
  )
}
