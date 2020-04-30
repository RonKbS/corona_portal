function getColordeathsratio(d) {
  return d > 1.0 ? '#bd0026' :
  d > 0.9 ? '#bd0026' :
    d > 0.5 ? '#f03b20' :
    d > 0.49 ? '#f03b20' :
    d > 0.2 ? '#fd8d3c' :
    d > 0.19 ? '#fd8d3c' :
    d > 0.1 ? '#fecc5c' :
    d > 0.09 ? '#fecc5c' :
    d > 0 ? '#ffffb2' :
    d > -1 ? '#ffffb2' :
    d > null ? '#808080' :
    '#808080';
}

let deaths_concn_layer = (element) => {
  if (african_data._map) {
    map.removeLayer(african_data)
  }
  highlight_button(element)

  let deaths_concn_obj = {}
  google_sheet_data.forEach(object_ => {
    deaths_concn_obj[object_["COUNTRY"]] = [
      object_["POP"],
      object_["DEATHS"],
      object_["DEATHS_PER_100,000"]
    ]
  })

  african_data = L.geoJson(africa_data, {
    style: styledeathsratio
  }).addTo(map);

  african_data.eachLayer(function(layer) {
    let country_ = layer.feature.properties.COUNTRY;
    layer.bindPopup(
      '<strong>Country:</strong> ' + country_ +
      '<br>' + '<strong>Population:</strong> ' + deaths_concn_obj[country_][0] +
      '<br>' + '<strong>Deaths:</strong> ' + deaths_concn_obj[country_][1] +
      '<br>' + '<strong>Deaths per 100,000 people:</strong> ' + deaths_concn_obj[country_][2], {
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

  function styledeathsratio(feature) {
    return {
      fillColor: getColordeathsratio(parseFloat(deaths_concn_obj[feature.properties.COUNTRY][2].split(",").join(""))),
      weight: 1,
      opacity: 1,
      color: 'black',
      dashArray: '0',
      fillOpacity: 1
    };
  }

  addLegend([0, 0.1, 0.2, 0.5, 1.0], getColordeathsratio, "Death's per 100,000 people");
}
