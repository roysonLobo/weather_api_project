// functions/webhook.js
const fetch = import('node-fetch');

const api = {
  key: '0c5429a0280f3841c867a3f9e8e3b708',
  base: 'https://api.openweathermap.org/data/2.5/',
};

exports.handler = async function (event, context) {
  const { queryResult } = JSON.parse(event.body);
  const location = queryResult.parameters['geo-city'];

  try {
    const response = await fetch(
      `${api.base}weather?q=${location}&units=metric&APPID=${api.key}`
    );
    const weatherData = await response.json();
    const responseText = `The weather in ${location} is ${weatherData.main.temp} degrees Celsius with ${weatherData.weather[0].description}.`;

    return {
      statusCode: 200,
      body: JSON.stringify({ fulfillmentText: responseText }),
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};

