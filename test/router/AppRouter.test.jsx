import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth/context/AuthContext";
import { AppRouter } from "../../src/router/AppRouter";

describe('Pruebas en <AppRouter />', () => {
  test('debe de mostrar el login si no está autenticado', () => {
    // Como estoy usando el Routes dentro del componente voy a usar el MemoryRouter y el AuthContext para proporcionar la información del contexto; sino las rutas publicas y privadas no van a funcionar
    const contextValue = {
      authState: {
        logged: false
      }
    }
    
    render(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter initialEntries={['/marvel']}> {/* Nos paramos en /marvel para que asi, al no estar autenticado, me dirige al /login */}
          <AppRouter />
        </MemoryRouter>
      </AuthContext.Provider>
    )
   
   expect(screen.getAllByText('Login').length).toBe(2);
  });

  test('debe de mostrar el componente de Marvel si está auntenticado', () => {
    const contextValue = {
      authState: {
        logged: true,
        user: {
          id: 'ABC123',
          name: 'Ramiro'
        }
      }
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/marvel']}>
          <AppRouter /> 
        </MemoryRouter>
      </AuthContext.Provider>
    )    

    expect(screen.getByText('Marvel Comics')).toBeTruthy();
    expect(screen.getAllByText('Marvel').length).toBeGreaterThanOrEqual(1); // Que sea 1 o mayor a 1
    // screen.debug()
  })
});