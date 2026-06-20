// Archivo que contiene las interfaces
// para definir los tipos de datos que se van a usar en el proyecto
// como Usuario, Donacion, Necesidad y Asignacion.
// Alineadas con el schema de Prisma del backend (backend-donaton)

export interface Usuario {
  id: number
  nombre: string
  apellido: string
  correo: string
  rol: 'ADMIN' | 'COORDINADOR' | 'VOLUNTARIO'
  fecha: string
}

export interface Donacion {
  id: number
  tipo: string
  cantidad: number
  unidad: string
  origen: string
  estado: 'PENDIENTE' | 'RECIBIDA' | 'DISPONIBLE' | 'ASIGNADA' | 'EN_TRANSITO' | 'ENTREGADA'
  ot: string | null
  fecha: string
  donanteId: number | null
  usuarioId: number | null
  necesidadId: number | null
  centroAcopioId: number | null
}

export interface Necesidad {
  id: number
  categoria: string
  prioridad: 'CRITICA' | 'ALTA' | 'MEDIA' | 'BAJA'
  cantRequerida: number
  cantCubierta: number
  estado: 'ACTIVA' | 'CUBIERTA' | 'CERRADA'
  fecha: string
  comunaId: number
  comuna: { nombre: string }
  usuarioId: number
}

export interface Asignacion {
  id: number
  estado: 'ASIGNADA' | 'EN_TRANSITO' | 'ENTREGADA'
  fechaAsignacion: string
  fechaEntrega: string | null
  donacionId: number
  necesidadId: number
  responsableId: number
}

export interface Login {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  usuario: Usuario
}
