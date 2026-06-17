import Navbar from '../components/Navbar'
import Hero   from '../components/Hero'

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  )
}