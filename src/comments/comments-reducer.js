import {createSlice} from "@reduxjs/toolkit";
import {createCommentThunk, findCommentsByAuthorThunk, findCommentsByPokemonThunk} from "./comments-thunks";

const commentsReducer = createSlice({
    name: 'comments',
    initialState: {
        comments: []
    },
    extraReducers: {
        [createCommentThunk.fulfilled]: (state, action) => {
            state.comments.push(action.payload)
        },
        [findCommentsByPokemonThunk.fulfilled]: (state, action) => {
            state.comments = action.payload
        },
        [findCommentsByAuthorThunk.fulfilled]: (state, action) => {
            state.comments = action.payload
        }
    }
})

export default commentsReducer.reducer