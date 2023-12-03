const fetch = require('node-fetch');

const api = {
  key: '0c5429a0280f3841c867a3f9e8e3b708',
  base: 'https://api.openweathermap.org/data/2.5/',
};

exports.handler = async function (event, context) {
  try {
    // Check if event.body is not empty
    if (!event.body) {
      throw new Error('Request body is empty.');
    }

    const { queryResult } = JSON.parse(event.body);
    const location = queryResult.parameters['geo-city'];

    const response = await fetch(
      `${api.base}weather?q=${location}&units=metric&APPID=${api.key}`
    );

    if (!response.ok) {
      throw new Error(`Weather API request failed with status ${response.status}`);
    }

    const weatherData = await response.json();
    const responseText = `The weather in ${location} is ${weatherData.main.temp} degrees Celsius with ${weatherData.weather[0].description}.`;

    return {
      statusCode: 200,
      body: JSON.stringify({ fulfillmentText: responseText }),
    };
  } catch (error) {
    console.error('Error in the function:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
