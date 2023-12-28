document.addEventListener('DOMContentLoaded', function () {
    const locationInput = document.getElementById('locationInput');
    const searchButton = document.getElementById('searchButton');
    const unitSelect = document.getElementById('unitSelect');
    const weatherData = document.getElementById('weatherData');

    searchButton.addEventListener('click', () => {
        const location = locationInput.value;
        const unit = unitSelect.value;

        if (location.trim() === '') {
            alert('Please enter a location');
            return;
        }
    // Check if the location is Delhi
    if (location.toLowerCase() !== 'Delhi') {
        alert('Weather is only available for Delhi.');
        return;
      }
      //check if location is Delhi
      if (location !== 'Delhi') {
        alert('Weather is only available for Delhi.');
        return;
      } 
        //  API key
        const apiKey = 'aa427572b4e45c1f1eb239a4c58fa59f';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network not found');
                }
                return response.json();
            })
            .then(data => {
                const cityName = data.name;
                const temperature = data.main.temp;
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;
                const weatherDescription = data.weather[0].description;

                // Check temperature and set background color
                if (temperature >= 30) {
                    document.body.style.backgroundColor = 'red';
                } else {
                    document.body.style.backgroundColor = 'lightgreen';
                }
                
                weatherData.innerHTML = `
                    <h1>Weather in ${cityName}</h1>
                    <p>Temperature: ${temperature}°${unit === 'metric' ? 'C' : 'F'}</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>Wind Speed: ${windSpeed} m/s</p>
                    <p>Conditions: ${weatherDescription}</p>
                `;
            })
            .catch(error => {
                console.error('There was a problem fetching the weather data:', error);
                weatherData.innerHTML = 'Sorry, there was an error fetching the weather data.';
            });
    });
});

