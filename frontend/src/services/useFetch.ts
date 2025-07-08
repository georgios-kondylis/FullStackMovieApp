// const fetchMovies = () => {...}
// useFetch(fetchMovies)   i basically created a custom hook you call and pass a fetch data function as an arguement.

import { useState, useEffect } from "react";

const useFetch = ( fetchFunction: any ) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await fetchFunction();
            setData(result);
        } catch (err) {
           console.log(err)
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setData(null);
        setError(null);
        setLoading(false);
    };

    useEffect(() => {
      fetchData();
    }, []);

    return { data, loading, error, refetch: fetchData, reset };
};

export default useFetch;