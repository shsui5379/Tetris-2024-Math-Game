"use strict";
/**
 * Determines if a given number is prime
 *
 * @param {number} number  The number to test
 * @returns True if the number is prime
 */
function isPrime(number) {
    if (number <= 1)
        return false;
    for (let i = 2; i < Math.sqrt(number); i++) {
        if (number % i === 0)
            return false;
    }
    return true;
}
//# sourceMappingURL=math.js.map