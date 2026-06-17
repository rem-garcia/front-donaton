import React, { useState } from 'react'
import type { Donacion } from '../types'

// Datos de ejemplo en memoria — se reemplazan con el backend
const donacionesIniciales: Donacion[] = [
  {
    id: 1, tipo: 'Ropa', cantidad: 50, unidad: 'unidades', origen: 'Campaña Las Condes', estado: 'RECIBIDA', fechaCreacion: '2026-06-15', usuarioId: 1,
    necesidadId: 0,
    centroAcopioId: 0
  },
  {
    id: 2, tipo: 'Alimentos', cantidad: 30, unidad: 'cajas', origen: 'Donante particular', estado: 'DISPONIBLE', fechaCreacion: '2026-06-16', usuarioId: 1,
    necesidadId: 0,
    centroAcopioId: 0
  },
  {
    id: 3, tipo: 'Agua', cantidad: 200, unidad: 'litros', origen: 'Empresa Aguas Andinas', estado: 'RECIBIDA', fechaCreacion: '2026-06-17', usuarioId: 1,
    necesidadId: 0,
    centroAcopioId: 0
  },
]

// Colores por estado para los badges
const coloresEstado: Record<Donacion['estado'], string> = {
  RECIBIDA:    'bg-blue-100 text-blue-700',
  DISPONIBLE:  'bg-teal/20 text-teal',
  ASIGNADA:    'bg-amber-100 text-amber-700',
  EN_TRANSITO: 'bg-purple-100 text-purple-700',
  ENTREGADA:   'bg-green-100 text-green-700',
}

export default function VoluntarioPanel() {
  const [donaciones, setDonaciones] = useState<Donacion[]>(donacionesIniciales)
  const [form, setForm] = useState({
    tipo: '',
    cantidad: '',
    unidad: '',
    origen: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (!form.tipo || !form.cantidad || !form.unidad || !form.origen) {
      alert('Por favor completa todos los campos.')
      return
    }

    const nueva: Donacion = {
      id: donaciones.length + 1,
      tipo: form.tipo,
      cantidad: Number(form.cantidad),
      unidad: form.unidad,
      origen: form.origen,
      estado: 'RECIBIDA',
      fechaCreacion: new Date().toISOString().split('T')[0],
      usuarioId: 1,
      necesidadId: 0,
      centroAcopioId: 0
    }

    setDonaciones([nueva, ...donaciones])
    setForm({ tipo: '', cantidad: '', unidad: '', origen: '' })
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

        {/* Formulario de registro */}
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
              name="origen"
              value={form.origen}
              onChange={handleChange}
              placeholder="Origen"
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

        {/* Tabla de donaciones */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-navy">
              Donaciones registradas ({donaciones.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 text-left">
                <tr>
                  <th className="px-6 py-3 font-semibold">ID</th>
                  <th className="px-6 py-3 font-semibold">Tipo</th>
                  <th className="px-6 py-3 font-semibold">Cantidad</th>
                  <th className="px-6 py-3 font-semibold">Origen</th>
                  <th className="px-6 py-3 font-semibold">Fecha</th>
                  <th className="px-6 py-3 font-semibold">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {donaciones.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-700">#{d.id}</td>
                    <td className="px-6 py-4 font-medium text-navy">{d.tipo}</td>
                    <td className="px-6 py-4 text-gray-700">{d.cantidad} {d.unidad}</td>
                    <td className="px-6 py-4 text-gray-700">{d.origen}</td>
                    <td className="px-6 py-4 text-gray-500">{d.fechaCreacion}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${coloresEstado[d.estado]}`}>
                        {d.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}