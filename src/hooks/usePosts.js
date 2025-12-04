
import { Link } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';
import './ListaPosts.css';

function ListaPosts() {
  // 🎯 Usando el custom hook usePosts
  // Esto elimina todo el código repetitivo de useState y useEffect
  const { posts, cargando, error } = usePosts();

  // Estado de carga
  if (cargando) {
    return (
      <div className="cargando">
        <div className="spinner"></div>
        <p>Cargando posts...</p>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className="error">
        <h2>❌ Error al cargar posts</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="lista-container">
      <h2>📋 Lista de Posts</h2>
      <p className="subtitulo">Total de posts: {posts.length}</p>

      <div className="posts-grid">
        {posts.map(post => (
          <Link 
            to={`/post/${post.id}`} 
            key={post.id}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="post-card">
              <h3>{post.title}</h3>
              <p>{post.body.substring(0, 100)}...</p>
              <span className="ver-mas">Ver detalle →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ListaPosts;