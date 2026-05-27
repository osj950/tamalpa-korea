import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Anna from '@/components/Anna'
import Programs from '@/components/Programs'
import Instructors from '@/components/Instructors'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Anna />
        <Programs />
        <Instructors />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
