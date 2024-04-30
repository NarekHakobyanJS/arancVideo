import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchOneFilm, fetchTrailer } from '../../store/slices/filmsSlice'


const imgUrl = "https://image.tmdb.org/t/p/w500/"

const FilmPage = () => {
  const dispatch = useAppDispatch()
  const iframe = useRef(null)

  
  const {film} = useAppSelector((state) => state.filmsData)
  const {id} = useParams()
  


  useEffect(() => {
    dispatch(fetchOneFilm(id))
    console.log(id);
    
    // dispatch(fetchTrailer({id, iframe}))

    // console.log(iframe);
    
  }, [id])

  const myId = film?.id
  useEffect(() => {
    dispatch(fetchTrailer({myId , iframe }))
}, [myId])
  return (
    <div>
      <h3>{film?.title}</h3>
      <img src={imgUrl + film?.backdrop_path} />
      <iframe ref={iframe} />
      </div>
  )
}

export default FilmPage