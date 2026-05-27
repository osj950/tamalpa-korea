'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

type Tab = 'training' | 'workshops' | 'contact'

const TAB_LABELS: Record<Tab, string> = {
  training: '트레이닝 신청',
  workshops: '워크숍 신청',
  contact: '문의하기',
}

const TRAINING_HEADERS = ['시간', '이름', '이메일', '연락처', '레벨', '배경', '지원동기', '사전경험']
const WORKSHOP_HEADERS = ['시간', '워크숍', '날짜', '이름', '이메일', '연락처', '인원', '문의']
const CONTACT_HEADERS = ['시간', '이름', '이메일', '유형', '내용']

function isValidTab(value: string | null): value is Tab {
  return value === 'training' || value === 'workshops' || value === 'contact'
}

function ApplicationsContent() {
  const [data, setData] = useState<{ training: string[][]; workshops: string[][]; contact: string[][] } | null>(null)
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const router = useRouter()
  const rawTab = searchParams.get('tab')
  const tab: Tab = isValidTab(rawTab) ? rawTab : 'training'

  useEffect(() => {
    fetch('/api/admin/applications')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
  }, [])

  const rows = data?.[tab] ?? []
  const headers = tab === 'training' ? TRAINING_HEADERS : tab === 'workshops' ? WORKSHOP_HEADERS : CONTACT_HEADERS

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ marginBottom: '32px' }}>
        <p style={{ fontSize: '12px', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px', fontFamily: 'var(--font-cormorant), serif' }}>Management</p>
        <h1 style={{ fontSize: '28px', fontFamily: 'var(--font-cormorant), serif', fontWeight: 400, color: 'var(--dark)' }}>신청 목록</h1>
      </div>

      {/* 탭 */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(158,138,107,0.2)', marginBottom: '24px' }}>
        {(Object.keys(TAB_LABELS) as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => router.push(`/admin/applications?tab=${t}`)}
            style={{
              padding: '12px 24px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontFamily: 'var(--font-cormorant), serif',
              color: tab === t ? 'var(--gold)' : 'var(--text-light)',
              borderBottom: tab === t ? '2px solid var(--gold)' : '2px solid transparent',
              marginBottom: '-1px',
              letterSpacing: '0.04em',
            }}
          >
            {TAB_LABELS[t]}
            {data && (
              <span style={{ marginLeft: '8px', fontSize: '12px', color: 'var(--text-light)' }}>
                ({data[t].length})
              </span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ color: 'var(--text-light)', fontSize: '14px' }}>불러오는 중...</p>
      ) : rows.length === 0 ? (
        <p style={{ color: 'var(--text-light)', fontSize: '14px' }}>신청 내역이 없습니다.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', border: '1px solid rgba(158,138,107,0.2)' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--gold-pale)' }}>
                {headers.map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-cormorant), serif', fontWeight: 400, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...rows].reverse().map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(158,138,107,0.08)' }}>
                  {headers.map((_, j) => (
                    <td key={j} style={{
                      padding: '12px 16px',
                      fontSize: '13px',
                      color: 'var(--dark)',
                      maxWidth: j >= headers.length - 2 ? '200px' : 'auto',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: j >= headers.length - 2 ? 'normal' : 'nowrap',
                      verticalAlign: 'top',
                      lineHeight: 1.6,
                    }}>
                      {row[j] ?? '—'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '12px' }}>
            총 {rows.length}건 · 최신순 표시
          </p>
        </div>
      )}
    </div>
  )
}

export default function AdminApplicationsPage() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', color: 'var(--text-light)', fontSize: '14px' }}>불러오는 중...</div>}>
      <ApplicationsContent />
    </Suspense>
  )
}
