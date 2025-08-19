import { useCallback, useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;
let launchDataCache = null;

export const useLaunchData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [launchData, setLaunchData] = useState(null);

  const fetchLaunchData = useCallback(async () => {
    // Caching data until user reloads page
    if (launchDataCache) {
      setLaunchData(launchDataCache);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/launches`);
      if (!response.ok) throw new Error("Failed to fetch launch data");
      const data = await response.json();
      launchDataCache = data;
      setLaunchData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLaunchData();
  }, [fetchLaunchData]);

  return {
    loading,
    error,
    launchData,
    refetch: fetchLaunchData,
  };
};
