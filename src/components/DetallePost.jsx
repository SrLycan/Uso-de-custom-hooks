// src/components/DetallePost.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { usePostDetail, useUsuario } from '../hooks/usePosts';
import './DetallePost.css';

function DetallePost() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 🎯 Usando custom hooks para obtener post y usuario
  // Esto elimina todo el código repetitivo
  const { post, cargando: cargandoPost, error: errorPost } = usePostDetail(id);
  const { usuario, cargando: cargandoUsuario, error: errorUsuario } = useUsuario(post?.userId);

  // Estado de carga
  if (cargandoPost || cargandoUsuario) {
    return (
      <div className="cargando">
        <div className="spinner"></div>
        <p>Cargando detalles...</p>
      </div>
    );
  }

  // Estado de error
  if (errorPost) {
    return (
      <div className="error">
        <h2>❌ Error al cargar el post</h2>
        <p>{errorPost}</p>
        <button onClick={() => navigate('/')}>
          ← Volver a la lista
        </button>
      </div>
    );
  }

  // Si no hay post
  if (!post) {
    return (
      <div className="error">
        <h2>Post no encontrado</h2>
        <button onClick={() => navigate('/')}>
          ← Volver a la lista
        </button>
      </div>
    );
  }

  return (
    <div className="detalle-container">
      <button 
        className="boton-volver" 
        onClick={() => navigate('/')}
      >
        ← Volver a la lista
      </button>

      <div className="detalle-card">
        <div className="detalle-header">
          <h1>{post.title}</h1>
          <div className="meta-info">
            <span>📝 Post #{post.id}</span>
            <span>👤 User #{post.userId}</span>
          </div>
        </div>

        <div className="detalle-contenido">
          <h3>Contenido:</h3>
          <p>{post.body}</p>
        </div>

        {usuario && (
          <div className="autor-info">
            <h3>👤 Información del Autor</h3>
            <div className="autor-detalles">
              <p><strong>Nombre:</strong> {usuario.name}</p>
              <p><strong>Usuario:</strong> @{usuario.username}</p>
              <p><strong>Email:</strong> {usuario.email}</p>
              <p><strong>Sitio web:</strong> {usuario.website}</p>
              <p><strong>Ciudad:</strong> {usuario.address?.city}</p>
            </div>
          </div>
        )}

        {errorUsuario && (
          <div className="error-usuario">
            <p>⚠️ No se pudo cargar la información del autor</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetallePost;