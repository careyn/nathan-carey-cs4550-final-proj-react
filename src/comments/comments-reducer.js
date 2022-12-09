import {createSlice} from "@reduxjs/toolkit";
import {createCommentThunk, findCommentsByAuthorThunk, findCommentsByPokemonThunk, deleteCommentThunk} from "./comments-thunks";

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
        },
        [deleteCommentThunk.fulfilled]: (state, action) => {
            state.comments = state.comments.filter(c => {
                return c._id !== action.payload
            })
        }
    }
})

export default commentsReducer.reducer