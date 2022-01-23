/**
 * Determines if a given number is prime
 * 
 * @param {number} number  The number to test
 * @returns True if the number is prime
 */
function isPrime(number: number): boolean {
   if (number <= 1) return false;

   for (let i = 2; i < Math.sqrt(number); i++) {
      if (number % i === 0) return false;
   }

   return true;
}

/**
 * Generates a random integer between upper and lower, inclusive
 * @param upper Upper bound, inclusive
 * @param lower Lower bound, inclusive
 * @returns  A random integer between upper and lower
 */
function randomInteger(upper: number, lower: number): number {
   return Math.floor(Math.random() * (upper - lower + 1) + lower);
}