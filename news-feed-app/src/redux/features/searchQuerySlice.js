import { createSlice } from "@reduxjs/toolkit";

const defaultSearch = {
    query: "",
    searchCount: 0,
}

const searchQuerySlice = createSlice({
    name: 'search',
    initialState: defaultSearch,
    reducers: {
        setSearchQuery: (state, action) => {
            state.query = action.payload;
        },

        fetchSearchedNews: (state) => {state.searchCount += 1},

        resetSearchQuery: () => ({...defaultSearch}),
    }
})

export const { setSearchQuery, fetchSearchedNews, resetSearchQuery } = searchQuerySlice.actions;
export default searchQuerySlice.reducer;