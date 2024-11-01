import React, { useState } from 'react';
import './styles.css';

const apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

function App() {
    const [searchWord, setSearchWord] = useState('');
    const [definition, setDefinition] = useState(null);
    const [error, setError] = useState(null);

    const fetchDefinition = async (word) => {
        try {
            const response = await fetch(apiUrl + word);
            if (!response.ok) {
                throw new Error('Word not found');
            }
            const data = await response.json();
            setDefinition(data[0]);
            setError(null);
        } catch (err) {
            setError(err.message);
            setDefinition(null);
        }
    };

    const handleSearch = () => {
        if (searchWord.trim()) {
            fetchDefinition(searchWord.trim());
        } else {
            alert('Please enter a word.');
        }
    };

    return (
        <div id="app">
            <h1>Dictionary App</h1>
            <input
                type="text"
                value={searchWord}
                onChange={(e) => setSearchWord(e.target.value)}
                placeholder="Enter a word"
            />
            <button onClick={handleSearch}>Search</button>
            <div id="result">
                {error && <p>{error}</p>}
                {definition && (
                    <div>
                        <h2>{definition.word}</h2>
                        <ul>
                            {definition.meanings[0].definitions.map((def, index) => (
                                <li key={index}>{def.definition}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
