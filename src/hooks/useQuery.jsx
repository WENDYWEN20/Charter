import { useEffect, useState } from "react";

// a simplified version of react-query
export default function useQuery({ queryFn }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = () => {
    setIsLoading(true);
    setIsError(false);
    setError(null);
    (async () => {
      try {
        const result = await queryFn();
        setData(result);
      } catch (err) {
        setIsError(true);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    })();
  };

  useEffect(() => {
    fetchData();
  }, [queryFn]);

  return { data, isLoading, error, isError, refetch: fetchData };
}