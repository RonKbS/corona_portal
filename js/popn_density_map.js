function getColordensity(d) {
  return d > 730 ? '#993404' :
    d > 190 ? '#d95f0e' :
    d > 80 ? '#fe9929' :
    d > 50 ? '#fed98e' :
    d > 20 ? '#ffffd4' :
    d > 0 ? '#fef0d9' :
    '#ffffff00';
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

  let legend_parent = document.getElementsByClassName("legend")[0]
  if (legend_parent.childNodes.length > 1) {
    legend_parent.removeChild(legend_parent.childNodes[1])
  }
  let legend_child = document.createElement("IMG")
  legend_child.setAttribute("src", "images/density_legend.png");
  legend_child.setAttribute("class", "density")
  legend_parent.appendChild(legend_child);

  // var legend = L.control({
  //   position: 'bottomright'
  // });
  //
  // legend.onAdd = function(map) {
  //   var div = L.DomUtil.create('div', 'info legend'),
  //     grades = [0, 20, 50, 80, 190, 730],
  //     labels = ['<strong> People/Sqkm </strong><br>'],
  //     from, to;
  //
  //   for (var i = 0; i < grades.length; i++) {
  //     from = grades[i];
  //     to = grades[i + 1];
  //
  //     labels.push(
  //       '<i style="background:' + getColordensity(from + 1) + '"> color </i> ' +
  //       from + (to ? '&ndash;' + to : '+'));
  //   }
  //
  //   div.innerHTML = labels.join('<br>');
  //   return div;
  // };
  //
  // legend.addTo(map);

}
