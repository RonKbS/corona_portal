function getColorHIV(d) {
  return d > 27.0 ? '#006837' :
  d > 26.9 ? '#006837' :
    d > 25.0 ? '#208f4a' :
    d > 24.9 ? '#208f4a' :
    d > 20.0 ? '#48af60' :
    d > 19.9 ? '#48af60' :
    d > 15.0 ? '#78c679' :
    d > 14.9 ? '#78c679' :
    d > 10.0 ? '#a9dc8e' :
    d > 9.9 ? '#a9dc8e' :
    d > 5.0 ? '#d7efaa' :
    d > 4.9 ? '#d7efaa' :
    d > 0.1 ? '#ffffcc' :
    d > 0 ? '#ffffcc' :
    '#808080';
}

let hiv_stats_layer = () => {
  if (african_data._map) {
    map.removeLayer(african_data)
  }

  let hiv_stats_obj = {}
  google_sheet_data.forEach(object_ => {
    hiv_stats_obj[object_["COUNTRY"]] = [
      object_["POP"],
      object_["HIV_rates"],
      object_["HIV_percentage"]
    ]
  })

  african_data = L.geoJson(africa_data, {
    style: styleHIV
  }).addTo(map);

  african_data.eachLayer(function(layer) {
    let country_ = layer.feature.properties.COUNTRY;
    layer.bindPopup(
      '<strong>Country:</strong> ' + country_ +
      '<br>' + '<strong>Population:</strong> ' + hiv_stats_obj[country_][0] +
      '<br>' + '<strong>HIV rates:</strong> ' + hiv_stats_obj[country_][1] +
      '<br>' + '<strong>HIV percentage:</strong> ' + hiv_stats_obj[country_][2], {
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

  function styleHIV(feature) {
    return {
      fillColor: getColorHIV(parseFloat(hiv_stats_obj[feature.properties.COUNTRY][2].split(",").join(""))),
      weight: 1,
      opacity: 1,
      color: 'black',
      dashArray: '0',
      fillOpacity: 1
    };
  }

  addLegend([0.1, 5.0, 10.0, 15.0, 20.0, 25.0, 27.0], getColorHIV, 'HIV Percentage');
}
