import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../src/auth/context/AuthContext";
import { PrivateRoute } from "../../src/router/PrivateRoute";
import { MemoryRouter } from "react-router-dom";

describe('Prueba en el componente <PrivateRoute />', () => {

  test('debe de mostrar el children si esta autenticado', () => {
    Storage.prototype.setItem = jest.fn();

    const contextValue = {
      // authState: {
        logged: true,
        user: {
          id: 'ABC',
          name: 'Dieguito Maradona'
        }
      }
    // };

  render(
    <AuthContext.Provider value={ contextValue }>
      <MemoryRouter initialEntries={['/dc']}>
        <PrivateRoute>
          <h1>Ruta privada</h1>
        </PrivateRoute>
      </MemoryRouter>
    </AuthContext.Provider>
  );

  expect(screen.getByText('Ruta privada')).toBeTruthy();
  expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/dc")
  });

});