//https://turfjs.org/
function loadTask3() {
  //Sätter vyn för när man trycker på knappen
  mymap.setView([60.3449503, 17.5163196], 8);

  L.geoJSON(super_markets, {
    onEachFeature: function (feature, layer) {
      if (feature.properties && feature.properties.name) {
        layer.bindPopup(`<strong>${feature.properties.name}</strong>`);
      }
    }
  }).addTo(mymap);

  //Deklarerar en variabel för buffer funktion där vi ställer radien på 1 km. 
  const buffered = turf.buffer(super_markets, 1, { units: "kilometers" });

  const features = buffered.features;
  //Vi skapar en tom array för att spara alla buffert som inter överlappar.
  const nonOverlapping = [];

  //Vi skapar en for loop för att gå igenom varje buffert.
  //Denna for loop med den inre kollar om någon buffert överlappar och gör det inte de läggs den till i arrayen.
  //Det är med hjälp av turf.intersect vi kontrollerar om de överlappar eller inte. 
  for (let i = 0; i < features.length; i++) {
    let overlaps = false;
    for (let j = 0; j < features.length; j++) {
      if (i !== j) {
        const intersection = turf.intersect(features[i], features[j]);
        if (intersection) {
          overlaps = true;
          break;
        }
      }
    }
    if (!overlaps) {
      nonOverlapping.push(features[i]);
    }
  }

  //Mappar ut de butiker som överlappar varandra och tilldelar de färgen röd.
  L.geoJSON(buffered, {
    style: {
      color: "red",
      dashArray: "5,5",
      fillOpacity: 0.2
    }
  }).addTo(mymap);

  //Mappar ut den butiker som inte överlappar varandra och tilldelar de färgen grön. 
  L.geoJSON(nonOverlapping, {
    style: {
      color: "green",
      fillOpacity: 0.5
    }
  }).addTo(mymap);
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
  $("#btnTask3").click(function () {
    clearMap();
    loadTask3();
  });
});