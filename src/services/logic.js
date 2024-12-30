import { DATA, VALUETEXT } from "./../assets/data";

const categoryComparisonBest = (num, high, low, target) => {
  // return num >= low && num <= high ? Math.min(num - low, high - num) : 0;
  low = low === 0 ? 195 : low;

  if (high >= num || num >= low || num === target) {
    return 0; // Or handle this case differently as needed
  }

  return Math.min(low - num, num - high);
};

const categoryComparisonValid = (num, high, low) => {
  low = low === 0 ? 195 : low;

  if (high >= num || num >= low) {
    return 0;
  }

  return 1;
};

export const getBestGuess = (newCategories) => {
  let bestGuess = ["", 0];
  for (const countryData of Object.entries(DATA)) {
    let countryScore = 0;
    for (const index of Object.keys(newCategories)) {
      let categoryScore = categoryComparisonBest(
        countryData[1][index][0],
        newCategories[index].high,
        newCategories[index].low,
        newCategories[index].target
      );

      countryScore += categoryScore;
    }

    if (countryScore > bestGuess[1]) {
      bestGuess = [countryData[0], countryScore];
    }
  }
  return bestGuess;
};

export const getValidCountries = (newCategories) => {
  let validCountries = [];
  for (const countryData of Object.entries(DATA)) {
    let validCondition = Object.keys(newCategories).every((index) =>
      categoryComparisonValid(
        countryData[1][index][0],
        newCategories[index].high,
        newCategories[index].low
      )
    );
    if (validCondition) {
      validCountries.push(countryData[0]);
    }
  }
  return validCountries;
};

const evaluateCategory = (category, newHistory, rank, countryData) => {
  category.activeRow = -1;
  category.line = null;
  category.lineValues = null;

  //1: if new is higher rank
  if (rank < category.target) {
    if (category.high === 0 || rank > category.high) {
      category.high = rank;
      category.highValues = countryData;
      category.activeRow = 1;
      newHistory.correct += 1;
    } else {
      category.activeRow = 0;
      category.line = rank;
      category.lineValues = countryData;
    }

    //2: if new is lower rank
  } else if (rank > category.target) {
    if (category.low === 0 || rank < category.low) {
      category.low = rank;
      category.lowValues = countryData;
      category.activeRow = 2;
      newHistory.correct += 1;
    } else {
      category.activeRow = 3;
      category.line = rank;
      category.lineValues = countryData;
    }
  }

  let range;
  if (category.low === 0) {
    range = 194 - category.high;
  } else if (category.high === 0) {
    range = category.low;
  } else {
    range = category.low - category.high;
  }
  newHistory.range.push(range);
};

export const evaluateCountry = (
  categories,
  newValues,
  newCountry,
  newHistory
) => {
  for (let i in Object.keys(categories)) {
    const categoryIndex = Object.keys(categories)[i];
    const category = categories[categoryIndex];
    // country, name, value
    const countryData = [
      newCountry,
      newValues[0][1],
      parseValue(
        newValues[categoryIndex][1],
        i,
        parseInt(Object.keys(categories)[i])
      ),
    ];
    evaluateCategory(
      category,
      newHistory,
      newValues[categoryIndex][0],
      countryData
    );
  }
};

export const parseValue = (value, i, categoryIndex) => {
  const valueText = VALUETEXT[categoryIndex];
  if (value === "") {
    return;
  }
  if (valueText[0]) {
    return valueText[1] + parseFloat(value).toLocaleString() + valueText[2];
  }
  return valueText[1] + value + valueText[2];
};
