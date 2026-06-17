import { Link } from 'react-router-dom'

export default function AdminUsuarios() {
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        <Link to="/admin" className="text-gray-400 text-sm hover:text-navy transition-colors w-fit">
          ← Volver al dashboard
        </Link>
        <h1 className="text-3xl font-bold text-navy">Gestión de usuarios</h1>
      </div>
    </div>
  )
}