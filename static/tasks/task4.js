//https://leafletjs.com/examples/overlays/



/*Vi valde att ta en skärmbild från googlemaps och har sedan försökt
att få den så symetrisk som möjligt med uppgiftens karta.

vi använder leaflets image overlay för att applicera en skrämbild till kartan

*/
function loadTask4(){
  mymap.setView([60.73507581885979, 14.986419112848674], 15);
  imageBounds = [[60.735628715362544, 14.985227462675681], [60.73429129286315, 14.987544891009598]];
  L.imageOverlay("/static/img/Skärmbild.jpg", imageBounds).addTo(mymap);
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
    $("#btnTask4").click(function () {
      clearMap();
      loadTask4();
    });
  });