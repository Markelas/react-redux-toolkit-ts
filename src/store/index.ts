import {configureStore} from "@reduxjs/toolkit";
import {githubApi} from "./github/github.api";

export const store = configureStore({
    reducer: {
        //В качестве ключа githubApi и к его параметру reducerPath
        [githubApi.reducerPath]: githubApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(githubApi.middleware),
})