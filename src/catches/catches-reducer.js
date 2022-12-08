import {createSlice} from "@reduxjs/toolkit";
import {userCatchesPokemonThunk, findPokemonCaughtByUserThunk, userReleasesPokemonThunk, findPokemonCaughtByUserIDThunk} from "./catches-thunks";

const initialState = {
    catches: [],
    loading: false
}

const catchesReducer = createSlice({
    name: 'catches',
    initialState,
    extraReducers: {
        [userCatchesPokemonThunk.fulfilled]: (state, action) => {
            state.catches.push(action.payload)
        },
        [findPokemonCaughtByUserThunk.fulfilled]: (state, action) => {
            state.catches = (action.payload)
        },
        [findPokemonCaughtByUserIDThunk.fulfilled]: (state, action) => {
            state.catches = (action.payload)
        },
        [userReleasesPokemonThunk.fulfilled]: (state, action) => {
            const index = state.catches.indexOf(action.payload);
            if (index > -1) { 
                state.catches.splice(index, 1); 
            }
        },
    }
})

export default catchesReducer.reducer;