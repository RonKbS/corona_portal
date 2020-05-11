
function add_layer(element) {
    if (african_data && african_data._map) {
      map.removeLayer(african_data)
    }
    highlight_button(element)
  
    let layer_text = element.text
    let initial_data_obj = {}

    google_sheet_data.forEach(object_ => {
        let layer_gsheet_keys = []
        layers_[layer_text]["gsheet_keys"].forEach(key_ => {
            layer_gsheet_keys.push(object_[key_])
        })
        initial_data_obj[object_["COUNTRY"]] = [
            object_["POP"],
            ...layer_gsheet_keys
        ]
    })
  
    african_data = L.geoJson(africa_data, {
      style: style_fn
    }).addTo(map);
  
    african_data.eachLayer(function(layer) {
      let country_ = layer.feature.properties.COUNTRY;
      let popup_info = []
      layers_[layer_text]["popup_text"].forEach((text_, index) => {
          popup_info.push(
            `<br><strong>${text_}:</strong>${initial_data_obj[country_][index]}`
          )
      })
      layer.bindPopup(
        `<strong>Country:</strong>${country_ + popup_info.join("")}`, {
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
  
    function style_fn(feature) {
        let length_ = initial_data_obj[feature.properties.COUNTRY].length
        return {
            fillColor: layers_[layer_text]["legend_fn"](
                parseFloat(initial_data_obj[feature.properties.COUNTRY][length_ - 1].split(",").join(""))
            ),
            weight: 1,
            opacity: 1,
            color: 'black',
            dashArray: '0',
            fillOpacity: 1
        };
    }
    addLegend(
      layers_[layer_text]["legend_array"], layers_[layer_text]["legend_fn"],
      layers_[layer_text]["popup_text"][layers_[layer_text]["popup_text"].length - 1]
    );
  }
