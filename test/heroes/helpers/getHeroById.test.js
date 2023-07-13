import { getHeroById } from "../../../src/heroes/helpers";

describe('Pruebas en getHeroById', () => {
  const id = 'marvel-cyclops';

  test('debe de regresarme el heroe correspondiendo al id (marvel-cyclops)', () => {
    const hero = getHeroById(id);
    expect(hero.id).toBe('marvel-cyclops')
  });
  
});