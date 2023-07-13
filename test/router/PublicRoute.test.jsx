import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../src/auth/context/AuthContext";
import { PublicRoute } from "../../src/router/PublicRoute";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe('Prueba en el componente <PublicRoute />', () => {
  
  test('debe de mostrar el children si no esta autenticado', () => {
    // Estamos testeando un componente que usa el useContext, y por ende necesitamos el AuthContext. Para poder emular el PublicRoute o el PrivateRoute necesito estableces el contexto osea; usar el AuthContext.Provider

    // Estado donde me encuentro
    const contextValue = {
        logged: false
    };

    render(
      <AuthContext.Provider value={ contextValue }>
        <PublicRoute>
          <h1>Ruta pública</h1> {/* Este es el childre deberia de renderizarse si el logged es false */}
        </PublicRoute>
      </AuthContext.Provider>
    );
    // screen.debug()  

    expect(screen.getByText('Ruta pública')).toBeTruthy();
  });

  test('debe de navegar si está autenticado', () => {
    // Debo de asegurarme que se llame el navigate y que sea la pagina de /dc lo que se reenderizó
    // Cuando se valida al usuario, es direccionado a la pagina de DC pero nosotros no debemos renderizar ese componente porque son pruebas unitarios y no nos importa que renderice un componente externo al que estamos probando
    // Para hacer la prueba, con que se renderice algo que este en la ruta de /dc bastaria, ESO SIMULARIA QUE ESTAMOS LLEGANDO A LA PAGINA DE DC.

    const contextValue = {
      logged: true,
      user: {
        name: 'Rami',
        id: 'ABC123'
      }
    };

    // Como el logged es TRUE llama al Navigate y para usar el Navigate debe ser usado dentro de un contexto de un ROUTER. Usamos MemoryRouter
    render(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter initialEntries={['/login']}> {/* initialEntries es para simular la ruta en la que estoy parado */}
          <Routes> {/* definimos dos rutas porque estamos parados en /login y si creamos solo la ruta login, se genera un ciclo infinito */}
          {/* Acá copiamos exactamente como estamos usando nuestra Ruta publica */}
            <Route path='login' element={
              <PublicRoute>
                <h1>Ruta pública</h1>
              </PublicRoute>
            } />
            {/* Como el usuario esta autenticado va a mostrar la ruta dc */}
            <Route path='dc' element={
              <h1>Página dc</h1>
            } />
          </Routes>

        </MemoryRouter>
      </AuthContext.Provider>
    )

    expect(screen.getByText('Página dc')).toBeTruthy();
  });
});