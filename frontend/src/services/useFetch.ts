// useFetch.ts

// useFetch(fetchMovies)   i basically created a custom hook you call and pass a fetch data function as an arguement.

import { useState, useEffect } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const result = await fetchFunction();
            setData(result);
        } catch(err){
            console.log(err)
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, []);

    return { data, loading, refetch: fetchData };
};

export default useFetch;