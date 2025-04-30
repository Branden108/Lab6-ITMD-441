document.getElementById('fetchData').addEventListener('click', function() {
  const location = document.getElementById('location').value;
  const [latitude, longitude] = location.split(',');

  // Use the Sunrise Sunset API to fetch data
  const url = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&formatted=0`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.status === 'OK') {
        const today = data.results;
        const tomorrow = data.results; 

        // Update the result div with the fetched data
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
          <h2>Sunrise and Sunset for today and tomorrow:</h2>

          <!-- Display Today's Data -->
          <h3>Today:</h3>
          <p><strong>Sunrise:</strong> ${today.sunrise}</p>
          <p><strong>Sunset:</strong> ${today.sunset}</p>
          <p><strong>Dawn:</strong> ${today.dawn}</p>
          <p><strong>Dusk:</strong> ${today.dusk}</p>
          <p><strong>Day Length:</strong> ${today.day_length}</p>
          <p><strong>Solar Noon:</strong> ${today.solar_noon}</p>
          <p><strong>Time Zone:</strong> ${today.timezone}</p>

          <!-- Display Tomorrow's Data (if available) -->
          <h3>Tomorrow:</h3>
          <p><strong>Sunrise:</strong> ${tomorrow.sunrise}</p>
          <p><strong>Sunset:</strong> ${tomorrow.sunset}</p>
          <p><strong>Dawn:</strong> ${tomorrow.dawn}</p>
          <p><strong>Dusk:</strong> ${tomorrow.dusk}</p>
          <p><strong>Day Length:</strong> ${tomorrow.day_length}</p>
          <p><strong>Solar Noon:</strong> ${tomorrow.solar_noon}</p>
          <p><strong>Time Zone:</strong> ${tomorrow.timezone}</p>
        `;
      } else {
        // Handle error if data fetching fails
        alert('Error fetching data. Please try again.');
      }
    })
    .catch(error => {
      alert('An error occurred: ' + error);
    });
});
