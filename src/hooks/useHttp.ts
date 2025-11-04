import { useCallback, useState } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(
    async (
      url: string,
      method: string = "GET",
      body?: any,
      headers?: Record<string, string>
    ) => {
      setLoading(true);
      setError(null);

      try {
        const isFormData = body instanceof FormData;

        const response = await fetch(url, {
          method,
          body: method !== "GET" ? body : undefined,
          headers: isFormData
            ? undefined
            : { "Content-Type": "application/json", ...headers },
        });

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(
            errText || `Request failed with status ${response.status}`
          );
        }
        const contentType = response.headers.get("content-type");
        const data = contentType?.includes("application/json")
          ? await response.json()
          : await response.text();

        setLoading(false);
        return data;
      } catch (error: any) {
        setLoading(false);
        setError(error.message);
        throw error;
      }
    },
    []
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, error, request, clearError };
};
