import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from '../../ui/components/NavBar';
import { MarvelPage, DcPage, SearchPage, HeroPage } from '../'

export const HeroesRoutes = () => {
  
  return (
    <>
      <Navbar />

      <div className='container'>
        <Routes>
          <Route path='marvel' element={ <MarvelPage /> } />
          <Route path='dc' element={ <DcPage /> } />
          <Route path='search' element={ <SearchPage /> } />
          <Route path='hero/:id' element={ <HeroPage /> } />

          <Route path='/' element={ <Navigate to='/dc' /> } /> {/*  path al que se dirigira en caso de que la ruta no exista */}
        </Routes>
      </div>
    </>
  )
}
