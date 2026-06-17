import Navbar from '../components/Navbar'

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <div className="min-h-screen bg-navy flex items-center justify-center">
          <h1 className="text-4xl font-bold text-teal">Hero aquí</h1>
        </div>
      </main>
    </div>
  )
}