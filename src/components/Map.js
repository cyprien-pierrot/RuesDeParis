import { MapContainer, TileLayer, Polyline, Tooltip  } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ foundStreets }) => {

    const parisBounds = [
        [48.8156, 2.2241], 
        [48.9022, 2.4699], 
      ];

  return (
    <MapContainer
      center={[48.8566, 2.3522]} // Centre de Paris
      zoom={13}
      minZoom={13}
      style={{ height: "100%", width: "100%" }}
      maxBounds={parisBounds}
      maxBoundsViscosity={0.9}
    >
        <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
        attribution="© <a href='https://carto.com/'>CARTO</a>"
        noWrap={true}
        />

      {/* Ajout des rues trouvées en vert */}
      {foundStreets.map((street, index) => (
      <Polyline
        key={index}
        positions={street.coordinates.map(([lon, lat]) => [lat, lon])}
        color="green"
        weight={4}
      >
        <Tooltip sticky={true} direction="top" offset={[0, -10]}>
          <div>
            <strong>{street.name}</strong><br />
            {street.length_meters.toFixed(0)} m
          </div>
        </Tooltip>
      </Polyline>
))}

    </MapContainer>
  );
};

export default Map;