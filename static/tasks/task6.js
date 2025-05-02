//https://openweathermap.org/
//Dokumentation om hur man hämtar väder data från openweathermap. Koden är byggt från vad som behövs för att hämta datan.

const cities = [
  { name: "Falun", lat: 60.6061, lon: 15.6357 },
  { name: "Leksand", lat: 60.731, lon: 14.9856 },
  { name: "Åre", lat: 63.3985, lon: 13.0827 },
  { name: "Göteborg", lat: 57.7089, lon: 11.9746 },
  { name: "Stockholm", lat: 59.3293, lon: 18.0686 },
];
const apiKey = "4b6bb1d1826b7ba87a60a32c9725ebcf";

function loadTask6() {
  sidebarWeather.show();
  const container = document.createElement("div");
  container.innerHTML = "<h3>Väder i svenska städer</h3>";

  const weatherList = document.createElement("div");

  container.appendChild(weatherList);
  sidebarWeather.setContent(container);

  cities.forEach((city) => {
    //const url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${apiKey}`;
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${apiKey}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const forecastList = data.list;

        const dailyAtNoon = forecastList.filter((item) =>
          item.dt_txt.includes("12:00:00")
        );

        let forecastHTML = "<h4>Prognos kl 12:</h4><ul>";
        dailyAtNoon.slice(0, 5).forEach((forecast) => {
          const date = new Date(forecast.dt * 1000).toLocaleDateString("sv-SE");
          const temp = forecast.main.temp;
          const description = forecast.weather[0].description;
          forecastHTML += `<li>${date}: ${description}, ${temp}°C</li>`;
        });
        forecastHTML += "</ul>";

        const weatherNow = forecastList[0];
        const weather = weatherNow.weather[0].description;
        const temp = weatherNow.main.temp;
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
      <p class="card-text">${temp}°C</p> 
      <p class="card-text">Vind: ${wind} m/s</p>
      ${forecastHTML}
      <button class="btnGoToCity">Gå till stad</button>
      </div>
      </div>
      </div>
      </div>
    `;

        cityDiv
          .querySelector(".btnGoToCity")
          .addEventListener("click", function () {
            mymap.setView([city.lat, city.lon], 13);
          });

        weatherList.appendChild(cityDiv);

        const markerpop = L.marker([city.lat, city.lon]).addTo(mymap);
        markerpop.bindPopup(
          `<strong>${city.name}</strong><br>${weather}, ${temp}°C`
        );
      });
    /*     fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const weather = data.weather[0].description;
        const temp = data.main.temp;
        const wind = data.wind.speed;
        const icon = data.weather[0].icon;
        const daily = data.daily.temp;

        const cityDiv = document.createElement("div");
        cityDiv.style.marginBottom = "1rem";
        cityDiv.innerHTML = `
              <h3>${city.name}</h3>
              ${weather}, ${temp}°C
              <p>Vind: ${wind} m/s</p>
              <p>${daily} </p>
              <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
              <button class="btnGoToCity" >
              Gå till stad
              </button>
            `;
        cityDiv
          .querySelector(".btnGoToCity")
          .addEventListener("click", function () {
            mymap.setView([city.lat, city.lon], 13);
          });

        weatherList.appendChild(cityDiv);

        const markerpop = L.marker([city.lat, city.lon]).addTo(mymap);
        markerpop.bindPopup(
          `<strong>${city.name}</strong><br>${weather}, ${temp}°C`
        );
      });*/
  });
}

function clearMap() {
  mymap.eachLayer(function (layer) {
    if (layer !== lyrOSM) {
      mymap.removeLayer(layer);
    }
  });
}

$(document).ready(function () {
  $("#btnTask6").click(function () {
    clearMap();
    loadTask6();
  });
});
