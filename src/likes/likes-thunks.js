import {createAsyncThunk} from "@reduxjs/toolkit";
import {userLikesPokemon, findPokemonCaughtByUser, userUnlikesPokemon} from "./likes-service";

export const userLikesPokemonThunk = createAsyncThunk(
    'userLikesPokemonThunk',
    async (like) => {
        return await userLikesPokemon(like.uid, like.pid)
    }
)

export const findPokemonCaughtByUserThunk = createAsyncThunk(
    'findPokemonCaughtByUserThunk',
    async (user) => {
        return await findPokemonCaughtByUser(user._id)
    }
)

export const findPokemonCaughtByUserIDThunk = createAsyncThunk(
    'findPokemonCaughtByUserThunk',
    async (uid) => {
        return await findPokemonCaughtByUser(uid)
    }
)

export const userUnlikesPokemonThunk = createAsyncThunk(
    'userUnlikesPokemonThunk',
    async (like) => {
        return await userUnlikesPokemon(like.uid, like.pid)
    }
)