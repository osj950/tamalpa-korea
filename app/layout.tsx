import type { Metadata } from 'next'
import { Cormorant_Garamond, Noto_Serif_KR, Noto_Sans_KR } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const notoSerifKR = Noto_Serif_KR({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-noto-serif-kr',
  display: 'swap',
  preload: false,
})

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-noto-sans-kr',
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  title: '한국타말파연구소',
  description: '몸의 지혜와 예술의 창의성을 통해 진정한 표현과 변화를 탐구하는 움직임 기반 표현예술치료 교육기관입니다.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ko"
      className={`${cormorant.variable} ${notoSerifKR.variable} ${notoSansKR.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
