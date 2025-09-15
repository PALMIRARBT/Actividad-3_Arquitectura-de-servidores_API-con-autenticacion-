# API CRUD Post

Este proyecto implementa una API RESTful para gestionar posts usando Node.js, Express y MongoDB.

## Estructura de archivos

- **app.js**
  - Archivo principal. Configura Express, conecta a MongoDB y monta las rutas de la API.

- **models/Post.js**
  - Define el modelo Mongoose para los posts. Incluye los campos: title, text, author, createdAt, updatedAt y validaciones.

- **routes/posts.js**
  - Contiene las rutas CRUD:
    - `POST /api/posts`: Crear un post.
    - `GET /api/posts`: Listar todos los posts.
    - `GET /api/posts/:id`: Obtener detalle de un post.
    - `PATCH /api/posts/:id`: Modificar un post.
    - `DELETE /api/posts/:id`: Eliminar un post.

- **package.json**
  - Define las dependencias y scripts del proyecto. El comando `npm start` ejecuta el servidor en el puerto 8000.

- **package-lock.json**
  - Archivo generado automáticamente por npm al instalar dependencias.
  - Registra la versión exacta de cada paquete y sus dependencias internas.
  - Garantiza que el entorno de desarrollo sea reproducible en cualquier equipo.
  - No debe editarse manualmente; npm lo gestiona y actualiza según las instalaciones y actualizaciones de paquetes.

- **.gitignore**
  - Excluye `node_modules` y archivos sensibles del repositorio.

- **postman_collection.json**
  - Colección de Postman para probar todos los endpoints del API.

## Uso

1. Instala dependencias:
   ```powershell
   npm install
   ```
2. Inicia MongoDB y el servidor:
   ```powershell

   ```
3. Importa la colección en Postman y prueba los endpoints.

## Nota académica: Uso de base de datos en memoria


- La configuración está en `config/db.config.js`.
- El servidor se conecta automáticamente a la base de datos en memoria al ejecutar `npm start`.

Esta solución sigue la plantilla recomendada en clase y facilita la entrega y evaluación del proyecto.


- **Crear Post**: `POST /api/posts`
- **Listar Posts**: `GET /api/posts`
- **Modificar Post**: `PATCH /api/posts/:id`
- **Eliminar Post**: `DELETE /api/posts/:id`

## Detalle de los endpoints codificados en routes/posts.js

### 1. POST /api/posts
- Recibe un body JSON con los campos `title`, `text` y `author`.
- Si hay errores de validación, devuelve **HTTP 400** y un mensaje de error.

### 2. GET /api/posts
- Devuelve **HTTP 200 OK** y un listado JSON de todos los posts almacenados.

### 3. GET /api/posts/<id>
- Si el post existe, devuelve **HTTP 200 OK** y el detalle del post.

## Descripción de los ficheros principales

- **models/User.js**
  - Define el modelo Mongoose "User" para los usuarios del sistema.
  - Especifica los campos requeridos: `name`, `email`, `password`, `bio`, `active`, `createdAt`, `updatedAt`.
  - El campo `email` tiene validación de formato y es único para evitar duplicados.
  - El campo `password` se almacena cifrado para mayor seguridad.
  - El campo `active` indica si el usuario está activo y por defecto es `false`.
  - Los campos `createdAt` y `updatedAt` registran las fechas de creación y modificación del usuario.
  - Incluye un middleware que actualiza automáticamente la fecha de modificación (`updatedAt`) cada vez que se guarda el usuario.
  - El modelo facilita la validación y gestión segura de los datos de usuario en la base de datos.

- **routes/users.js**
  - Define las rutas relacionadas con los usuarios del sistema.
  - Incluye el endpoint `POST /api/users` para registrar nuevos usuarios, validando los datos y cifrando la contraseña antes de guardar.
  - Incluye el endpoint `POST /api/login` para autenticar usuarios, generando y devolviendo un token JWT si las credenciales son correctas.
  - Maneja errores de validación y credenciales incorrectas devolviendo los códigos HTTP apropiados (400 y 401).

- **routes/posts.js**
  - Implementa las rutas CRUD para el modelo "Post": crear, listar, obtener detalle, modificar y eliminar posts.
  - Todos los endpoints requieren autenticación mediante JWT, usando el middleware correspondiente.
  - Valida los datos recibidos y gestiona los errores devolviendo los códigos HTTP adecuados (400, 401, 404, 201, 200, 204).
  - Permite que solo usuarios autenticados puedan interactuar con los posts.

- **API CRUD Post.postman_collection.json**
  - Archivo JSON que contiene la colección de peticiones para Postman.
  - Permite probar fácilmente todos los endpoints del proyecto: registro de usuario, login y CRUD de posts protegidos por JWT.
  - Incluye ejemplos de peticiones con los headers y cuerpos necesarios para cada endpoint.
  - Facilita la validación y demostración de la API sin necesidad de escribir código adicional.

- **middleware/auth.js**
  - Middleware que verifica la autenticidad del token JWT en las peticiones protegidas.
  - Si el token es válido, permite el acceso al endpoint; si no, devuelve HTTP 401 (no autorizado).
  - Se utiliza para proteger todos los endpoints de posts y asegurar que solo usuarios autenticados puedan acceder.
