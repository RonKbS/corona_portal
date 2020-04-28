function getColorvents(d) {
  return d > 8000000 ? '#045a8d' :
    d > 1600000 ? '#2b8cbe' :
    d > 1000000 ? '#74a9cf' :
    d > 800000 ? '#bdc9e1' :
    d > 200000 ? '#dbf8ff' :
    d > 0 ? '#f1eef6' :
    '#ffffff00';
}


let ventilators_layer = () => {
  if (african_data._map) {
    map.removeLayer(african_data)
  }

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
  
  addLegend([0, 200000, 800000, 1000000, 1600000, 8000000], getColorvents, "People per ventilator");

}
