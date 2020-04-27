
function getColordeaths(d) {
  return d > 250 ? '#006837' :
    d > 6 ? '#31a354' :
      d > 2 ? '#78c679' :
        d > 1 ? '#c2e699' :
          d > 0 ? '#ffffcc' :
              '#ffffff00';
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

  african_data.eachLayer(function (layer) {
    let country_ = layer.feature.properties.COUNTRY;
    layer.bindPopup(
      '<strong>Country:</strong> ' + country_
      + '<br>' + '<strong>Population:</strong> ' + deaths_obj[country_][0]
      + '<br>' + '<strong>Deaths:</strong> ' + deaths_obj[country_][1],
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
  addLegend([0, 1, 2, 6, 250], getColordeaths, 'Deaths');
}
