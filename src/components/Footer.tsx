import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* Columnas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Marca */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <span className="text-2xl font-bold tracking-widest">DONATON</span>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Plataforma digital de coordinación humanitaria que conecta
              donaciones con necesidades reales, asegurando trazabilidad y
              transparencia en cada entrega.
            </p>
          </div>

          {/* Enlaces */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Navegación
            </h4>
            <a href="#como-funciona" className="text-gray-400 text-sm hover:text-teal transition-colors">
              Cómo funciona
            </a>
            <a href="#mision" className="text-gray-400 text-sm hover:text-teal transition-colors">
              Nuestro propósito
            </a>
            <a href="#colaboradores" className="text-gray-400 text-sm hover:text-teal transition-colors">
              Colaboradores
            </a>
            <Link to="/donar" className="text-gray-400 text-sm hover:text-teal transition-colors">
              Quiero donar
            </Link>
          </div>

          {/* Contacto */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Contacto
            </h4>
            <span className="text-gray-400 text-sm">contacto@donaton.cl</span>
            <span className="text-gray-400 text-sm">Santiago, Chile</span>
            <Link
              to="/login"
              className="text-teal text-sm font-semibold hover:underline mt-2"
            >
              Ingresar al sistema →
            </Link>
          </div>

        </div>

        {/* Línea divisoria */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-gray-500 text-xs">
            © 2026 Donaton. Todos los derechos reservados.
          </span>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-500 text-xs hover:text-teal transition-colors">
              Términos
            </a>
            <a href="#" className="text-gray-500 text-xs hover:text-teal transition-colors">
              Privacidad
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}