
function getColordeaths(d) {
  return d > 3.90 ? '#fde725' :
    d > 0.09 ? '#5dc962' :
      d > 0.02 ? '#20908d' :
        d > 0.01 ? '#3a528b' :
          d > 0.00 ? '#440154' :
            d > 0 ? '#f1eef6' :
              '#ffffff00';
}


let deaths_concn_layer = () => {
  if (african_data._map) {
    map.removeLayer(african_data)
  }
  let deaths_concn_obj = {}
  google_sheet_data.forEach(object_ => {
    deaths_concn_obj[object_["COUNTRY"]] = [
      object_["POP"],
      object_["DEATHS"],
      object_["DEATHS_PER_100,000"]
    ]
  })

  african_data = L.geoJson(africa_data, {
    style: styledeaths
  }).addTo(map);

  african_data.eachLayer(function (layer) {
    let country_ = layer.feature.properties.COUNTRY;
    layer.bindPopup(
      '<strong>Country:</strong> ' + country_
      + '<br>' + '<strong>Population:</strong> ' + deaths_concn_obj[country_][0]
      + '<br>' + '<strong>Deaths:</strong> ' + deaths_concn_obj[country_][1]
      + '<br>' + '<strong>Deaths per 100,000 people:</strong> ' + deaths_concn_obj[country_][2]
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
      fillColor: getColordeaths(parseFloat(deaths_concn_obj[feature.properties.COUNTRY][2].split(",").join(""))),
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
  legend_child.setAttribute("src", "images/deaths_legend.png");
  legend_child.setAttribute("class", "deaths")
  legend_parent.appendChild(legend_child);
}
