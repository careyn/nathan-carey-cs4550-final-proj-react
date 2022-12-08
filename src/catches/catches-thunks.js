import {createAsyncThunk} from "@reduxjs/toolkit";
import {userCatchesPokemon, findPokemonCaughtByUser, userReleasesPokemon} from "./catches-service";

export const userCatchesPokemonThunk = createAsyncThunk(
    'userCatchesPokemonThunk',
    async (like) => {
        return await userCatchesPokemon(like.uid, like.pid)
    }
)

export const findPokemonCaughtByUserThunk = createAsyncThunk(
    'findPokemonCaughtByUserThunk',
    async (user) => {
        return await findPokemonCaughtByUser(user._id)
    }
)

export const findPokemonCaughtByUserIDThunk = createAsyncThunk(
    'findPokemonCaughtByUserIDThunk',
    async (uid) => {
        return await findPokemonCaughtByUser(uid)
    }
)

export const userReleasesPokemonThunk = createAsyncThunk(
    'userReleasesPokemonThunk',
    async (like) => {
        return await userReleasesPokemon(like.uid, like.pid)
    }
)