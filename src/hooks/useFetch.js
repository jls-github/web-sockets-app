import { useEffect, useState } from "react";

export default function useFetch(url, errorHandler) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url);
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
        errorHandler?.(res);
      } catch (e) {
        setError(e);
      }
    }

    fetchData();
  }, [url, errorHandler]);

  return { data, setData, error };
}

export function standardErrorHandler(res) {
  if (res.status === 401) {
    // redirect to login page
    //   history.push("/login");
  }
  if (res.status === 404) {
    // redirect to 404 page
    //   history.push("/404");
  }

  if (res.status === 422) {
    // hold that info in errors state,
    // display those errors to the user
    // underneath the corresponding input
  }
}
