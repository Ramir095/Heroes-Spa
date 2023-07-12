import { Navigate, useNavigate, useParams } from "react-router-dom"
import { getHeroById } from "../helpers";
import { useMemo } from "react";

export const HeroPage = () => {

  // const [bolean, setBolean] = useState(false); // Estado usado para probar la funcionalidad del useCallback

  const navigate = useNavigate();
  const { id } = useParams();
  
  // const hero = getHeroById(id);
  // aplicamos el useMemo porque la funcion getHeroById solo deberia renderizarse cuando el id cambie y no cada vez que el estado bolean cambie. useMemo para guardar valores y useCallback para memorizar funciones
  const hero = useMemo(() => getHeroById(id), [id]) // Va a disparar la funcion (solamente) cada vez que el id cambie

  const handleBack = () => {
    navigate(-1);
  };

  if(!hero) {
    return <Navigate to='/marvel' /> // si no encuentra un super heroe en la ruta, nos direccionará a '/marvel. No olvidar el Return
  }

  return (
    <div className='row mt-5'>
      <div className='col-4'>
        <img
          src={ `/heroes/${ id }.jpg` }
          alt={ hero.superhero }
          className='img-thumbnail animate__animated animate__fadeInLeft'
        />
      </div>

      <div className='col-8'>
        <h3>{ hero.superhero }</h3>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'> <b>Alter ego:</b> { hero.alter_ego } </li>
          <li className='list-group-item'> <b>Publisher:</b> { hero.publisher } </li>
          <li className='list-group-item'> <b>First appearance:</b> { hero.first_appearance } </li>
        </ul>

        <h5 className='mt-3'>Characters</h5>
        <p>{ hero.characters }</p>

        <button 
          className='btn btn-outline-primary'
          onClick={ handleBack }
        >
          Back
        </button>
        
        {/* <button 
          className='btn btn-outline-primary'
          onClick={ () => setBolean(!bolean) }
        >
          { JSON.stringify(bolean) }
        </button> */}

      </div>

    </div>
  )
}
