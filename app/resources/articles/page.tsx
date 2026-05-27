import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { getArticles } from '@/lib/admin-sheets'
import ArticlesGrid from './ArticlesGrid'

export const dynamic = 'force-dynamic'

export default async function ArticlesPage() {
  const articles = await getArticles()

  return (
    <>
      <Nav />
      <main style={{ paddingTop: '88px' }}>
        <section style={{ background: 'var(--dark)', padding: '80px 60px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div className="section-eyebrow" style={{ color: 'var(--gold-light)' }}>Research</div>
            <h1 className="section-title" style={{ color: 'var(--gold-pale)' }}><em>아티클</em></h1>
            <p className="section-title-ko" style={{ color: 'rgba(255,255,255,0.5)' }}>Articles</p>
            <p className="section-desc" style={{ color: 'rgba(255,255,255,0.6)' }}>타말파와 표현예술치료에 관한 연구, 인터뷰, 아카이브를 소개합니다.</p>
          </div>
        </section>
        <ArticlesGrid articles={articles} />
      </main>
      <Footer />
    </>
  )
}
