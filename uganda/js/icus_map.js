function getColorICU(d) {
  return d > 20000000 ? '#67000d' :
    d > 19999999 ? '#67000d' :
    d > 10000000 ? '#d42020' :
    d > 9999999 ? '#d42020' :
    d > 1000000 ? '#fc7050' :
    d > 999999 ? '#fc7050' :
    d > 500000 ? '#fdbea5' :
    d > 499999 ? '#fdbea5' :
    d > 9000 ? '#fff5f0' :
    d > 8999 ? '#fff5f0' :
    '#808080';
}

let icus_layer = (element) => {
  if (african_data._map) {
    map.removeLayer(african_data)
  }
  highlight_button(element)

  let icus_obj = {}
  google_sheet_data.forEach(object_ => {
    icus_obj[object_["COUNTRY"]] = [
      object_["POP"],
      object_["ICU"],
      object_["PEOPLE_PER_ICU"]
    ]
  })

  african_data = L.geoJson(africa_data, {
    style: styleICU
  }).addTo(map);

  african_data.eachLayer(function(layer) {
    let country_ = layer.feature.properties.COUNTRY;
    layer.bindPopup(
      '<strong>Country:</strong> ' + country_ +
      '<br>' + '<strong>Population:</strong> ' + icus_obj[country_][0] +
      '<br>' + '<strong>ICU Beds:</strong> ' + icus_obj[country_][1] +
      '<br>' + '<strong>People per ICU:</strong> ' + icus_obj[country_][2], {
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

  function styleICU(feature) {
    return {
      fillColor: getColorICU(parseFloat(icus_obj[feature.properties.COUNTRY][2].split(",").join(""))),
      weight: 1,
      opacity: 1,
      color: 'black',
      dashArray: '0',
      fillOpacity: 1
    };
  }
  addLegend([9000, 500000, 1000000, 10000000, 20000000], getColorICU, 'People per ICU Bed');
}
