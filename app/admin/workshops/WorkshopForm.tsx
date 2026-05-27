'use client'

import { useState } from 'react'
import type { Workshop } from '@/lib/admin-sheets'

type Props = { initial?: Workshop; mode: 'new' | 'edit' }

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

export default function WorkshopForm({ initial, mode }: Props) {
  const [form, setForm] = useState({
    num: initial?.num ?? '',
    title: initial?.title ?? '',
    subtitle: initial?.subtitle ?? '',
    date: initial?.date ?? '',
    duration: initial?.duration ?? '',
    desc: initial?.desc ?? '',
    tag: initial?.tag ?? 'Open',
    poster: initial?.poster ?? '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  function set(k: string, v: string) { setForm(prev => ({ ...prev, [k]: v })) }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    const url = mode === 'new' ? '/api/admin/workshops' : `/api/admin/workshops/${initial!.id}`
    const method = mode === 'new' ? 'POST' : 'PUT'
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    if (res.ok) { setStatus('success'); setTimeout(() => { window.location.href = '/admin/workshops' }, 800) }
    else { const d = await res.json(); setError(d.error ?? '저장 실패'); setStatus('error') }
  }

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ marginBottom: '32px' }}>
        <p style={{ fontSize: '12px', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px', fontFamily: 'var(--font-cormorant), serif' }}>Workshops</p>
        <h1 style={{ fontSize: '28px', fontFamily: 'var(--font-cormorant), serif', fontWeight: 400, color: 'var(--dark)' }}>{mode === 'new' ? '새 워크숍 등록' : '워크숍 수정'}</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <Field label="번호" required><input value={form.num} onChange={e => set('num', e.target.value)} placeholder="01" required style={inputStyle} /></Field>
          <Field label="제목" required><input value={form.title} onChange={e => set('title', e.target.value)} placeholder="워크숍 제목" required style={inputStyle} /></Field>
          <Field label="영문 부제"><input value={form.subtitle} onChange={e => set('subtitle', e.target.value)} placeholder="English Subtitle" style={inputStyle} /></Field>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <Field label="날짜" required><input value={form.date} onChange={e => set('date', e.target.value)} placeholder="2025년 3월" required style={inputStyle} /></Field>
          <Field label="기간" required><input value={form.duration} onChange={e => set('duration', e.target.value)} placeholder="1일 (6시간)" required style={inputStyle} /></Field>
          <Field label="구분">
            <select value={form.tag} onChange={e => set('tag', e.target.value)} style={inputStyle}>
              <option>Open</option>
              <option>Professional</option>
              <option>마감</option>
            </select>
          </Field>
          <Field label="포스터 URL"><input value={form.poster} onChange={e => set('poster', e.target.value)} placeholder="/images/poster.jpg" style={inputStyle} /></Field>
        </div>

        <Field label="설명" required style={{ marginBottom: '32px' }}>
          <textarea value={form.desc} onChange={e => set('desc', e.target.value)} placeholder="워크숍 설명" required style={{ ...inputStyle, height: '100px', resize: 'vertical' }} />
        </Field>

        {error && <p style={{ color: '#b94040', fontSize: '13px', marginBottom: '16px' }}>{error}</p>}
        {status === 'success' && <p style={{ color: '#2d7a3a', fontSize: '13px', marginBottom: '16px' }}>저장되었습니다.</p>}

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button type="submit" disabled={status === 'loading'} style={{ background: 'var(--gold)', color: 'white', border: 'none', cursor: 'pointer', padding: '12px 32px', fontSize: '14px', letterSpacing: '0.06em', fontFamily: 'var(--font-cormorant), serif' }}>
            {status === 'loading' ? '저장 중...' : '저장'}
          </button>
          <a href="/admin/workshops" style={{ fontSize: '14px', color: 'var(--text-light)', textDecoration: 'none' }}>취소</a>
        </div>
      </form>
    </div>
  )
}
