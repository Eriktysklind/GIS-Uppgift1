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
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${apiKey}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const weather = data.weather[0].description;
        const temp = data.main.temp;
        const wind = data.wind.speed;
        const icon = data.weather[0].icon;

        const cityDiv = document.createElement("div");
        cityDiv.style.marginBottom = "1rem";
        cityDiv.innerHTML = `
              <strong>${city.name}</strong><br>
              ${weather}, ${temp}°C<br>
              Vind: ${wind} m/s<br>
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
      });
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
