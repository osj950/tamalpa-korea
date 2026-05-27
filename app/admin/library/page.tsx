'use client'

import { useEffect, useState } from 'react'
import type { LibraryItem } from '@/lib/admin-sheets'

export default function AdminLibraryPage() {
  const [items, setItems] = useState<LibraryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  async function load() {
    setLoading(true)
    const res = await fetch('/api/admin/library')
    if (res.ok) setItems(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function handleDelete(id: string) {
    if (!confirm('삭제하시겠습니까?')) return
    setDeleting(id)
    await fetch(`/api/admin/library/${id}`, { method: 'DELETE' })
    await load()
    setDeleting(null)
  }

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <p style={{ fontSize: '12px', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px', fontFamily: 'var(--font-cormorant), serif' }}>Resources</p>
          <h1 style={{ fontSize: '28px', fontFamily: 'var(--font-cormorant), serif', fontWeight: 400, color: 'var(--dark)' }}>자료실 관리</h1>
        </div>
        <a href="/admin/library/new" style={{ background: 'var(--gold)', color: 'white', padding: '10px 24px', textDecoration: 'none', fontSize: '13px', letterSpacing: '0.06em', fontFamily: 'var(--font-cormorant), serif' }}>
          + 새 자료
        </a>
      </div>

      {loading ? (
        <p style={{ color: 'var(--text-light)', fontSize: '14px' }}>불러오는 중...</p>
      ) : (
        <div style={{ background: 'white', border: '1px solid rgba(158,138,107,0.2)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--gold-pale)' }}>
                {['유형', '날짜', '제목', '액션', ''].map(h => (
                  <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: '11px', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-cormorant), serif', fontWeight: 400 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr><td colSpan={5} style={{ padding: '32px 20px', textAlign: 'center', color: 'var(--text-light)', fontSize: '14px' }}>자료가 없습니다.</td></tr>
              ) : items.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid rgba(158,138,107,0.1)' }}>
                  <td style={{ padding: '14px 20px', fontSize: '12px', color: 'var(--gold)', letterSpacing: '0.06em' }}>{item.tag}</td>
                  <td style={{ padding: '14px 20px', fontSize: '13px', color: 'var(--text-light)' }}>{item.date}</td>
                  <td style={{ padding: '14px 20px', fontSize: '14px', color: 'var(--dark)', fontFamily: 'var(--font-cormorant), serif' }}>{item.title}</td>
                  <td style={{ padding: '14px 20px', fontSize: '13px', color: 'var(--text-light)' }}>{item.action}</td>
                  <td style={{ padding: '14px 20px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <a href={`/admin/library/${item.id}`} style={{ fontSize: '13px', color: 'var(--gold)', textDecoration: 'none', marginRight: '16px' }}>수정</a>
                    <button onClick={() => handleDelete(item.id)} disabled={deleting === item.id} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: '#b94040' }}>
                      {deleting === item.id ? '삭제 중...' : '삭제'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
