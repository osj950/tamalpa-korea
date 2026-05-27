export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="nav-logo-text">
            <span className="en">Korea Tamalpa Institute</span>
            <span className="ko">한국타말파연구소</span>
          </div>
          <p>움직임 기반 표현예술치료 교육기관<br />Tamalpa Institute 공인 한국 연구소</p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <h5>Tamalpa란</h5>
            <ul>
              <li><a href="/#about">연구소 소개</a></li>
              <li><a href="/#anna">Anna Halprin</a></li>
              <li><a href="/#about">Life/Art Process</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>교육 프로그램</h5>
            <ul>
              <li><a href="/programs/training">트레이닝 프로그램</a></li>
              <li><a href="/programs/workshops">워크숍</a></li>
              <li><a href="/programs/instructors">강사 소개</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>연구 &amp; 커뮤니티</h5>
            <ul>
              <li><a href="/resources/articles">아티클</a></li>
              <li><a href="/resources/library">자료실</a></li>
              <li><a href="/community/news">소식</a></li>
              <li><a href="/#contact">문의하기</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2024 한국타말파연구소. All rights reserved.</span>
        <span>Affiliated with Tamalpa Institute, California</span>
      </div>
    </footer>
  )
}
