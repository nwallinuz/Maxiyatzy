import { useEffect, useState } from "react";
import { categories } from "./data/categories";
import PlayerSetup from "./components/PlayerSetup";
import ScoreTable from "./components/ScoreTable";
import ScoreDialog from "./components/ScoreDialog";

function App() {
  const savedGame = JSON.parse(localStorage.getItem("maxiyatzy-game") || "null");

  const [gameStarted, setGameStarted] = useState(savedGame?.gameStarted ?? false);
  const [playerCount, setPlayerCount] = useState(savedGame?.playerCount ?? 6);
  const [playerNames, setPlayerNames] = useState(
    savedGame?.playerNames ?? ["", "", "", "", "", ""]
  );
  const [scores, setScores] = useState(savedGame?.scores ?? {});

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [dialogValue, setDialogValue] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "maxiyatzy-game",
      JSON.stringify({
        gameStarted,
        playerCount,
        playerNames,
        scores,
      })
    );
  }, [gameStarted, playerCount, playerNames, scores]);

  const handleCellClick = (category, player) => {
    setSelectedCategory(category);
    setSelectedPlayer(player);
    setDialogValue(scores[`${category}-${player}`] || "");
    setDialogOpen(true);
  };

  const saveScore = () => {
    setScores((prev) => ({
      ...prev,
      [`${selectedCategory}-${selectedPlayer}`]: dialogValue,
    }));

    setDialogOpen(false);
  };

  const newGame = () => {
    if (!window.confirm("Vill du verkligen starta ett nytt spel?")) return;

    localStorage.removeItem("maxiyatzy-game");

    setGameStarted(false);
    setPlayerCount(6);
    setPlayerNames(["", "", "", "", "", ""]);
    setScores({});
  };

  if (!gameStarted) {
    return (
      <PlayerSetup
        playerCount={playerCount}
        setPlayerCount={setPlayerCount}
        playerNames={playerNames}
        setPlayerNames={setPlayerNames}
        startGame={() => setGameStarted(true)}
      />
    );
  }

  return (
    <div className="app">
      <div className="toolbar">
        <button
  onClick={newGame}
  className="new-game-button"
>
  🆕 Nytt spel
</button>
      </div>

      <ScoreTable
        categories={categories}
        playerCount={playerCount}
        playerNames={playerNames}
        scores={scores}
        handleCellClick={handleCellClick}
      />

      <ScoreDialog
        open={dialogOpen}
        category={selectedCategory}
        value={dialogValue}
        setValue={setDialogValue}
        onSave={saveScore}
        onClose={() => setDialogOpen(false)}
      />
    </div>
  );
}

export default App;