import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// Los 5 estados del flujo en orden
const flujoEstados = ['RECIBIDA', 'DISPONIBLE', 'ASIGNADA', 'EN_TRANSITO', 'ENTREGADA']

const etiquetas: Record<string, string> = {
  RECIBIDA:    'Recibida',
  DISPONIBLE:  'Disponible',
  ASIGNADA:    'Asignada',
  EN_TRANSITO: 'En tránsito',
  ENTREGADA:   'Entregada',
}

export default function Seguimiento() {
  const navigate = useNavigate()
  const [ot, setOt] = useState('')
  const [resultado, setResultado] = useState<string | null>(null)

  const handleConsultar = () => {
    if (!ot.trim()) {
      alert('Por favor ingresa tu código OT.')
      return
    }
    // Simulación — en el backend se busca la OT real en la base de datos
    // Por ahora mostramos un estado de ejemplo (ASIGNADA, punto medio del flujo)
    setResultado('ASIGNADA')
  }

  const indiceActual = resultado ? flujoEstados.indexOf(resultado) : -1

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 bg-gray-50 px-6 py-16">
        <div className="max-w-2xl mx-auto flex flex-col gap-8">

          {/* Encabezado */}
          <div className="text-center flex flex-col gap-2">
            <h1 className="text-4xl font-bold text-navy">Estado de mi donación</h1>
            <p className="text-gray-500">
              Ingresa tu código de seguimiento (OT) para ver en qué etapa se
              encuentra tu donación.
            </p>
          </div>

          {/* Buscador de OT */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col gap-4">
            <label className="text-sm font-semibold text-navy">Código de seguimiento</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                value={ot}
                onChange={(e) => setOt(e.target.value)}
                placeholder="Ej. OT-2026-0042"
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm
                           focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal"
              />
              <button
                onClick={handleConsultar}
                className="bg-teal text-navy font-semibold px-6 py-2.5 rounded-lg
                           hover:bg-teal/90 transition-all duration-200"
              >
                Consultar
              </button>
            </div>
          </div>

          {/* Resultado — línea de tiempo */}
          {resultado && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-500">Donación {ot}</span>
                <span className="text-lg font-bold text-navy">
                  Estado actual: {etiquetas[resultado]}
                </span>
              </div>

              {/* Línea de tiempo vertical */}
              <div className="flex flex-col gap-0">
                {flujoEstados.map((estado, i) => {
                  const completado = i <= indiceActual
                  const esActual = i === indiceActual
                  return (
                    <div key={estado} className="flex gap-4">
                      {/* Columna del indicador */}
                      <div className="flex flex-col items-center">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                          ${completado ? 'bg-teal border-teal' : 'bg-white border-gray-300'}`}>
                          {completado && (
                            <svg className="w-3 h-3 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        {/* Línea conectora (no en el último) */}
                        {i < flujoEstados.length - 1 && (
                          <div className={`w-0.5 h-10 ${i < indiceActual ? 'bg-teal' : 'bg-gray-200'}`} />
                        )}
                      </div>
                      {/* Texto del estado */}
                      <div className="pb-8">
                        <span className={`text-sm font-semibold ${esActual ? 'text-teal' : completado ? 'text-navy' : 'text-gray-400'}`}>
                          {etiquetas[estado]}
                        </span>
                        {esActual && (
                          <p className="text-xs text-gray-500 mt-0.5">
                            Tu donación está en esta etapa actualmente.
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Volver a donar */}
          <div className="text-center">
            <button
              onClick={() => navigate('/donar')}
              className="text-navy font-semibold text-sm hover:text-teal transition-colors"
            >
              ← Volver a donar
            </button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}