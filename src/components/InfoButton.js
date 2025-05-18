import { useState } from "react";

const InfoButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="info-btn"
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          top: 12,
          left: 12,
          zIndex: 9999,
          width: 38,
          height: 38,
          borderRadius: "50%",
          background: "#fff",
          border: "1px solid #aaa",
          boxShadow: "0 2px 8px rgba(0,0,0,0.13)",
          fontSize: "1.35rem",
          fontWeight: "bold",
          color: "#1a1a1a",
          cursor: "pointer",
          display: open ? "none" : "block",
          pointerEvents: "auto",
        }}
        title="Informations"
      >
        i
      </button>
      {open && (
        <div
          className="info-sidebar"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: 320,
            background: "#f9f9fa",
            boxShadow: "2px 0 12px rgba(0,0,0,0.09)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            padding: "32px 24px 24px 24px",
            borderRight: "1px solid #e1e1e1"
          }}
        >
          <button
            onClick={() => setOpen(false)}
            style={{
              alignSelf: "flex-end",
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
              color: "#555",
              marginTop: -10,
              marginRight: -8
            }}
            aria-label="Fermer"
            title="Fermer"
          >
            ×
          </button>

          <h2 style={{ margin: 0, fontSize: "1.12rem", fontWeight: 600, color: "#233" }}>À propos</h2>
          <div style={{ flex: 1, marginTop: 18 }}>
            <a
              href="https://opendata.paris.fr/explore/dataset/voie/information/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#3274d9", textDecoration: "underline", fontWeight: 500 }}
            >
              Consulter la base de données utilisée
            </a>
            <div style={{ marginTop: 28, fontSize: "1rem", color: "#666" }}>
              développé par <b>Michel Douve</b>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InfoButton;
