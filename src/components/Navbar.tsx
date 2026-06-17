import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const { isAuthenticated, usuario, logout } = useAuth()
  const navigate = useNavigate()

  const handleIngresar = () => {
    if (isAuthenticated && usuario) {
      if (usuario.rol === 'ADMIN')        navigate('/admin')
      if (usuario.rol === 'COORDINADOR')  navigate('/coordinador')
      if (usuario.rol === 'VOLUNTARIO')   navigate('/voluntario')
    } else {
      navigate('/login')
    }
  }

  return (
    <nav className="bg-navy w-full sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-white text-xl font-bold tracking-widest">
          DONATON
        </Link>

        {/* Links — desktop */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#como-funciona"
            className="text-gray-300 hover:text-teal text-sm transition-colors duration-200"
          >
            Cómo funciona
          </a>
          <a
            href="#mision"
            className="text-gray-300 hover:text-teal text-sm transition-colors duration-200"
          >
            Impacto
          </a>
          <a
            href="#colaboradores"
            className="text-gray-300 hover:text-teal text-sm transition-colors duration-200"
          >
            Contacto
          </a>
        </div>

        {/* Botón derecha — desktop */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="text-gray-300 text-sm">
                {usuario?.nombre}
              </span>
              <button
                onClick={logout}
                className="text-sm text-gray-300 hover:text-coral transition-colors"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <button
              onClick={handleIngresar}
              className="bg-teal text-navy text-sm font-semibold px-5 py-2.5 rounded-lg
                         hover:bg-teal/90 transition-all duration-200"
            >
              Ingresar al sistema
            </button>
          )}
        </div>

        {/* Hamburguesa — mobile */}
        <button
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="md:hidden text-white focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuAbierto
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
            }
          </svg>
        </button>

      </div>

      {/* Menú mobile */}
      {menuAbierto && (
        <div className="md:hidden bg-navy border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          <a href="#como-funciona" className="text-gray-300 text-sm hover:text-teal">
            Cómo funciona
          </a>
          <a href="#mision" className="text-gray-300 text-sm hover:text-teal">
            Impacto
          </a>
          <a href="#colaboradores" className="text-gray-300 text-sm hover:text-teal">
            Contacto
          </a>
          <button
            onClick={handleIngresar}
            className="bg-teal text-navy text-sm font-semibold px-5 py-2.5 rounded-lg w-full"
          >
            Ingresar al sistema
          </button>
        </div>
      )}
    </nav>
  )
}