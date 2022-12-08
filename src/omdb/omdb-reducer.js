import {createSlice} from "@reduxjs/toolkit";
import {findPokemonByNameThunk, findPokemonBySearchTermThunk} from "./omdb-thunks";

const initialState = {
    pokemon: [],
    loading: false,
    details: {}
}

const omdbReducer = createSlice({
    name: 'omdb',
    initialState,
    extraReducers: {
        [findPokemonBySearchTermThunk.fulfilled]: (state, action) => {
            state.pokemon = action.payload
        },
        [findPokemonByNameThunk.fulfilled]: (state, action) => {
            state.details = action.payload
        }
    }
})

export default omdbReducer.reducer