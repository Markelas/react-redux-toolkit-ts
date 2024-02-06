import React from 'react';
import {useSearchUsersQuery} from "../store/github/github.api";

const HomePage = () => {
    const {isLoading, isError, data} = useSearchUsersQuery('Mark')

    console.log(data)

    return (
        <div>
            { isError && <p className="text-center text-red-400">Something went wrong...</p>}
        </div>
    );
};

export default HomePage;
