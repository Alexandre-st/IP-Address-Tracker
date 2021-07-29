const api_key = "at_jX9101ryTipwYFz7Gt1q6gEYN9Y70";
let URL = `https://geo.ipify.org/api/v1?apiKey=${api_key}`;
const theIcon = L.icon({
  iconUrl: './images/icon-location.svg'
});

const fetchIpAdress = () => {
  fetch(URL)
  .then(response => response.json())
  .then((ipAddress) => {
    // console.log(ipAddress);

    // To create a list of the data to show
    const resultIp = document.querySelector('.search-content-address p');
    resultIp.innerText = ipAddress.ip;

    const resultLocation = document.querySelector('.search-content-location p ');
    resultLocation.innerText = `${ipAddress.location.city}, ${ipAddress.location.country} ${ipAddress.location.postalCode}`;

    const resultTimezone = document.querySelector('.search-content-timezone p');
    resultTimezone.innerText = ipAddress.location.timezone;

    const resultIsp = document.querySelector('.search-content-isp p');
    resultIsp.innerText = ipAddress.isp;

    // To add to the map, the good information for the map and add the icon location
    let latitude = ipAddress.location.lat;
    let longitude = ipAddress.location.lng;
    mymap.setView([latitude, longitude]);
    L.marker([latitude, longitude], {icon: theIcon}).addTo(mymap);

  });
};

fetchIpAdress();

// To search a new ip address
const search = document.querySelector('.search-arrow');
search.addEventListener('click', (evt) => {
  evt.preventDefault();
  const inputValue = document.querySelector('input').value;
  URL = `https://geo.ipify.org/api/v1?apiKey=${api_key}&ipAddress=${inputValue}`;
  fetchIpAdress();
});


// To configure the map for the IP
const mymap = L.map('mapid').setView([51.505, -0.09], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXNoZWxsZXk5MSIsImEiOiJja256M3JhbHowMjFuMzNwOTE5ODN4enJpIn0.6WYBfIPtzcbjvfQ1Y9fP5A', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);
