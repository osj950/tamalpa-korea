export default function Programs() {
  return (
    <section className="programs" id="programs">
      <div className="programs-inner">
        <div className="programs-header">
          <div className="section-eyebrow">Education</div>
          <h2 className="section-title">교육 <em>프로그램</em></h2>
          <p className="section-title-ko">Programs &amp; Workshops</p>
          <p className="section-desc">몸과 예술을 통해 자신과 타인을 깊이 이해하는 전문가 양성 과정입니다.</p>
        </div>
        <div className="programs-grid">
          <a href="/programs/training" className="program-card" style={{ textDecoration: 'none' }}>
            <div className="program-num">01</div>
            <h3>
              트레이닝 프로그램
              <small>Professional Training</small>
            </h3>
            <p>Tamalpa Life/Art Process를 깊이 있게 배우는 전문가 과정. Level 1 개인 구현부터 Level 2 전문 실습까지.</p>
            <span className="program-tag">Certificate</span>
          </a>
          <a href="/programs/workshops" className="program-card" style={{ textDecoration: 'none' }}>
            <div className="program-num">02</div>
            <h3>
              워크숍
              <small>Workshops</small>
            </h3>
            <p>단기 집중 워크숍으로 타말파의 핵심 방법론을 체험합니다. 치료사, 교육자, 예술가 모두 환영합니다.</p>
            <span className="program-tag">Open</span>
          </a>
          <a href="/programs/instructors" className="program-card" style={{ textDecoration: 'none' }}>
            <div className="program-num">03</div>
            <h3>
              강사 소개
              <small>Instructors</small>
            </h3>
            <p>미국 본부와 한국의 공인 타말파 강사진이 함께합니다. 국제적 수준의 교육을 제공합니다.</p>
            <span className="program-tag">US · Korea</span>
          </a>
        </div>
      </div>
    </section>
  )
}
