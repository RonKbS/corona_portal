function getColordensity(d) {
  return d > 700 ? '#993404' :
    d > 699 ? '#993404' :
    d > 300 ? '#d95f0e' :
    d > 299 ? '#d95f0e' :
    d > 100 ? '#fe9929' :
    d > 99 ? '#fe9929' :
    d > 20 ? '#fed98e' :
    d > 19 ? '#fed98e' :
    d > 3 ? '#ffffd4' :
    d > 2.9 ? '#ffffd4' :
    '#808080';
}

let popn_density_layer = (element) => {
  if (african_data._map) {
    map.removeLayer(african_data)
  }
  highlight_button(element)

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
  addLegend([3, 20, 100, 400, 700], getColordensity, "Population Density <br> (people per sq km)");
}
