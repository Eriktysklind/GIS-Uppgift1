//https://github.com/Leaflet/Leaflet.markercluster
function loadTask5(){
  mymap.setView([59.33559401837791, 18.021282737696875], 10);
  
   // Skapar ett objekt för markerClusterGroup
   const markerCluster = L.markerClusterGroup();

   // Skapa markörer för alla bensinstationer från GeoJSon
   const fuelLayer = L.geoJSON(fuel, {
     pointToLayer: function (feature, latlng) {
       return L.marker(latlng);
     },
     //Lägger till deras namn när man klickar på markören.
     onEachFeature: function (feature, layer) {
       if (feature.properties && feature.properties.name) {
         layer.bindPopup(`<h3>${feature.properties.name}</h3>`);
       }
     }
   });
 

   markerCluster.addLayer(fuelLayer);
 
   mymap.addLayer(markerCluster);

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
    $("#btnTask5").click(function () {
      clearMap();
      loadTask5();
    });
  });