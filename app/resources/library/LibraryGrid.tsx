'use client'

import type { LibraryItem } from '@/lib/admin-sheets'

export default function LibraryGrid({ items }: { items: LibraryItem[] }) {
  return (
    <section style={{ background: 'var(--cream)', padding: '80px 60px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
          {items.map(item => (
            <a
              key={item.id}
              href={`/resources/library/${item.id}`}
              style={{
                background: 'white', border: '1px solid var(--gold-pale)', borderTop: '2px solid var(--gold)',
                padding: '32px 28px 28px', textDecoration: 'none', color: 'var(--text)',
                display: 'flex', flexDirection: 'column', transition: 'transform 0.25s, box-shadow 0.25s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.boxShadow = '0 16px 48px rgba(26,23,20,0.1)'
                e.currentTarget.style.borderColor = 'var(--gold)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = 'var(--gold-pale)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', border: '1px solid rgba(158,138,107,0.4)', padding: '3px 11px' }}>{item.tag}</span>
                <span style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '12px', color: 'var(--text-light)', letterSpacing: '0.06em' }}>{item.date}</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '22px', fontWeight: 400, color: 'var(--dark)', lineHeight: 1.4, marginBottom: '6px' }}>{item.title}</h2>
              <p style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '14px', fontStyle: 'italic', color: 'var(--gold)', marginBottom: '16px', letterSpacing: '0.04em' }}>{item.subtitle}</p>
              <p style={{ fontSize: '13px', color: 'var(--text-light)', lineHeight: 1.9, fontWeight: 300, flex: 1, marginBottom: '24px' }}>{item.desc}</p>
              <span style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '13px', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{item.action} →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
