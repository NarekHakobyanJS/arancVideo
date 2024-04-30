import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { chnageList, fetchGenresFilms } from '../../store/slices/genresSlice'
import FilmsCard from '../../Components/FilmsCard/FilmsCard'
import style from '../HomePage/HomePage.module.css'

const GenresPage = () => {

    const { id } = useParams()
    const dispatch = useAppDispatch()
    const { genresFilms, page, total_count, total_pages } = useAppSelector((state) => state.genresData)
    
    useEffect(() => {
        dispatch(fetchGenresFilms({page, id}))
    }, [page, id])

    const total = Math.ceil(total_pages/total_count) 
    let arr = []

    for(let i = 1; i <= total; i++){
        arr.push(i)
    }

    // knopkeqi qanake
    let portionSize = 10
    let [portionNumber, setPortionNumber] = useState(1);

    // / (1 - 1) * 10 + 1 = 1
    // sksvelu pahe mijankyal hatvace
    let leftPortionNumber = (portionNumber - 1) * portionSize + 1
    // verjanalu diapazone
    let rightPortionPageNumber = portionNumber * portionSize
    // console.log(portionNumber, 'portionNumber');
    // console.log(leftPortionNumber, 'left');
    // console.log(rightPortionPageNumber, 'right');
    
    const changeList = (p : number) => {
        dispatch(chnageList(p))
    }
    
    // console.log(portionNumber);
    
    return (
        <>
        {
            // 1 > 1 = false
            portionNumber > 1 && 
            <button onClick={() => setPortionNumber(portionNumber - 1)}>prev</button>
        }
        <div>
            {
                arr
                .filter(p => p >= leftPortionNumber && p <= rightPortionPageNumber)
                .map((p) => {
                    return <button 
        
                    className={p === page ? 'a' : ''} onClick={() => changeList(p)}>{p}</button>
                })
            }
        </div>
        {
            // true
            total > portionNumber &&
                <button onClick={() => setPortionNumber(portionNumber + 1)}>Next</button>
        }
        <div className={style.homePage}>
            {
                genresFilms.map((film) => {

                    return (
                        <NavLink to={`/${film.id}`}>
                            <FilmsCard film={film} />
                        </NavLink>
                    )
                })
            }
        </div>
        </>
    )
}

export default GenresPage