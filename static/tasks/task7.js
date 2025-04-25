//Papaparse möjligt lösning
//https://medium.com/@ryan_forrester_/read-csv-files-in-javascript-how-to-guide-8d0ac6df082a

function loadTask7() {
    clearMap();
    mymap.setView([59.33559401837791, 18.021282737696875], 10);
  
    const colors = ["red", "blue", "green", "orange", "purple"];
  
    fetch("/api/clusters")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((school) => {
          const color = colors[school.cluster];
          L.circleMarker([school.lat, school.lon], {
            radius: 8,
            color: "#000",
            weight: 1,
            fillColor: color,
            fillOpacity: 0.8,
          })
            .addTo(mymap)
            .bindPopup(`<strong>${school.name || "Skola"}</strong><br>Kluster: ${school.cluster}`);
        });
      });
  }

  $("#btnTask7").click(() => {
    loadTask7();
  });