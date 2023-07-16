/**
 * The `calculateAspectRatio` function calculates the aspect ratio of a given width and height.
 * @param {number} width - The `width` parameter represents the width of an object or image. It is a
 * number value that specifies the width in pixels or any other unit of measurement.
 * @param {number} height - The `height` parameter represents the height of an object or image.
 * @returns The function `calculateAspectRatio` returns an object with properties `aspectWidth` and
 * `aspectHeight`. The values of these properties depend on the input `width` and `height` parameters.
 */
export const calculateAspectRatio = (width: number, height: number) => {
  const bigger = width > height ? width : height;
  const smaller = width < height ? width : height;

  const divisor = gcd(bigger, smaller);
  const aspectBigger = bigger / divisor;
  const aspectSmaller = smaller / divisor;

  if (width > height) {
    return { aspectWidth: aspectBigger, aspectHeight: aspectSmaller };
  } else {
    return { aspectWidth: aspectSmaller, aspectHeight: aspectBigger };
  }
};

/**
 * The function calculates the greatest common divisor (GCD) of two numbers using the Euclidean
 * algorithm.
 * @param {number} a - The parameter "a" is the first number for which we want to find the greatest
 * common divisor (GCD).
 * @param {number} b - The parameter "b" represents the second number in the calculation of the
 * greatest common divisor (GCD) between two numbers.
 * @returns the greatest common divisor (GCD) of the two input numbers, `a` and `b`.
 */
function gcd(a: number, b: number): number {
  if (b === 0) {
    return a;
  }
  return gcd(b, a % b);
}
