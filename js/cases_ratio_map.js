function getColorcasesratio(d) {
  return d > 147 ? '#7a0177' :
    d > 120 ? '#7a0177' :
    d > 100 ? '#a50f82' :
    d > 80 ? '#cc268d' :
    d > 50 ? '#e9529b' :
    d > 30 ? '#f97ea8' :
    d > 10 ? '#fba9b6' :
    d > 5 ? '#fdcccb' :
    d > 1 ? '#fdcccb' :
    d > 0.1 ? '#feebe2' :
    d > 0 ? '#ffffff' :
    '#808080';
}

let cases_concn_layer = () => {
  if (african_data._map) {
    map.removeLayer(african_data)
  }
  let cases_concn_obj = {}
  google_sheet_data.forEach(object_ => {
    cases_concn_obj[object_["COUNTRY"]] = [
      object_["POP"],
      object_["CASES"],
      object_["CASES_PER_100,000"]
    ]
  })

  african_data = L.geoJson(africa_data, {
    style: stylecasesratio
  }).addTo(map);

  african_data.eachLayer(function(layer) {
    let country_ = layer.feature.properties.COUNTRY;
    layer.bindPopup(
      '<strong>Country:</strong> ' + country_ +
      '<br>' + '<strong>Population:</strong> ' + cases_concn_obj[country_][0] +
      '<br>' + '<strong>Cases:</strong> ' + cases_concn_obj[country_][1] +
      '<br>' + '<strong>Cases per 100,000 people:</strong> ' + cases_concn_obj[country_][2], {
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

  function stylecasesratio(feature) {
    return {
      fillColor: getColorcasesratio(parseFloat(cases_concn_obj[feature.properties.COUNTRY][2].split(",").join(""))),
      weight: 1,
      opacity: 1,
      color: 'black',
      dashArray: '0',
      fillOpacity: 1
    };
  }
  addLegend([0.1, 1, 10, 30, 50, 80, 100, 147], getColorcasesratio, 'Cases per 100,000 people');
}
