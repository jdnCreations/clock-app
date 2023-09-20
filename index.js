const greeting = document.getElementById('greeting');
const time = document.getElementById('time');
const timezone = document.getElementById('timezone');
const country = document.getElementById('country');

// Make an API request to worldtimeapi.org
fetch('http://worldtimeapi.org/api/ip')
  .then((response) => response.json())
  .then((data) => {
    // Handle the response data
    const timeZone = data.timezone;
    const currentTime = data.utc_datetime;

    const date = new Date(currentTime);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    time.innerText = `${hours}:${minutes}`;
    timezone.innerText = data.abbreviation;

    console.log(data);
  })
  .catch((error) => {
    console.error('Error fetching time:', error);
  });
