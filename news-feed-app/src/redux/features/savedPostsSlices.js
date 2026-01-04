import { createSlice } from "@reduxjs/toolkit";

const savedPosts = localStorage.getItem('savedPosts') ?
    JSON.parse(localStorage.getItem('savedPosts')) : [];

const defaultState = {
    posts: savedPosts,
    renderedPostsCount: 12
}


const savedPostsSlices = createSlice({
    name: "savedPosts",
    initialState: defaultState,
    reducers: {
        savePost: (state, action) => {
            const postExists = state.posts.find(post => post.article_id === action.payload.article_id);
            if (!postExists) {
                state.posts.unshift(action.payload);
            }
            localStorage.setItem('savedPosts', JSON.stringify(state.posts));
        },

        removePost: (state, action) => {
            const updatedPosts = state.posts.filter(post => post.article_id !== action.payload);
            state.posts = updatedPosts;
            localStorage.setItem('savedPosts', JSON.stringify(updatedPosts));
            console.log(updatedPosts);
        },

        setRenderedPostsCount: (state, action) => {
            state.renderedPostsCount = action.payload;
        },

        clearSavedPosts: (state) => {
            state.posts = [];
            localStorage.removeItem('savedPosts');
        }
    }
})

export const { savePost, removePost, clearSavedPosts, setRenderedPostsCount } = savedPostsSlices.actions;
export default savedPostsSlices.reducer;