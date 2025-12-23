# 🚀 Prueba Técnica Fullstack - Wilson García

Esta es una solución profesional para la gestión de personas, construida con una arquitectura desacoplada utilizando **.NET 8** para el Backend y **React** para el Frontend.

---

## 🌐 Demo en Vivo (Frontend)
El Frontend ha sido desplegado en Vercel para una inspección rápida de la interfaz, componentes y validaciones de cliente:
👉 **[Link del Proyecto en Vercel](https://-prueba-tecnica-fullstack-epn1bimeo-wilson-garcias-projects.vercel.app)**

> **⚠️ Nota Técnica Importante:**
> El despliegue en Vercel es únicamente para la capa visual y demostración de componentes. Dado que la API (.NET) y la persistencia de datos están diseñadas para ejecutarse en un entorno seguro, las funciones de **Guardar / Editar / Eliminar** requieren que el Backend esté corriendo localmente para conectar con el servidor de datos, tal como se detalla en las instrucciones de abajo.

---

## 🛠️ Tecnologías Utilizadas

### Backend (.NET 8)
* **ASP.NET Core Web API**: Endpoints RESTful para el manejo de recursos.
* **FluentValidation**: Validación robusta de reglas de negocio (campos obligatorios y unicidad de documentos).
* **Dependency Injection**: Uso de Singletons para la gestión de persistencia en memoria.
* **CORS Policy**: Configurada específicamente para permitir peticiones desde Localhost y el dominio de Vercel.

### Frontend (React + Vite)
* **React Hooks**: Manejo de estado dinámico con `useState` y ciclos de vida con `useEffect`.
* **Axios**: Cliente HTTP para la comunicación asíncrona con la API.
* **Bootstrap**: Framework de estilos para un diseño responsivo y moderno.
* **SweetAlert2**: Implementación de alertas estéticas para feedback del usuario.

---

## 💻 Instrucciones para Ejecución Local

Siga estos pasos para probar la funcionalidad completa (CRUD con persistencia de datos):

### 1. Clonar el Repositorio
Abra una terminal y ejecute:
git clone [https://github.com/garciaw602/-Prueba-Tecnica-Fullstack.git](https://github.com/garciaw602/-Prueba-Tecnica-Fullstack.git)
2. Ejecutar el Backend (API)
Diríjase a la carpeta PersonaApi y abra el archivo de solución en Visual Studio 2022.

Asegúrese de que el proyecto de inicio sea PersonaApi.

Presione F5 o el botón Play.

La API se iniciará en: https://localhost:7194 (se abrirá automáticamente la interfaz de Swagger para pruebas).

3. Ejecutar el Frontend (React)
Abra una nueva terminal en la carpeta raíz del proyecto y entre a la carpeta del frontend:

Bash

cd persona-frontend
Instale las dependencias necesarias:

Bash

npm install
Inicie el servidor de desarrollo:

Bash

npm run dev
El sistema le indicará que la aplicación está lista en: http://localhost:5173
