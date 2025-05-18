const ResetButton = ({ onReset }) => (
    <button
      onClick={onReset}
      className="sidebar-reset-button"
      title="Réinitialiser la progression"
    >
      Réinitialiser
    </button>
  );
  
  export default ResetButton;
  