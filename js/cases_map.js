function getColorcases(d) {
  return d > 2000 ? '#016c59' :
    d > 250 ? '#1c9099' :
    d > 50 ? '#67a9cf' :
    d > 20 ? '#bdc9e1' :
    d > 10 ? '#f6eff7' :
    d > 0 ? '#f0f5f7' :
    '#ffffff00';
}


let cases_layer = () => {
  if (african_data._map) {
    map.removeLayer(african_data)
  }
  let cases_obj = {}
  google_sheet_data.forEach(object_ => {
    cases_obj[object_["COUNTRY"]] = [
      object_["POP"],
      object_["CASES"]
    ]
  })

  african_data = L.geoJson(africa_data, {
    style: stylecases
  }).addTo(map);

  african_data.eachLayer(function(layer) {
    let country_ = layer.feature.properties.COUNTRY;
    layer.bindPopup(
      '<strong>Country:</strong> ' + country_ +
      '<br>' + '<strong>Population:</strong> ' + cases_obj[country_][0] +
      '<br>' + '<strong>Cases:</strong> ' + cases_obj[country_][1], {
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

  function stylecases(feature) {
    return {
      fillColor: getColorcases(parseFloat(cases_obj[feature.properties.COUNTRY][1].split(",").join(""))),
      weight: 1,
      opacity: 1,
      color: 'black',
      dashArray: '0',
      fillOpacity: 1
    };
  }

  addLegend([0, 10, 20, 50, 250, 2000], getColorcases, 'Cases');
}
