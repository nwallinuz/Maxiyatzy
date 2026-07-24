function PlayerSetup({
  playerCount,
  setPlayerCount,
  playerNames,
  setPlayerNames,
  startGame,
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#1f4d36",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          background: "white",
          color: "#222",
          padding: "40px",
          borderRadius: "20px",
          width: "420px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        }}
      >
        <h1 style={{ textAlign: "center" }}>🎲 MaxiYatzy</h1>

        <p style={{ textAlign: "center", color: "#666" }}>
          Poängtavla
        </p>

        <hr />

        <h3>Antal spelare</h3>

        <select
          value={playerCount}
          onChange={(e) => setPlayerCount(Number(e.target.value))}
          style={{ width: "100%", padding: "10px" }}
        >
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
        </select>

        <br />
        <br />
        <br />

        {Array.from({ length: playerCount }).map((_, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Spelare ${index + 1}`}
            value={playerNames[index]}
            onChange={(e) => {
              const newNames = [...playerNames];
              newNames[index] = e.target.value;
              setPlayerNames(newNames);
            }}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              boxSizing: "border-box",
            }}
          />
        ))}

        <button
          onClick={startGame}
          style={{
            width: "100%",
            padding: "15px",
            fontSize: "18px",
            borderRadius: "10px",
            border: "none",
            background: "#2e8b57",
            color: "white",
            cursor: "pointer",
          }}
        >
          Starta spel
        </button>
      </div>
    </div>
  );
}

export default PlayerSetup;