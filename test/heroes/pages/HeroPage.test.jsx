import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HeroPage } from "../../../src/heroes/pages/HeroPage";

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: 'marvel-iron',
  }),
  useNavigate: () => mockedUseNavigate
}));

describe('Pruebas en <HeroPage />', () => {

  beforeEach(() => jest.clearAllMocks());
  test('Debería mostrar la información del héroe', () => {
    render(
      <MemoryRouter initialEntries={['/hero/marvel-iron']}>
        <HeroPage />
      </MemoryRouter>
    )
    // expect(screen.getByText('Tony Stark')).toBeTruthy();
    expect(screen.getByRole('heading', { level: 3 }).innerHTML).toContain('Iron Man');
    expect(screen.getByRole('button', { name: 'Back' })).toBeTruthy();
  });

  test('debe de regresar la pantalla al presionar en el boton "Back"', () => {

    render(
      <MemoryRouter initialEntries={['/hero/marvel-iron']}>
        <HeroPage />
      </MemoryRouter>
    )
    const buttonBack = screen.getByRole('button', { name: 'Back' });
    fireEvent.click(buttonBack);
    // screen.debug()

    expect(mockedUseNavigate).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith(-1);
  });

});