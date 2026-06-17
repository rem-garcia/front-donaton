import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import type { Usuario } from '../types'

interface Props {
  children: React.ReactNode
  roles?: Usuario['rol'][]
}

export default function ProtegeRutas({ children, roles }: Props) {
  const { isAuthenticated, usuario } = useAuth()

  if (!isAuthenticated) return <Navigate to="/login" replace />

  if (roles && usuario && !roles.includes(usuario.rol)) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}