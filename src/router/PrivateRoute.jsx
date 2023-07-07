import { useContext, useEffect } from 'react'
import { AuthContext } from '../auth/context/AuthContext'
import { Navigate, useLocation } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {

  const { authState } = useContext(AuthContext);
  const { pathname, search } = useLocation();

  const lastPath = pathname + search; // La ruta donde se encuentra el usuario + las query que busca el usuario
  
  useEffect(() => {
    localStorage.setItem('lastPath', lastPath)
  }, [lastPath])

  return (
    (authState.logged) // Si es true
    ? children // devolveme las rutas
    : <Navigate to='/login' />
  )
}
