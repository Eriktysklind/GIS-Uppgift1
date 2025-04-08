
function loadTask2() {
  mymap.setView([60.606715170380895, 15.635754054322716], 13);
  const school1Coords = [
    { lat: 60.61668314092263, lng: 15.627644549953436 },
    { lat: 60.625256903746184, lng: 15.622433198014082 },
    { lat: 60.592595759762666, lng: 15.685269813355674 },
    { lat: 60.604365663833036, lng: 15.624258467326692 },
    { lat: 60.60984456541524, lng: 15.638397283032829 },
  ];
  const blackIcon = L.icon({
    iconUrl: "/static/img/map-marker.svg",
    iconSize: [32, 37], // size of the icon
    iconAnchor: [32, 37], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -30], // point from which the popup should open relative to the iconAnchor
  });
    sidebar.show();
    s1 = L.marker([60.61668314092263, 15.627644549953436], { icon: blackIcon })
      .addTo(mymap)
      .bindPopup("Söderbaumska");
    s2 = L.marker([60.625256903746184, 15.622433198014082], { icon: blackIcon })
      .addTo(mymap)
      .bindPopup("Britsarvsskolan");
    s3 = L.marker([60.592595759762666, 15.685269813355674], { icon: blackIcon })
      .addTo(mymap)
      .bindPopup("hälsinggårdsskolan");
    s4 = L.marker([60.604365663833036, 15.624258467326692], { icon: blackIcon })
      .addTo(mymap)
      .bindPopup("Västraskolan");
    s5 = L.marker([60.60984456541524, 15.638397283032829], { icon: blackIcon })
      .addTo(mymap)
      .bindPopup("Mosaik");

    polylineMeasure.seed([school1Coords]);

}

function clearMap() {
  mymap.eachLayer(function (layer) {
    if (layer !== lyrOSM) {
      mymap.removeLayer(layer);
    }
    
  });
}

$(document).ready(function () {
  $("#btnTask2").click(function () {
    clearMap();
    loadTask2();
  });
});

$("#btns1").click(function () {
  mymap.setView([60.61668314092263, 15.627644549953436], 17);
});
$("#btns2").click(function () {
  mymap.setView([60.625256903746184, 15.622433198014082], 17);
});
$("#btns3").click(function () {
  mymap.setView([60.592595759762666, 15.685269813355674], 17);
});
$("#btns4").click(function () {
  mymap.setView([60.604365663833036, 15.624258467326692], 17);
});
$("#btns5").click(function () {
  mymap.setView([60.60984456541524, 15.638397283032829], 17);
});
