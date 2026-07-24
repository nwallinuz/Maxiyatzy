import {
  calculateBonus,
  calculateSum,
  calculateTotal,
} from "../utils/scoreCalculator";

function ScoreTable({
  categories,
  playerCount,
  playerNames,
  scores,
  handleCellClick,
}) {
  return (
   <div className="table-container">
      <h1
  style={{
    marginBottom: 20,
    color: "#1976d2",
  }}
>
  🎲 MaxiYatzy
</h1>

      <table className="score-table">
        <thead>
  <tr>
    <th className="table-header table-header-category">
  Kategori
</th>

    {Array.from({ length: playerCount }).map((_, player) => (
      <th
        key={player}
        style={{
          background: "#1976d2",
          color: "white",
          position: "sticky",
          top: 0,
        }}
      >
        {playerNames[player] || `Spelare ${player + 1}`}
      </th>
    ))}
  </tr>
</thead>

        <tbody style={{ background: "white" }}>
          {categories.map((category) => (
            <tr key={category}>
              <td className="category-cell">
  {category}
</td>

              {Array.from({ length: playerCount }).map((_, player) => {
                let value = "";

                if (category === "SUMMA") {
                  value = calculateSum(scores, player);
                } else if (category === "BONUS") {
                  value = calculateBonus(scores, player);
                } else if (category === "TOTAL") {
                  value = calculateTotal(scores, categories, player);
                } else {
                  value = scores[`${category}-${player}`] || "";
                }

                return (
                  <td
                    key={player}
                    onClick={() => {
                      if (
                        category !== "SUMMA" &&
                        category !== "BONUS" &&
                        category !== "TOTAL"
                      ) {
                        handleCellClick(category, player);
                      }
                    }}
                    style={{
                      cursor:
  category === "SUMMA" ||
  category === "BONUS" ||
  category === "TOTAL"
    ? "default"
    : "pointer",
                      background:
  category === "SUMMA" ||
  category === "BONUS" ||
  category === "TOTAL"
    ? "#e8f0fe"
    : "white",
                    }}
                  >
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ScoreTable;