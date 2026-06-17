import { useNavigate } from 'react-router-dom'

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section className="bg-navy min-h-[90vh] flex flex-col items-center justify-center text-center px-6 py-20 gap-8">

      {/* Badge */}
      <div className="flex items-center gap-2 bg-teal/10 border border-teal/30 px-4 py-2 rounded-full">
        <span className="w-2 h-2 rounded-full bg-teal" />
        <span className="text-teal text-sm font-medium">
          Coordinación humanitaria · Chile
        </span>
      </div>

      {/* Título */}
      <h1 className="text-white text-5xl md:text-6xl font-bold leading-tight max-w-3xl">
        Donaciones que llegan
        <br />
        <span className="text-teal">a donde más importan</span>
      </h1>

      {/* Subtítulo */}
      <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
        Donaton conecta donaciones con necesidades reales en tiempo real.
        Reducimos el desperdicio mediante trazabilidad digital,
        asegurando que cada aporte llegue a quien más lo necesita.
      </p>

      {/* Botones */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={() => navigate('/donar')}
          className="bg-teal text-navy font-semibold px-8 py-3.5 rounded-xl
                     hover:bg-teal/90 transition-all duration-200 text-base"
        >
          Quiero donar
        </button>
        <button
          onClick={() => navigate('/login')}
          className="border border-white text-white font-semibold px-8 py-3.5 rounded-xl
                     hover:bg-white/10 transition-all duration-200 text-base"
        >
          Ingresar al sistema
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-gray-500 text-xs">Descubre más</span>
        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
        </svg>
      </div>

    </section>
  )
}