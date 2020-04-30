function getColorHIV(d) {
  return d > 20.0 ? '#00441b' :
    d > 19.9 ? '#00441b' :
    d > 10.0 ? '#2a924a' :
    d > 9.9 ? '#2a924a' :
    d > 5.0 ? '#7bc87c' :
    d > 5.9 ? '#7bc87c' :
    d > 2.5 ? '#caeac3' :
    d > 2.4 ? '#caeac3' :
    d > 0.1 ? '#f7fcf5' :
    d > 0 ? '#f7fcf5' :
    d > null ? '#f7fcf5' :
    '#808080';
}

let hiv_stats_layer = (element) => {
  if (african_data._map) {
    map.removeLayer(african_data)
  }
  highlight_button(element)

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

  addLegend([0.1, 2.5, 5.0, 10.0, 20.0], getColorHIV, 'HIV Percentage');
}
