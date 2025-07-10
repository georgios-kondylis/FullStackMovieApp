import { useState, useEffect } from "react";

const useFetchFunc = <T>(fetchFunction: () => Promise<T>) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchFunctionResult = await fetchFunction()
        setData(fetchFunctionResult)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    useEffect(() => {
      fetchData();
    },[])

    return {data, loading, refetch: fetchData};
}

export default useFetchFunc