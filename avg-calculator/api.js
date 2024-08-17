const fetchNumbers = async (numberType) => {
    try {
      const response = await fetch(`http://20.244.56.144/test/primes?type=${numberType}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${'ostTjkNGmoLnIWMm'}`,
          'Client-ID': '7d82ef58-13f1-4a27-823c-cc82393e04b9'
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data.numbers;
    } catch (error) {
      console.error('Fetch error:', error);
      return [];
    }
  };
  
  export default fetchNumbers;