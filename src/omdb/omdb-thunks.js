import {createAsyncThunk} from "@reduxjs/toolkit";
import {findPokemonByName, findPokemonBySearchTerm} from "./omdb-service";

export const findPokemonBySearchTermThunk = createAsyncThunk(
    'findMovieBySearchTerm',
    (term) => findPokemonBySearchTerm(term)
)
export const findPokemonByNameThunk = createAsyncThunk(
    'findMovieByImdbId',
    (pokemon_name) => findPokemonByName(pokemon_name)
)