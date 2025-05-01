document.getElementById('fetchData').addEventListener('click', function() {
  const location = document.getElementById('location').value;
  const [latitude, longitude] = location.split(',');

  // Show placeholder or loading message
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `<p class="placeholder">Loading data...</p>`;

  // Add location-specific image when a location is selected
  const locationImage = document.getElementById('location-image');
  const imageContainer = document.getElementById('location-image-container');
  
  // Map location to image
  const locationImages = {
    '42.150348298874235,-88.33829246956655': 'images/algonquin.jpg',
    '42.0464717076227,-88.03707016090677': 'images/woodfield.jpg',
    '14.606132200178315,120.98282120339876': 'images/manila.jpg',
    '41.48247616578942,-82.68350828399703': 'images/cedar-point.jpg',
    '43.58663705156137,-89.7829713169242': 'images/wilderness.jpg',
    '40.79046428068625,-73.13812441849758': 'images/long-island.jpg',
    '43.096361467972315,-79.03814638410901': 'images/niagara-falls.jpg',
    '21.16077977259632,-86.8503963329336': 'images/cancun.jpg',
    '21.309707800095662,-157.86229425884716': 'images/honolulu.jpeg',
    '52.36763599010202,4.902242031033321': 'images/amsterdam.jpg'
  };

  // Set the image for the selected location
  if (locationImages[location]) {
    locationImage.src = locationImages[location];
    imageContainer.style.display = 'block';  // Show the image container
  } else {
    imageContainer.style.display = 'none';  // Hide the image container if no image is found
  }
  
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
