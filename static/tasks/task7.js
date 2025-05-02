function loadTask7() {
    clearMap();
    //Rensar mappen från tidigare lager och sätter en vy för när task 7 laddas in
    mymap.setView([59.33559401837791, 18.021282737696875], 10);
  
    const colors = ["red", "blue", "green", "orange", "purple"];
    //Deklarerar en variabel för ett antal färger som används för att visualisera de olika klusterna senare. 
    fetch("/api/clusters")
    //Hämtar kluster datan från flask där python koden skrivits. 
      .then((res) => res.json())
      //Omvandlar svaret till JSON
      .then((data) => {
        data.forEach((school) => {
          //Med hjälp av foreach loopar vi igenom hela datamängden
          const color = colors[school.cluster];
          //Vi sätter sedan korrekt färg på skolan baserat på vilket kluster den tillhör.
          L.circleMarker([school.lat, school.lon], {
            //Vi skapar en cirkelmarkör för varje skola och placerar den på kordinaterna som finns i datamängden. 
            radius: 8,
            color: "#000",
            weight: 1,
            fillColor: color,
            fillOpacity: 0.8,
          })
            .addTo(mymap)
            .bindPopup(`<strong>${school.Name || "Skola"}</strong><br>Kluster: ${school.cluster}`);
        });
      });
  }

  $("#btnTask7").click(() => {
    loadTask7();
  });