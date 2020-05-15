function getColorelderly(d) {
  return d > 11 ? '#253494' :
    d > 10 ? '#253494' :
    d > 8 ? '#2c7fb8' :
    d > 7 ? '#2c7fb8' :
    d > 4 ? '#41b6c4' :
    d > 3.9 ? '#41b6c4' :
    d > 3 ? '#a1dab4' :
    d > 2.9 ? '#a1dab4' :
    d > 2 ? '#ffffcc' :
    d > 1.9 ? '#ffffcc' :
    d > null ? '#808080' :
    '#808080';
}

let elderly_stats_layer = (element) => {
  if (african_data._map) {
    map.removeLayer(african_data)
  }
  highlight_button(element)

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

  addLegend([2, 3, 4, 8, 11], getColorelderly, 'Elderly Percentage');
}
