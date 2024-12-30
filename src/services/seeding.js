import { DATA, VALUETEXT } from "./../assets/data";
const NUMCOUNTRIES = 194;
// let today = new Date().toDateString();
const seedrandom = require("seedrandom");

export const seedTest = () => {
  let count = Array(VALUETEXT.length).fill(0);
  for (let i = 0; i < 10000; i++) {
    let arr = easySeedCategories(i);
    if (arr.length !== 4) {
      console.log("!!");
    }
    for (let i in arr) {
      count[arr[i]] += 1;
    }
  }
  console.log("a", count);
};

export const easySeedCategories = (today) => {
  let mandatory = [
    [0],
    [1, 2, 3],
    [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    [4, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
  ];
  let categoriesReturn = [];

  for (let i = 0; i < 4; i++) {
    let index = Math.floor(seedrandom(today + i * 2)() * mandatory[i].length);
    categoriesReturn.push(mandatory[i][index]);
  }
  return categoriesReturn;
};

/* pick target country and categories */

export const populateCategories = (targetCountry, today) => {
  // Generate randomness from todays date
  const seededCategories = easySeedCategories(today);
  // Generate inital state values
  const initialCategories = {};
  for (let i in seededCategories) {
    var index = seededCategories[i];

    initialCategories[index] = {
      target: DATA[targetCountry][index][0],
      high: 0,
      highValues: ["", "", ""],
      low: 0,
      lowValues: ["", "", ""],
      activeRow: -1,
    };
  }

  return initialCategories;
};

/* generate 1 random value */
export const seedTarget = (seed) => {
  const gen = seedrandom(seed);
  let countryRandIndex;
  do {
    countryRandIndex = Math.floor(gen() * NUMCOUNTRIES); //country randomizer
  } while (countryRandIndex === 77);
  return Object.keys(DATA)[countryRandIndex];
};
