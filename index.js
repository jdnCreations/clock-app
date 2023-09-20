const greeting = document.getElementById('greeting');
const time = document.getElementById('time');
const timezone = document.getElementById('timezone');
const country = document.getElementById('country');
const quoteText = document.getElementById('quoteText');
const quoteDiv = document.getElementById('quote');
const author = document.getElementById('author');
const expandedDiv = document.getElementById('expanded');
const refreshButton = document.getElementById('refresh');
const moreButton = document.getElementById('more');
const background = document.getElementById('background');

const dayOfWeek = document.getElementById('dayOfWeek');
const dayOfYear = document.getElementById('dayOfYear');
const weekNumber = document.getElementById('weekNumber');
const timezoneFull = document.getElementById('timezoneFull');

let expanded = false;

refreshButton.addEventListener('click', getRandomQuote);
moreButton.addEventListener('click', () => {
  console.log('clicked more btn');
  if (expanded) {
    // close
    expanded = false;
    expandedDiv.classList.remove('visible');
    quoteDiv.classList.remove('hideQuote');
  } else {
    // open
    expanded = true;
    expandedDiv.classList.add('visible');
    // hide quote
    quoteDiv.classList.add('hideQuote');
  }
});

// Make an API request to worldtimeapi.org
fetch('http://worldtimeapi.org/api/ip')
  .then((response) => response.json())
  .then((data) => {
    // Handle the response data

    console.log(data);

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

    timezoneFull.innerText = data.timezone;
    dayOfYear.innerText = data.day_of_year;
    dayOfWeek.innerText = data.day_of_week;
    weekNumber.innerText = data.week_number;

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
      quoteText.innerText = data[0].content;
      author.innerText = data[0].author;
    });
}
