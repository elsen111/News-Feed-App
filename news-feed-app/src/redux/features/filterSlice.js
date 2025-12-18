import { createSlice } from "@reduxjs/toolkit";

const defaultFilterOptions = {
    category: "all categories",
    time: "all time",
    sort: "sort by date",
    country: null,
    language: null,
    appliedToken: 0,
};

const filterSlice = createSlice({
    name: 'filters',
    initialState: defaultFilterOptions,
    reducers: {
        setFilterOptions: (state, action) => {
            const { filterType, value } = action.payload;
            state[filterType] = value;
            console.log("State in slice: " + state.country);
        },

        fetchFilteredNews: (state) => {state.appliedToken += 1},

        resetFilters: () => ({...defaultFilterOptions}),
    },
});

export const { setFilterOptions, fetchFilteredNews, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;