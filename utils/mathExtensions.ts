export function getFibonacciSequence(num: number): number[] {
    const sequence: number[] = [0, 1];
    while (sequence[sequence.length - 1] <= num) {
      sequence.push(sequence[sequence.length - 1] + sequence[sequence.length - 2]);
    }
    return sequence.slice(0, -1);
  }
  
  export function isHappy(num: number): boolean {
    const seen = new Set();
    while (num !== 1 && !seen.has(num)) {
      seen.add(num);
      num = String(num)
        .split('')
        .reduce((sum, digit) => sum + Math.pow(Number(digit), 2), 0);
    }
    return num === 1;
  }
  
  export function getFactors(num: number): number[] {
    const factors: number[] = [];
    for (let i = 1; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        factors.push(i);
        if (i !== num / i) {
          factors.push(num / i);
        }
      }
    }
    return factors.sort((a, b) => a - b);
  }
  
  export function numberToRoman(num: number): string {
    const romanNumerals = [
      { value: 1000, symbol: 'M' },
      { value: 900, symbol: 'CM' },
      { value: 500, symbol: 'D' },
      { value: 400, symbol: 'CD' },
      { value: 100, symbol: 'C' },
      { value: 90, symbol: 'XC' },
      { value: 50, symbol: 'L' },
      { value: 40, symbol: 'XL' },
      { value: 10, symbol: 'X' },
      { value: 9, symbol: 'IX' },
      { value: 5, symbol: 'V' },
      { value: 4, symbol: 'IV' },
      { value: 1, symbol: 'I' }
    ];
  
    let result = '';
    for (const { value, symbol } of romanNumerals) {
      while (num >= value) {
        result += symbol;
        num -= value;
      }
    }
    return result;
  }
  