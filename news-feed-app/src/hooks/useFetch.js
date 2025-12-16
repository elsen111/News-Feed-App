import { useEffect, useState } from "react";
import { fetchData } from "../api/fetchData";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const responseData = await fetchData(url);
        setData(responseData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [url]);

  return { data, loading, error };
};
