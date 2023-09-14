import { authReducer } from "../../../src/auth/context/authReducer";
import { types } from "../../../src/auth/types/types";

describe('Prueba en authReducerTwo', () => {
  
  let initialState = {}
  const user = {
    id: 'ABC',
    name: 'El Ramirito'
  };
  test('Debe de retornar el estado por defecto', () => {
    const newState = authReducer(initialState, {});
    expect(newState).toBe(initialState)
  });

  test('Debe de (login) llamar el login autenticar y establecer el user', () => {
    const action = {
      type: types.login,
      payload: user
    };

    const newState = authReducer(initialState, action);
    expect(newState.logged).toBeTruthy();
    expect(newState.user).toBe(user);
  });

  test('deve de (logout) borrar el name del usuario y logged en false', () => {
    initialState = {
      logged: types.login,
      payload: user,
    }
    const newState = authReducer(initialState, {
      type: types.logout,
    });
    expect(newState.logged).toBeFalsy();
  });
});