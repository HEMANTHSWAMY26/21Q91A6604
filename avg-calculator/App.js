import React, { useState, useEffect } from 'react';
import fetchNumbers from './api';
import AverageCalculator from './components/AverageCalculator';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [average, setAverage] = useState(null);
  const [error, setError] = useState(null);
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    const fetchInitialNumbers = async () => {
      try {
        const data = await fetchNumbers();
        setNumbers(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchInitialNumbers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://20.244.56.144/test/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ numbers: inputValue.split(',') })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAverage(data.avg);
      setNumbers(data.numbers);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleNumberChange = async (numberType) => {
    try {
      const data = await fetchNumbers(numberType);
      setNumbers(data);
      setAverage(AverageCalculator(data));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Average Calculator</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter numbers (comma-separated):
          <input type="text" value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
        </label>
        <button type="submit">Calculate Average</button>
      </form>
      <p>
        <button onClick={() => handleNumberChange('e')}>Even numbers</button>
        <button onClick={() => handleNumberChange('prime')}>Prime numbers</button>
        <button onClick={() => handleNumberChange('fib')}>Fibonacci numbers</button>
      </p>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        average ? (
          <p>Average: {average}</p>
        ) : (
          <p>Enter numbers and click "Calculate Average" to get the result.</p>
        )
      )}
      <ul>
        {numbers.map((number, index) => (
          <li key={index}>{number}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;