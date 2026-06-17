import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function DonadorPortal() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    tipo: '',
    cantidad: '',
    unidad: '',
    nombre: '',
    correo: '',
  })
  const [otGenerada, setOtGenerada] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (!form.tipo || !form.cantidad || !form.unidad || !form.nombre || !form.correo) {
      alert('Por favor completa todos los campos.')
      return
    }

    // OT simulada — en el backend se generará y se enviará por correo
    const numero = Math.floor(1000 + Math.random() * 9000)
    const ot = `OT-2026-${numero}`
    setOtGenerada(ot)

    setForm({ tipo: '', cantidad: '', unidad: '', nombre: '', correo: '' })
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 bg-gray-50 px-6 py-16">
        <div className="max-w-2xl mx-auto flex flex-col gap-8">

          {/* Encabezado */}
          <div className="text-center flex flex-col gap-2">
            <h1 className="text-4xl font-bold text-navy">Quiero donar</h1>
            <p className="text-gray-500">
              Registra tu donación en un minuto. Recibirás un código de
              seguimiento (OT) en tu correo para conocer su estado.
            </p>
          </div>

          {/* Confirmación con OT */}
          {otGenerada && (
            <div className="bg-teal/10 border border-teal rounded-2xl p-6 flex flex-col gap-2 text-center">
              <span className="text-navy font-semibold">¡Gracias por tu donación! 🎉</span>
              <p className="text-sm text-gray-600">
                Tu código de seguimiento es:
              </p>
              <span className="text-2xl font-bold text-teal tracking-wider">{otGenerada}</span>
              <p className="text-xs text-gray-500">
                Te enviamos este código a tu correo. Guárdalo para consultar el
                estado de tu donación.
              </p>
              <button
                onClick={() => navigate('/seguimiento')}
                className="text-navy text-sm font-semibold underline mt-2"
              >
                Ver estado de mi donación →
              </button>
            </div>
          )}

          {/* Formulario */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col gap-5">
            <h2 className="text-lg font-semibold text-navy">Datos de la donación</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            </div>

            <h2 className="text-lg font-semibold text-navy mt-2">Tus datos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Nombre completo"
                className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm
                           focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal"
              />
              <input
                name="correo"
                type="email"
                value={form.correo}
                onChange={handleChange}
                placeholder="tucorreo@ejemplo.com"
                className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm
                           focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="bg-teal text-navy font-semibold px-6 py-3 rounded-lg
                         hover:bg-teal/90 transition-all duration-200 mt-2"
            >
              Registrar donación
            </button>
          </div>

          {/* Acceso al seguimiento */}
          <div className="text-center">
            <button
              onClick={() => navigate('/seguimiento')}
              className="text-navy font-semibold text-sm hover:text-teal transition-colors"
            >
              ¿Ya donaste? Ver estado de mi donación →
            </button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}