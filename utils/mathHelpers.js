/**
 * Generate Fibonacci series up to n terms
 * @param {number} n - Number of terms
 * @returns {number[]} Fibonacci series
 */
function fibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  
  const series = [0, 1];
  for (let i = 2; i < n; i++) {
    series.push(series[i - 1] + series[i - 2]);
  }
  return series;
}

/**
 * Check if a number is prime
 * @param {number} num - Number to check
 * @returns {boolean} True if prime
 */
function isPrime(num) {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;
  
  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}

/**
 * Filter prime numbers from an array
 * @param {number[]} arr - Array of numbers
 * @returns {number[]} Array of prime numbers
 */
function filterPrimes(arr) {
  return arr.filter(isPrime);
}

/**
 * Calculate GCD of two numbers using Euclidean algorithm
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} GCD
 */
function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

/**
 * Calculate HCF (GCD) of an array of numbers
 * @param {number[]} arr - Array of numbers
 * @returns {number} HCF
 */
function hcf(arr) {
  if (arr.length === 0) return 0;
  if (arr.length === 1) return Math.abs(arr[0]);
  
  return arr.reduce((acc, num) => gcd(acc, num));
}

/**
 * Calculate LCM of two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} LCM
 */
function lcmTwo(a, b) {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

/**
 * Calculate LCM of an array of numbers
 * @param {number[]} arr - Array of numbers
 * @returns {number} LCM
 */
function lcm(arr) {
  if (arr.length === 0) return 0;
  if (arr.length === 1) return Math.abs(arr[0]);
  
  return arr.reduce((acc, num) => lcmTwo(acc, num));
}

module.exports = {
  fibonacci,
  filterPrimes,
  hcf,
  lcm,
  isPrime
};
