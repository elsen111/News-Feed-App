import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    categoriesParam: '',
    categoryFilterCount: 0
}

const categoryMenuSlices = createSlice({
    name: 'categoryMenu',
    initialState: defaultState,
    reducers: {
        setCategoriesParam: (state, action) => {
            state.categoriesParam = action.payload;
        },

        fetchSelectedCategories: (state) => {state.categoryFilterCount += 1},
    }
})

export const { setCategoriesParam, fetchSelectedCategories } = categoryMenuSlices.actions;
export default categoryMenuSlices.reducer;