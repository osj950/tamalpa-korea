'use client'

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-left">
        <div className="hero-tag">Korea Tamalpa Institute</div>
        <h1>
          움직임으로<br />
          <em>치유하고</em><br />
          변화합니다
        </h1>
        <p className="hero-ko">한국타말파연구소</p>
        <p className="hero-desc">
          몸의 지혜와 예술의 창의성을 통해 진정한 표현과 변화를 탐구하는
          움직임 기반 표현예술치료 교육기관입니다.
        </p>
        <div className="hero-btns">
          <a href="#programs" className="btn-primary">프로그램 보기</a>
          <a href="#about" className="btn-outline">연구소 소개</a>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-logo-large">
          <img src="/logo.png" alt="Tamalpa Logo" onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0' }} />
        </div>
        <div className="hero-quote">
          <p>&ldquo;The body contains and reveals our entire life experience.&rdquo;<br />— Anna Halprin</p>
        </div>
      </div>
    </section>
  )
}
