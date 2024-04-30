import React, { useEffect, useState } from 'react'
import style from './Header.module.css';
import GenresBTN from './GenresBTN/GenresBTN';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeText, fetcSearchFilms } from '../../store/slices/filmsSlice';
import { NavLink } from 'react-router-dom';

export type GenresType = {
  id: number,
  name: string
}

type PropsType = {

}

const Header = (props: PropsType) => {

  const { genres } = useAppSelector((state) => state.genresData)
  const { text, search } = useAppSelector((state) => state.filmsData)
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState<null | boolean>(null)

  useEffect(() => {
    if (text.length > 3) {
      dispatch(fetcSearchFilms(text))
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [text])

  const close = () => {
    setOpen(false)
    dispatch(changeText(''))
  }
  return (
    <header className={style.header}>

      <img src='https://i.pinimg.com/1200x/9f/af/a2/9fafa279d0c51d7f48be68ff06cd71cd.jpg' />
    
      <div className={style.btnDiv}>
        {
          genres.map((genre: GenresType) => {
            return <GenresBTN key={genre.id} genre={genre} />
          })
        }
      </div>
      <div className={style.search}>
        <input value={text} onChange={(e) => dispatch(changeText(e.target.value))} />
        {
          open && <div className={style.searchBlock}>
            {
              search.map((sf) => {
                return <div key={sf.id}>
                  <NavLink to={`/${sf.id}`} 
                  onClick={close}
                  >
                  <h4>{sf.title}</h4>

                  </NavLink>
                  </div>
              })
            }
          </div>
        }
      </div>
    </header>
  )
}

export default Header