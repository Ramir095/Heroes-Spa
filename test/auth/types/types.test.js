import { types } from "../../../src/auth";

describe('Pruebas en "types.js"', () => {
  
  test('debe de regresar los types login y logout', () => {
    expect(types).toEqual({
      login: 'LOGIN',
      logout: 'LOGOUT'
    });
  });

});