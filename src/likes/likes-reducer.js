import {createSlice} from "@reduxjs/toolkit";
import {userLikesPokemonThunk, findPokemonCaughtByUserThunk, userUnlikesPokemonThunk, findPokemonCaughtByUserIDThunk} from "./likes-thunks";

const initialState = {
    likes: [],
    loading: false
}

const likesReducer = createSlice({
    name: 'likes',
    initialState,
    extraReducers: {
        [userLikesPokemonThunk.fulfilled]: (state, action) => {
            state.likes.push(action.payload)
        },
        [findPokemonCaughtByUserThunk.fulfilled]: (state, action) => {
            state.likes = (action.payload)
        },
        [findPokemonCaughtByUserIDThunk.fulfilled]: (state, action) => {
            state.likes = (action.payload)
        },
        [userUnlikesPokemonThunk.fulfilled]: (state, action) => {
            const index = state.likes.indexOf(action.payload);
            if (index > -1) { 
                state.likes.splice(index, 1); 
            }
        },
    }
})

export default likesReducer.reducer;