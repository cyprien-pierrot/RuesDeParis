import { useState } from "react";

// Fonction de normalisation (accents, casse, espaces)
export function normalize(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

const SearchBar = ({ streets, setFoundStreets, foundStreets = [] }) => {
  const [input, setInput] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSearch = () => {
    const guess = normalize(input);

    // Recherche dans toutes les rues (en normalisé)
    const match = streets.find(
      street => normalize(street.name) === guess
    );

    // Vérifie aussi qu'elle n'a pas déjà été trouvée
    const alreadyFound = foundStreets.some(
      street => normalize(street.name) === guess
    );

    if (match && !alreadyFound) {
      setFoundStreets(prev => [...prev, match]);
      setInput("");
      setIsError(false);
    } else if (!match) {
      setIsError(true);
    } else if (alreadyFound) {
      setIsError(false);
      setInput("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Devine une rue de Paris..."
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">Valider</button>
      {isError && <p className="error-message">Rue non trouvée !</p>}
    </div>
  );
};

export default SearchBar;
