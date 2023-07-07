import { useContext } from "react"
import { AuthContext } from "../auth/context/AuthContext"
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }) => {

  const { logged } = useContext(AuthContext); // Tambien puedo traer authState y en el return validad el authState.logged
  return (
    (logged) // logged es true?
    ? <Navigate to='/dc' /> // Si es true haceme esto
    : children // Si no es true devolveme el children (login)
  )
}
