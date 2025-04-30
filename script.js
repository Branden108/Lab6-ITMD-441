document.getElementById('fetchData').addEventListener('click', function() {
  const location = document.getElementById('location').value;
  const [latitude, longitude] = location.split(',');

  // Show placeholder or loading message
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `<p class="placeholder">Loading data...</p>`;
  
  // Use the Sunrise Sunset API to fetch data
  const url = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&formatted=0`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.status === 'OK') {
        const today = data.results; 

        // Update the result div with the fetched data
        resultDiv.innerHTML = `
          <div class="data-card">
            <h3>Today</h3>
            <p><strong>Sunrise:</strong> ${today.sunrise}</p>
            <p><strong>Sunset:</strong> ${today.sunset}</p>
            <p><strong>Dawn:</strong> ${today.dawn}</p>
            <p><strong>Dusk:</strong> ${today.dusk}</p>
            <p><strong>Day Length:</strong> ${today.day_length}</p>
            <p><strong>Solar Noon:</strong> ${today.solar_noon}</p>
            <p><strong>Time Zone:</strong> ${today.timezone}</p>
          </div>
        `;
      } else {
        // Show an error message if the response status is not OK
        resultDiv.innerHTML = `<p id="error">Error fetching data. Please try again.</p>`;
      }
    })
    .catch(error => {
      resultDiv.innerHTML = `<p id="error">An error occurred: ${error}</p>`;
    });
});
