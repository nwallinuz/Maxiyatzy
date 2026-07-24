const upperCategories = [
  "Ettor",
  "Tvåor",
  "Treor",
  "Fyror",
  "Femmor",
  "Sexor",
];

export function getScore(scores, category, player) {
  return Number(scores[`${category}-${player}`] || 0);
}

export function calculateSum(scores, player) {
  return upperCategories.reduce(
    (sum, category) => sum + getScore(scores, category, player),
    0
  );
}

export function calculateBonus(scores, player) {
  return calculateSum(scores, player) >= 84 ? 100 : 0;
}

export function calculateTotal(scores, categories, player) {
  let total = 0;

  categories.forEach((category) => {
    if (!["SUMMA", "BONUS", "TOTAL"].includes(category)) {
      total += getScore(scores, category, player);
    }
  });

  return total + calculateBonus(scores, player);
}