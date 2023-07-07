import { authReducer, types } from "../../../src/auth";

describe('Pruebas en authReducer', () => {

  const initialState = { logged: false };
  test('debe de retornar el estado por defecto', () => {

    const state = authReducer(initialState, {});
    expect(state).toBe(initialState)
  });

  test('debe de (login) llamar el login autenticar y establecer el user', () => {
    const user = {
      id: 'ABC',
      name: 'Ramiro'
    };

    const state = authReducer(initialState, {
      type: types.login,
      payload: user
    });

    expect(state.logged).toBe(true);
    expect(state.user).toBe(user)
  });

  test('debe de (logout) borrar el name del usuario logout en false', () => {
    const state = {
      logged: true,
      user: {
        id: '123',
        name: 'Kevin'
      }
    };

    const newState = authReducer(state, {
      type: types.logout,
    });

    expect(newState.logged).toBeFalsy();
  });

});