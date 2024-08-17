const calculateAverage = (numbers) => {
    if (!numbers || numbers.length === 0) {
      return null;
    }
    const sum = numbers.reduce((acc, current) => acc + current, 0);
    return sum / numbers.length;
  };
  
  export default calculateAverage;