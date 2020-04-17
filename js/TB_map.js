
function getColorTB(d) {
  return d > 86 ? '#404040' :
    d > 21 ? '#bababa' :
    d > 17 ? '#f1eef6' :
    d > 16 ? '#f4a582' :
    d > 10 ? '#ca0020' :
    d > 0 ? '#ffffff' :
    '#ffffff00';
}

let tb_stats_layer = () => {
  if (african_data._map) {
    map.removeLayer(african_data)
  }
  let tb_stats_obj = {}
  google_sheet_data.forEach(object_ => {
      tb_stats_obj[object_["COUNTRY"]] = [
        object_["POP"],
        object_["TB_rates"],
        object_["TB_percentage"]
      ]
    })

    african_data = L.geoJson(africa_data, {
      style: styleTB
    }).addTo(map);

    african_data.eachLayer(function (layer) {
      let country_ = layer.feature.properties.COUNTRY;
      layer.bindPopup(
        '<strong>Country:</strong> ' + country_
        + '<br>' + '<strong>Population:</strong> ' + tb_stats_obj[country_][0]
        + '<br>' + '<strong>TB rates:</strong> ' + tb_stats_obj[country_][1]
        + '<br>' + '<strong>TB percentage:</strong> ' + tb_stats_obj[country_][2]
      );
      layer.on('mouseover', function (e) {
        this.openPopup();
      });
      layer.on('mouseout', function (e) {
        this.closePopup();
      });
    });

    function styleTB(feature) {
      return {
        fillColor: getColorTB(parseFloat(tb_stats_obj[feature.properties.COUNTRY][2].split(",").join(""))),
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
    legend_child.setAttribute("src", "images/TB_legend.png");
    legend_child.setAttribute("class", "TB")
    legend_parent.appendChild(legend_child);
  }