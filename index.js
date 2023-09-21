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
const icon = document.getElementById('icon');
const buttonText = document.getElementById('buttonText');
const circle = document.getElementById('circle');
const topDiv = document.getElementById('top');

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
    buttonText.innerText = 'More';
    circle.classList.remove('flip');
    topDiv.classList.remove('bigpadding');
  } else {
    // open
    expanded = true;
    expandedDiv.classList.add('visible');
    // hide quote
    quoteDiv.classList.add('hideQuote');
    buttonText.innerText = 'less';
    circle.classList.add('flip');
    topDiv.classList.add('bigpadding');
  }
});

// Make an API request to worldtimeapi.org
fetch('https://worldtimeapi.org/api/ip')
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
      // change greeting
      if (window.innerWidth >= 768) {
        greeting.innerText = "Good evening, it's currently";
      } else {
        greeting.innerText = 'Good Evening';
      }
      icon.src = './assets/desktop/icon-moon.svg';
    } else {
      background.classList.add('daytime');
      if (window.innerWidth >= 768) {
        greeting.innerText = "Good Morning, it's currently";
      } else {
        greeting.innerText = 'Good Morning';
      }
      icon.src = './assets/desktop/icon-sun.svg';
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
