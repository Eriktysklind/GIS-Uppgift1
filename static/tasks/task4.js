function loadTask4(){
  mymap.setView([60.73507581885979, 14.986419112848674], 15);
  imageBounds = [[60.735628715362544, 14.985227462675681], [60.73429129286315, 14.987544891009598]];
  L.imageOverlay("/static/img/Skärmbild.jpg", imageBounds).addTo(mymap);
}

function clearMap() {
    mymap.eachLayer(function (layer) {
      if (layer !== lyrOSM) {
        mymap.removeLayer(layer);
      }
    });
  }
  
  $(document).ready(function () {
    $("#btnTask4").click(function () {
      clearMap();
      loadTask4();
    });
  });