import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const MetroLayer = () => {
  const map = useMap();

  useEffect(() => {
    fetch("https://overpass-api.de/api/interpreter?data=[out:json];node[public_transport=station](48.8156,2.2241,48.9022,2.4699);out;")
      .then((res) => res.json())
      .then((data) => {
        data.elements.forEach(station => {
          const lat = station.lat;
          const lon = station.lon;
          const name = station.tags.name || "Station";

          L.marker([lat, lon], {
            icon: L.divIcon({
              className: "metro-marker",
              html: "🚇",
              iconSize: [20, 20]
            })
          }).bindTooltip(name, { permanent: false }).addTo(map);
        });
      });
  }, [map]);

  return null;
};

export default MetroLayer;
