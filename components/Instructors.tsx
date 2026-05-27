'use client'

import { useState } from 'react'

const usInstructors = [
  { name: 'Daria Halprin', role: 'Founder · Director' },
  { name: '강사 이름', role: 'Tamalpa Practitioner' },
  { name: '강사 이름', role: 'Tamalpa Practitioner' },
]

const koreaInstructors = [
  { name: '강사 이름', role: 'Tamalpa Practitioner' },
  { name: '강사 이름', role: 'Tamalpa Practitioner' },
  { name: '강사 이름', role: 'Tamalpa Practitioner' },
]

export default function Instructors() {
  const [activeTab, setActiveTab] = useState<'us' | 'korea'>('us')
  const instructors = activeTab === 'us' ? usInstructors : koreaInstructors

  return (
    <section className="instructors" id="instructors">
      <div className="instructors-inner">
        <div className="section-eyebrow">Instructors</div>
        <h2 className="section-title">강사 <em>소개</em></h2>
        <p className="section-title-ko">미국 본부 · 한국</p>

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
          {instructors.map((instructor, idx) => (
            <div className="instructor-card" key={idx}>
              <div className="instructor-photo">🌿</div>
              <h4>{instructor.name}</h4>
              <p>{instructor.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
