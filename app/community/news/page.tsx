import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { getNewsItems } from '@/lib/admin-sheets'
import NewsGrid from './NewsGrid'

export const dynamic = 'force-dynamic'

export default async function NewsPage() {
  const items = await getNewsItems()

  return (
    <>
      <Nav />
      <main style={{ paddingTop: '88px' }}>
        <section style={{ background: 'var(--dark)', padding: '80px 60px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div className="section-eyebrow" style={{ color: 'var(--gold-light)' }}>Community</div>
            <h1 className="section-title" style={{ color: 'var(--gold-pale)' }}><em>소식</em></h1>
            <p className="section-title-ko" style={{ color: 'rgba(255,255,255,0.5)' }}>News &amp; Notice</p>
            <p className="section-desc" style={{ color: 'rgba(255,255,255,0.6)' }}>한국타말파연구소의 최신 소식과 공지사항을 안내합니다.</p>
          </div>
        </section>
        <NewsGrid items={items} />
      </main>
      <Footer />
    </>
  )
}
