

function getColorICU(d) {
  return d > 29900000 ? '#b30000' :
    d > 2500000 ? '#e34a33' :
      d > 800000 ? '#fc8d59' :
        d > 400000 ? '#fdbb84' :
          d > 200000 ? '#fdd49e' :
            d > 0 ? '#fef0d9' :
              '#ffffff00';
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

  african_data.eachLayer(function (layer) {
    let country_ = layer.feature.properties.COUNTRY;
    layer.bindPopup(
      '<strong>Country:</strong> ' + country_
      + '<br>' + '<strong>Population:</strong> ' + icus_obj[country_][0]
      + '<br>' + '<strong>ICU Beds:</strong> ' + icus_obj[country_][1]
      + '<br>' + '<strong>People per ICU:</strong> ' + icus_obj[country_][2],
      {
        autoPan: false
      }
    );
    layer.on('mouseover', function (e) {
      this.openPopup();
    });
    layer.on('mouseout', function (e) {
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
  addLegend([0, 200000, 400000, 800000, 2500000, 29900000], getColorICU, 'People per ICU Bed');
}
