import { useEffect, useState } from "react";
import { searchWord } from "../services/dictionaryApi";
import type { DictionaryItem } from "../types/dictionary";

export function useResultsVM(query: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<DictionaryItem[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const data = await searchWord(query);

        const items =
          data.results ??
          data.data?.results ??
          [];

        if (!cancelled) {
          setResults(items);
        }
     } catch (e: any) {
  console.log("API ERROR:", e);
  const msg =
    e?.response?.data?.message ||
    e?.response?.data?.error ||
    e?.message ||
    "Request failed";
  if (!cancelled) setError(msg);
}

    }

    load();
    return () => {
      cancelled = true;
    };
  }, [query]);

  return { loading, error, results };
}
