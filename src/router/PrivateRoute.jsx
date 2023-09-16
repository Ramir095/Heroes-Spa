import { useContext, useEffect } from 'react'
import { AuthContext } from '../auth/context/AuthContext'
import { Navigate, useLocation } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {

  // const { authState } = useContext(AuthContext);
  const { logged } = useContext(AuthContext);
  const { pathname, search } = useLocation();

  const lastPath = pathname + search; // La ruta donde se encuentra el usuario + las query que busca el usuario
  
  useEffect(() => {
    localStorage.setItem('lastPath', lastPath) // Guardamos la ruta en el local Storage
  }, [lastPath])

  return (
     // (authState.logged) Si es true
    (logged)
    ? children // devolveme las rutas privadas
    : <Navigate to='/login' />
  )
}
