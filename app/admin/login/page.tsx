'use client'

import { useState } from 'react'

export default function AdminLoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    if (res.ok) {
      window.location.href = '/admin'
    } else {
      const data = await res.json()
      setError(data.error ?? '로그인에 실패했습니다.')
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--dark)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        background: 'var(--cream)',
        padding: '48px',
      }}>
        {/* 헤더 */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
            fontSize: '11px',
            color: 'var(--gold)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}>
            Admin
          </div>
          <h1 style={{
            fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
            fontSize: '28px',
            fontWeight: 400,
            color: 'var(--dark)',
            lineHeight: 1.3,
          }}>
            한국타말파연구소<br />
            <em style={{ color: 'var(--gold)', fontSize: '22px' }}>관리자 로그인</em>
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '12px',
              color: 'var(--text-light)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '8px',
              fontFamily: 'var(--font-cormorant), serif',
            }}>
              아이디
            </label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              autoComplete="username"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid rgba(158,138,107,0.3)',
                background: 'white',
                fontSize: '15px',
                color: 'var(--dark)',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: '28px' }}>
            <label style={{
              display: 'block',
              fontSize: '12px',
              color: 'var(--text-light)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '8px',
              fontFamily: 'var(--font-cormorant), serif',
            }}>
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid rgba(158,138,107,0.3)',
                background: 'white',
                fontSize: '15px',
                color: 'var(--dark)',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {error && (
            <p style={{
              fontSize: '13px',
              color: '#b94040',
              marginBottom: '16px',
              fontWeight: 300,
            }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: 'var(--gold)',
              color: 'white',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
              fontSize: '15px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: 600,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  )
}
