import { COUNTRYCODES } from "./../assets/data";

export const setupStats = () => {
  if (
    localStorage.getItem("stats") !== null &&
    JSON.parse(localStorage.getItem("stats")).maxStreak !== undefined
  ) {
    return;
  }
  // prettier-ignore; //TEST
  // const stats = {
  //   played: 0,
  //   streak: [],
  //   maxStreak: 0,
  //   tally: Array(11).fill([0, 0]),
  //   totalGuessedCountries: Object.fromEntries(
  //     COUNTRYCODES.map((key) => [key, 0])
  //   ),
  // };

  // prettier-ignore; //TEST
  const stats = {
    played: 2,
    streak: [1018],
    maxStreak: 1,
    tally: [
      [0, 0],
      [0, 0],
      [1, 0],
      [0, 0],
      [1, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ],
    guessedCountries: {
      AF: 2,
      AL: 2,
      DZ: 1,
      AD: 0,
      AO: 0,
      AG: 0,
      AR: 0,
      AM: 0,
      AU: 0,
      AT: 0,
      AZ: 0,
      BS: 0,
      BH: 0,
      BD: 0,
      BB: 0,
      BY: 0,
      BE: 0,
      BZ: 0,
      BJ: 0,
      BT: 0,
      BO: 0,
      BA: 0,
      BW: 0,
      BR: 0,
      BN: 0,
      BG: 0,
      BF: 0,
      BI: 0,
      CV: 0,
      KH: 0,
      CM: 0,
      CA: 0,
      CF: 0,
      TD: 0,
      CL: 0,
      CN: 0,
      CO: 0,
      KM: 0,
      CR: 0,
      HR: 0,
      CU: 0,
      CY: 0,
      CZ: 0,
      CD: 0,
      DK: 0,
      DJ: 0,
      DM: 0,
      DO: 0,
      EC: 0,
      EG: 0,
      SV: 0,
      GQ: 0,
      ER: 0,
      EE: 0,
      SZ: 0,
      ET: 0,
      FJ: 0,
      FI: 0,
      FR: 0,
      GA: 0,
      GM: 0,
      GE: 0,
      DE: 0,
      GH: 0,
      GR: 0,
      GD: 0,
      GT: 0,
      GN: 0,
      GW: 0,
      GY: 0,
      HT: 0,
      HN: 0,
      HU: 0,
      IS: 0,
      IN: 0,
      ID: 0,
      IR: 0,
      IQ: 0,
      IE: 0,
      IL: 0,
      IT: 0,
      CI: 0,
      JM: 0,
      JP: 0,
      JO: 0,
      KZ: 0,
      KE: 0,
      KI: 0,
      KW: 0,
      KG: 0,
      LA: 0,
      LV: 0,
      LB: 0,
      LS: 0,
      LR: 0,
      LY: 0,
      LI: 0,
      LT: 0,
      LU: 0,
      MG: 0,
      MW: 0,
      MY: 0,
      MV: 0,
      ML: 0,
      MT: 0,
      MH: 0,
      MR: 0,
      MU: 0,
      MX: 0,
      FM: 0,
      MD: 0,
      MC: 0,
      MN: 0,
      ME: 0,
      MA: 0,
      MZ: 0,
      MM: 0,
      NA: 0,
      NR: 0,
      NP: 0,
      NL: 0,
      NZ: 0,
      NI: 0,
      NE: 0,
      NG: 0,
      KP: 0,
      MK: 0,
      NO: 0,
      OM: 0,
      PK: 0,
      PW: 0,
      PS: 0,
      PA: 0,
      PG: 0,
      PY: 0,
      PE: 0,
      PH: 0,
      PL: 0,
      PT: 0,
      QA: 0,
      CG: 0,
      RO: 0,
      RU: 0,
      RW: 0,
      KN: 0,
      LC: 0,
      VC: 0,
      WS: 0,
      SM: 0,
      ST: 0,
      SA: 0,
      SN: 0,
      RS: 0,
      SC: 0,
      SL: 0,
      SG: 0,
      SK: 0,
      SI: 0,
      SB: 0,
      SO: 0,
      ZA: 0,
      KR: 0,
      SS: 0,
      ES: 0,
      LK: 0,
      SD: 0,
      SR: 0,
      SE: 0,
      CH: 0,
      SY: 0,
      TJ: 0,
      TZ: 0,
      TH: 0,
      TL: 0,
      TG: 0,
      TO: 0,
      TT: 0,
      TN: 0,
      TR: 0,
      TM: 0,
      TV: 0,
      UG: 0,
      UA: 0,
      AE: 0,
      GB: 0,
      US: 0,
      UY: 0,
      UZ: 0,
      VU: 0,
      VE: 0,
      VN: 0,
      YE: 0,
      ZM: 0,
      ZW: 0,
    },
  };

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
      if (maxStreak < streak.length) {
        maxStreak = streak.length;
      }
    } else {
      streak = [date];
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
