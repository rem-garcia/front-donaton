import Navbar from '../components/Navbar'
import Hero   from '../components/Hero'
import ComoFunciona from '../components/ComoFunsiona'
import MisionVision from '../components/MisionVision'
import ColaboradoresCarrusel from '../components/Colaboradores'
import Footer from '../components/Footer'

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <ComoFunciona />
        <MisionVision />
        <ColaboradoresCarrusel />
        <Footer />
      </main>
    </div>
  )
}