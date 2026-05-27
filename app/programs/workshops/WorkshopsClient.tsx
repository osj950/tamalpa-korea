'use client'

import { useState } from 'react'
import Image from 'next/image'

import type { Workshop } from '@/lib/admin-sheets'

type FormData = {
  name: string
  email: string
  phone: string
  participants: string
  message: string
}

const initialForm: FormData = { name: '', email: '', phone: '', participants: '1', message: '' }

export default function WorkshopsClient({ workshops }: { workshops: Workshop[] }) {
  const [selected, setSelected] = useState<Workshop | null>(null)
  const [form, setForm] = useState<FormData>(initialForm)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function openModal(ws: Workshop) {
    setSelected(ws)
    setForm(initialForm)
    setStatus('idle')
    setErrorMsg('')
  }

  function closeModal() {
    setSelected(null)
    setStatus('idle')
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selected) return
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/submit-workshop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workshopTitle: selected.title,
          workshopDate: selected.date,
          ...form,
        }),
      })
      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error ?? '오류가 발생했습니다.')
        setStatus('error')
        return
      }

      setStatus('success')
    } catch {
      setErrorMsg('네트워크 오류가 발생했습니다.')
      setStatus('error')
    }
  }

  return (
    <>
      {/* 워크숍 그리드 */}
      <section style={{ background: 'var(--cream)', padding: '100px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {workshops.map((ws) => (
              <div
                key={ws.num}
                style={{
                  background: 'white',
                  border: '1px solid var(--gold-pale)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* 포스터 이미지 영역 */}
                <div style={{
                  aspectRatio: '3/2',
                  background: 'var(--gold-very-pale)',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {ws.poster ? (
                    <Image
                      src={ws.poster}
                      alt={ws.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      opacity: 0.4,
                    }}>
                      <span style={{ fontSize: '32px' }}>🌿</span>
                      <span style={{
                        fontFamily: 'var(--font-cormorant), serif',
                        fontSize: '11px',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'var(--gold)',
                      }}>
                        Poster
                      </span>
                    </div>
                  )}
                  {/* 번호 뱃지 */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    fontFamily: 'var(--font-cormorant), serif',
                    fontSize: '13px',
                    color: 'var(--gold)',
                    letterSpacing: '0.06em',
                    background: 'rgba(250,247,243,0.9)',
                    padding: '2px 8px',
                  }}>
                    {ws.num}
                  </div>
                </div>

                {/* 카드 내용 */}
                <div style={{ padding: '28px 28px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-cormorant), serif',
                    fontSize: '20px',
                    fontWeight: 400,
                    color: 'var(--dark)',
                    marginBottom: '4px',
                  }}>
                    {ws.title}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-noto-serif-kr), serif',
                    fontSize: '12px',
                    color: 'var(--gold)',
                    letterSpacing: '0.04em',
                    marginBottom: '12px',
                    fontWeight: 300,
                  }}>
                    {ws.subtitle}
                  </p>
                  <p style={{
                    fontSize: '13px',
                    color: 'var(--text-light)',
                    lineHeight: '1.8',
                    fontWeight: 300,
                    flex: 1,
                    marginBottom: '16px',
                  }}>
                    {ws.desc}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-cormorant), serif',
                    fontSize: '12px',
                    color: 'var(--gold)',
                    letterSpacing: '0.06em',
                    marginBottom: '16px',
                  }}>
                    {ws.date} · {ws.duration}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className="program-tag" style={{
                      margin: 0,
                      borderColor: 'rgba(158,138,107,0.4)',
                      color: 'var(--gold)',
                    }}>
                      {ws.tag}
                    </span>
                    <button
                      onClick={() => openModal(ws)}
                      className="btn-primary"
                      style={{ padding: '8px 20px', fontSize: '12px' }}
                    >
                      신청하기
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 모달 오버레이 */}
      {selected && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(26,23,20,0.7)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            backdropFilter: 'blur(4px)',
          }}
        >
          <div style={{
            background: 'var(--cream)',
            maxWidth: '860px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative',
          }}>
            {/* 닫기 버튼 */}
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '20px',
                right: '24px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-cormorant), serif',
                fontSize: '24px',
                color: 'var(--text-light)',
                lineHeight: 1,
                zIndex: 1,
              }}
              aria-label="닫기"
            >
              ✕
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              {/* 왼쪽: 워크숍 정보 */}
              <div style={{ background: 'var(--dark)', padding: '48px 40px' }}>
                {selected.poster ? (
                  <div style={{ position: 'relative', aspectRatio: '3/2', marginBottom: '32px', overflow: 'hidden' }}>
                    <Image src={selected.poster} alt={selected.title} fill style={{ objectFit: 'cover' }} />
                  </div>
                ) : (
                  <div style={{
                    aspectRatio: '3/2',
                    background: 'rgba(158,138,107,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '32px',
                    fontSize: '48px',
                    opacity: 0.5,
                  }}>
                    🌿
                  </div>
                )}
                <div className="section-eyebrow" style={{ color: 'var(--gold-light)' }}>Workshop</div>
                <h2 style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: '28px',
                  fontWeight: 300,
                  color: 'var(--gold-pale)',
                  lineHeight: 1.3,
                  marginBottom: '8px',
                }}>
                  {selected.title}
                </h2>
                <p style={{
                  fontFamily: 'var(--font-noto-serif-kr), serif',
                  fontSize: '13px',
                  color: 'var(--gold-light)',
                  marginBottom: '20px',
                  fontWeight: 300,
                }}>
                  {selected.subtitle}
                </p>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.8', fontWeight: 300, marginBottom: '20px' }}>
                  {selected.desc}
                </p>
                <div style={{ borderTop: '1px solid rgba(158,138,107,0.2)', paddingTop: '20px' }}>
                  <p style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '13px', color: 'var(--gold)', letterSpacing: '0.06em' }}>
                    {selected.date} · {selected.duration}
                  </p>
                </div>
              </div>

              {/* 오른쪽: 신청 폼 */}
              <div style={{ padding: '48px 40px' }}>
                {status === 'success' ? (
                  <div style={{ textAlign: 'center', paddingTop: '40px' }}>
                    <div className="section-eyebrow" style={{ justifyContent: 'center', marginBottom: '16px' }}>Submitted</div>
                    <h3 style={{
                      fontFamily: 'var(--font-cormorant), serif',
                      fontSize: '26px',
                      fontWeight: 300,
                      color: 'var(--dark)',
                      marginBottom: '16px',
                    }}>
                      신청이 <em style={{ color: 'var(--gold)' }}>완료</em>되었습니다
                    </h3>
                    <p style={{ fontSize: '13px', color: 'var(--text-light)', lineHeight: '1.8', fontWeight: 300, marginBottom: '32px' }}>
                      담당자가 확인 후 이메일로 연락드리겠습니다.
                    </p>
                    <button onClick={closeModal} className="btn-outline" style={{ cursor: 'pointer' }}>
                      닫기
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="section-eyebrow" style={{ marginBottom: '20px' }}>신청하기</div>
                    <form className="contact-form" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label>이름 *</label>
                        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="홍길동" required />
                      </div>
                      <div className="form-group">
                        <label>이메일 *</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="example@email.com" required />
                      </div>
                      <div className="form-group">
                        <label>연락처</label>
                        <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="010-0000-0000" />
                      </div>
                      <div className="form-group">
                        <label>참가 인원</label>
                        <input type="number" name="participants" value={form.participants} onChange={handleChange} min="1" max="10" />
                      </div>
                      <div className="form-group">
                        <label>문의 사항</label>
                        <textarea name="message" value={form.message} onChange={handleChange} placeholder="궁금하신 점을 자유롭게 적어주세요." style={{ height: '80px' }} />
                      </div>

                      {status === 'error' && (
                        <p style={{ color: '#b94040', fontSize: '13px', fontWeight: 300 }}>{errorMsg}</p>
                      )}

                      <button
                        type="submit"
                        className="btn-primary"
                        style={{ width: '100%', padding: '14px', textAlign: 'center' }}
                        disabled={status === 'loading'}
                      >
                        {status === 'loading' ? '제출 중...' : '신청서 제출'}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
