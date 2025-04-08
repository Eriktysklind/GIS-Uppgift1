function loadTask4(){
  mymap.setView([60.73507581885979, 14.986419112848674], 15);
  imageBounds = [[60.736219159494766, 14.98384419247766], [60.73349185767996, 14.987320334978532]];
  L.imageOverlay("/static/img/tegera_arena.jpg", imageBounds).addTo(mymap);
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