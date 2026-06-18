import { useState, useEffect } from 'react'
import type { Donacion } from '../types'

const API = import.meta.env.VITE_API_URL

const coloresEstado: Record<Donacion['estado'], string> = {
  PENDIENTE:   'bg-gray-100 text-gray-600',
  RECIBIDA:    'bg-blue-100 text-blue-700',
  DISPONIBLE:  'bg-teal/20 text-teal',
  ASIGNADA:    'bg-amber-100 text-amber-700',
  EN_TRANSITO: 'bg-purple-100 text-purple-700',
  ENTREGADA:   'bg-green-100 text-green-700',
}

export default function VoluntarioPanel() {
  const [donaciones, setDonaciones] = useState<Donacion[]>([])
  const [cargando, setCargando]     = useState(true)
  const [form, setForm]             = useState({
    tipo: '',
    cantidad: '',
    unidad: '',
    donanteNombre: '',
  })

  useEffect(() => {
    fetch(`${API}/api/donaciones`)
      .then((r) => r.json())
      .then((data) => setDonaciones(data))
      .catch((e) => console.error('Error cargando donaciones:', e))
      .finally(() => setCargando(false))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!form.tipo || !form.cantidad) {
      alert('Tipo y cantidad son obligatorios.')
      return
    }

    try {
      const res = await fetch(`${API}/api/donaciones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo:          form.tipo,
          cantidad:      Number(form.cantidad),
          unidad:        form.unidad || 'unidades',
          origen:        form.donanteNombre
                           ? `Recibido de ${form.donanteNombre}`
                           : 'Centro de acopio',
          donanteNombre: form.donanteNombre || 'Anónimo',
          donanteCorreo: 'sin-correo@donaton.cl',
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Error al registrar')
      }

      const nueva: Donacion = await res.json()
      setDonaciones([nueva, ...donaciones])
      setForm({ tipo: '', cantidad: '', unidad: '', donanteNombre: '' })

    } catch (e) {
      console.error(e)
      alert('No se pudo registrar la donación.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-200 px-6 py-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">

        {/* Encabezado */}
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-navy">Panel del Voluntario</h1>
          <p className="text-gray-500 text-sm">
            Registra las donaciones recibidas en el centro de acopio.
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 className="text-lg font-semibold text-navy mb-4">Registrar nueva donación</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              placeholder="Tipo (ej. Ropa)"
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm
                         focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal"
            />
            <input
              name="cantidad"
              type="number"
              value={form.cantidad}
              onChange={handleChange}
              placeholder="Cantidad"
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm
                         focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal"
            />
            <input
              name="unidad"
              value={form.unidad}
              onChange={handleChange}
              placeholder="Unidad (kg, cajas)"
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm
                         focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal"
            />
            <input
              name="donanteNombre"
              value={form.donanteNombre}
              onChange={handleChange}
              placeholder="Nombre donante (opcional)"
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm
                         focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-teal text-navy font-semibold px-6 py-2.5 rounded-lg
                       hover:bg-teal/90 transition-all duration-200 mt-4"
          >
            Registrar donación
          </button>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-navy">
              Donaciones registradas ({donaciones.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            {cargando ? (
              <p className="text-sm text-gray-400 px-6 py-8">Cargando donaciones...</p>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 text-left">
                  <tr>
                    <th className="px-6 py-3 font-semibold">ID</th>
                    <th className="px-6 py-3 font-semibold">Tipo</th>
                    <th className="px-6 py-3 font-semibold">Cantidad</th>
                    <th className="px-6 py-3 font-semibold">OT</th>
                    <th className="px-6 py-3 font-semibold">Fecha</th>
                    <th className="px-6 py-3 font-semibold">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {donaciones.map((d) => (
                    <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-gray-700">#{d.id}</td>
                      <td className="px-6 py-4 font-medium text-navy">{d.tipo}</td>
                      <td className="px-6 py-4 text-gray-700">{d.cantidad}</td>
                      <td className="px-6 py-4 text-gray-500">{d.ot ?? '—'}</td>
                      <td className="px-6 py-4 text-gray-500">{d.fecha}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${coloresEstado[d.estado]}`}>
                          {d.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}