document.getElementById('fetchData').addEventListener('click', function() {
  const location = document.getElementById('location').value;
  const [latitude, longitude] = location.split(',');

  // Show placeholder or loading message
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `<p class="placeholder">Loading data...</p>`;

  // Function to format a date in YYYY-MM-DD format
  function formatDate(date) {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Ensure two-digit month
    const day = ('0' + date.getDate()).slice(-2); // Ensure two-digit day
    return `${year}-${month}-${day}`;
  }

  // Get today's date and tomorrow's date
  const todayDate = new Date();
  const tomorrowDate = new Date(todayDate);
  tomorrowDate.setDate(todayDate.getDate() + 1); // Increment the date by 1 for tomorrow
  
  const todayFormatted = formatDate(todayDate);
  const tomorrowFormatted = formatDate(tomorrowDate);

  // Use the Sunrise Sunset API to fetch today's data
  const urlToday = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=${todayFormatted}&formatted=0`;
  
  // Use the Sunrise Sunset API to fetch tomorrow's data
  const urlTomorrow = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=${tomorrowFormatted}&formatted=0`;

  // Fetch both today and tomorrow's data using Promise.all for parallel requests
  Promise.all([fetch(urlToday), fetch(urlTomorrow)])
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(data => {
      const today = data[0].results;
      const tomorrow = data[1].results;

      if (data[0].status === 'OK' && data[1].status === 'OK') {
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

          <div class="data-card">
            <h3>Tomorrow</h3>
            <p><strong>Sunrise:</strong> ${tomorrow.sunrise}</p>
            <p><strong>Sunset:</strong> ${tomorrow.sunset}</p>
            <p><strong>Dawn:</strong> ${tomorrow.dawn}</p>
            <p><strong>Dusk:</strong> ${tomorrow.dusk}</p>
            <p><strong>Day Length:</strong> ${tomorrow.day_length}</p>
            <p><strong>Solar Noon:</strong> ${tomorrow.solar_noon}</p>
            <p><strong>Time Zone:</strong> ${tomorrow.timezone}</p>
          </div>
        `;
      } else {
        // Show an error message if fetching failed
        resultDiv.innerHTML = `<p id="error">Error fetching data. Please try again.</p>`;
      }
    })
    .catch(error => {
      resultDiv.innerHTML = `<p id="error">An error occurred: ${error}</p>`;
    });
});
