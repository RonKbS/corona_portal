function getColorcases(d) {
  return  d > 4500 ? '#016c59' :
    d > 4499 ? '#016c59' :
    d > 3000 ? '#1d905d' :
    d > 2999 ? '#1d905d' :
    d > 2000 ? '#3fad76' :
    d > 1999 ? '#3fad76' :
    d > 1000 ? '#66c2a4' :
    d > 999 ? '#66c2a4' :
    d > 500 ? '#99d8ce' :
    d > 499 ? '#99d8ce' :
    d > 100 ? '#b6dae2' :
    d > 99 ? '#b6dae2' :
    d > 1 ? '#bdc9e1' :
    d > 0.1 ? '#bdc9e1' :
    '#808080';
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

  addLegend([1, 100, 500, 1000, 2000, 3000, 4500], getColorcases, 'Cases');
}
