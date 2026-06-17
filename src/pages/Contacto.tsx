import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Contacto() {
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: '',
  })
  const [enviado, setEnviado] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (!form.nombre || !form.correo || !form.mensaje) {
      alert('Por favor completa nombre, correo y mensaje.')
      return
    }
    setEnviado(true)
    setForm({ nombre: '', correo: '', asunto: '', mensaje: '' })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Sección con video de fondo */}
      <main className="relative flex-1 overflow-hidden flex items-center justify-center px-6 py-20">

        {/* Video de fondo */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/video/fondo.mp4" type="video/mp4" />
        </video>

        {/* Capa oscura */}
        <div className="absolute inset-0 bg-navy/70 z-10" />

        {/* Formulario con efecto vidrio */}
        <div className="relative z-20 w-full max-w-lg
                        bg-white/10 backdrop-blur-md
                        border border-white/20 rounded-2xl
                        p-8 md:p-10 flex flex-col gap-5
                        shadow-2xl">

          <div className="text-center flex flex-col gap-2 mb-2">
            <h1 className="text-3xl font-bold text-white">Contáctanos</h1>
            <p className="text-gray-200 text-sm">
              ¿Tienes dudas o quieres colaborar? Escríbenos.
            </p>
          </div>

          {enviado && (
            <div className="bg-teal/20 border border-teal text-white rounded-xl p-4 text-sm">
              ✅ ¡Mensaje enviado! Te responderemos pronto.
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-white">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Tu nombre"
              className="bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-sm
                         text-white placeholder-gray-300
                         focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-white">Correo</label>
            <input
              type="email"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              placeholder="tucorreo@ejemplo.com"
              className="bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-sm
                         text-white placeholder-gray-300
                         focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-white">Asunto</label>
            <input
              type="text"
              name="asunto"
              value={form.asunto}
              onChange={handleChange}
              placeholder="¿Sobre qué nos escribes?"
              className="bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-sm
                         text-white placeholder-gray-300
                         focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-white">Mensaje</label>
            <textarea
              name="mensaje"
              value={form.mensaje}
              onChange={handleChange}
              placeholder="Escribe tu mensaje aquí..."
              rows={4}
              className="bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-sm resize-none
                         text-white placeholder-gray-300
                         focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="bg-teal text-navy font-semibold px-6 py-3 rounded-lg
                       hover:bg-teal/90 transition-all duration-200 mt-2"
          >
            Enviar mensaje
          </button>

        </div>
      </main>

      <Footer />
    </div>
  )
}