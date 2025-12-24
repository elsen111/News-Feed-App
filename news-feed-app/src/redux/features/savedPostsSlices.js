import { createSlice } from "@reduxjs/toolkit";

const defaulState = localStorage.getItem('savedPosts') ?
    JSON.parse(localStorage.getItem('savedPosts')) : [];


const savedPostsSlices = createSlice({
    name: "savedPosts",
    initialState: defaulState,
    reducers: {
        returnSavedPosts: () => {
            return state;
        },

        savePost: (state, action) => {
            const postExists = state.find(post => post.article_id === action.payload.article_id);
            if (!postExists) {
                state.unshift(action.payload);
            }
            localStorage.setItem('savedPosts', JSON.stringify(state));
        },

        removePost: (state, action) => {
            const newState = state.filter(post => post.article_id !== action.payload);
            localStorage.setItem('savedPosts', JSON.stringify(newState));
            console.log(newState);
            return newState;
        },

        clearSavedPosts: () => {
            localStorage.removeItem('savedPosts');
            return [];
        }
    }
})

export const { savePost, removePost, clearSavedPosts } = savedPostsSlices.actions;
export default savedPostsSlices.reducer;