import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { FilmsAPI } from "../../api/api";
import { AxiosResponse } from "axios";

export type FilmsType = {
    adult: boolean,
    backdrop_path: string,
    id: number,
    original_language: string,
    overview: string,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number
    vote_count: number
}

type ResponsePage = {
    page: number,
    results: Array<FilmsType>,
    total_pages: number,
    total_results: number
}


type FilmsStateType = {
    films: Array<FilmsType>,
    search : Array<FilmsType>,
    page: number,
    film: FilmsType | null,
    text: string
}

const initialState: FilmsStateType = {
    films: [],
    page: 1,
    film: null,
    text: '',
    search : []
}


export const fetcSearchFilms = createAsyncThunk<Array<FilmsType>, string>(
    'fetcSearchFilms',
    async (text) => {
        const resposne: AxiosResponse<ResponsePage> = await FilmsAPI.getSearch(text);

        return resposne.data.results
    }
)

export const fetchOneFilm = createAsyncThunk<FilmsType, string | undefined>(
    'fetchOneFilm',
    async (id) => {
        const response: AxiosResponse<FilmsType> = await FilmsAPI.getOneFilm(id)

        return response.data

    }
)

export const fetcFilms = createAsyncThunk<Array<FilmsType>, number>(
    'fetcFilms',
    async (page) => {
        const resposne: AxiosResponse<ResponsePage> = await FilmsAPI.getFilms(page);

        return resposne.data.results
    }
)



// export type VideoData = {
//     id: string,
//     iso_639_1: string,
//     iso_3166_1: string,
//     key: string,
//     name: string,
//     official: boolean,
//     published_at: string,
//     site: string
//     size: number,
//     type: string
// }



export const fetchTrailer = createAsyncThunk<void, any>(
    'fetchTrailer',
    async ({ movieId, iframe }: any) => {
        const res: AxiosResponse<any> = await FilmsAPI.getTrailer(movieId)
        console.log(res);
        
        res.data.results.forEach((elm: any) => {
            if (elm.name === "Official Trailer") {
                iframe?.current?.setAttribute(
                    "src",
                    `https://www.youtube.com/embed/${elm.key}`
                );
            } else {
                iframe?.current?.setAttribute(
                    "src",
                    `https://www.youtube.com/embed/${elm.key}`
                );
            }
        })

    }
)




const filmsSlice = createSlice({
    name: 'filmsSlice',
    initialState,
    reducers: {
        changePage(state) {
            state.page = state.page + 1
        },
        changeText(state, action) {
            state.text = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(fetcFilms.fulfilled, (state, action: PayloadAction<Array<FilmsType>>) => {
            state.films = [...state.films, ...action.payload]
        })
        builder.addCase(fetchOneFilm.fulfilled, (state, action: PayloadAction<FilmsType>) => {
            state.film = action.payload
        })
        builder.addCase(fetcSearchFilms.fulfilled, (state, action: PayloadAction<Array<FilmsType>>) => {
            state.search = action.payload
        })
    },
})

export const { changePage, changeText } = filmsSlice.actions

export default filmsSlice.reducer