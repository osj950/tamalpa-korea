'use client'

import { useState } from 'react'
import type { NewsItem } from '@/lib/admin-sheets'

type Props = { initial?: NewsItem; mode: 'new' | 'edit' }

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px', border: '1px solid rgba(158,138,107,0.3)',
  background: 'white', fontSize: '14px', color: 'var(--dark)', outline: 'none',
  boxSizing: 'border-box', fontFamily: 'inherit',
}

function Field({ label, children, required, style }: { label: string; children: React.ReactNode; required?: boolean; style?: React.CSSProperties }) {
  return (
    <div style={style}>
      <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-light)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px', fontFamily: 'var(--font-cormorant), serif' }}>
        {label}{required && ' *'}
      </label>
      {children}
    </div>
  )
}

export default function NewsForm({ initial, mode }: Props) {
  const [form, setForm] = useState({
    tag: initial?.tag ?? '',
    date: initial?.date ?? '',
    title: initial?.title ?? '',
    subtitle: initial?.subtitle ?? '',
    desc: initial?.desc ?? '',
  })
  const [contentText, setContentText] = useState(initial?.content.join('\n\n') ?? '')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  function set(k: string, v: string) { setForm(prev => ({ ...prev, [k]: v })) }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    const payload = { ...form, content: contentText.split(/\n\n+/).map(p => p.trim()).filter(Boolean) }
    const url = mode === 'new' ? '/api/admin/news' : `/api/admin/news/${initial!.id}`
    const method = mode === 'new' ? 'POST' : 'PUT'
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    if (res.ok) { setStatus('success'); setTimeout(() => { window.location.href = '/admin/news' }, 800) }
    else { const d = await res.json(); setError(d.error ?? '저장 실패'); setStatus('error') }
  }

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ marginBottom: '32px' }}>
        <p style={{ fontSize: '12px', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px', fontFamily: 'var(--font-cormorant), serif' }}>Community</p>
        <h1 style={{ fontSize: '28px', fontFamily: 'var(--font-cormorant), serif', fontWeight: 400, color: 'var(--dark)' }}>{mode === 'new' ? '새 소식 작성' : '소식 수정'}</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <Field label="태그" required>
            <select value={form.tag} onChange={e => set('tag', e.target.value)} required style={inputStyle}>
              <option value="">선택</option>
              <option>공지</option>
              <option>모집</option>
              <option>소식</option>
              <option>후기</option>
            </select>
          </Field>
          <Field label="날짜" required><input value={form.date} onChange={e => set('date', e.target.value)} placeholder="2025. 03. 01" required style={inputStyle} /></Field>
        </div>

        <Field label="제목" required style={{ marginBottom: '20px' }}><input value={form.title} onChange={e => set('title', e.target.value)} placeholder="소식 제목" required style={inputStyle} /></Field>
        <Field label="영문 부제" required style={{ marginBottom: '20px' }}><input value={form.subtitle} onChange={e => set('subtitle', e.target.value)} placeholder="English Subtitle" required style={inputStyle} /></Field>
        <Field label="요약 설명" required style={{ marginBottom: '20px' }}><textarea value={form.desc} onChange={e => set('desc', e.target.value)} placeholder="카드에 표시될 짧은 설명" required style={{ ...inputStyle, height: '80px', resize: 'vertical' }} /></Field>
        <Field label="본문 내용 (문단 구분: 빈 줄 1개)" required style={{ marginBottom: '32px' }}>
          <textarea value={contentText} onChange={e => setContentText(e.target.value)} placeholder={'첫 번째 문단\n\n두 번째 문단'} required style={{ ...inputStyle, height: '240px', resize: 'vertical', lineHeight: 1.8 }} />
        </Field>

        {error && <p style={{ color: '#b94040', fontSize: '13px', marginBottom: '16px' }}>{error}</p>}
        {status === 'success' && <p style={{ color: '#2d7a3a', fontSize: '13px', marginBottom: '16px' }}>저장되었습니다.</p>}

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button type="submit" disabled={status === 'loading'} style={{ background: 'var(--gold)', color: 'white', border: 'none', cursor: 'pointer', padding: '12px 32px', fontSize: '14px', letterSpacing: '0.06em', fontFamily: 'var(--font-cormorant), serif' }}>
            {status === 'loading' ? '저장 중...' : '저장'}
          </button>
          <a href="/admin/news" style={{ fontSize: '14px', color: 'var(--text-light)', textDecoration: 'none' }}>취소</a>
        </div>
      </form>
    </div>
  )
}
