'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Instructor } from '@/lib/admin-sheets'

type Props = { initial?: Instructor; mode: 'new' | 'edit' }

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

export default function InstructorForm({ initial, mode }: Props) {
  const [form, setForm] = useState({
    group: initial?.group ?? 'us' as 'us' | 'kr',
    name: initial?.name ?? '',
    photo: initial?.photo ?? '',
    role: initial?.role ?? '',
    bio: initial?.bio ?? '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  function set(k: string, v: string) { setForm(prev => ({ ...prev, [k]: v })) }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setError('')
    const url = mode === 'new' ? '/api/admin/instructors' : `/api/admin/instructors/${initial!.id}`
    const method = mode === 'new' ? 'POST' : 'PUT'
    try {
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (res.ok) {
        setStatus('success')
        setTimeout(() => { window.location.href = '/admin/instructors' }, 800)
      } else {
        const d = await res.json()
        setError(d.error ?? '저장에 실패했습니다.')
        setStatus('error')
      }
    } catch {
      setError('네트워크 오류가 발생했습니다.')
      setStatus('error')
    }
  }

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ marginBottom: '32px' }}>
        <p style={{ fontSize: '12px', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px', fontFamily: 'var(--font-cormorant), serif' }}>Instructors</p>
        <h1 style={{ fontSize: '28px', fontFamily: 'var(--font-cormorant), serif', fontWeight: 400, color: 'var(--dark)' }}>
          {mode === 'new' ? '새 강사 등록' : '강사 수정'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} style={{ maxWidth: '700px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <Field label="소속" required>
            <select value={form.group} onChange={e => set('group', e.target.value)} style={inputStyle}>
              <option value="us">미국 본부</option>
              <option value="kr">한국</option>
            </select>
          </Field>
          <Field label="직책" required>
            <input value={form.role} onChange={e => set('role', e.target.value)} placeholder="예: Senior Faculty" required style={inputStyle} />
          </Field>
        </div>

        <Field label="이름" required style={{ marginBottom: '20px' }}>
          <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="강사 이름" required style={inputStyle} />
        </Field>

        <Field label="사진 URL" style={{ marginBottom: '8px' }}>
          <input value={form.photo} onChange={e => set('photo', e.target.value)} placeholder="https://example.com/photo.jpg" style={inputStyle} />
        </Field>

        {/* 사진 미리보기 */}
        {form.photo && (
          <div style={{ marginBottom: '20px', marginTop: '8px' }}>
            <div style={{ position: 'relative', width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(158,138,107,0.3)' }}>
              <Image src={form.photo} alt="미리보기" fill style={{ objectFit: 'cover' }} onError={() => {}} />
            </div>
          </div>
        )}

        <Field label="소개글" required style={{ marginBottom: '32px' }}>
          <textarea
            value={form.bio}
            onChange={e => set('bio', e.target.value)}
            placeholder="강사 소개글을 입력하세요."
            required
            style={{ ...inputStyle, height: '120px', resize: 'vertical', lineHeight: 1.8 }}
          />
        </Field>

        {error && <p style={{ color: '#b94040', fontSize: '13px', marginBottom: '16px' }}>{error}</p>}
        {status === 'success' && <p style={{ color: '#2d7a3a', fontSize: '13px', marginBottom: '16px' }}>저장되었습니다. 목록으로 이동합니다...</p>}

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{ background: 'var(--gold)', color: 'white', border: 'none', cursor: 'pointer', padding: '12px 32px', fontSize: '14px', letterSpacing: '0.06em', fontFamily: 'var(--font-cormorant), serif' }}
          >
            {status === 'loading' ? '저장 중...' : '저장'}
          </button>
          <a href="/admin/instructors" style={{ fontSize: '14px', color: 'var(--text-light)', textDecoration: 'none' }}>취소</a>
        </div>
      </form>
    </div>
  )
}
