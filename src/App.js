import React, { useState } from 'react';
import './App.css';

function App() {
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState('');

  const searchPressed = () => {
    fetch('/.netlify/functions/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        queryResult: {
          parameters: {
            'geo-city': search,
          },
        },
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setWeather(result.fulfillmentText);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <div>
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button onClick={searchPressed}>Search</button>

        {weather && <p>{weather}</p>}
      </header>
    </div>
  );
}

export default App;
