import { useState } from 'react'
import { Link } from 'react-router-dom'

type EstadoCentro = 'ACTIVO' | 'SATURADO' | 'CERRADO'

interface Centro {
  id: number
  nombre: string
  direccion: string
  region: string
  comuna: string
  capacidad: number
  ocupado: number
  estado: EstadoCentro
}

// Catálogo reducido de demostración — en el backend vendrá de las tablas Region y Comuna
const regionesComunas: Record<string, string[]> = {
  'Metropolitana':  ['Santiago', 'Maipú', 'Las Condes', 'La Florida', 'Puente Alto'],
  'Valparaíso':     ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana'],
  'Biobío':         ['Concepción', 'Talcahuano', 'Chiguayante', 'San Pedro de la Paz'],
  'Coquimbo':       ['La Serena', 'Coquimbo', 'Ovalle'],
  'Araucanía':      ['Temuco', 'Padre Las Casas', 'Villarrica', 'Pucón'],
}

const regiones = Object.keys(regionesComunas)

// Datos de ejemplo en memoria
const centrosIniciales: Centro[] = [
  { id: 1, nombre: 'Centro Norte',  direccion: 'Av. Principal 123', region: 'Metropolitana', comuna: 'Santiago',     capacidad: 1000, ocupado: 650,  estado: 'ACTIVO' },
  { id: 2, nombre: 'Centro Costa',  direccion: 'Calle Mar 456',     region: 'Valparaíso',    comuna: 'Viña del Mar', capacidad: 800,  ocupado: 780,  estado: 'SATURADO' },
  { id: 3, nombre: 'Centro Sur',    direccion: 'Los Aromos 789',    region: 'Biobío',        comuna: 'Concepción',   capacidad: 600,  ocupado: 0,    estado: 'CERRADO' },
]

const coloresEstado: Record<EstadoCentro, string> = {
  ACTIVO:   'bg-green-100 text-green-700',
  SATURADO: 'bg-amber-100 text-amber-700',
  CERRADO:  'bg-gray-200 text-gray-600',
}

export default function AdminCentros() {
  const [centros, setCentros] = useState<Centro[]>(centrosIniciales)
  const [form, setForm] = useState({
    nombre: '',
    direccion: '',
    region: '',
    comuna: '',
    capacidad: '',
  })

  // Comunas disponibles según la región elegida
  const comunasDisponibles = form.region ? regionesComunas[form.region] : []

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    // Si cambia la región, se resetea la comuna (clave para los selectores encadenados)
    if (name === 'region') {
      setForm({ ...form, region: value, comuna: '' })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const handleSubmit = () => {
    if (!form.nombre || !form.direccion || !form.region || !form.comuna || !form.capacidad) {
      alert('Por favor completa todos los campos, incluyendo región y comuna.')
      return
    }

    const nuevo: Centro = {
      id: centros.length + 1,
      nombre: form.nombre,
      direccion: form.direccion,
      region: form.region,
      comuna: form.comuna,
      capacidad: Number(form.capacidad),
      ocupado: 0,
      estado: 'ACTIVO',
    }

    setCentros([nuevo, ...centros])
    setForm({ nombre: '', direccion: '', region: '', comuna: '', capacidad: '' })
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">

        {/* Volver */}
        <Link to="/admin" className="text-gray-400 text-sm hover:text-navy transition-colors w-fit">
          ← Volver al dashboard
        </Link>

        {/* Encabezado */}
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-navy">Centros de acopio</h1>
          <p className="text-gray-500 text-sm">
            Crea y administra los centros, sus capacidades y ubicación.
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 className="text-lg font-semibold text-navy mb-4">Crear nuevo centro</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Nombre del centro"
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm
                         focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal"
            />
            <input
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              placeholder="Dirección"
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm
                         focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal"
            />
            <input
              name="capacidad"
              type="number"
              value={form.capacidad}
              onChange={handleChange}
              placeholder="Capacidad (kg)"
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm
                         focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal"
            />

            {/* Selector de REGIÓN */}
            <select
              name="region"
              value={form.region}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white
                         focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal"
            >
              <option value="">Selecciona región...</option>
              {regiones.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>

            {/* Selector de COMUNA — deshabilitado hasta elegir región */}
            <select
              name="comuna"
              value={form.comuna}
              onChange={handleChange}
              disabled={!form.region}
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white
                         focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal
                         disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              <option value="">
                {form.region ? 'Selecciona comuna...' : 'Primero elige región'}
              </option>
              {comunasDisponibles.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

          </div>
          <button
            onClick={handleSubmit}
            className="bg-teal text-navy font-semibold px-6 py-2.5 rounded-lg
                       hover:bg-teal/90 transition-all duration-200 mt-4"
          >
            Crear centro
          </button>
        </div>

        {/* Tarjetas de centros */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-navy">
            Centros registrados ({centros.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {centros.map((c) => {
              const porcentaje = Math.min(100, Math.round((c.ocupado / c.capacidad) * 100))
              return (
                <div key={c.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-navy">{c.nombre}</h3>
                      <p className="text-sm text-gray-500">{c.comuna}, {c.region}</p>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${coloresEstado[c.estado]}`}>
                      {c.estado}
                    </span>
                  </div>

                  <p className="text-xs text-gray-400">{c.direccion}</p>

                  {/* Barra de capacidad */}
                  <div className="flex flex-col gap-1">
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300
                          ${porcentaje >= 95 ? 'bg-red-500' : porcentaje >= 70 ? 'bg-amber-500' : 'bg-teal'}`}
                        style={{ width: `${porcentaje}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">
                      {c.ocupado} / {c.capacidad} kg ({porcentaje}%)
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}