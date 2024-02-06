import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {EndpointBuilder} from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import {IUser, ServerResponse} from "../../models/models";

//Создаем обращение к API, с помощью createApi
export const githubApi = createApi({
    //reducerPath говорит, где будет храниться наши закешированные данные
    reducerPath: 'github/api',
    //Базовый url, откуда буде мбрать инфу
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.github.com'
    }),
    endpoints: build =>  ({
        searchUsers: build.query<IUser[], string>({
            //query будет соединяться с базовым URL
            query: (search: string) => ({
                url: `search/users`,
                params: {
                    //Будет искать по параметрам, которые мы передаем
                    q: search,
                    //Показывает только первые 10 элементов с сервера
                    per_page:10
                }
            }),
            transformResponse: (response: ServerResponse<IUser>) => response.items
        })
    })
})

//Делаем кастомный хук, чтобы использовать его
export const {useSearchUsersQuery} = githubApi