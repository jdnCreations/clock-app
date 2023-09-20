const greeting = document.getElementById('greeting');
const time = document.getElementById('time');
const timezone = document.getElementById('timezone');
const country = document.getElementById('country');
const quote = document.getElementById('quote');
const author = document.getElementById('author');
const refreshButton = document.getElementById('refresh');
const background = document.getElementById('background');

refreshButton.addEventListener('click', getRandomQuote);

// Make an API request to worldtimeapi.org
fetch('http://worldtimeapi.org/api/ip')
  .then((response) => response.json())
  .then((data) => {
    // Handle the response data
    const timeZone = data.timezone;
    const currentTime = data.utc_datetime;

    const date = new Date(currentTime);
    const hours = date.getHours();
    const minutes = date.getMinutes({});

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    if (hours >= 12) {
      // change background to night
      background.classList.add('nighttime');
    } else {
      background.classList.add('daytime');
    }

    time.innerText = `${hours}:${formattedMinutes}`;
    timezone.innerText = data.abbreviation;

    getLocationInfo(data.client_ip);

    getRandomQuote();
  })
  .catch((error) => {
    console.error('Error fetching time:', error);
  });

function getLocationInfo(ip) {
  fetch(`https://ipinfo.io/${ip}?token=74355c088eb807`)
    .then((response) => response.json())
    .then((data) => {
      country.innerText = `in ${data.city}, ${data.country} `;
    });
}

function getRandomQuote() {
  fetch('https://api.quotable.io/quotes/random')
    .then((response) => response.json())
    .then((data) => {
      quote.innerText = data[0].content;
      author.innerText = data[0].author;
    });
}
