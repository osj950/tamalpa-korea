export default function Anna() {
  const timeline = [
    { year: '1920', text: '일리노이주 위네트카 출생. 어린 시절부터 댄스를 통해 자신을 표현하기 시작' },
    { year: '1945', text: '캘리포니아로 이주, 샌프란시스코 댄스 씬의 중심 인물로 부상' },
    { year: '1978', text: '딸 Daria Halprin과 함께 Tamalpa Institute 설립, 표현예술치료 분야를 개척' },
    { year: '1980s', text: '암 진단 후 댄스를 통한 치유 작업으로 전 세계적 주목을 받음' },
    { year: '2021', text: '향년 100세로 별세. 그녀의 유산은 전 세계 50여 개국에서 이어지고 있음' },
  ]

  return (
    <section className="anna" id="anna">
      <div className="anna-inner">
        <div className="anna-portrait">🌿</div>
        <div className="anna-content">
          <div className="section-eyebrow">Founder</div>
          <h2 className="section-title">
            Anna<br /><em>Halprin</em>
          </h2>
          <p className="section-title-ko">안나 할프린</p>
          <p className="section-desc">
            현대 포스트모던 댄스의 선구자이자 표현예술치료의 창시자.
            100년의 생애 동안 몸과 예술, 치유를 하나로 잇는 혁명적인 작업을 이어왔습니다.
          </p>
          <div className="anna-timeline">
            {timeline.map((item) => (
              <div className="timeline-item" key={item.year}>
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-dot" />
                <div className="timeline-text">{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
