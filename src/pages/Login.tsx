import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

type Rol = 'ADMIN' | 'COORDINADOR' | 'VOLUNTARIO'

const roles: { valor: Rol; etiqueta: string }[] = [
  { valor: 'ADMIN',       etiqueta: 'Administrador' },
  { valor: 'COORDINADOR', etiqueta: 'Coordinador' },
  { valor: 'VOLUNTARIO',  etiqueta: 'Voluntario' },
]

export default function Login() {
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [rol, setRol] = useState<Rol>('ADMIN')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = () => {
    if (!correo || !password) {
      alert('Por favor ingresa correo y contraseña.')
      return
    }

    //imulación temporal — se reemplaza cuando exista el backend
    const tokenFalso = 'token-demo-' + rol.toLowerCase()
    const usuarioFalso = {
      id: 1,
      nombre: 'Usuario',
      apellido: 'Demo',
      correo,
      rol,
      fecha: new Date().toISOString(),
    }

    login(tokenFalso, usuarioFalso)

    // Redirige según el rol elegido
    if (rol === 'ADMIN')       navigate('/admin')
    if (rol === 'COORDINADOR') navigate('/coordinador')
    if (rol === 'VOLUNTARIO')  navigate('/voluntario')
  }

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 md:p-10 flex flex-col gap-6">

        {/* Encabezado */}
        <div className="text-center flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-navy">Iniciar sesión</h1>
          <p className="text-gray-500 text-sm">
            Ingresa al sistema de gestión de Donaton
          </p>
        </div>

        {/* Correo */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-navy">Correo</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="tucorreo@donaton.cl"
            className="border border-gray-300 rounded-lg px-4 py-3 text-sm
                       focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal"
          />
        </div>

        {/* Contraseña */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-navy">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="border border-gray-300 rounded-lg px-4 py-3 text-sm
                       focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal"
          />
        </div>

        {/*Selector de rol temporal — quitar cuando el backend devuelva el rol */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-navy">
            Entrar como <span className="text-gray-400 font-normal">(temporal)</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {roles.map((r) => (
              <button
                key={r.valor}
                type="button"
                onClick={() => setRol(r.valor)}
                className={`text-xs font-semibold px-2 py-2.5 rounded-lg border transition-all duration-200
                  ${rol === r.valor
                    ? 'bg-teal text-navy border-teal'
                    : 'bg-white text-gray-500 border-gray-300 hover:border-teal'
                  }`}
              >
                {r.etiqueta}
              </button>
            ))}
          </div>
        </div>

        {/* Botón ingresar */}
        <button
          onClick={handleSubmit}
          className="bg-teal text-navy font-semibold px-6 py-3 rounded-lg
                     hover:bg-teal/90 transition-all duration-200 mt-2"
        >
          Ingresar
        </button>

        {/* Volver */}
        <button
          onClick={() => navigate('/')}
          className="text-gray-400 text-sm hover:text-navy transition-colors"
        >
          ← Volver al inicio
        </button>

      </div>
    </div>
  )
}