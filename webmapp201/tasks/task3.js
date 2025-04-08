$(document).ready(function () {
const supermarketLayer = L.geoJSON(super_markets, {
    onEachFeature: function (feature, layer) {
      if (feature.properties && feature.properties.name) {
        layer.bindPopup(`<strong>${feature.properties.name}</strong>`);
      }
    },
  }).addTo(mymap);
  
  const s2 = supermarketLayer.toGeoJSON();

  const samplegeo = turf.buffer(s2, 1, { units: "kilometers" });

  const samplegeol = L.geoJSON(samplegeo, {
    style: { color: "yellow", dashArray: "5,5", fillOpacity: 0.1 },
  }).addTo(mymap);

  $("#btnTask3").click(function(){
    mymap.setView([59.86258437437953, 17.67059903526672], 8);
})
});