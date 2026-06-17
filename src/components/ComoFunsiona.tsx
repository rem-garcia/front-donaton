const pasos = [
  {
    numero: "01",
    titulo: "Registrar donación",
    descripcion:
      "El voluntario ingresa tipo, cantidad y origen de la donación al sistema en tiempo real desde el centro de acopio.",
    imagen: "/image/paso1.png",
  },
  {
    numero: "02",
    titulo: "Identificar necesidad",
    descripcion:
      "El coordinador visualiza las necesidades activas organizadas por urgencia, categoría y municipio.",
    imagen: "/image/paso2.png",
  },
  {
    numero: "03",
    titulo: "Asignar y entregar",
    descripcion:
      "Se vincula la donación a la necesidad. El dashboard muestra el estado de entrega en tiempo real.",
    imagen: "/image/paso3.png",
  },
]

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="bg-gray-50 py-24 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-12">

        {/* Encabezado */}
        <div className="text-center flex flex-col gap-3">
          <h2 className="text-4xl font-bold text-navy">
            ¿Cómo funciona?
          </h2>
          <p className="text-gray-500 text-base max-w-xl">
            Tres pasos para que cada donación llegue a donde más se necesita.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {pasos.map((paso) => (
            <div
              key={paso.numero}
              className="bg-white rounded-2xl p-8 flex flex-col gap-4
                         border border-gray-100 shadow-sm
                         hover:shadow-md hover:border-teal/30
                         transition-all duration-200"
            >
              
              {/* Número */}
              <span className="text-5xl font-bold text-teal">
                {paso.numero}
              </span>

              {/* Título */}
              <h3 className="text-xl font-semibold text-navy">
                {paso.titulo}
              </h3>

              {/* Descripción */}
              <p className="text-gray-500 text-sm leading-relaxed">
                {paso.descripcion}
              </p>
              {/* Imagen */}
              <img
                src={paso.imagen}
                alt={paso.titulo}
                className="w-full h-45 object-cover rounded-xl"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}