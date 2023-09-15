import queryString from 'query-string'; // nos ayuda a separar las distintas querys que vienen en location
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm'
import { HeroCard } from '../components'
import { getHeroesByName } from '../helpers/getHeroesByName';

export const SearchPage = () => {

  const navigate = useNavigate(); // Para obtener la navegación
  const location = useLocation(); // Para leer y obtener el query parametro (la información de la ubicación de donde nos encontramos). ¡Clase 203!
  
  const { q = '' } = queryString.parse( location.search ); // Extraemos todo lo que se encuentra en el objeto search. Aca queryString nos deja un objeto con todas las querys separadas. Extraemos la que nos sea util
  const heroes = getHeroesByName(q);

  const showSearch = (q.length === 0); // Si el usuario busca algo, esto seria FALSE.
  const showError = (q.length > 0) && heroes.length === 0; // Si el usuario busca algo, esto Seria TRUE pero si no se cuentra nada relacionado al texto que ingreso cambia a FALSE
  
  const { searchText, onInputChange } = useForm({
    searchText: q // Le ponemos el valor de la query para que en el input (a la hora de actualizar la pantalla) se mantenga el texto que ingreso el usuario y si no se encuentra valor, nos entrega un string vacio
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // if( searchText.trim().length <= 1 ) return;

    navigate(`?q=${ searchText }`); // colocamos la busqueda del usuario en el query dentro de la ruta donde nos encotnramos. Cuando no anotamos nada adelante del "?" es porque inidicamos que estamos en la misma ruta
  };

  return (
    <>
      <h1>Search</h1>
      <hr />

      <div className='row'>
        <section className='col-5'>
          <h4>Searching</h4>
          <hr />
          <form aria-label='form' onSubmit={ handleSubmit }>
            <input
              type='text'
              placeholder='Search a hero'
              className='form-control'
              name='searchText'
              autoComplete='off'
              value={ searchText }
              onChange={ onInputChange }
            />

            <button className='btn btn-outline-primary mt-1'>
              Search
            </button>
          </form>
        </section>
        
        <section className='col-7'>
          <h4>Results</h4>
          <hr />

          <div
            aria-label='search'
            className='alert alert-primary animate__animated animate__fadeIn'
            style={{ display: showSearch ? '' : 'none' }}
          >
            Search a hero
          </div>
          <div
            aria-label='alert-danger'
            className='alert alert-danger animate__animated animate__fadeIn'
            style={{ display: showError ? '' : 'none' }}
          >
            No hero with <b>{ q }</b>
          </div>

          {
            heroes && heroes.map(h => 
              <HeroCard key={ h.id } hero={h} />
            )
          }

        </section>
      </div>
    </>
  )
}
