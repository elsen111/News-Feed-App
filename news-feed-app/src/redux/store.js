import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./features/filterSlice";
import searchReducer from "./features/searchQuerySlice";
import categoryMenuReducer from "./features/categoryMenuSlices";

export const store = configureStore({
    reducer: {
        filters: filterReducer,
        search: searchReducer,
        categoryMenu: categoryMenuReducer
    }
})