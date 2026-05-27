'use client'

import { useState } from 'react'

const usInstructors = [
  { name: 'Daria Halprin', role: 'Founder · Director', desc: 'Tamalpa Institute 공동 창립자이자 디렉터. Anna Halprin의 딸로서 Life/Art Process를 전 세계에 전파하고 있습니다.' },
  { name: 'Jamie McHugh', role: 'Senior Faculty', desc: '수십 년간 Tamalpa 방법론을 가르쳐 온 시니어 강사. 몸 기반 표현과 움직임 교육의 권위자입니다.' },
  { name: '강사 이름', role: 'Tamalpa Practitioner', desc: '미국 본부 공인 Tamalpa 프랙티셔너로 워크숍과 트레이닝 프로그램을 진행합니다.' },
]

const koreaInstructors = [
  { name: '강사 이름', role: 'Korea Director', desc: '한국타말파연구소를 이끌며 트레이닝 프로그램과 워크숍을 기획·진행합니다.' },
  { name: '강사 이름', role: 'Tamalpa Practitioner', desc: '표현예술치료 분야의 전문가로 개인 및 그룹 세션을 진행합니다.' },
  { name: '강사 이름', role: 'Tamalpa Practitioner', desc: '움직임과 시각 예술을 통합한 표현예술치료 워크숍을 이끌고 있습니다.' },
]

export default function InstructorsClient() {
  const [activeTab, setActiveTab] = useState<'us' | 'korea'>('us')
  const instructors = activeTab === 'us' ? usInstructors : koreaInstructors

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
          {instructors.map((instructor, idx) => (
            <div className="instructor-card" key={idx}>
              <div className="instructor-photo">🌿</div>
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
                {instructor.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
