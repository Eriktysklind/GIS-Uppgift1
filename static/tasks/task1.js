// TASK 1 Point, Line and poly features
$(document).ready(function () {
//En variabel som lagrar kordinaterna för linjen.
const linesTask1 = [
  [60.5243333354066, 15.736086505609451],
  [60.525624328082515, 15.728027894281132],
  [60.521966381827944, 15.719157174834455],
  [60.519322566829395, 15.71603368207154],
  [60.514280274921475, 15.714159586413794],
];

//Kordinateran för polygon features
const latlngs = [
  [60.52279993958435, 15.722265543088715],
  [60.51308374587705, 15.716860627887064],
  [60.51276688438424, 15.722310876678279],
  [60.521978644898304, 15.727424317415496],
];
//Mappar ut ytan på kartan
const polygon = L.polygon(latlngs, { color: "grey" }).addTo(mymap).bindPopup(
  "<h3>Kyrkbytjärn</h3><img src= '/static/img/kyrbytjarn.jpg'width='100rem'>"
);;
//Mappar ut linjen på kartan
const polyline = L.polyline(linesTask1, { color: "blue" }).addTo(mymap).bindPopup(
  "<h3>Vikavägen</h3><img src= '/static/img/vika.jpg'width='100rem'>"
);;

L.control.polylineMeasure().addTo(mymap);

const blackIcon = L.icon({
  iconUrl: "/static/img/map-marker.svg",
  iconSize: [32, 37], // size of the icon
  iconAnchor: [32, 37], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -30], // point from which the popup should open relative to the iconAnchor
});
const pointTask = L.marker([60.51402124901837, 15.714639203546412], {
  icon: blackIcon,
})
  .addTo(mymap)
  .bindPopup(
    "<h3>Vika Nära, Krog & Handel</h3><img src= '/static/img/vika_nara.jpg'width='100rem'>"
  );

  $("#btnTask1").click(function(){
    mymap.setView([60.5141552254804, 15.714495440221565], 13);
})
});
//End TASK 1
