import { useEffect, useState } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
    // Lazy initialization: the callback runs only once, on mount
    const [value, setValue] = useState<T>(() => {
        // Added to the lesson version: invalid JSON or blocked storage would otherwise crash the page
        try {
            const cachedValue = localStorage.getItem(key);
            return cachedValue !== null
                ? (JSON.parse(cachedValue) as T)
                : initialValue;
        } catch {
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch {
           
        }
    }, [key, value]); 

    return [value, setValue] as const;
};
