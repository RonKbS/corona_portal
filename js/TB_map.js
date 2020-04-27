
function getColorTB(d) {
  return d > 0.40 ? '#810f7c' :
    d > 0.20 ? '#8856a7' :
    d > 0.11 ? '#8c96c6' :
    d > 0.08 ? '#b3cde3' :
    d > 0.04 ? '#edf8fb' :
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
        + '<br>' + '<strong>TB percentage:</strong> ' + tb_stats_obj[country_][2],
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

    
  addLegend([0, 0.04, 0.08, 0.11, 0.20, 0.40], getColorTB, "TB Percentage");
  }
