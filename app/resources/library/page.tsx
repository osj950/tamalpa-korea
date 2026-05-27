import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { getLibraryItems } from '@/lib/admin-sheets'
import LibraryGrid from './LibraryGrid'

export const dynamic = 'force-dynamic'

export default async function LibraryPage() {
  const items = await getLibraryItems()

  return (
    <>
      <Nav />
      <main style={{ paddingTop: '88px' }}>
        <section style={{ background: 'var(--dark)', padding: '80px 60px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div className="section-eyebrow" style={{ color: 'var(--gold-light)' }}>Resources</div>
            <h1 className="section-title" style={{ color: 'var(--gold-pale)' }}><em>자료실</em></h1>
            <p className="section-title-ko" style={{ color: 'rgba(255,255,255,0.5)' }}>Resource Library</p>
            <p className="section-desc" style={{ color: 'rgba(255,255,255,0.6)' }}>타말파 관련 문서, 영상, 브로셔 등 다양한 자료를 제공합니다.</p>
          </div>
        </section>
        <LibraryGrid items={items} />
      </main>
      <Footer />
    </>
  )
}
