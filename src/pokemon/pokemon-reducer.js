import {createSlice} from "@reduxjs/toolkit";
import {findAllPokemonThunk, createPokemonThunk, deletePokemonThunk} from "./pokemon-thunks";

const initialState = {
    pokemons: [],
    loading: true
}

const pokemonsReducer = createSlice({
    name: 'pokemons',
    initialState: initialState,
    extraReducers: {
        [findAllPokemonThunk.fulfilled]: (state, action) => {
            state.pokemons = action.payload
        },
        [createPokemonThunk.fulfilled]: (state, action) => {
            state.pokemons.push(action.payload)
        },
        [deletePokemonThunk.fulfilled]: (state, action) => {
            state.pokemons = state.pokemons.filter(p => {
                return p._id !== action.payload
            })
        }
    }
})

export default pokemonsReducer.reducer;