import { useState, useEffect } from 'react'
import type { Donacion, Necesidad } from '../types'

const API = import.meta.env.VITE_API_URL

const coloresEstado: Record<Donacion['estado'], string> = {
  PENDIENTE:   'bg-gray-100 text-gray-600',
  RECIBIDA:    'bg-blue-100 text-blue-700',
  DISPONIBLE:  'bg-teal/20 text-teal',
  ASIGNADA:    'bg-amber-100 text-amber-700',
  EN_TRANSITO: 'bg-purple-100 text-purple-700',
  ENTREGADA:   'bg-green-100 text-green-700',
}

const coloresPrioridad: Record<Necesidad['prioridad'], string> = {
  CRITICA: 'bg-red-100 text-red-700',
  ALTA:    'bg-orange-100 text-orange-700',
  MEDIA:   'bg-amber-100 text-amber-700',
  BAJA:    'bg-gray-100 text-gray-600',
}

export default function CoordinadorPanel() {
  const [donaciones, setDonaciones]           = useState<Donacion[]>([])
  const [necesidades, setNecesidades]         = useState<Necesidad[]>([])
  const [cargando, setCargando]               = useState(true)
  const [donacionAsignar, setDonacionAsignar] = useState<Donacion | null>(null)

  useEffect(() => {
    fetch(`${API}/api/donaciones`)
      .then((r) => r.json())
      .then((data) => setDonaciones(data))
      .catch((e) => console.error('Error cargando donaciones:', e))
      .finally(() => setCargando(false))

    fetch(`${API}/api/necesidades`)
      .then((r) => r.json())
      .then((data) => setNecesidades(data))
      .catch((e) => console.error('Error cargando necesidades:', e))
  }, [])

  const cambiarEstado = async (
  id: number,
  nuevoEstado: Donacion['estado'],
  extra?: Record<string, unknown>
) => {
  try {
    const res = await fetch(`${API}/api/donaciones/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nuevoEstado, ...extra }), // ← era 'estado', ahora 'nuevoEstado'
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.error || 'Error al cambiar estado')
    }

    const actualizada: Donacion = await res.json()
    setDonaciones((prev) =>
      prev.map((d) => (d.id === actualizada.id ? actualizada : d))
    )
  } catch (e) {
    console.error(e)
    alert(e instanceof Error ? e.message : 'Error de conexión')
  }
}

  const verificar        = (id: number) => cambiarEstado(id, 'DISPONIBLE')
  const marcarEnTransito = (id: number) => cambiarEstado(id, 'EN_TRANSITO')
  const confirmarEntrega = (id: number) => cambiarEstado(id, 'ENTREGADA')

  const asignar = async (donacion: Donacion, necesidad: Necesidad) => {
    await cambiarEstado(donacion.id, 'ASIGNADA', { necesidadId: necesidad.id })
    setNecesidades((prev) =>
      prev.map((n) => {
        if (n.id !== necesidad.id) return n
        const nuevaCobertura = n.cantCubierta + donacion.cantidad
        return {
          ...n,
          cantCubierta: nuevaCobertura,
          estado: nuevaCobertura >= n.cantRequerida ? 'CUBIERTA' : n.estado,
        }
      })
    )
    setDonacionAsignar(null)
  }

  const accionPorEstado = (d: Donacion) => {
    switch (d.estado) {
      case 'RECIBIDA':
        return (
          <button
            onClick={() => verificar(d.id)}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Verificar
          </button>
        )
      case 'DISPONIBLE':
        return (
          <button
            onClick={() => setDonacionAsignar(d)}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-teal text-navy hover:bg-teal/90 transition-colors"
          >
            Asignar
          </button>
        )
      case 'ASIGNADA':
        return (
          <button
            onClick={() => marcarEnTransito(d.id)}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
          >
            En tránsito
          </button>
        )
      case 'EN_TRANSITO':
        return (
          <button
            onClick={() => confirmarEntrega(d.id)}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
          >
            Confirmar entrega
          </button>
        )
      default:
        return <span className="text-xs text-gray-400">Completada</span>
    }
  }

  const necesidadesActivas = necesidades.filter((n) => n.estado === 'ACTIVA')

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">

        {/* Encabezado */}
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-navy">Panel del Coordinador</h1>
          <p className="text-gray-500 text-sm">
            Verifica, asigna y confirma la entrega de las donaciones.
          </p>
        </div>

        {/* Necesidades */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-navy">Necesidades</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {necesidades.map((n) => {
              const porcentaje = Math.min(100, Math.round((n.cantCubierta / n.cantRequerida) * 100))
              return (
                <div key={n.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${coloresPrioridad[n.prioridad]}`}>
                      {n.prioridad}
                    </span>
                    <span className="text-xs text-gray-400">{n.estado}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy">{n.categoria}</h3>
                    <p className="text-sm text-gray-500">{n.comuna?.nombre ?? `Comuna #${n.comunaId}`}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teal rounded-full transition-all duration-300"
                        style={{ width: `${porcentaje}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">
                      {n.comuna?.nombre ?? `Comuna #${n.comunaId}`} · {n.cantCubierta}/{n.cantRequerida}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Donaciones */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-navy">
              Donaciones ({donaciones.length})
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
                    <th className="px-6 py-3 font-semibold">Acción</th>
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
                      <td className="px-6 py-4">{accionPorEstado(d)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>

      {/* Modal de asignación */}
      {donacionAsignar && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-6">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 flex flex-col gap-4">
            <div>
              <h3 className="text-lg font-bold text-navy">Asignar donación</h3>
              <p className="text-sm text-gray-500">
                {donacionAsignar.tipo} · {donacionAsignar.cantidad}
              </p>
            </div>

            <p className="text-sm font-semibold text-navy">Selecciona una necesidad activa:</p>

            {necesidadesActivas.length === 0 ? (
              <p className="text-sm text-gray-400">No hay necesidades activas disponibles.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {necesidadesActivas.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => asignar(donacionAsignar, n)}
                    className="text-left border border-gray-200 rounded-lg p-3 hover:border-teal hover:bg-teal/5 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-navy text-sm">{n.categoria}</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${coloresPrioridad[n.prioridad]}`}>
                        {n.prioridad}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {n.comuna?.nombre ?? `Comuna #${n.comunaId}`} · {n.cantCubierta}/{n.cantRequerida}
                    </span>
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={() => setDonacionAsignar(null)}
              className="text-gray-400 text-sm hover:text-navy transition-colors mt-2"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

    </div>
  )
}