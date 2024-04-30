import React from 'react'
import { useAppSelector } from '../../store/hooks'
import style from './HomePage.module.css'
import FilmsCard from '../../Components/FilmsCard/FilmsCard'
import { NavLink } from 'react-router-dom'


const HomePage = () => {
    const { films } = useAppSelector((state) => state.filmsData)


    return (
        <>
            <div className={style.homePage}>
                {

                    films.map((film: any, index : any) => {
                        return (
                            <NavLink to={`/${film.id}`}>
                                <FilmsCard film={film} key={index} />
                            </NavLink>

                        )
                    })
                }
            </div>
            <button className={style.loading}>loading...</button>
        </>
    )
}

export default HomePage