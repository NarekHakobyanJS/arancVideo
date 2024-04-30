import React from 'react'
import style from './FilmsCard.module.css'
const imgUrl = "https://image.tmdb.org/t/p/w500/"

type PropsType = {
    film : {title : string, poster_path : string}
}

const FilmsCard = ({film} : PropsType) => {
    return (
        <div className={style.filmCard}>
            <img src={imgUrl + film.poster_path} />
            <h3>{film.title}</h3>
        </div>
    )
}

export default FilmsCard