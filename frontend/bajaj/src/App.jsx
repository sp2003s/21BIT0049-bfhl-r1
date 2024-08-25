import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const parsedData = JSON.parse(jsonInput);
            const res = await axios.post('http://localhost:3000/bfhl', parsedData);
            setResponse(res.data);
            setError('');
        } catch (err) {
            setError('Invalid JSON format or API error');
        }
    };

    const handleOptionChange = (e) => {
        const value = e.target.value;
        setSelectedOptions(prev =>
            prev.includes(value)
                ? prev.filter(option => option !== value)
                : [...prev, value]
        );
    };

    const renderResponse = () => {
        if (!response) return null;
        let filteredResponse = {};
        if (selectedOptions.includes('Alphabets')) {
            filteredResponse.alphabets = response.alphabets;
        }
        if (selectedOptions.includes('Numbers')) {
            filteredResponse.numbers = response.numbers;
        }
        if (selectedOptions.includes('Highest lowercase alphabet')) {
            filteredResponse.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
        }
        return <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>;
    };

    return (
        <div>
            <h1>Your Roll Number</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    rows="10"
                    cols="50"
                    placeholder='Enter JSON here...'
                />
                <br />
                <button type="submit">Submit</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {response && (
                <div>
                    <h2>Select options to view response:</h2>
                    <select multiple onChange={handleOptionChange}>
                        <option value="Alphabets">Alphabets</option>
                        <option value="Numbers">Numbers</option>
                        <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
                    </select>
                    {renderResponse()}
                </div>
            )}
        </div>
    );
}

export default App;
