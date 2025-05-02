// TASK 1 Point, Line and poly features
function loadTask1() {
  mymap.setView([60.5141552254804, 15.714495440221565], 13);
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
  L.polygon(latlngs, { color: "grey" })
    .addTo(mymap)
    .bindPopup(
      "<h3>Kyrkbytjärn</h3><img src= '/static/img/kyrbytjarn.jpg'width='100rem'>"
    );
  //Mappar ut linjen på kartan
  L.polyline(linesTask1, { color: "blue" })
    .addTo(mymap)
    .bindPopup(
      "<h3>Vikavägen</h3><img src= '/static/img/vika.jpg'width='100rem'>"
    );
  //Lägger till en marker för platsen
  L.marker([60.51402124901837, 15.714639203546412], {})
    .addTo(mymap)
    .bindPopup(
      "<h3>Vika Nära, Krog & Handel</h3><img src= '/static/img/vika_nara.jpg'width='100rem'>"
    );
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
  $("#btnTask1").click(function () {
    clearMap();
    loadTask1();
  });
});
//End TASK 1
