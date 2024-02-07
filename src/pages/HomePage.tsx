import React, {useEffect, useState} from 'react';
import {useLazyGetUserReposQuery, useSearchUsersQuery} from "../store/github/github.api";
import {useDebounce} from "../hooks/debounce";
import RepoCard from "../components/RepoCard";

const HomePage = () => {
    // По умолчанию пустая строка в поиске
    const [search, setSearch] = useState('')

    const [dropdown, setDropdown] = useState(false)
    // Будем помещать введенные значения и через некоторую задержку, возвращать обратно строку
    const debounced = useDebounce(search)
    const {isLoading, isError, data} = useSearchUsersQuery(debounced, {
        // В параметр мы указываем, что когда указано меньше 3 символов, то не делаем запрос
        skip: debounced.length < 3,
        //Открыли вкладку, ушли и через какое-то время возвращаемся, будет повторный запрос, для обновления данных
        refetchOnFocus: true
    })

    const [fetchRepos, { isLoading: areReposLoading, data: repos }] = useLazyGetUserReposQuery()

    useEffect(() => {
        setDropdown(debounced.length > 3 && data?.length! > 0)
    }, [debounced, data]);

    const clickHandler = (username: string) => {
        //Когда срабатывает клик на никнейме, мы пользуемся хуком, для запроса репозитория пользователя
        fetchRepos(username)
        setDropdown(false)
    }

    return (
        <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
            { isError && <p className="text-center text-red-400">Something went wrong...</p>}

            <div className='relative w-[560px]'>
                <input
                    type="text"
                    className="border py-2 px-4 w-full h-[42px] mb-2"
                    placeholder="Search for Github username..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />

                {dropdown && <ul className="
                    list-nonte
                    absolute
                    top-[42px]
                    left-0
                    right-0
                    max-h-[200px]
                    shadow-md
                    bg-white
                    overflow-y-scroll"
                >
                    {isLoading && <p className='text-center'>Loading...</p>}
                    {data?.map(user => (
                        <li
                            key={user.id}
                            onClick={() => clickHandler(user.login)}
                            className='py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer'
                        >
                            {user.login}
                        </li>
                    ))}
                </ul>}
                <div className="container">
                    {areReposLoading && <p className='text-center'>Repos are loading...</p>}
                    { repos?.map(repo => <RepoCard  repo={repo} key={repo.id}/>) }
                </div>
            </div>
        </div>
    );
};

export default HomePage;
