import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./features/filterSlice";
import searchReducer from "./features/searchQuerySlice";
import categoryMenuReducer from "./features/categoryMenuSlices";
import savedPostsReducer from "./features/savedPostsSlices";

export const store = configureStore({
    reducer: {
        filters: filterReducer,
        search: searchReducer,
        categoryMenu: categoryMenuReducer,
        savedPosts: savedPostsReducer,
    }
})