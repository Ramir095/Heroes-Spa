import { fireEvent, render, screen } from '@testing-library/react';
// eslint-disable-next-line no-unused-vars
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { SearchPage } from '../../../src/heroes/pages/SearchPage';

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate
}));

describe('pruebas en <SearchPage />', () => {
  beforeEach(() => jest.clearAllMocks());

  test('debe de mostrarse correctamente con valores por defecto', () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();

  });

  test('debe de mostrar a Batman y el input con el valor del queryString', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox'); // textbox es para tomar el input
    expect(input.value).toBe('batman');

    const img = screen.getByRole('img');
    expect(img.src).toContain('/heroes/dc-batman.jpg');

    const divSearchHero = screen.getByLabelText('search');
    // console.log(divSearchHero.style._values); // se puede llamar asi a los estilos
    expect(divSearchHero.style.display).toBe('none');
  });

  test('debe de mostrar un error si no se encuentra el hero (barman123)', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=barman123']}>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    expect(input.value).toBe('barman123');
    
    const noHeroWith = screen.getByLabelText('alert-danger');
    expect(noHeroWith.innerHTML).toContain('No hero with');
    expect(noHeroWith.style._values).toEqual({});
    expect(noHeroWith.style.display).toEqual('');
  });

  test('debe de llamar el navigate a la pantalla nueva', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=superman']}>
        <SearchPage />
      </MemoryRouter>
    );
    // const input = screen.getByRole('textbox');
    const form = screen.getByRole('form');
    // console.log('acaaa', form);
    // fireEvent.change(input, { target: { value: 'superman' } })
    fireEvent.submit(form);
    // screen.debug()
    
    // expect(useNavigate).toHaveBeenCalled()
    expect(mockedUseNavigate).toHaveBeenCalledWith('?q=superman');
  });

});