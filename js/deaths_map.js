function getColordeaths(d) {
  return d > 400 ? '#00441b' :
  d > 399 ? '#00441b' :
    d > 300 ? '#137e3a' :
    d > 200 ? '#3da75a' :
    d > 100 ? '#7bc87c' :
    d > 50 ? '#b2e0ab' :
    d > 10 ? '#ddf2d7' :
    d > 5 ? '#f7fcf5' :
    d > 1 ? '#f7fcf5' :
    d > 0 ? '#ffffff' :
    '#808080';
}

let deaths_layer = () => {
  if (african_data._map) {
    map.removeLayer(african_data)
  }
  let deaths_obj = {}
  google_sheet_data.forEach(object_ => {
    deaths_obj[object_["COUNTRY"]] = [
      object_["POP"],
      object_["DEATHS"]
    ]
  })

  african_data = L.geoJson(africa_data, {
    style: styledeaths
  }).addTo(map);

  african_data.eachLayer(function(layer) {
    let country_ = layer.feature.properties.COUNTRY;
    layer.bindPopup(
      '<strong>Country:</strong> ' + country_ +
      '<br>' + '<strong>Population:</strong> ' + deaths_obj[country_][0] +
      '<br>' + '<strong>Deaths:</strong> ' + deaths_obj[country_][1], {
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

  function styledeaths(feature) {
    return {
      fillColor: getColordeaths(parseFloat(deaths_obj[feature.properties.COUNTRY][1].split(",").join(""))),
      weight: 1,
      opacity: 1,
      color: 'black',
      dashArray: '0',
      fillOpacity: 1
    };
  }
  addLegend([1, 10, 50, 100, 200, 300, 400], getColordeaths, 'Deaths');
}
