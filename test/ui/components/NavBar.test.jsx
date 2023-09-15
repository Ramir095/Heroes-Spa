import { fireEvent, render, screen } from '@testing-library/react';
import { Navbar } from '../../../src/ui/components/NavBar';
import { AuthContext } from '../../../src/auth/context/AuthContext';
// eslint-disable-next-line no-unused-vars
import { MemoryRouter, useNavigate } from 'react-router-dom';

// como el componente NavBar usa el useNavigate, lo podemos MOCKEAR UNA LIBRERIA COMPLETA
const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
})); // Estamos mockeando directamente la libreria 'react-router-dom'.
// le pasamos un segundo argumento que retorna un objeto en donde hacemos una copia de todo lo que trae esa libreria y sobre escribimos la funcion useNavigate

describe('Pruebas en <NavBar />', () => {
  
  const contextValue = {
    logout: jest.fn(),
    // authState: {
    logged: true,
    user: {
      id: 'ABC123',
      name: 'Ramiro Aduviri'
      // }
    }
  }

  beforeEach(() => jest.clearAllMocks());

  test('debe de mostrar el nombre del usuario que esta logeado', () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    )
    // const spanElement = screen.getByLabelText('span')
    expect(screen.getByText('Ramiro Aduviri')).toBeTruthy();
  })
  
  test('debe de llamar el logout y navigate cuando se hace clcick en el boton', () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    )
    const logoutButton = screen.getByRole('button', { name: 'Logout' });
    fireEvent.click(logoutButton);

    expect(contextValue.logout).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith('/login', {'replace': true});
  })
});