import Header from './Components/Header/Header';
import { useEffect, useState } from 'react';
import { fetchGenres } from './store/slices/genresSlice';
import './App.css';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { changePage, fetcFilms, fetchOneFilm } from './store/slices/filmsSlice';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import FilmPage from './pages/FilmPage/FilmPage';
import GenresPage from './pages/GenresPage/GenresPage';



function App() {
  const [load, setLaod] = useState(false)
  const dispatch = useAppDispatch()
  const {page} = useAppSelector((state) => state.filmsData)
  
  useEffect(() => {
    document.addEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    dispatch(fetchGenres())
    dispatch(fetcFilms(page))
    if(load) {
      dispatch(changePage())
    }
  }, [load])

  const handleScroll = (e : any) => {
    
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
      setLaod(true)
    }else {
      setLaod(false)
    }
  }
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<HomePage /> }/>
        <Route path='/:id' element={<FilmPage /> }/>
        <Route path='/genres/:id/:name' element={<GenresPage /> }/>
      </Routes>
    </div>
  );
}

export default App;
