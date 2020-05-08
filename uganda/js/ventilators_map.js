function getColorvents(d) {
  return   d > 10000000 ? '#08306b' :
    d > 9999999 ? '#08306b' :
    d > 2000000 ? '#2879b9' :
    d > 1999999 ? '#2879b9' :
    d > 1000000 ? '#73b3d8' :
    d > 999999 ? '#73b3d8' :
    d > 500000 ? '#c8ddf0' :
    d > 499999 ? '#c8ddf0' :
    d > 9000 ? '#f7fbff' :
    d > 8999 ? '#f7fbff' :
    '#808080';
}

let ventilators_layer = (element) => {
  if (african_data._map) {
    map.removeLayer(african_data)
  }
  highlight_button(element)

  let ventilators_obj = {}
  google_sheet_data.forEach(object_ => {
    ventilators_obj[object_["COUNTRY"]] = [
      object_["POP"],
      object_["VENTILATORS"],
      object_["PEOPLE_PER_VENT"]
    ]
  })

  african_data = L.geoJson(africa_data, {
    style: stylevents
  }).addTo(map);


  african_data.eachLayer(function(layer) {
    let country_ = layer.feature.properties.COUNTRY;
    layer.bindPopup(
      '<strong>Country:</strong> ' + country_ +
      '<br>' + '<strong>Population:</strong> ' + ventilators_obj[country_][0] +
      '<br>' + '<strong>Ventilators:</strong> ' + ventilators_obj[country_][1] +
      '<br>' + '<strong>People per ventilator:</strong> ' + ventilators_obj[country_][2], {
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


  function stylevents(feature) {
    return {
      fillColor: getColorvents(parseFloat(ventilators_obj[feature.properties.COUNTRY][2].split(",").join(""))),
      weight: 1,
      opacity: 1,
      color: 'black',
      dashArray: '0',
      fillOpacity: 1
    };
  }
  addLegend([9000, 500000, 1000000, 2000000, 10000000], getColorvents, "People per ventilator");
}
