function getColordensity(d) {
  return  d > 750 ? '#993404' :
    d > 749 ? '#993404' :
    d > 500 ? '#c4500a' :
    d > 499 ? '#c4500a' :
    d > 400 ? '#e67217' :
    d > 399 ? '#e67217' :
    d > 300 ? '#fe9929' :
    d > 299 ? '#fe9929' :
    d > 200 ? '#fec46c' :
    d > 199 ? '#fec46c' :
    d > 100 ? '#ffe6a5' :
    d > 99 ? '#ffe6a5' :
    d > 1 ? '#ffffd4' :
    d > 0.1 ? '#ffffd4' :
    '#808080';
}

let popn_density_layer = () => {
  if (african_data._map) {
    map.removeLayer(african_data)
  }
  let popn_density_obj = {}
  google_sheet_data.forEach(object_ => {
    popn_density_obj[object_["COUNTRY"]] = [
      object_["POP"],
      object_["DENSITY"]
    ]
  })

  african_data = L.geoJson(africa_data, {
    style: styledensity
  }).addTo(map);

  african_data.eachLayer(function(layer) {
    let country_ = layer.feature.properties.COUNTRY;
    layer.bindPopup(
      '<strong>Country:</strong> ' + country_ +
      '<br>' + '<strong>Population:</strong> ' + popn_density_obj[country_][0] +
      '<br>' + '<strong>Population Density:</strong> ' + popn_density_obj[country_][1], {
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

  function styledensity(feature) {
    return {
      fillColor: getColordensity(parseFloat(popn_density_obj[feature.properties.COUNTRY][1].split(",").join(""))),
      weight: 1,
      opacity: 1,
      color: 'black',
      dashArray: '0',
      fillOpacity: 1
    };
  }
  addLegend([1, 100, 200, 300, 400, 500, 750], getColordensity, "Population Density <br> (people per sq km)");
}
