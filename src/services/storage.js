import { COUNTRYCODES } from "./../assets/data";

export const setupStats = () => {
  if (
    localStorage.getItem("stats") !== null &&
    JSON.parse(localStorage.getItem("stats")).maxStreak !== undefined
  ) {
    return;
  }
  //prettier-ignore
  const stats = {
      played: 0,
      streak: [],
      maxStreak: 0,
      tally: Array(10).fill([0, 0]),
      totalGuessedCountries: Object.fromEntries(COUNTRYCODES.map((key) => [key, 0]))};

  localStorage.setItem("stats", JSON.stringify(stats));
};

export const setupStorageGame = (today) => {
  let flagTest = supportsFlagEmoji();

  if (!localStorage.getItem("game")) {
    return { modalType: 1, supportsFlagEmoji: flagTest };
  }

  const game = JSON.parse(localStorage.getItem("game"));
  if (game.date === today && game.history !== undefined) {
    return {
      targetCountry: game.targetCountry,
      categories: game.categories,
      history: game.history,
      hasWon: game.hasWon,
      hasEnded: game.hasEnded,
      hasHint: game.hasHint,
      supportsFlagEmoji: flagTest,
    };
  } else {
    return { modalType: 0, supportsFlagEmoji: flagTest };
  }
};

/* initially setting local storage */
export const setStorageGame = (targetCountry, categories, date) => {
  let game = {};
  game.targetCountry = targetCountry;
  game.categories = categories;
  game.date = date;

  game.history = [];
  game.hasWon = false;
  game.hasEnded = false;
  game.hasHint = false;

  localStorage.setItem("game", JSON.stringify(game));
};

/* update values after country entry */
export const updateStorageGame = (
  categories,
  history,
  hasWon = false,
  hasEnded = false
) => {
  let game = JSON.parse(localStorage.getItem("game")) || {};
  game.categories = categories;
  game.history = history;
  game.hasWon = hasWon;
  game.hasEnded = hasEnded;

  localStorage.setItem("game", JSON.stringify(game));
};

export const updateStorageHint = () => {
  let game = JSON.parse(localStorage.getItem("game")) || {};
  game.hasHint = true;
  localStorage.setItem("game", JSON.stringify(game));
};

export const updateStorageStats = (hasWon, hasHint, history, date) => {
  let stats = JSON.parse(localStorage.getItem("stats"));

  let played = stats.played + 1 || 0;
  let tally = stats.tally || Array(10).fill([0, 0]);
  let totalGuessedCountries =
    stats.totalGuessedCountries ||
    Object.fromEntries(COUNTRYCODES.map((key) => [key, 0]));
  let streak = stats.streak || [];
  let maxStreak = stats.maxStreak || 0;

  let guessedCountries = Object.values(history).map((guess) => guess.code);

  if (hasWon) {
    hasHint
      ? (tally[guessedCountries.length][1] += 1)
      : (tally[guessedCountries.length][0] += 1);

    if (streak.at(-1) + 1 === date) {
      streak.push(date);
      if (maxStreak.length < streak.length) {
        maxStreak = streak.length;
      }
    } else {
      streak.push(date);
      maxStreak = 1;
    }
  } else {
    hasHint ? (tally[0][1] += 1) : (tally[0][0] += 1);
    streak = [];
  }

  guessedCountries.forEach((code) => {
    totalGuessedCountries[code]++;
  });

  stats = {
    played: played,
    tally: tally,
    totalGuessedCountries: totalGuessedCountries,
    streak: streak,
    maxStreak: maxStreak,
  };

  localStorage.setItem("stats", JSON.stringify(stats));
};

export const supportsFlagEmoji = () => {
  var canvas = document.createElement("canvas");
  canvas.height = 10;
  canvas.width = canvas.height * 2;
  var ctx = canvas.getContext("2d");
  ctx.font = canvas.height + "px Arial";
  ctx.fillText("🇬🇧", 0, canvas.height);
  var data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  var i = 0;
  while (i < data.length) {
    if (data[i] !== data[i + 1] || data[i] !== data[i + 2]) return true;
    i += 4;
  }
  return false;
};
