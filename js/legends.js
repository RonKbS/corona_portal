var legend = L.control({ position: 'bottomright' });

function addLegend(grades, ramp, title = null) {
  if (legend._map) {
    map.removeControl(legend);
  }

  legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend');

    if (title === null) {
      for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
          '<i style="background:' + ramp(grades[i]) + '"></i> '  +
          (grades[i + 1] ? '' + 'Not Implemented' + '<br>': 'Implemented'
        );
      }
    } else if (title) {
      div.innerHTML += '<p><b>' + title + '</b></p><br>';
      div.innerHTML += '<i style="background:#808080"></i> No data<br>';
      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
          '<i style="background:' + ramp(grades[i]) + '"></i> ' +
          grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }
    }

    return div;
  };

  legend.addTo(map);

}
