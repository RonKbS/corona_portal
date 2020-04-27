
function getColorHIV(d) {
  return d > 67 ? '#00441b' :
    d > 6 ? '#2a924a' :
      d > 3 ? '#7bc87c' :
        d > 2 ? '#caeac3' :
          d > 20 ? '#f7fcf5' :
            d > 0 ? '#f1eef6' :
              '#ffffff00';
}

let hiv_stats_layer = () => {
  if (african_data._map) {
    map.removeLayer(african_data)
  }

  let hiv_stats_obj = {}
  google_sheet_data.forEach(object_ => {
    hiv_stats_obj[object_["COUNTRY"]] = [
      object_["POP"],
      object_["HIV_rates"],
      object_["HIV_percentage"]
    ]
  })

  african_data = L.geoJson(africa_data, {
    style: styleHIV
  }).addTo(map);

  african_data.eachLayer(function (layer) {
    let country_ = layer.feature.properties.COUNTRY;
    layer.bindPopup(
      '<strong>Country:</strong> ' + country_
      + '<br>' + '<strong>Population:</strong> ' + hiv_stats_obj[country_][0]
      + '<br>' + '<strong>HIV rates:</strong> ' + hiv_stats_obj[country_][1]
      + '<br>' + '<strong>HIV percentage:</strong> ' + hiv_stats_obj[country_][2],
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

  function styleHIV(feature) {
    return {
      fillColor: getColorHIV(parseFloat(hiv_stats_obj[feature.properties.COUNTRY][2].split(",").join(""))),
      weight: 1,
      opacity: 1,
      color: 'black',
      dashArray: '0',
      fillOpacity: 1
    };
  }

  addLegend([0, 2, 3, 6, 67], getColorHIV, 'HIV Percentage');
}
