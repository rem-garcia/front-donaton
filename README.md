# 🫶 Donaton — Frontend

Plataforma digital de coordinación humanitaria. Este repositorio corresponde al **Frontend** del sistema Donaton, construido con React + Vite + TypeScript + Tailwind CSS.

---

## ⚠️ Requisito previo importante

Este proyecto **requiere que el backend esté corriendo** para funcionar correctamente. Antes de levantar el frontend, debes clonar y levantar el repositorio del backend.

**Se recomienda trabajar ambos proyectos dentro de una misma carpeta raíz**, por ejemplo `donaton/`:

```
donaton/
├── front-donaton/       ← este repositorio
└── backend-donaton/     ← repositorio del backend (clonar también)
```

---

## 🧰 Requisitos del sistema

| Herramienta | Versión mínima | Descarga |
|-------------|---------------|----------|
| Node.js | 20.x o superior | https://nodejs.org |
| npm | 10.x o superior (viene con Node) | — |
| Git | 2.x o superior | https://git-scm.com |
| Docker Desktop | 4.x o superior | https://www.docker.com/products/docker-desktop |
| Navegador | Chrome 120+ / Firefox 121+ / Edge 120+ | — |

> **Nota:** Docker Desktop es necesario para levantar la base de datos MySQL que usa el backend. Debe estar **abierto y corriendo** antes de levantar el backend.

---

## 📦 Instalación y configuración

### Paso 1 — Crear la carpeta raíz y clonar ambos repositorios

```bash
# Crear carpeta raíz del proyecto
mkdir donaton
cd donaton

# Clonar el frontend (este repositorio)
git clone https://github.com/rem-garcia/front-donaton.git

# Clonar el backend (OBLIGATORIO para que el frontend funcione)
git clone https://github.com/ric-diazs/backend-donaton.git
```

Al terminar, tu estructura debe verse así:

```
donaton/
├── front-donaton/
└── backend-donaton/
```

### Paso 2 — Instalar dependencias del frontend

```bash
cd front-donaton
npm install
```

### Paso 3 — Configurar variables de entorno

Crea un archivo `.env` en la raíz de `front-donaton/`:

```env
VITE_API_URL=http://localhost:3000
```

> Esta variable le indica al frontend dónde está el backend. Si el backend corre en un puerto distinto, ajusta el valor.

### Paso 4 — Levantar el backend primero

Antes de correr el frontend, **el backend debe estar corriendo**. Sigue las instrucciones del `README.md` del repositorio `backend-donaton`.

### Paso 5 — Levantar el frontend

```bash
# Desde la carpeta front-donaton/
npm run dev
```

El frontend estará disponible en:

```
http://localhost:5173
```

---

## 🗂️ Estructura del proyecto

```
front-donaton/
├── src/
│   ├── components/         # Componentes reutilizables (Navbar, Footer, etc.)
│   ├── context/            # AuthContext — manejo de sesión
│   ├── hooks/              # Custom hooks
│   ├── pages/              # Páginas por ruta
│   │   ├── Landing.tsx
│   │   ├── Login.tsx
│   │   ├── AdminDash.tsx
│   │   ├── CoordinadorPanel.tsx
│   │   ├── VoluntarioPanel.tsx
│   │   ├── DonadorPortal.tsx
│   │   ├── Contacto.tsx
│   │   └── Seguimiento.tsx
│   ├── services/           # api.ts — configuración de Axios
│   ├── types/              # Interfaces TypeScript
│   └── App.tsx             # Rutas con React Router
├── public/
│   └── image/              # Imágenes y logos
├── .env                    # Variables de entorno (crear manualmente)
├── tailwind.config.js      # Configuración de colores personalizados
└── vite.config.ts
```

---

## 🧭 Rutas disponibles

| Ruta | Descripción | Acceso |
|------|-------------|--------|
| `/` | Landing page | Público |
| `/donar` | Portal del donante | Público |
| `/seguimiento` | Consulta de donación por OT | Público |
| `/contacto` | Formulario de contacto | Público |
| `/login` | Inicio de sesión | Público |
| `/admin` | Panel del administrador | Solo Admin |
| `/coordinador` | Panel del coordinador | Admin / Coordinador |
| `/voluntario` | Panel del voluntario | Todos los roles internos |

---

## 👤 Roles del sistema (para pruebas)

Durante el desarrollo, el login utiliza un **selector de rol temporal** (sin backend de autenticación). Selecciona el rol deseado al iniciar sesión:

| Rol | Panel al que redirige |
|-----|-----------------------|
| Administrador | `/admin` |
| Coordinador | `/coordinador` |
| Voluntario | `/voluntario` |

---

## 🛠️ Scripts disponibles

```bash
npm run dev       # Levanta el servidor de desarrollo en localhost:5173
npm run build     # Genera el build de producción en /dist
npm run preview   # Previsualiza el build de producción
```

---

## 🐳 Despliegue con Docker

El frontend incluye un `Dockerfile` y un `docker-compose.yml` para despliegue en contenedor.

```bash
# Construir y levantar el contenedor del frontend
docker compose up --build
```

> Para el despliegue completo (frontend + backend + base de datos), usar el `docker-compose.yml` raíz del proyecto orquestador.

---

## 🔗 Repositorio relacionado

| Repositorio | Descripción |
|-------------|-------------|
| [backend-donaton](https://github.com/ric-diazs/backend-donaton) | Backend Next.js — API de donaciones |

---

## 🏫 Contexto académico

Proyecto desarrollado para la asignatura **GPY1101 — Evaluación de Proyectos de Software**, DuocUC, 2026.

**Equipo:**
- Remi García ([@rem-garcia](https://github.com/rem-garcia))
- Ricardo Díaz ([@ric-diazs](https://github.com/ric-diazs))
