import React, { useState } from 'react';
import axios from 'axios';

const AverageCalculator = () => {
    const [type, setType] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (event) => {
        setType(event.target.value);
    };

    const fetchNumbers = async () => {
        if (!type) {
            setError('Please enter a number type (e.g., primes, fibo)');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`http://localhost:9876/numbers/${type}`);
            setData(response.data);
        } catch (err) {
            setError('Failed to fetch data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Average Calculator</h2>
            <input 
                type="text" 
                placeholder="Enter number type (e.g., primes, fibo)"
                value={type}
                onChange={handleInputChange}
                style={{ marginRight: '10px' }}
            />
            <button onClick={fetchNumbers}>Fetch Numbers</button>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {data && (
                <div>
                    <h3>Response</h3>
                    <p><strong>Previous State:</strong> {JSON.stringify(data.windowPrevState)}</p>
                    <p><strong>Current State:</strong> {JSON.stringify(data.windowCurrState)}</p>
                    <p><strong>Fetched Numbers:</strong> {JSON.stringify(data.numbers)}</p>
                    <p><strong>Average:</strong> {data.avg}</p>
                </div>
            )}
        </div>
    );
};

export default AverageCalculator;
