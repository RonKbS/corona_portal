function getColorcases(d) {
  return  d > 4000 ? '#016c59' :
    d > 3999 ? '#016c59' :
    d > 1000 ? '#1c9099' :
    d > 999 ? '#1c9099' :
    d > 100 ? '#67a9cf' :
    d > 99 ? '#67a9cf' :
    d > 1 ? '#bdc9e1' :
    d > 0.9 ? '#bdc9e1' :
    d > 0 ? '#f6eff7' :
    d > -1 ? '#f6eff7' :
    d > null ? '#808080' :
    '#808080';
}


let cases_layer = (element) => {
  if (african_data._map) {
    map.removeLayer(african_data)
  }
  highlight_button(element)

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

  addLegend([0, 1, 100, 1000, 4000], getColorcases, 'Cases');
}
