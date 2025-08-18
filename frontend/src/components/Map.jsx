import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import globalSatellite from "../assets/global-satellite.png";
import { useISSData } from "../api/useISSData";

export const Map = () => {
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const markerRef = useRef();
  const [autoUpdate, setAutoUpdate] = useState(true);

  // Extract data from custom hook
  const { 
    issLocation, 
    error, 
    loading, 
    lastUpdated, 
    refreshData, 
    startPolling, 
    stopPolling, 
    isPolling 
  } = useISSData(autoUpdate ? 30000 : 0);

  // Initialize map once
  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [0, 0],
      projection: "globe",
      zoom: 2, //TODO: test with different zoom levels
    });

    // Wait for map to load before creating marker
    mapRef.current.on('load', () => {
      const satellite = document.createElement("div");
      const img = document.createElement("img");
      img.src = globalSatellite;
      img.style.width = "40px";
      img.style.height = "40px";
      img.style.border = "solid #00ff00 2px";
      img.style.borderRadius = "50%";
      img.style.boxShadow = "0 0 10px rgba(0, 255, 0, 0.5)";
      satellite.className = "iss-marker";
      satellite.style.width = "40px";
      satellite.style.height = "40px";
      satellite.style.backgroundSize = "100%";
      satellite.style.display = "block";
      satellite.style.borderRadius = "50%";
      satellite.style.zIndex = "100";
      satellite.append(img);

      // Create marker with initial position
      markerRef.current = new mapboxgl.Marker(satellite)
        .setLngLat([0, 0])
        .addTo(mapRef.current);
    });

    // Return here to run a clean up function, prevents memory leaks. Source: Medium articles on useEffect and memory leaks.
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  // Update marker position when ISS location changes
  useEffect(() => {
    if (!issLocation?.iss_position || !markerRef.current) return;

    const latStr = issLocation.iss_position.latitude;
    const lngStr = issLocation.iss_position.longitude;
    
    if (!latStr || !lngStr) return;

    // Convert to numbers as Mapbox expects numbers not strings
    const latitude = parseFloat(latStr);
    const longitude = parseFloat(lngStr);

    if (isNaN(latitude) || isNaN(longitude)) return;

    // Update marker position
    markerRef.current.setLngLat([longitude, latitude]);
    
    // Move to new position smoothly
    if (mapRef.current) {
      mapRef.current.easeTo({
        center: [longitude, latitude],
        duration: 1000
      });
    }
  }, [issLocation]);

  // Listens to auto-update button on control panel
  const handleAutoUpdateToggle = (checked) => {
    setAutoUpdate(checked);
    if (checked) {
      startPolling();
    } else {
      stopPolling();
    }
  };

  return (
    <div className="relative h-full w-full">
      {/* Info + Control Panel */}
      <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-sm p-4 rounded-lg shadow-lg text-white">
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-lg text-amber-300">Real-time Tracker</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={refreshData}
              disabled={loading}
              className="w-44 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Updating...' : 'Update Now'}
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={autoUpdate}
                onChange={(e) => handleAutoUpdateToggle(e.target.checked)}
                className="w-4 h-4 accent-green-500"
              />
              <span className="text-sm">Auto-update (30s)</span>
            </label>
            {isPolling && (
              <span className="text-xs text-red-400 flex items-center gap-1">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                Live
              </span>
            )}
          </div>

          {lastUpdated && (
            <div className="text-xs text-gray-300">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          )}

          {error && (
            <div className="text-xs text-red-400 bg-red-900/50 p-2 rounded">
              ⚠️ {error}
            </div>
          )}

          {issLocation?.iss_position && (
            <div className="text-xs text-gray-300 bg-gray-800/50 p-2 rounded">
              <div><strong>Latitude:</strong> {parseFloat(issLocation.iss_position.latitude).toFixed(4)}°</div>
              <div><strong>Longitude:</strong> {parseFloat(issLocation.iss_position.longitude).toFixed(4)}°</div>
              {issLocation.timestamp && (
                <div><strong>Timestamp:</strong> {new Date(issLocation.timestamp * 1000).toLocaleTimeString()}</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Map Container */}
      <div id="map-container" className="h-full w-full" ref={mapContainerRef} />
    </div>
  );
};