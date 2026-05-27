'use client'

import { useState } from 'react'

type FormData = {
  name: string
  email: string
  type: string
  message: string
}

const initialForm: FormData = {
  name: '',
  email: '',
  type: '트레이닝 프로그램 문의',
  message: '',
}

export default function Contact() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/submit-contact', {
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
    <section className="contact" id="contact">
      <div className="contact-inner">
        <div>
          <div className="section-eyebrow">Contact</div>
          <h2 className="section-title">문의<em>하기</em></h2>
          <p className="section-title-ko">Get in Touch</p>
          <p className="section-desc" style={{ marginBottom: '40px' }}>
            프로그램 신청, 워크숍 문의, 협력 제안 등 궁금하신 점은 언제든 연락주세요.
          </p>
          <div className="contact-info-rows">
            <div className="contact-info-row">
              <span className="contact-info-label">Email</span>
              <span className="contact-info-value">tamalpa.korea@example.com</span>
            </div>
            <div className="contact-info-row">
              <span className="contact-info-label">SNS</span>
              <span className="contact-info-value">@tamalpa_korea</span>
            </div>
          </div>
        </div>

        {status === 'success' ? (
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 0' }}>
            <div className="section-eyebrow" style={{ marginBottom: '16px' }}>Submitted</div>
            <h3 style={{
              fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
              fontSize: '28px',
              fontWeight: 300,
              color: 'var(--dark)',
              marginBottom: '16px',
              lineHeight: 1.4,
            }}>
              문의가 <em style={{ color: 'var(--gold)' }}>접수</em>되었습니다
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-light)', lineHeight: 1.9, fontWeight: 300, marginBottom: '32px' }}>
              담당자가 확인 후 이메일로 답변 드리겠습니다.<br />
              보통 2–3 영업일 내에 연락드립니다.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="btn-outline"
              style={{ cursor: 'pointer', width: 'fit-content' }}
            >
              새 문의 보내기
            </button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
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
              <label>문의 유형</label>
              <select name="type" value={form.type} onChange={handleChange}>
                <option>트레이닝 프로그램 문의</option>
                <option>워크숍 문의</option>
                <option>협력 및 제휴 문의</option>
                <option>기타 문의</option>
              </select>
            </div>
            <div className="form-group">
              <label>내용 *</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="문의 내용을 자유롭게 작성해주세요."
                required
              />
            </div>

            {status === 'error' && (
              <p style={{ color: '#b94040', fontSize: '13px', fontWeight: 300, marginBottom: '8px' }}>{errorMsg}</p>
            )}

            <button
              type="submit"
              className="btn-primary"
              style={{ width: 'fit-content', padding: '16px 48px', cursor: 'pointer' }}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? '전송 중...' : '보내기'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
