import { heroes } from "../data/heroes";

export const getHeroesByName = (name = '') => {

  name = name.toLocaleLowerCase().trim();
  
  if( name.length === 0 ) return [];
  return heroes.filter( h => h.superhero.toLocaleLowerCase().includes(name));

};