import {createAsyncThunk} from "@reduxjs/toolkit";
import {findAllPokemon, createPokemon, deletePokemon} from "./pokemon-service";

export const createPokemonThunk = createAsyncThunk(
    'createPokemon',
    (newPokemon) => createPokemon(newPokemon)
)

export const findAllPokemonThunk = createAsyncThunk(
    'findAllPokemon',
    () => findAllPokemon()
)

export const deletePokemonThunk = createAsyncThunk(
    'deletePokemon',
    (pid) => deletePokemon(pid)
)