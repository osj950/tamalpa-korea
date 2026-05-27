'use client'

import { useEffect, useState } from 'react'
import type { Instructor } from '@/lib/admin-sheets'

const GROUP_LABEL: Record<string, string> = { us: '미국 본부', kr: '한국' }

export default function AdminInstructorsPage() {
  const [instructors, setInstructors] = useState<Instructor[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/instructors')
      .then(r => r.json())
      .then(d => { setInstructors(d); setLoading(false) })
  }, [])

  async function handleDelete(id: string, name: string) {
    if (!confirm(`"${name}" 강사를 삭제하시겠습니까?`)) return
    setDeletingId(id)
    const res = await fetch(`/api/admin/instructors/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setInstructors(prev => prev.filter(i => i.id !== id))
    } else {
      const d = await res.json()
      alert(d.error ?? '삭제에 실패했습니다.')
    }
    setDeletingId(null)
  }

  const usInstructors = instructors.filter(i => i.group === 'us')
  const krInstructors = instructors.filter(i => i.group === 'kr')

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <p style={{ fontSize: '12px', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px', fontFamily: 'var(--font-cormorant), serif' }}>Management</p>
          <h1 style={{ fontSize: '28px', fontFamily: 'var(--font-cormorant), serif', fontWeight: 400, color: 'var(--dark)' }}>강사 관리</h1>
        </div>
        <a
          href="/admin/instructors/new"
          style={{ background: 'var(--gold)', color: 'white', padding: '10px 24px', fontSize: '13px', textDecoration: 'none', letterSpacing: '0.06em', fontFamily: 'var(--font-cormorant), serif' }}
        >
          + 새 강사 등록
        </a>
      </div>

      {loading ? (
        <p style={{ color: 'var(--text-light)', fontSize: '14px' }}>불러오는 중...</p>
      ) : (
        <>
          {[{ label: '미국 본부', list: usInstructors }, { label: '한국', list: krInstructors }].map(({ label, list }) => (
            <div key={label} style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '14px', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-cormorant), serif', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid rgba(158,138,107,0.2)' }}>
                {label} ({list.length}명)
              </h2>
              {list.length === 0 ? (
                <p style={{ color: 'var(--text-light)', fontSize: '13px' }}>등록된 강사가 없습니다.</p>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                  {list.map(ins => (
                    <div key={ins.id} style={{ background: 'white', border: '1px solid rgba(158,138,107,0.2)', padding: '20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      {/* 사진 */}
                      <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--gold-very-pale)', flexShrink: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                        {ins.photo ? (
                          <img src={ins.photo} alt={ins.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : '🌿'}
                      </div>
                      {/* 정보 */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: '15px', fontFamily: 'var(--font-cormorant), serif', color: 'var(--dark)', fontWeight: 400, marginBottom: '2px' }}>{ins.name}</p>
                        <p style={{ fontSize: '11px', color: 'var(--gold)', letterSpacing: '0.06em', marginBottom: '8px' }}>{ins.role}</p>
                        <p style={{ fontSize: '12px', color: 'var(--text-light)', lineHeight: 1.6, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{ins.bio}</p>
                        <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                          <a href={`/admin/instructors/${ins.id}`} style={{ fontSize: '12px', color: 'var(--gold)', textDecoration: 'none', letterSpacing: '0.04em' }}>수정</a>
                          <button
                            onClick={() => handleDelete(ins.id, ins.name)}
                            disabled={deletingId === ins.id}
                            style={{ fontSize: '12px', color: '#b94040', background: 'none', border: 'none', cursor: 'pointer', padding: 0, letterSpacing: '0.04em' }}
                          >
                            {deletingId === ins.id ? '삭제 중...' : '삭제'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  )
}
