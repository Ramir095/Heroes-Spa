import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

const CharactersByHero = ({ alter_ego, characters }) => {
  return (alter_ego === characters)
  ? <></>
  : <p>{ characters }</p>
}

export const HeroCard = ({ hero }) => {

  const {
    id,
    superhero,
//    publisher,
    alter_ego,
    first_appearance,
    characters,
  } = hero
  
  const heroImageUrl = `/heroes/${ id }.jpg`

  return (
    <div className='col animate__animated animate__fadeIn'>
      <div className='card'>
 
        <div className='row no-gutters'>

          <section className='col-4'>
            <img src={ heroImageUrl } className='card-img' alt={ superhero } />
          </section>

          <section className='col-8'>
            <div className='card-body'>
              <h5 className='card-title'>{ superhero }</h5>
              <p className='card-text'>{ alter_ego }</p>
              {/* {
                ( alter_ego !== characters && (<p>{ characters }</p>) )
              } */}
              <CharactersByHero alter_ego={ alter_ego } characters={ characters } />

              <p className='card-text'>
                <small className='text-muted'>{ first_appearance }</small>
              </p>

              <Link to={`/hero/${ id }`}>
                Mas...
              </Link>
            </div>
          </section>

        </div>

      </div>
    </div>
  )
};

HeroCard.propTypes = {
  hero: PropTypes.object.isRequired
};

CharactersByHero.propTypes = {
  alter_ego: PropTypes.string.isRequired,
  characters: PropTypes.string.isRequired
}