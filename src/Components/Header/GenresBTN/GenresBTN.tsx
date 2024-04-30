import React from 'react'
import style from './GenresBTN.module.css'
import { GenresType } from '../Header'
import { NavLink } from 'react-router-dom'

type PropsType = {
    genre : GenresType
}

const GenresBTN = ({genre} : PropsType) => {
  return (
    <button className={style.btn}>
      <NavLink to={`/genres/${genre.id}/${genre.name}`}>
      {genre.name}
      </NavLink>
      </button>
  )
}

export default GenresBTN