# 📖 Guía de Instalación y Configuración Completa

Esta guía te ayudará a configurar y ejecutar el Sistema de Gestión de Vehículos en tu entorno local.

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- ✅ **Node.js** v18 o superior → [Descargar](https://nodejs.org/)
- ✅ **Git** → [Descargar](https://git-scm.com/)
- ✅ **MongoDB** (una de estas opciones):
  - MongoDB instalado localmente → [Descargar](https://www.mongodb.com/try/download/community)
  - Cuenta en MongoDB Atlas (gratis) → [Registrarse](https://www.mongodb.com/cloud/atlas/register)

---

## 🗄️ Paso 1: Configurar la Base de Datos

### Opción A: MongoDB Atlas (Recomendado - Gratis)

1. **Crear cuenta en MongoDB Atlas**
   - Ve a https://www.mongodb.com/cloud/atlas/register
   - Registra una cuenta gratuita

2. **Crear un Cluster**
   - Click en "Build a Database"
   - Selecciona el plan **FREE** (M0)
   - Elige una región cercana
   - Click en "Create"

3. **Configurar acceso**
   - En "Security" → "Database Access":
     - Click en "Add New Database User"
     - Crea usuario y contraseña (guárdalos)
   - En "Security" → "Network Access":
     - Click en "Add IP Address"
     - Click en "Allow Access from Anywhere" (0.0.0.0/0)
     - Click en "Confirm"

4. **Obtener Connection String**
   - Click en "Connect" en tu cluster
   - Selecciona "Connect your application"
   - Copia la URI (se verá así):
```
   mongodb+srv://usuario:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```
   - Reemplaza `<password>` con tu contraseña real

### Opción B: MongoDB Local

Si instalaste MongoDB localmente, tu URI será:
```
mongodb://localhost:27017/vehiculos
```

---

## 🔧 Paso 2: Configurar el Backend

1. **Clonar el repositorio**
```bash
git clone https://github.com/ludwikacartagena/vehiculos-backend.git
cd vehiculos-backend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Crear archivo .env**

Crea un archivo llamado `.env` en la raíz del proyecto con:
```env
PORT=5000
MONGODB_URI=tu_connection_string_aqui
```

**Ejemplo con MongoDB Atlas:**
```env
PORT=5000
MONGODB_URI=mongodb+srv://usuario:mipassword123@cluster0.xxxxx.mongodb.net/vehiculos?retryWrites=true&w=majority
```

**Ejemplo con MongoDB Local:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vehiculos
```

4. **Iniciar el servidor**
```bash
npm start
```

✅ **Verificación:** Deberías ver en consola:
```
Servidor corriendo en puerto 5000
MongoDB conectado
```

5. **Probar la API**

Abre tu navegador y ve a:
```
http://localhost:5000/api/vehiculos
```

Deberías ver: `[]` (array vacío) - ¡Esto significa que funciona!

---

## 💻 Paso 3: Configurar el Frontend

1. **Abrir nueva terminal** (deja el backend corriendo)

2. **Clonar el repositorio frontend**
```bash
git clone https://github.com/ludwikacartagena/vehiculos-frontend.git
cd vehiculos-frontend
```

3. **Instalar dependencias**
```bash
npm install
```

4. **Crear archivo .env**

Crea un archivo `.env` en la raíz con:
```env
VITE_API_URL=http://localhost:5000/api
```

5. **Iniciar la aplicación**
```bash
npm run dev
```

✅ **Verificación:** Deberías ver:
```
  VITE v5.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
```

6. **Abrir en navegador**

Ve a: `http://localhost:5173/`

---

## 🎯 Paso 4: Probar la Aplicación

### ✅ Test 1: Registrar un Vehículo

1. En el navegador, ve a "Vehículos"
2. Click en "Nuevo Vehículo"
3. Completa el formulario:
   - Marca: Toyota
   - Modelo: Corolla
   - Placa: ABC123
4. Click en "Guardar"
5. Deberías ver el vehículo en la lista

### ✅ Test 2: Registrar Entrada/Salida

1. Ve a "Nuevo Registro"
2. Selecciona el vehículo que creaste
3. Completa:
   - Motorista: Juan Pérez
   - Fecha: Hoy
   - Hora: Hora actual
   - Kilometraje: 15000
   - Tipo: Entrada
4. Click en "Guardar"

### ✅ Test 3: Ver Historial

1. Ve a "Historial"
2. Deberías ver tu registro
3. Prueba los filtros por fecha, vehículo y motorista

---

## 🚨 Solución de Problemas Comunes

### ❌ Error: "Cannot connect to MongoDB"

**Solución:**
- Verifica que tu `MONGODB_URI` en `.env` sea correcta
- Si usas MongoDB Atlas:
  - Verifica que la IP `0.0.0.0/0` esté en Network Access
  - Verifica usuario y contraseña
- Si usas MongoDB local:
  - Verifica que MongoDB esté corriendo: `mongod`

### ❌ Error: "Port 5000 already in use"

**Solución:**
- Cambia el puerto en `.env` del backend:
```env
  PORT=5001
```
- Actualiza también en el `.env` del frontend:
```env
  VITE_API_URL=http://localhost:5001/api
```

### ❌ Error: "Network Error" en el Frontend

**Solución:**
- Verifica que el backend esté corriendo
- Verifica la URL en `.env` del frontend
- Abre la consola del navegador (F12) para ver el error exacto

### ❌ Los cambios en .env no funcionan

**Solución:**
- Detén el servidor (Ctrl + C)
- Reinicia: `npm start` (backend) o `npm run dev` (frontend)

---

## 📱 Acceso desde Producción

Si prefieres usar la versión desplegada sin instalar nada:

**Frontend:** https://tu-app.vercel.app *(actualizar con URL real)*  
**Backend API:** https://vehiculos-backend-production.up.railway.app

---

## 🆘 ¿Necesitas Ayuda?

Si encuentras algún problema:

1. Revisa los mensajes de error en la consola
2. Verifica que todos los puertos estén disponibles
3. Asegúrate de que las variables de entorno estén correctas
4. Contacta al desarrollador: [@ludwikacartagena](https://github.com/ludwikacartagena)

---

## ✅ Checklist de Verificación

Marca cada paso conforme lo completes:

- [ ] Node.js instalado
- [ ] MongoDB configurado (Atlas o local)
- [ ] Backend clonado y dependencias instaladas
- [ ] Archivo .env del backend creado
- [ ] Backend corriendo en puerto 5000
- [ ] Frontend clonado y dependencias instaladas
- [ ] Archivo .env del frontend creado
- [ ] Frontend corriendo en puerto 5173
- [ ] Puedo ver la aplicación en el navegador
- [ ] Puedo crear un vehículo
- [ ] Puedo crear un registro
- [ ] Los filtros funcionan

---

## 🎉 ¡Listo!

Si completaste todos los pasos, tu Sistema de Gestión de Vehículos debería estar funcionando correctamente.

**Desarrollado por:** Ludwika Cartagena  
**Fecha:** Noviembre 2024  
**Prueba Técnica:** Desarrollador Web
