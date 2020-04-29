function getColorelderly(d) {
  return d > 11 ? '#050505' :
    d > 10 ? '#050505' :
    d > 8 ? '#424242' :
    d > 7 ? '#424242' :
    d > 6 ? '#808080' :
    d > 5 ? '#808080' :
    d > 4 ? '#bdbdbd' :
    d > 3 ? '#bdbdbd' :
    d > 2 ? '#ffffff' :
    d > 0 ? '#ffffff' :
    '#808080';
}

let elderly_stats_layer = () => {
  if (african_data._map) {
    map.removeLayer(african_data)
  }
  let elderly_stats_obj = {}
  google_sheet_data.forEach(object_ => {
    elderly_stats_obj[object_["COUNTRY"]] = [
      object_["POP"],
      object_["Elderly_rates"],
      object_["Elderly_percentage"]
    ]
  })

  african_data = L.geoJson(africa_data, {
    style: styleelderly
  }).addTo(map);

  african_data.eachLayer(function(layer) {
    let country_ = layer.feature.properties.COUNTRY;
    layer.bindPopup(
      '<strong>Country:</strong> ' + country_ +
      '<br>' + '<strong>Population:</strong> ' + elderly_stats_obj[country_][0] +
      '<br>' + '<strong>Elderly rates:</strong> ' + elderly_stats_obj[country_][1] +
      '<br>' + '<strong>Elderly percentage:</strong> ' + elderly_stats_obj[country_][2], {
        autoPan: false
      }
    );
    layer.on('mouseover', function(e) {
      this.openPopup();
    });
    layer.on('mouseout', function(e) {
      this.closePopup();
    });
  });

  function styleelderly(feature) {
    return {
      fillColor: getColorelderly(parseFloat(elderly_stats_obj[feature.properties.COUNTRY][2].split(",").join(""))),
      weight: 1,
      opacity: 1,
      color: 'black',
      dashArray: '0',
      fillOpacity: 1
    };
  }

  addLegend([2, 4, 6, 8, 11], getColorelderly, 'Elderly Percentage');
}
