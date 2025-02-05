export default defineCachedEventHandler(async (event) => {
    const query = getQuery(event);
    const numberStr = query.number as string;
    const extended = query.extended === 'true';
    
    // Input validation with detailed error messages
    if (!numberStr) {
      setResponseStatus(event, 400);
      return {
        number: numberStr,
        error: true,
        message: 'Number parameter is required'
      };
    }
  
    if (isNaN(Number(numberStr))) {
      setResponseStatus(event, 400);
      return {
        number: numberStr,
        error: true,
        message: 'Invalid number format'
      };
    }
  
    const number = parseInt(numberStr);
  
    try {
      // Parallel fetch of cached data
      const [funFact, properties] = await Promise.all([
        getCachedNumberFact(event, number),
        getCachedNumberProperties(event, number, extended)
      ]);
  
      const response = {
        number,
        fun_fact: funFact,
        ...properties,

      };
      const metadata =   {
        cached: true,
        timestamp: new Date().toISOString(),
        ttl: extended ? 3600 : 86400
      }
      useRuntimeConfig(event).debug ? response.metadata = metadata : null
      return response;
    } catch (error) {
      console.error('Error processing number:', error);
      
      setResponseStatus(event, 500);
      return {
        number,
        error: true,
        message: 'Error processing number information'
      };
    }
  }, {
    maxAge: 60 * 60, // Cache entire response for 1 hour
    swr: true, // Use stale-while-revalidate strategy
    varies: ['extended'], // Vary cache by the extended query parameter
    shouldBypassCache: (event) => {
      // Bypass cache for specific scenarios
      const headers = event.node.req.headers;
      return headers['cache-control'] === 'no-cache' || 
             headers['x-bypass-cache'] === 'true';
    }
  });
  