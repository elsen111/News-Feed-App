import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./features/filterSlice";
import searchReducer from "./features/searchQuerySlice";

export const store = configureStore({
    reducer: {
        filters: filterReducer,
        search: searchReducer,
    }
})