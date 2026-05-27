'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Instructor } from '@/lib/admin-sheets'

export default function InstructorsClient({ instructors }: { instructors: Instructor[] }) {
  const [activeTab, setActiveTab] = useState<'us' | 'korea'>('us')

  const usInstructors = instructors.filter(i => i.group === 'us')
  const koreaInstructors = instructors.filter(i => i.group === 'kr')
  const list = activeTab === 'us' ? usInstructors : koreaInstructors

  return (
    <section className="instructors" style={{ padding: '80px 60px' }}>
      <div className="instructors-inner">
        <div className="instructor-tabs">
          <button
            className={`tab-btn${activeTab === 'us' ? ' active' : ''}`}
            onClick={() => setActiveTab('us')}
          >
            미국 본부
          </button>
          <button
            className={`tab-btn${activeTab === 'korea' ? ' active' : ''}`}
            onClick={() => setActiveTab('korea')}
          >
            한국
          </button>
        </div>

        <div className="instructor-grid">
          {list.map((instructor, idx) => (
            <div className="instructor-card" key={instructor.id ?? idx}>
              <div className="instructor-photo">
                {instructor.photo ? (
                  <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden' }}>
                    <Image src={instructor.photo} alt={instructor.name} fill style={{ objectFit: 'cover' }} />
                  </div>
                ) : '🌿'}
              </div>
              <h4>{instructor.name}</h4>
              <p>{instructor.role}</p>
              <p style={{
                marginTop: '12px',
                fontSize: '13px',
                color: 'var(--text-light)',
                lineHeight: '1.7',
                fontWeight: 300,
                fontFamily: 'var(--font-noto-sans-kr), sans-serif',
                textTransform: 'none',
                letterSpacing: 0,
              }}>
                {instructor.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
