import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtegeRutas from './components/ProtegeRutas'

import Landing          from './pages/Landing'
import Login            from './pages/Login'
import AdminDashboard   from './pages/AdminDash'
import CoordinadorPanel from './pages/CoordinadorPanel'
import VoluntarioPanel  from './pages/VoluntarioPanel'
import DonadorPortal    from './pages/DonadorPortal'
import Contacto from './pages/Contacto'
import AdminUsuarios from './pages/AdminUsuarios'
import AdminCentros  from './pages/AdminCentros'
import Seguimiento from './pages/Seguimiento'


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Rutas públicas */}
          <Route path="/"      element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/donar" element={<DonadorPortal />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/seguimiento" element={<Seguimiento />} />

          {/* Solo Admin */}
          <Route path="/admin" element={
            <ProtegeRutas roles={['ADMIN']}>
              <AdminDashboard />
            </ProtegeRutas>
          }/>
          <Route path="/admin-usuarios" element={
            <ProtegeRutas roles={['ADMIN']}>
              <AdminUsuarios />
            </ProtegeRutas>
          }/>

        <Route path="/admin-centros" element={
          <ProtegeRutas roles={['ADMIN']}>
            <AdminCentros />
          </ProtegeRutas>
        }/>

          {/* Admin y Coordinador */}
          <Route path="/coordinador" element={
            <ProtegeRutas roles={['ADMIN', 'COORDINADOR']}>
              <CoordinadorPanel />
            </ProtegeRutas>
          }/>

          {/* Todos los roles internos */}
          <Route path="/voluntario" element={
            <ProtegeRutas roles={['ADMIN', 'COORDINADOR', 'VOLUNTARIO']}>
              <VoluntarioPanel />
            </ProtegeRutas>
          }/>

          {/* Cualquier ruta no encontrada va al inicio */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}