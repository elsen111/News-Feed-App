import { createSlice } from "@reduxjs/toolkit";

const defaulState = localStorage.getItem('suggestionParams') ? 
    JSON.parse(localStorage.getItem('suggestionParams')) : [];


const suggestionSlices = createSlice({
    name: 'suggestionParams',
    initialState: defaulState,
    reducers: {
        addParams: (state, action) => {
            console.log("Params added successfully: ");
            console.log('Before: ' + state);

            const paramsExists = state.find(param => param === action.payload);
            if (!paramsExists) {
                state.push(action.payload);
            }
            localStorage.setItem('suggestionParams', JSON.stringify(state))

            console.log('After: ' + state);
        },

        removeParams: (state, action) => {
            console.log("Params removed successfully: ");
            console.log("Before: " + state);

            const newState = state.filter(param => param !== action.payload);
            localStorage.setItem('suggestionParams', JSON.stringify(newState));
            return newState;
        }
    }
})

export const { addParams, removeParams } = suggestionSlices.actions;
export default suggestionSlices.reducer;