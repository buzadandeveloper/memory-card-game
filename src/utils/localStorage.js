export const saveBestTurns = (card, group, turns) => {
  const key = `bestTurns_${card}_${group}`;
  localStorage.setItem(key, turns);
};

export const loadBestTurns = (card, group) => {
  const key = `bestTurns_${card}_${group}`;
  const savedBestTurns = JSON.parse(localStorage.getItem(key));
  return savedBestTurns ? Number (savedBestTurns) : 0;
};
