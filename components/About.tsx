'use client'

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about-inner">
        <div>
          <div className="section-eyebrow">About Tamalpa</div>
          <h2 className="section-title">
            Tamalpa<br /><em>Life/Art Process</em>
          </h2>
          <p className="section-title-ko">타말파란 무엇인가</p>
          <p className="section-desc">
            1978년 Anna Halprin과 Daria Halprin이 설립한 Tamalpa Institute의 핵심 방법론으로,
            움직임·댄스·그림·글쓰기를 통해 삶의 경험을 예술적 표현으로 연결합니다.
          </p>
          <div className="about-values">
            <div className="value-item">
              <div className="value-num">01</div>
              <div>
                <h4>몸 기반 접근</h4>
                <p>신체 감각을 모든 치유와 배움의 출발점으로 삼습니다. 몸은 우리 삶의 전체 경험을 담고 있습니다.</p>
              </div>
            </div>
            <div className="value-item">
              <div className="value-num">02</div>
              <div>
                <h4>통합 예술 표현</h4>
                <p>움직임, 댄스, 시각 예술, 글쓰기를 통합적으로 활용하여 깊은 자기 탐구를 지원합니다.</p>
              </div>
            </div>
            <div className="value-item">
              <div className="value-num">03</div>
              <div>
                <h4>사회적 변화</h4>
                <p>개인의 치유에서 공동체와 세상의 변화로 이어지는 예술의 사회적 힘을 믿습니다.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="about-visual">
          <div className="about-card">
            <div className="about-card-logo">
              <img src="/logo.png" alt="" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
            </div>
            <blockquote>
              &ldquo;우리는 몸 안에서, 몸을 통해 살아갑니다. 표현, 치유, 변화, 그리고 변환은 모두 구현의 행위입니다.&rdquo;
            </blockquote>
            <cite>— Tamalpa Institute</cite>
          </div>
        </div>
      </div>
    </section>
  )
}
