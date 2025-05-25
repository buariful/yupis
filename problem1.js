/**
 * @param {number} mojoNumber - Starting number of Mojos.
 * @returns {{ totalMojo: number, remainingCaps: number }}
 */
function calculateMojoCapNumber(mojoNumber) {
  const exchangeRate = 3;
  let total = mojoNumber;
  let caps = mojoNumber; // 1 mojo = 1 cap

  while (caps >= exchangeRate) {
    let exchangeable = Math.floor(caps / exchangeRate); // how many mojos we can get
    total += exchangeable;
    caps = (caps % exchangeRate) + exchangeable; // leftover caps + new caps from eaten mojos
  }

  return { totalMojo: total, remainingCaps: caps };
}

console.log(calculateMojoCapNumber(10));
