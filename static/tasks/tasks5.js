function clearMap() {
    mymap.eachLayer(function (layer) {
      if (layer !== lyrOSM) {
        mymap.removeLayer(layer);
      }
    });
  }
  
  $(document).ready(function () {
    $("#btnTask5").click(function () {
      clearMap();
      loadTask5();
    });
  });