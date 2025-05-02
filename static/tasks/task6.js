//https://openweathermap.org/
//Dokumentation om hur man hämtar väder data från openweathermap. Koden är byggt från vad som behövs för att hämta datan.


// array med alla städer namn samt kordinater
const cities = [
  { name: "Falun", lat: 60.6061, lon: 15.6357 },
  { name: "Leksand", lat: 60.731, lon: 14.9856 },
  { name: "Åre", lat: 63.3985, lon: 13.0827 },
  { name: "Göteborg", lat: 57.7089, lon: 11.9746 },
  { name: "Stockholm", lat: 59.3293, lon: 18.0686 },
];

// den api nyckeln vi använder för att få tillgång till openweathermaps tjänster 
const apiKey = "4b6bb1d1826b7ba87a60a32c9725ebcf";

function loadTask6() {
  //laddar in sidebaren för denna task
  sidebarWeather.show();
  // vi skapar upp en div element med en simpel h3
  const container = document.createElement("div");
  container.innerHTML = "<h3>Väder i svenska städer</h3>";

  // skapar upp ett till div elemnet som är menat för våran väder lista i sidebaren
  const weatherList = document.createElement("div");

  container.appendChild(weatherList);
  sidebarWeather.setContent(container);

  // skapar en for-loop som hämtar värder data för en stad baserat på namn och kordinater
  cities.forEach((city) => {
    //const url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${apiKey}`;
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${apiKey}`;

    // här hämtas datan och omvandlar det till jsondata
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const forecastList = data.list;

        // här valde vi att lägga till ett filter för forcasten så att den bara hämtar väderdata från kl 12 på dygnet 
        // för forcast datan, den finns en limit hur mycket förfrågningar man kan göra via api och vi
        // vill inte riskera att överskrida detta.
        const dailyAtNoon = forecastList.filter((item) =>
          item.dt_txt.includes("12:00:00")
        );

// laddar in väder samt beskrivning för det 5 kommande dagarna och hör appliceras filtret kl 12
// vi använder slice för att bara hämta det 5 första elementen från dailyatnoon så att vi inte råkar hämta väderdata
// för fler dagar än det 5 kommande         
        let forecastHTML = "<h4>Prognos kl 12:</h4><ul>";
        dailyAtNoon.slice(0, 5).forEach((forecast) => {
          const date = new Date(forecast.dt * 1000).toLocaleDateString("sv-SE");
          const temp = forecast.main.temp;
          const description = forecast.weather[0].description;
          forecastHTML += `<li>${date}: ${description}, ${temp}°C</li>`;
        });
        forecastHTML += "</ul>";

        // här tillderar vi den nuvarande/aktuella väderdatan till olika variabler
        // vi så vi också kan visa nuvurande väder
        const weatherNow = forecastList[0];
        const weather = weatherNow.weather[0].description;
        const tempNow = weatherNow.main.temp;
        const wind = weatherNow.wind.speed;
        const icon = weatherNow.weather[0].icon;

        const cityDiv = document.createElement("div");
        cityDiv.innerHTML = `
      <div class="card mb-3" style="max-width: 540px;">
      <div class="row g-0">
      <div class="col-md-4 offset-md-8">
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" class="img-fluid rounded-end class="col-md-4 offset-md-8"" alt="Weather icon">
      </div>
      <div class="col-md-8">
      <div class="card-body">
      <h5 class="card-title">${city.name}</h5>
      <p class="card-text">${weather}</p> 
      <p class="card-text">${tempNow}°C</p> 
      <p class="card-text">Vind: ${wind} m/s</p>
      ${forecastHTML}
      <button class="btnGoToCity">Gå till stad</button>
      </div>
      </div>
      </div>
      </div>
    `;

    //klick funktion för att ändra till vyn för en viss stad
        cityDiv
          .querySelector(".btnGoToCity")
          .addEventListener("click", function () {
            mymap.setView([city.lat, city.lon], 13);
          });

        weatherList.appendChild(cityDiv);

        // vi använder leaflet markers för att skapa en popup med aktuellt väder
        const markerpop = L.marker([city.lat, city.lon]).addTo(mymap);
        markerpop.bindPopup(
          `<strong>${city.name}</strong><br>${weather}, ${tempNow}°C`
        );
      });
    
  });
}

//Skapar en funktion för att radera alla tidigare layers på våran map förutom grundlagret. 
function clearMap() {
  mymap.eachLayer(function (layer) {
    //Går igenom alla lagar som visa på vår karta
    if (layer !== lyrOSM) {
      mymap.removeLayer(layer);
      //Tarbort lagret från vårt karta.
    }
  });
}

$(document).ready(function () {
  $("#btnTask6").click(function () {
    clearMap();
    loadTask6();
  });
});
