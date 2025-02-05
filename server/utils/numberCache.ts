export const getCachedNumberFact = defineCachedFunction(
    async (event: H3Event, number: number) => {
      const headers = getHeaders(event)
      const preferredLanguage = headers['accept-language']?.split(',')[0] || 'en'
      
      const response = await $fetch(`http://numbersapi.com/${number}/math`, {
        headers: {
          'Accept-Language': preferredLanguage
        }
      });
      return response;
    },
    {
      maxAge: 24 * 60 * 60,
      name: 'numberFacts',
      getKey: (event: H3Event, number: number) => {
        const headers = getHeaders(event)
        const lang = headers['accept-language']?.split(',')[0] || 'en'
        return `fact:${number}:${lang}`
      },
      shouldBypassCache: (event) => {
        const headers = getHeaders(event)
        return headers['cache-control'] === 'no-cache'
      }
    }
  );
  
  export const getCachedNumberProperties = defineCachedFunction(
    async (event: H3Event, number: number, extended: boolean = false) => {
      const properties = {
        is_prime: isPrime(number),
        is_perfect: isPerfect(number),
        properties: getProperties(number),
        digit_sum: getDigitSum(number)
      };
  
      if (extended) {
        return {
          ...properties,
          extended_properties: {
            factors: getFactors(number),
            is_happy: isHappy(number),
            fibonacci_sequence: getFibonacciSequence(number),
            binary: number.toString(2),
            hex: number.toString(16),
            roman: numberToRoman(number)
          }
        };
      }
  
      return properties;
    },
    {
      maxAge: 60 * 60,
      name: 'numberProperties',
      getKey: (event: H3Event, number: number, extended: boolean) => 
        `props:${number}:${extended}`,
    }
  );