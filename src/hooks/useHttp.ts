import { useCallback, useState } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean | null>(false);

  const request = useCallback(
      async (
        url : string,
        method = "GET",
        body = null,
        headers = { "Content-Type": "application/json" }
      ) => {
        setLoading(true)
        try {
          const response = await fetch(url, { method, body, headers });
          if(!response.ok){
            throw new Error(`Could not feth trhe ${url}`)
          }
          const data = await response.json()
          setLoading(false)
          return data
        } catch (error : any) {
            setLoading(false)
            setError(error.message)
            throw error
        }
      },
      []
    );
    const clearError = useCallback(() => setError(null), [])

    return {loading, error, request, clearError}
};