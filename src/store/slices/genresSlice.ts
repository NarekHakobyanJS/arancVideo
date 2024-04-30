import { createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import { FilmsAPI } from "../../api/api";
import {AxiosResponse} from 'axios'
import { FilmsType, changePage } from "./filmsSlice";

type GenresType = {
    id : number,
    name : string
}
type GenresStateType = {
    genres : Array<GenresType>
    total_pages : number,
    genresFilms : Array<FilmsType>,
    page : number | string | undefined,
    total_count : number
}

const initialState : GenresStateType = {
    genres : [],
    total_pages : 1,
    genresFilms : [],
    page : 1,
    total_count : 20


}

export const fetchGenres = createAsyncThunk<Array<GenresType>>(
    'fetchGenres',
    async () => {
        const resposne : AxiosResponse<GenresStateType> = await FilmsAPI.getGenres();

        return resposne.data.genres
    }
)

export const fetchGenresFilms = createAsyncThunk<any, any, any>(
    'fetchGenresFilms',
    async ({page, id}, {dispatch}) => {
        const resposne : AxiosResponse<any> = await FilmsAPI.getGenresFilms(page, id)
        dispatch(pageChange(resposne.data.total_pages))
        
        return resposne.data.results
        
        
    }
)
const genresSlice = createSlice({
    name : 'genresSlice',
    initialState ,
    reducers : {
        pageChange(state, action){
            state.total_pages = action.payload
        },
        chnageList(state, action){
            state.page = action.payload
        }
    },
    extraReducers : (builder) => {
        builder.addCase(fetchGenres.fulfilled, (state, action : PayloadAction<Array<GenresType>>) => {
            state.genres = action.payload
        })
        builder.addCase(fetchGenresFilms.fulfilled, (state, action) => {
            state.genresFilms = action.payload
        })
    }
})

export const {pageChange, chnageList} = genresSlice.actions
export default genresSlice.reducer