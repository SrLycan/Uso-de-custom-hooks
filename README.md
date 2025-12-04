Esta es una aplicación React que consume la API de JSONPlaceholder para mostrar una lista de posts y sus detalles. El enfoque principal del proyecto es la implementación de custom hooks para abstraer y reutilizar la lógica de fetching de datos, eliminando código repetitivo.

Objetivos Alcanzados
Implementación del custom hook useFetch como abstracción genérica para peticiones HTTP
Creación del custom hook usePosts para manejo específico de la lista de posts
Creación del custom hook usePostDetail para obtener detalles de un post individual
Creación del custom hook useUsuario para obtener información del autor
Eliminación de código duplicado en los componentes
Mejora significativa en la mantenibilidad y reutilización del código
Implementación de navegación con React Router
Manejo robusto de estados: carga, error y éxito

src/
├── hooks/
│   ├── useFetch.js          # Hook genérico para peticiones HTTP
│   └── usePosts.js          # Hooks específicos para posts y usuarios
├── components/
│   ├── ListaPosts.jsx       # Componente de lista de posts
│   ├── ListaPosts.css
│   ├── DetallePost.jsx      # Componente de detalle de post
│   └── DetallePost.css
├── App.jsx                   # Componente principal con routing
├── App.css                   # Estilos globales
└── index.js                  # Punto de entrada


Custom Hooks Implementados
1. useFetch (Hook Genérico)
javascript
const { data, cargando, error } = useFetch(url);
Propósito: Abstraer la lógica común de peticiones HTTP

Funcionalidad:

Maneja el ciclo completo de una petición: carga, éxito y error

Reutilizable para cualquier endpoint

Se actualiza automáticamente cuando la URL cambia

Estados retornados:

data: Datos obtenidos de la API

cargando: Booleano que indica si está cargando

error: Mensaje de error si ocurre algún problema

2. usePosts (Hook Específico)
javascript
const { posts, cargando, error } = usePosts();
Propósito: Obtener la lista completa de posts

Ventaja: Encapsula la URL de la API y proporciona una interfaz limpia

3. usePostDetail (Hook Específico)
javascript
const { post, cargando, error } = usePostDetail(postId);
Propósito: Obtener el detalle de un post individual

Ventaja: Acepta el ID como parámetro y construye la URL automáticamente

4. useUsuario (Hook Específico)
javascript
const { usuario, cargando, error } = useUsuario(userId);
Propósito: Obtener información del autor de un post

Ventaja: Se integra perfectamente con usePostDetail


Reflexión del Trabajo Realizado
Aprendizajes Principales

Abstracción y Reutilización
Antes de crear custom hooks, cada componente implementaba su propio proceso de fetch utilizando useState y useEffect, lo que generaba duplicación de código, más posibilidades de errores y mayor dificultad para dar mantenimiento. Con los custom hooks, esa lógica repetida se concentró en un solo lugar, reduciendo bloques de más de 15 líneas a una única llamada.

Composición de Hooks
Los hooks pueden combinarse entre sí. usePosts, usePostDetail y useUsuario están construidos sobre useFetch, formando una arquitectura escalonada que separa claramente la lógica de negocio del manejo de datos.

Separación de Responsabilidades
Los componentes ahora se dedican exclusivamente a la interfaz y a gestionar interacciones, mientras que los hooks contienen la lógica de negocio y las solicitudes a la API. Esto genera un código más ordenado, entendible y fácil de mantener.

Facilidad para el Testing
Al trasladar la lógica a hooks independientes, es posible probarlos de forma aislada, simular respuestas de la API y crear tests más claros, específicos y sostenibles a largo plazo.