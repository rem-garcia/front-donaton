//*archivo que contiene las interfaces
//para definir los tipos de datos que se van a usar en el proyecto
//  como Usuario, Donacion, Necesidad y Asignacion.
//estos los tomamos del backend :)
//

export interface Usuario {
    id: number;
    nombre: string;
    apellido: string
    rol: 'ADMIN' | 'USUARIO' | 'VOLUNTARIO' | 'COORDINADOR';
}
export interface Donacion {
    id: number; tipo: string; cantidad: number;
    unidad: string;
    origen: string;
    estado: 'RECIBIDA' | 'DISPONIBLE' | 'ASIGNADA' | 'ENTREGADA';
    fechaCreacion: string;
    usuarioId: number;
    necesidadId: number;
    centroAcopioId: number;
}
export interface Necesidad {
    id: number;
    categoria: string;
    prioridad: 'ALTA' | 'MEDIA' | 'BAJA' | 'CRITICA';
    comuna: string;
    cantRequerida: number;
    cantCubierta: number;
    estado: 'ACTIVA' | 'CUBIERTA' | 'CERRADA';
    fechaCreacion: string;
}
export interface Asignacion {
    id: number;
    estado: 'ASIGNADA' | 'ENTREGADA' | 'EN_TRANSITO';
    fechaCreacion: string;
    usuarioId: number;
    necesidadId: number;
    centroAcopioId: number;
}
export interface Login {
    email: string;
    password: string;
}
export interface AuthResponse {
    token: string;
    usuario: Usuario;
}