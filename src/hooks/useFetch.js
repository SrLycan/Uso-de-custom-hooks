// src/hooks/useFetch.js
import { useState, useEffect } from 'react';

/**
 * Custom Hook para realizar peticiones HTTP
 * Abstrae la lógica repetitiva de fetch
 * @param {string} url - URL de la API
 * @returns {object} - { data, cargando, error }
 */
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Si no hay URL, no hacer nada
    if (!url) return;

    const cargarDatos = async () => {
      try {
        setCargando(true);
        setError(null);
        
        const respuesta = await fetch(url);
        
        if (!respuesta.ok) {
          throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        
        const datos = await respuesta.json();
        setData(datos);
        
      } catch (err) {
        setError(err.message);
        console.error('Error en useFetch:', err);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, [url]); // Se ejecuta cuando cambia la URL

  return { data, cargando, error };
};

export default useFetch;