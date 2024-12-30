import { COUNTRYCODES } from "./../assets/data";

export const setupStats = () => {
  if (!localStorage.getItem("stats")) {
    const stats = {
      played: 0,
      streak: [],
      maxStreak: 0,
      tally: Array(11).fill(0),
      guessedCountries: Object.fromEntries(COUNTRYCODES.map((key) => [key, 0])),
    };

    // stats.tally = [5, 1, 2, 7, 9, 6, 4, 2, 1, 0, 1];

    localStorage.setItem("stats", JSON.stringify(stats));
  }
};

export const setupStorageGame = (today) => {
  if (!localStorage.getItem("game")) {
    return { modalType: 1 };
  }

  const game = JSON.parse(localStorage.getItem("game"));
  if (game.date === today && !game.guessHistory) {
    return {
      targetCountry: game.targetCountry,
      categories: game.categories,
      history: game.history,
      win: game.win,
      ended: game.ended,
    };
  } else {
    return { modalType: 0 };
  }
};

/* initially setting local storage */
export const setStorageGame = (targetCountry, categories, date) => {
  let game = {};
  game.targetCountry = targetCountry;
  game.categories = categories;
  game.date = date;

  game.history = [];
  game.win = false;
  game.ended = false;

  localStorage.setItem("game", JSON.stringify(game));
};

/* update values after country entry */
export const updateStorageGame = (
  categories,
  history,
  win = false,
  ended = false
) => {
  let game = JSON.parse(localStorage.getItem("game")) || {};
  game.categories = categories;
  game.history = history;
  game.win = win;
  game.ended = ended;

  localStorage.setItem("game", JSON.stringify(game));
};

export const updateStorageStats = (win, history, date) => {
  let stats = JSON.parse(localStorage.getItem("stats"));

  let played = stats.played + 1 || 0;
  let tally = stats.tally || Array(11).fill(0);
  let totalGuessedCountries =
    stats.guessedCountries ||
    Object.fromEntries(COUNTRYCODES.map((key) => [key, 0]));
  let streak = stats.streak || [];
  let maxStreak = stats.maxSteak || 0;

  let guessedCountries = Object.values(history).map((guess) => guess.code);

  if (win) {
    tally[guessedCountries.length] += 1;

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
    tally[0] += 1;
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
