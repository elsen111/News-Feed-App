import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./features/filterSlice";
import searchReducer from "./features/searchQuerySlice";
import categoryMenuReducer from "./features/categoryMenuSlices";
import savedPostsReducer from "./features/savedPostsSlices";
import suggestionReducer from "./features/suggestionSlices";

export const store = configureStore({
    reducer: {
        filters: filterReducer,
        search: searchReducer,
        categoryMenu: categoryMenuReducer,
        suggestionParams: suggestionReducer,
        savedPosts: savedPostsReducer
    }
})