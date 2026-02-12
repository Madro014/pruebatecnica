# 💎 Flume - Gestión Financiera Inteligente

Flume es una plataforma de finanzas personales diseñada con una estética **Ultra-Premium**, enfocada en la fluidez, la seguridad y una experiencia de usuario cinematográfica.

## 🚀 Arquitectura del Proyecto

### Backend (Python/Flask)
Reorganizado bajo una **Arquitectura Limpia y Modular**:
- **App Factory Pattern**: Centralizado en `backend/app/__init__.py`.
- **Capas Desacopladas**: 
  - `repositories/`: Gestión de persistencia.
  - `services/`: Lógica de negocio (Cálculos de balance, validaciones).
  - `api/`: Controladores y Blueprints de Flask.
  - `models/`: Entidades relacionales (User, Transaction).
- **Base de Datos**: Conectado a **PostgreSQL 17** (Render) con inicialización automática mediante SQL crudo en `database.py`.
- **Seguridad**: Autenticación robusa mediante **JWT (JSON Web Tokens)**.

### Frontend (React/Vite)
- **Estética Glassmorphism**: Uso intensivo de transparencias, desenfoques y gradientes.
- **Micro-interacciones**: Animaciones fluidas impulsadas por `Framer Motion` y `Lucide Icons`.
- **Componentes Inteligentes**:
  - **User Selector Carousel**: Sistema de paginación automática al superar los 4 usuarios.
  - **Cinematic Loading**: Experiencia de carga con mensajes dinámicos y logo animado.

---

## 🛠️ Instalación y Ejecución

### Requisitos
- Node.js (v18+)
- Python (v3.10+)

### Pasos Rápidos
1. **Instalar dependencias**:
   ```bash
   npm install
   ```
2. **Entorno Virtual**:
   El proyecto utiliza un **único entorno unificado** en la raíz (`.venv`) para simplificar la gestión de paquetes.

3. **Iniciar Aplicación Completa**:
   ```bash
   npm run dev
   ```
   *Esto iniciará el backend y el frontend simultáneamente.*

---

## 🔑 Credenciales de Prueba
La base de datos se auto-inicializa con usuarios de demostración.
**Contraseña para todos:** `123`
- `juan@example.com`
- `maria@example.com`

---

## � Alcance Técnico Implementado
- [x] **JWT Auth**: Flujo completo de login y protección de rutas.
- [x] **PostgreSQL**: Integración directa con base de datos remota.
- [x] **Arquitectura**: Separación estricta de responsabilidades (Repository/Service).
- [x] **UX/UI**: Cada componente con sus propios estilos independientes (`.css` modular).
- [x] **Cálculo Dinámico**: Balance calculado en tiempo real: `Σ ingresos - Σ egresos`.

---

## 📂 Estructura de Carpetas
```text
.
├── .venv/               # Entorno virtual UNIFICADO
├── backend/
│   ├── app/             # Paquete principal de la aplicación
│   │   ├── api/         # Rutas (Blueprints)
│   │   ├── services/    # Lógica de negocio
│   │   └── database.py  # Core de DB y Schema SQL
│   └── main.py          # Punto de entrada del backend
├── frontend/
│   ├── src/
│   │   ├── pages/       # Login, Register, Dashboard, Loading
│   │   └── components/  # Componentes reutilizables
│   └── src/styles/      # Estilos modulares independientes
└── package.json         # Comandos maestros
```
