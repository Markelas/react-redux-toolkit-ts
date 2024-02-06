import {useEffect, useState} from "react";


// Создаем хук, который будет создавать задержку между запросами при вводе символов в поиск
export function useDebounce(value: string, delay = 300): string {
    const [debounced, setDebounced] = useState(value)

    // При изменении value будет создаваться таймаут
    useEffect(() => {
        const handler = setTimeout(()=> setDebounced(value), delay)
        return () => clearTimeout(handler)
    }, [value, delay]);

    return debounced;
}