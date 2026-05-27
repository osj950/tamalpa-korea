'use client'

import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

type FormData = {
  name: string
  email: string
  phone: string
  level: string
  background: string
  motivation: string
  experience: string
}

const initialForm: FormData = {
  name: '',
  email: '',
  phone: '',
  level: '',
  background: '',
  motivation: '',
  experience: '',
}

export default function TrainingApplyPage() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/submit-training', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error ?? '오류가 발생했습니다.')
        setStatus('error')
        return
      }

      setStatus('success')
      setForm(initialForm)
    } catch {
      setErrorMsg('네트워크 오류가 발생했습니다.')
      setStatus('error')
    }
  }

  return (
    <>
      <Nav />
      <main style={{ paddingTop: '137px' }}>

        {/* 페이지 헤더 */}
        <section style={{ background: 'var(--dark)', padding: '80px 60px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div className="section-eyebrow" style={{ color: 'var(--gold-light)' }}>
              Application
            </div>
            <h1 className="section-title" style={{ color: 'var(--gold-pale)' }}>
              전문가과정 <em>신청</em>
            </h1>
            <p className="section-title-ko" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Professional Training Application
            </p>
            <p className="section-desc" style={{ color: 'rgba(255,255,255,0.6)' }}>
              신청서를 제출하시면 담당자가 확인 후 연락드립니다.
            </p>
          </div>
        </section>

        {/* 신청 폼 */}
        <section style={{ background: 'var(--gold-very-pale)', padding: '100px 60px' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>

            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <div className="section-eyebrow" style={{ justifyContent: 'center', marginBottom: '24px' }}>
                  Submitted
                </div>
                <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '16px' }}>
                  신청이 <em>완료되었습니다</em>
                </h2>
                <p style={{ color: 'var(--text-light)', fontSize: '15px', lineHeight: '1.9', fontWeight: 300, marginBottom: '40px' }}>
                  담당자가 확인 후 이메일로 연락드리겠습니다.<br />
                  보통 2–3 영업일 내 답변 드립니다.
                </p>
                <a href="/programs/training" className="btn-outline">트레이닝 프로그램으로 돌아가기</a>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group">
                    <label>이름 *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="홍길동"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>연락처</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="010-0000-0000"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>이메일 *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>지원 레벨 *</label>
                  <select name="level" value={form.level} onChange={handleChange} required>
                    <option value="">선택해주세요</option>
                    <option value="Level 1 — 개인 구현">Level 1 — 개인 구현 (Personal Embodiment)</option>
                    <option value="Level 2 — 전문 실습">Level 2 — 전문 실습 (Professional Application)</option>
                    <option value="Level 3 — 슈퍼비전 & 심화">Level 3 — 슈퍼비전 &amp; 심화 (Supervision &amp; Advanced)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>현재 직업 또는 배경</label>
                  <input
                    type="text"
                    name="background"
                    value={form.background}
                    onChange={handleChange}
                    placeholder="예: 무용치료사, 교육자, 예술가 등"
                  />
                </div>

                <div className="form-group">
                  <label>지원 동기 *</label>
                  <textarea
                    name="motivation"
                    value={form.motivation}
                    onChange={handleChange}
                    placeholder="Tamalpa 트레이닝 프로그램에 지원하는 이유를 자유롭게 적어주세요."
                    style={{ height: '140px' }}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Tamalpa 관련 사전 경험</label>
                  <textarea
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                    placeholder="워크숍 참가 경험, 표현예술치료 관련 교육 등 (없으시면 비워두셔도 됩니다)"
                    style={{ height: '100px' }}
                  />
                </div>

                {status === 'error' && (
                  <p style={{ color: '#b94040', fontSize: '13px', fontWeight: 300 }}>{errorMsg}</p>
                )}

                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', paddingTop: '8px' }}>
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ padding: '16px 48px' }}
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? '제출 중...' : '신청서 제출'}
                  </button>
                  <a href="/programs/training" style={{ fontSize: '13px', color: 'var(--text-light)', textDecoration: 'none' }}>
                    취소
                  </a>
                </div>

              </form>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
