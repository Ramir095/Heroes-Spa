import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const LoginPage = () => {

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const lastPath = localStorage.getItem('lastPath') || '/'; 

  const handleLogin = () => {
    login('Ramiro Aduviri')

    navigate(lastPath, { // '/'
      replace: true // reenplaza el historial para que no vuelva a login. Elimina la visita anterior para que no se pueda volver a esa ruta en especifico
    });
  };

  return (
    <div className='container mt-5'>
      <h1>Login</h1>
      <hr />
      <button
        className='btn btn-primary'
        onClick={ handleLogin }
      >
        Login
      </button>
    </div>
  )
}
