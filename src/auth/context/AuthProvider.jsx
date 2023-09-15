import { useReducer } from 'react';
import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';
import { types } from '../types/types';

// SEGUNDO

// Al tener el dato en el localStorage, ya no es necesario tener usar initialState ya que en el init estamos indicando se si no se encuentra un user, que el logged este en false
// const initialState = {
//   logged: false
// };

const init = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return {
    logged: !!user, // Si user es undefine se convertiria en "false" pero si existe un usuario entonces seria "true"
    user: user
  };
};

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  

  const [ authState, dispatch ] = useReducer( authReducer, {}, init ) // VIDEO 210 Primer parametro es el reducer que vamos a utilizar y el segundo es el estado inicial

  const login = (name = '') => {
    const user = { id: 'ABC', name }
    const action = {
      type: types.login,
      payload: user
    };
    // Guardamos en el localStorage
    localStorage.setItem('user', JSON.stringify(user))

    dispatch(action);
  };  

  const logout = () => {
    localStorage.removeItem('user'); // Limpiamos el local storage
    const action = {
      type: types.logout
    };
    dispatch(action);
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      authState,
      // Methods
      login,
      logout
    }}>
      { children }
    </AuthContext.Provider>
  )
};