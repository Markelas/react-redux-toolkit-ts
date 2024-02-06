import React, {useEffect, useState} from 'react';
import {useSearchUsersQuery} from "../store/github/github.api";
import {useDebounce} from "../hooks/debounce";

const HomePage = () => {
    // По умолчанию пустая строка в поиске
    const [search, setSearch] = useState('')
    // Будем помещать введенные значения и через некоторую задержку, возвращать обратно строку
    const debounced = useDebounce(search)
    const {isLoading, isError, data} = useSearchUsersQuery(debounced, {
        // В параметр мы указываем, что когда указано меньше 3 символов, то не делаем запрос
        skip: debounced.length < 3
    })

    useEffect(() => {
        console.log(debounced)
    }, [debounced]);

    console.log(data)

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

                <div className="absolute
                    top-[42px]
                    left-0
                    right-0
                    max-h-[200px]
                    shadow-md
                    bg-white"
                >
                    Lorem fsdf
                </div>
            </div>
        </div>
    );
};

export default HomePage;
