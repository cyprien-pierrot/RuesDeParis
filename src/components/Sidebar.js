import ResetButton from "./ResetButton";

// Fonction pour choisir un emoji selon la taille de la rue
function emojiForLength(length) {
  if (length > 2000) return "🏆";
  if (length > 1000) return "🏅";
  if (length > 500) return "🚶‍♂️";
  if (length > 200) return "🛣️";
  return "🏡";
}

const Sidebar = ({ foundStreets, totalStreetLength, streets = [], onReset }) => {
  // Calculs
  const foundLength = foundStreets.reduce((acc, street) => acc + street.length_meters, 0);
  const completionPercentage = totalStreetLength
    ? ((foundLength / totalStreetLength) * 100).toFixed(2)
    : 0;

  // Calcule le classement des rues par longueur décroissante
  const sortedStreets = [...streets].sort((a, b) => b.length_meters - a.length_meters);
  const rankByName = {};
  sortedStreets.forEach((street, idx) => {
    rankByName[street.name] = idx + 1;
  });

  // Handler pour confirmation du reset
  const handleResetClick = () => {
    if (window.confirm("Es-tu sûr de vouloir réinitialiser ta progression ?")) {
      onReset();
    }
  };

  // Inverser l'ordre des rues trouvées pour avoir les plus récentes en haut
  const reversedFoundStreets = foundStreets.slice().reverse();

  return (
    <div className="sidebar">
      {/* Bouton reset en haut à droite */}
      <div className="sidebar-reset-abstopright">
        <ResetButton onReset={handleResetClick} />
      </div>

      {/* --- Bloc Statistiques --- */}
      <div className="sidebar-stats-card">
        <h3 className="sidebar-stats-title">Statistiques</h3>
        <div className="sidebar-stats-row">
          <span>Rues trouvées</span>
          <span><strong>{foundStreets.length}</strong></span>
        </div>
        <div className="sidebar-stats-row">
          <span>Distance découverte</span>
          <span><strong>{foundLength.toLocaleString(undefined, { maximumFractionDigits: 0 })} m</strong></span>
        </div>
        <div className="sidebar-stats-row">
          <span>Distance totale</span>
          <span>{totalStreetLength.toLocaleString(undefined, { maximumFractionDigits: 0 })} m</span>
        </div>
        <div className="sidebar-stats-row" style={{ margin: "12px 0" }}>
          <span>Progression</span>
          <span><strong>{completionPercentage}%</strong></span>
        </div>
        <div className="progress-bar-container" style={{ margin: "0.5em 0" }}>
          <div className="progress-bar" style={{ width: `${completionPercentage}%` }}></div>
        </div>
      </div>

      {/* --- Séparateur visuel --- */}
      <hr className="sidebar-separator" />

      {/* --- Partie Rues trouvées --- */}
      <h3>Rues trouvées</h3>
      {foundStreets.length === 0 ? (
        <p style={{ color: "#ccc", fontStyle: "italic", marginTop: 12 }}>Aucune rue devinée pour l’instant.</p>
      ) : (
        <ul className="sidebar-streets-list">
          {reversedFoundStreets.map((street, index) => (
            <li key={index}>
              <span className="sidebar-street-name">
                {emojiForLength(street.length_meters)} {street.name}
              </span>
              <span className="sidebar-street-length">
                {Math.round(street.length_meters)} m
                <br />
                <span style={{ fontSize: "0.9em", color: "#88d" }}>
                  #{rankByName[street.name]} / {sortedStreets.length}
                </span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
