import {createAsyncThunk} from "@reduxjs/toolkit";
import {createComment, findCommentsByPokemon, findCommentsByAuthor, deleteComment} from "./comments-service";

export const createCommentThunk = createAsyncThunk(
    'createCommentThunk',
    async (comment) => createComment(comment)
)
export const deleteCommentThunk = createAsyncThunk(
    'deleteCommentThunk',
    async (comment) => deleteComment(comment)
)
export const findCommentsByPokemonThunk = createAsyncThunk(
    'findCommentsByPokemonThunk',
    async (pokemon_name) => findCommentsByPokemon(pokemon_name)

)
export const findCommentsByAuthorThunk = createAsyncThunk(
    'findCommentsByAuthorThunk',
    async (author) => findCommentsByAuthor(author)
)
