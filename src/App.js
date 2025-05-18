import { useState, useEffect, useRef } from "react";
import Map from "./components/Map";
import SearchBar from "./components/SearchBar";
import Sidebar from "./components/Sidebar";
import "./styles.css";
import InfoButton from "./components/InfoButton";

const CACHE_KEY = "foundStreetNames";

const App = () => {
  const [streets, setStreets] = useState([]);
  const [foundStreets, setFoundStreets] = useState([]);
  const [totalStreetLength, setTotalStreetLength] = useState(0);
  const restorationDone = useRef(false); // Sert à éviter d'écraser le cache avant restauration

  useEffect(() => {
    fetch("/rues_de_paris_V4.json")
      .then(res => res.json())
      .then(data => {
        const filteredStreets = data.filter(street => street.coordinates.length > 0);
        setStreets(filteredStreets);

        const totalLength = filteredStreets.reduce((acc, street) => acc + street.length_meters, 0);
        setTotalStreetLength(totalLength);

        // Restaure foundStreets après fetch
        const cached = localStorage.getItem(CACHE_KEY);
        let foundNames = [];
        if (cached) {
          try {
            foundNames = JSON.parse(cached) || [];
          } catch {
            foundNames = [];
          }
        }
        if (foundNames.length > 0) {
          const found = filteredStreets.filter(street => foundNames.includes(street.name));
          setFoundStreets(found);
        }
        restorationDone.current = true; // La restauration est faite
      });
  }, []);

  useEffect(() => {
    // On sauvegarde uniquement si la restauration a été faite
    if (restorationDone.current) {
      localStorage.setItem(CACHE_KEY, JSON.stringify(foundStreets.map(s => s.name)));
    }
  }, [foundStreets]);

  const handleReset = () => {
    setFoundStreets([]);
    localStorage.removeItem(CACHE_KEY);
  };

  return (
    <div className="app-container">
      <InfoButton />
      <div className="search-bar-container" style={{ display: "flex", alignItems: "center" }}>
        <SearchBar
          streets={streets}
          setFoundStreets={setFoundStreets}
          foundStreets={foundStreets}
        />
      </div>
      <div className="content-container">
        <div className="map-container">
          <Map foundStreets={foundStreets} />
        </div>
        <Sidebar foundStreets={foundStreets} totalStreetLength={totalStreetLength} streets={streets} onReset={handleReset} />
      </div>
    </div>
  );
};

export default App;