import { useEffect, useState, useCallback, useRef } from "react";

export const useISSData = (pollingInterval = 0) => {
  const [issLocation, setISSlocation] = useState(null); // Stores ISS location
  const [error, setError] = useState(""); // Stores error, if it occurs
  const [loading, setLoading] = useState(false); // Stores current loading status
  const [lastUpdated, setLastUpdated] = useState(null); // Stores when the API was last called

  // Store persistent values without needing to re-render
  const intervalRef = useRef(null);
  const isPollingRef = useRef(false);

  //#region - useCallbacks
  // Retrieving Rails API for ISS Tracking
  const fetchISSData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/isstracker");
      if (!response.ok) throw new Error("Failed to fetch ISS data");
      const data = await response.json();
      setISSlocation(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Manually refresh via button on map
  const refreshData = useCallback(() => {
    fetchISSData();
  }, [fetchISSData]);

  // Start polling controls
  const startPolling = useCallback(() => {
    if (pollingInterval <= 0 || isPollingRef.current) return;

    isPollingRef.current = true;
    intervalRef.current = setInterval(() => {
      // If page is shown, fetch otherwise don't fetch. Saving on bandwidth, source: Page Visibility API
      if (!document.hidden) {
        fetchISSData();
      }
    }, pollingInterval);
  }, [fetchISSData, pollingInterval]);

  // Stop polling controls
  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      isPollingRef.current = false;
    }
  }, []);
  //#endregion

  //#region - useEffects
  // Start polling automatically
  useEffect(() => {
    fetchISSData(); // Initial fetch

    if (pollingInterval > 0) {
      startPolling();
    }

    // Return here to run a clean up function, prevents memory leaks. Source: Medium articles on useEffect and memory leaks.
    return () => {
      stopPolling();
    };
  }, [fetchISSData, pollingInterval, startPolling, stopPolling]);

  // Resume when user returns. User opens window again or switches tabs back to this window.
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && isPollingRef.current) {
        fetchISSData();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [fetchISSData]);
  //#endregion

  return {
    issLocation,
    error,
    loading,
    lastUpdated,
    refreshData,
    startPolling,
    stopPolling,
    isPolling: isPollingRef.current,
  };
};
