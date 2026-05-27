import type { Metadata } from 'next'
import { Suspense } from 'react'
import AdminSidebar from './AdminSidebar'

export const metadata: Metadata = { title: '관리자 | 한국타말파연구소' }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Suspense fallback={<div style={{ width: '230px', minWidth: '230px', background: '#1a1714' }} />}>
        <AdminSidebar />
      </Suspense>
      <main style={{
        marginLeft: '230px',
        flex: 1,
        minHeight: '100vh',
        background: '#f5f3f0',
      }}>
        {children}
      </main>
    </div>
  )
}
