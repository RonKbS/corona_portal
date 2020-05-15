function getColordeaths(d) {
  return d > 400 ? '#006837' :
  d > 399 ? '#006837' :
    d > 300 ? '#31a354' :
    d > 299 ? '#31a354' :
    d > 100 ? '#78c679' :
    d > 99 ? '#78c679' :
    d > 1 ? '#c2e699' :
    d > 0.9 ? '#c2e699' :
    d > 0 ? '#ffffcc' :
    d > -1 ? '#ffffcc' :
    d > null ? '#808080' :
    '#808080';
}

let deaths_layer = (element) => {
  if (african_data._map) {
    map.removeLayer(african_data)
  }
  highlight_button(element)

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
  addLegend([0, 1, 100, 300, 400], getColordeaths, 'Deaths');
}
