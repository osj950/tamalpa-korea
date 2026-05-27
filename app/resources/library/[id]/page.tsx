import { notFound } from 'next/navigation'
import { getLibraryItemById } from '@/lib/admin-sheets'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const item = await getLibraryItemById(id)
  return { title: item ? `${item.title} | 한국타말파연구소` : '한국타말파연구소' }
}

export default async function LibraryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const item = await getLibraryItemById(id)
  if (!item) notFound()

  return (
    <>
      <Nav />
      <main style={{ paddingTop: '88px' }}>
        <section style={{ background: 'var(--dark)', padding: '80px 60px' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div className="section-eyebrow" style={{ color: 'var(--gold-light)' }}>Resources</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
              <span style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', border: '1px solid rgba(158,138,107,0.5)', padding: '4px 14px' }}>{item.tag}</span>
              <span style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '13px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em' }}>{item.date}</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 400, fontStyle: 'italic', color: 'var(--gold-pale)', lineHeight: 1.25, marginBottom: '16px' }}>{item.title}</h1>
            <p style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '20px', fontStyle: 'italic', color: 'var(--gold-light)', letterSpacing: '0.04em', marginBottom: '16px' }}>{item.subtitle}</p>
            {item.fileInfo && <p style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '13px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em' }}>{item.fileInfo}</p>}
          </div>
        </section>

        <section style={{ background: 'var(--cream)', padding: '80px 60px' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <a href="/resources/library" style={{ display: 'inline-flex', alignItems: 'center', fontFamily: 'var(--font-cormorant), serif', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', textDecoration: 'none', marginBottom: '56px', opacity: 0.8 }}>← 자료실 목록</a>
            <div style={{ borderTop: '1px solid rgba(158,138,107,0.25)', paddingTop: '56px' }}>
              {item.content.map((para, i) => (
                <p key={i} style={{ fontSize: '16px', lineHeight: 2, color: 'var(--text)', fontWeight: 300, marginBottom: '28px', letterSpacing: '0.01em' }}>{para}</p>
              ))}
            </div>
            <div style={{ borderTop: '1px solid rgba(158,138,107,0.25)', marginTop: '16px', paddingTop: '48px', display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
              <a href="#" style={{ display: 'inline-block', background: 'var(--gold)', color: 'white', fontFamily: 'var(--font-cormorant), serif', fontSize: '14px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, padding: '14px 36px', textDecoration: 'none' }}>{item.action} →</a>
              <a href="/resources/library" style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', textDecoration: 'none', opacity: 0.8 }}>← 자료실 목록으로 돌아가기</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
