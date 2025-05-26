const gramToMilligram = 1000;
const kgToMilligram = gramToMilligram * 1000;
const tonToMilligram = kgToMilligram * 1000;

const convertToMilligrams = (value) => {
  const { tons = 0, kilograms = 0, grams = 0, milligrams = 0 } = value;

  return (
    tons * tonToMilligram +
    kilograms * kgToMilligram +
    grams * gramToMilligram +
    milligrams
  );
};

const convertToUnits = (valueInMg) => {
  let tons = 0;
  let kilograms = 0;
  let grams = 0;
  let milligrams = valueInMg;

  // ton
  if (valueInMg >= tonToMilligram) {
    tons = Math.floor(valueInMg / tonToMilligram);
    milligrams = valueInMg % tonToMilligram;
  }

  // kilogram
  if (milligrams >= kgToMilligram) {
    kilograms = Math.floor(milligrams / kgToMilligram);
    milligrams = milligrams % kgToMilligram;
  }

  // gram
  if (milligrams >= gramToMilligram) {
    grams = Math.floor(milligrams / gramToMilligram);
    milligrams = milligrams % gramToMilligram;
  }

  return { tons, kilograms, grams, milligrams };
};

/**
 * Calculates the resulting stock after adding or subtracting a change in stock.
 *
 * @param {Object} stock - The current stock represented in units of tons, kilograms, grams, and milligrams.
 * @param {Object} stockChange - The change in stock represented in units of tons, kilograms, grams, and milligrams.
 * @param {boolean} [isBuying=true] - Indicates whether the stock change is a purchase (true) or a sale (false).
 * @returns {Object|string} The resulting stock in units or an error message if the operation is invalid.
 */

const calculateStock = (stock, stockChange, isBuying = true) => {
  const stockInMilligram = convertToMilligrams(stock);
  const stockChangeInMilligram = convertToMilligrams(stockChange);
  let remainingStock = isBuying
    ? stockInMilligram + stockChangeInMilligram
    : stockInMilligram - stockChangeInMilligram;

  if (!isBuying && stockInMilligram < stockChangeInMilligram)
    return "Invalid values";

  return convertToUnits(remainingStock);
};

// const stock = { tons: 1, kilograms: 0, grams: 0, milligrams: 0 };
// const changeStock = { tons: 0, kilograms: 0, grams: 1, milligrams: 0 };

const stock = { tons: 0, kilograms: 999, grams: 999, milligrams: 0 };
const changeStock = { tons: 0, kilograms: 0, grams: 1001, milligrams: 0 };

console.log(calculateStock(stock, changeStock, true));
