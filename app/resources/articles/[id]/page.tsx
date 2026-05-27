import { notFound } from 'next/navigation'
import { getArticles, getArticleById } from '@/lib/admin-sheets'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const article = await getArticleById(id)
  return { title: article ? `${article.title} | 한국타말파연구소` : '한국타말파연구소' }
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const article = await getArticleById(id)
  if (!article) notFound()

  return (
    <>
      <Nav />
      <main style={{ paddingTop: '88px' }}>
        <section style={{ background: 'var(--dark)', padding: '80px 60px' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div className="section-eyebrow" style={{ color: 'var(--gold-light)' }}>Research</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
              <span style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', border: '1px solid rgba(158,138,107,0.5)', padding: '4px 14px' }}>{article.tag}</span>
              <span style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '13px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em' }}>{article.date}</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 400, fontStyle: 'italic', color: 'var(--gold-pale)', lineHeight: 1.25, marginBottom: '16px' }}>{article.title}</h1>
            <p style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '20px', fontStyle: 'italic', color: 'var(--gold-light)', letterSpacing: '0.04em' }}>{article.subtitle}</p>
          </div>
        </section>

        <section style={{ background: 'var(--cream)', padding: '80px 60px' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <a href="/resources/articles" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-cormorant), serif', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', textDecoration: 'none', marginBottom: '56px', opacity: 0.8 }}>← 아티클 목록</a>
            <div style={{ borderTop: '1px solid rgba(158,138,107,0.25)', paddingTop: '56px' }}>
              {article.content.map((para, i) => (
                <p key={i} style={{ fontSize: '16px', lineHeight: 2, color: 'var(--text)', fontWeight: 300, marginBottom: '28px', letterSpacing: '0.01em' }}>{para}</p>
              ))}
            </div>
            <div style={{ borderTop: '1px solid rgba(158,138,107,0.25)', marginTop: '56px', paddingTop: '40px' }}>
              <a href="/resources/articles" style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', textDecoration: 'none', opacity: 0.8 }}>← 아티클 목록으로 돌아가기</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
