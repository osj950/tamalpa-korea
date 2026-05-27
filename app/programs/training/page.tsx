import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata = {
  title: '트레이닝 프로그램 | 한국타말파연구소',
}

export default function TrainingPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: '88px' }}>

        {/* 페이지 헤더 */}
        <section style={{ background: 'var(--dark)', padding: '80px 60px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div className="section-eyebrow" style={{ color: 'var(--gold-light)' }}>Education</div>
            <h1 className="section-title" style={{ color: 'var(--gold-pale)' }}>
              트레이닝 <em>프로그램</em>
            </h1>
            <p className="section-title-ko" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Professional Training Program
            </p>
            <p className="section-desc" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '36px' }}>
              Tamalpa Life/Art Process를 깊이 있게 배우는 전문가 과정입니다.
              개인의 구현에서 전문 실습, 슈퍼비전까지 3단계로 성장합니다.
            </p>
            <a href="/programs/training/apply" className="btn-apply">전문가과정 신청하기</a>
          </div>
        </section>

        {/* Level 1 */}
        <section style={{ background: 'white', padding: '80px 60px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }} className="level-grid">
            <div>
              <div className="section-eyebrow">Level 1</div>
              <h2 className="section-title">개인 <em>구현</em></h2>
              <p className="section-title-ko">Personal Embodiment</p>
              <p className="section-desc">
                몸의 지혜를 통해 자신의 삶과 예술을 탐구합니다. 움직임, 댄스, 시각 예술, 글쓰기를
                통합하여 자기 이해와 표현의 언어를 개발합니다.
              </p>
              <div className="about-values" style={{ marginTop: '40px' }}>
                <div className="value-item">
                  <div className="value-num">01</div>
                  <div>
                    <h4>몸 인식 및 표현</h4>
                    <p>신체 감각과 움직임을 통한 자기 탐구. 몸이 전하는 언어를 배웁니다.</p>
                  </div>
                </div>
                <div className="value-item">
                  <div className="value-num">02</div>
                  <div>
                    <h4>통합 예술 탐구</h4>
                    <p>댄스, 드로잉, 글쓰기 등 다양한 예술 매체를 통한 내면 탐구.</p>
                  </div>
                </div>
                <div className="value-item">
                  <div className="value-num">03</div>
                  <div>
                    <h4>Life/Art 연결</h4>
                    <p>삶의 경험과 예술적 표현을 하나로 잇는 Tamalpa 방법론 체험.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-card">
              <blockquote>
                &ldquo;Level 1은 자신의 몸과 깊이 만나는 시간입니다.
                판단 없이 느끼고, 자유롭게 표현하는 법을 배웁니다.&rdquo;
              </blockquote>
              <cite>— Tamalpa Korea Instructor</cite>
            </div>
          </div>
        </section>

        {/* Level 2 */}
        <section style={{ background: 'var(--gold-very-pale)', padding: '80px 60px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }} className="level-grid">
            <div className="about-card">
              <blockquote>
                &ldquo;Level 2는 배운 것을 타인과 나누는 과정입니다.
                치료사, 교육자, 예술가로서의 전문 역량을 키웁니다.&rdquo;
              </blockquote>
              <cite>— Tamalpa Korea Instructor</cite>
            </div>
            <div>
              <div className="section-eyebrow">Level 2</div>
              <h2 className="section-title">전문 <em>실습</em></h2>
              <p className="section-title-ko">Professional Application</p>
              <p className="section-desc">
                Level 1을 수료한 후 진행되는 심화 과정입니다. 치료사·교육자·예술가로서
                Tamalpa 방법론을 실제 현장에 적용하는 역량을 개발합니다.
              </p>
              <div className="about-values" style={{ marginTop: '40px' }}>
                <div className="value-item">
                  <div className="value-num">01</div>
                  <div>
                    <h4>퍼실리테이션 실습</h4>
                    <p>그룹과 개인 세션을 이끄는 퍼실리테이터 역량 개발.</p>
                  </div>
                </div>
                <div className="value-item">
                  <div className="value-num">02</div>
                  <div>
                    <h4>임상 및 교육 적용</h4>
                    <p>치료, 교육, 커뮤니티 현장에서의 표현예술치료 적용 방법 연구.</p>
                  </div>
                </div>
                <div className="value-item">
                  <div className="value-num">03</div>
                  <div>
                    <h4>수료 및 자격</h4>
                    <p>미국 Tamalpa Institute 공인 수료증 취득 과정.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Level 3 */}
        <section style={{ background: 'white', padding: '80px 60px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }} className="level-grid">
            <div>
              <div className="section-eyebrow">Level 3</div>
              <h2 className="section-title">슈퍼비전 <em>&amp; 심화</em></h2>
              <p className="section-title-ko">Supervision & Advanced Practice</p>
              <p className="section-desc">
                Level 2를 수료한 후 지속적인 성장을 위한 심화 과정입니다. 슈퍼비전을 통해
                자신의 실천을 성찰하고, 독립적인 전문가로서의 정체성을 확립합니다.
              </p>
              <div className="about-values" style={{ marginTop: '40px' }}>
                <div className="value-item">
                  <div className="value-num">01</div>
                  <div>
                    <h4>그룹 슈퍼비전</h4>
                    <p>동료 및 시니어 강사와 함께 실천 사례를 나누고 피드백을 주고받습니다.</p>
                  </div>
                </div>
                <div className="value-item">
                  <div className="value-num">02</div>
                  <div>
                    <h4>개인 연구 프로젝트</h4>
                    <p>자신만의 Tamalpa 실천 방식을 개발하고 심화하는 독립 연구.</p>
                  </div>
                </div>
                <div className="value-item">
                  <div className="value-num">03</div>
                  <div>
                    <h4>공인 프랙티셔너</h4>
                    <p>Tamalpa Institute 공인 프랙티셔너 자격 취득 및 네트워크 합류.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-card">
              <blockquote>
                &ldquo;Level 3는 스스로 길을 여는 과정입니다.
                슈퍼비전과 연구를 통해 고유한 목소리를 발견합니다.&rdquo;
              </blockquote>
              <cite>— Tamalpa Korea Instructor</cite>
            </div>
          </div>
        </section>

        {/* 신청 안내 */}
        <section style={{ background: 'var(--gold)', padding: '80px 60px', textAlign: 'center' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="section-eyebrow" style={{ color: 'rgba(255,255,255,0.7)', justifyContent: 'center' }}>
              Application
            </div>
            <h2 className="section-title" style={{ color: 'white', textAlign: 'center' }}>
              전문가과정 <em style={{ color: 'var(--dark)' }}>신청하기</em>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', lineHeight: '1.9', marginBottom: '40px', fontWeight: 300 }}>
              신청서 제출 후 담당자가 확인하여 연락드립니다.
            </p>
            <a href="/programs/training/apply" className="btn-apply">지금 신청하기</a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
