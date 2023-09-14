import { fireEvent, render, screen } from "@testing-library/react";
import { Navbar } from "../../../src/ui/components/NavBar";
import { AuthContext } from "../../../src/auth/context/AuthContext";
// eslint-disable-next-line no-unused-vars
import { MemoryRouter, useNavigate } from "react-router-dom";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

describe('Pruebas en <NavBar />', () => {

  const contextValue = {
    logged: true,
    user: {
      name: 'Ranchooo'
    },
    logout: jest.fn()
  };

  beforeEach(() => jest.clearAllMocks())

  test('debe de mostrar el nombre del usuario', () => {    
    render(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    )
    // screen.debug()
    expect(screen.getByText('Ranchooo')).toBeTruthy();   
  });

  test('debe de llamar el logout y navigate cuando se hace click en el boton', () => {
    render(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    )
    const logoutButton = screen.getByRole('button', { name: 'Logout' })
    // console.log(logoutButton);
    fireEvent.click(logoutButton);
    // screen.debug()
    expect(contextValue.logout).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith("/login", {"replace": true});
  })
});