
function getColorvulnerable(d) {
  return d > 12.94 ? '#2b83ba' :
    d > 0.27 ? '#abdda4' :
      d > 0.19 ? '#ffffbf' :
        d > 0.16 ? '#fdae61' :
          d > 0.10 ? '#d7191c' :
            d > 0 ? '#f1eef6' :
              '#ffffff00';
}

let vulnerable_stats_layer = () => {
  if (african_data._map) {
    map.removeLayer(african_data)
  }
  let vulnerable_stats_obj = {}
  google_sheet_data.forEach(object_ => {
    vulnerable_stats_obj[object_["COUNTRY"]] = [
      object_["POP"],
      object_["Vulnerable_rates"],
      object_["Vulnerable_percentage"]
    ]
  })

  african_data = L.geoJson(africa_data, {
    style: stylevulnerable
  }).addTo(map);

  african_data.eachLayer(function (layer) {
    let country_ = layer.feature.properties.COUNTRY;
    layer.bindPopup(
      '<strong>Country:</strong> ' + country_
      + '<br>' + '<strong>Population:</strong> ' + vulnerable_stats_obj[country_][0]
      + '<br>' + '<strong>Vulnerables with known HIV/AIDS $ TB cases rates:</strong> ' + vulnerable_stats_obj[country_][1]
      + '<br>' + '<strong>Vulnerables with known HIV/AIDS $ TB cases percentage:</strong> ' + vulnerable_stats_obj[country_][2]
    );
    layer.on('mouseover', function (e) {
      this.openPopup();
    });
    layer.on('mouseout', function (e) {
      this.closePopup();
    });
  });

  function stylevulnerable(feature) {
    return {
      fillColor: getColorvulnerable(parseFloat(vulnerable_stats_obj[feature.properties.COUNTRY][2].split(",").join(""))),
      weight: 1,
      opacity: 1,
      color: 'black',
      dashArray: '0',
      fillOpacity: 1
    };
  }

  let legend_parent = document.getElementsByClassName("legend")[0]
  if (legend_parent.childNodes.length > 1) {
    legend_parent.removeChild(legend_parent.childNodes[1])
  }
  let legend_child = document.createElement("IMG")
  legend_child.setAttribute("src", "images/vulnerable_legend.png");
  legend_child.setAttribute("class", "vulnerable")
  legend_parent.appendChild(legend_child);
}

