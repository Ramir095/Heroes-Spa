import { getHeroesByPublisher } from "../../../src/heroes/helpers";

describe('Pruebas en getHeroesByPublisher', () => {
  test('debe de retornar un arreglo si el publisher es valido', () => {
    const publisher = 'DC Comics'

    const found = getHeroesByPublisher(publisher);
    expect(found.length).toBeGreaterThan(1)
  });
});