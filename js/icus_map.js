function getColorICU(d) {
  return d > 30000000 ? '#67000d' :
    d > 29999999 ? '#67000d' :
    d > 10000000 ? '#b31217' :
    d > 9999999 ? '#b31217' :
    d > 3000000 ? '#de2924' :
    d > 2999999 ? '#de2924' :
    d > 1000000 ? '#f7573e' :
    d > 999999 ? '#f7573e' :
    d > 500000 ? '#fc8666' :
    d > 499999 ? '#fc8666' :
    d > 300000 ? '#fcb398' :
    d > 299999 ? '#fcb398' :
    d > 100000 ? '#feddcd' :
    d > 99999 ? '#feddcd' :
    d > 9000 ? '#fff5f0' :
    d > 8999 ? '#fff5f0' :
    '#808080';
}

let icus_layer = () => {
  if (african_data._map) {
    map.removeLayer(african_data)
  }
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
  addLegend([9000, 100000, 300000, 500000, 1000000, 3000000, 10000000, 30000000], getColorICU, 'People per ICU Bed');
}
