const api_key = "at_jX9101ryTipwYFz7Gt1q6gEYN9Y70";
const theIcon = L.icon({
  iconUrl: './images/icon-location.svg'
});

const fetchIpAdress = () => {
  
  fetch(`https://geo.ipify.org/api/v1?apiKey=${api_key}`)
  .then(response => response.json())
  .then((ipAddress) => {
    console.log(ipAddress);
    showResult(ipAddress);
  })
};

fetchIpAdress();

// Création de la liste des données à afficher
const showResult = (ipAddress) => {
  
  const resultIp = document.querySelector('.search-content-address');
  const resultLocation = document.querySelector('.search-content-location');
  const resultTimezone = document.querySelector('.search-content-timezone');
  const resultIsp = document.querySelector('.search-content-isp');

  const ip = document.createElement('p');
  ip.innerText = ipAddress.ip;

  const location = document.createElement('p');
  location.innerText = `${ipAddress.location.city}, ${ipAddress.location.country} ${ipAddress.location.postalCode}`;

  const timezone = document.createElement('p');
  timezone.innerText = ipAddress.location.timezone;

  const isp = document.createElement('p');
  isp.innerText = ipAddress.isp;

  let latitude = ipAddress.location.lat;
  let longitude = ipAddress.location.lng;
  mymap.setView([latitude, longitude]);
  L.marker([latitude, longitude], {icon: theIcon}).addTo(mymap);

  resultIp.appendChild(ip);
  resultLocation.appendChild(location);
  resultTimezone.appendChild(timezone);
  resultIsp.appendChild(isp);
};

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
