function getColorcasesratio(d) {
  return d > 140 ? '#980043' :
    d > 139 ? '#980043' :
    d > 100 ? '#dd1c77' :
    d > 99 ? '#dd1c77' :
    d > 10 ? '#df65b0' :
    d > 9.9 ? '#df65b0' :
    d > 1 ? '#d7b5d8' :
    d > 0.9 ? '#d7b5d8' :
    d > 0 ? '#f1eef6' :
    d > -1 ? '#f1eef6' :
    d > null ? '#808080' :
    '#808080';
}

let cases_concn_layer = (element) => {
  if (african_data._map) {
    map.removeLayer(african_data)
  }
  highlight_button(element)

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
  addLegend([0, 1, 10, 100, 140], getColorcasesratio, 'Cases per 100,000 people');
}
