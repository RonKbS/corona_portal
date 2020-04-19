
function getColorfiscal(d) {
  return d > 1 ? '#00441b' :
    d > 0 ? '#808080' :
    '#ffffff00';
}

let govt_intervention_layer = (element) => {
  gid = "805631867"
  url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${gid}`
  axios.get(url)
    .then(responseArrs => {
      google_sheet_data = $.csv.toObjects(responseArrs.data);

      // the wording in these is alot and makes the map move down.
      // we should instead have a popup to the left corner of the page next to the sidebar
      // with these words
      if (element.id === "fiscal") {
        let govt_intervention_obj = {}
        google_sheet_data.forEach(object_ => {
          govt_intervention_obj[object_["COUNTRY"]] = [
            object_["POP"],
            object_["Intro"],
            object_["Fiscal"],
            object_["Fiscal2"]
          ]
        })

        if (african_data._map) {
          map.removeLayer(african_data)
        }

        african_data = L.geoJson(africa_data, {
          style: stylefiscal
        }).addTo(map);

        african_data.eachLayer(function (layer) {
          let country_ = layer.feature.properties.COUNTRY;
          layer.bindPopup(
            '<strong>Country:</strong> ' + country_
            + '<br>' + '<strong>Population:</strong> ' + govt_intervention_obj[country_][0]
            + '<br>' + '<strong>Introduction:</strong> ' + govt_intervention_obj[country_][1]
            + '<br>' + '<strong>Fiscal Policy:</strong> ' + govt_intervention_obj[country_][2]
            + '<br>' + '<strong>Fiscal:</strong> ' + govt_intervention_obj[country_][3]
          );
          layer.on('mouseover', function (e) {
            this.openPopup();
          });
          layer.on('mouseout', function (e) {
            this.closePopup();
          });
        });
        function stylefiscal(feature) {
          return {
            fillColor: getColorfiscal(parseFloat(govt_intervention_obj[feature.properties.COUNTRY][3].split(",").join(""))),
            weight: 1,
            opacity: 1,
            color: 'black',
            dashArray: '0',
            fillOpacity: 1
          };
        }
      }
    else if (element.id === "monetary") {
        let govt_intervention_obj = {}
        google_sheet_data.forEach(object_ => {
          govt_intervention_obj[object_["COUNTRY"]] = [
            object_["POP"],
            object_["Intro"],
            object_["Monetary_and_Macro_financial"],
            object_["Monetary"]
          ]
        })

        if (african_data._map) {
          map.removeLayer(african_data)
        }

        african_data = L.geoJson(africa_data, {
          style: stylefiscal
        }).addTo(map);

        african_data.eachLayer(function (layer) {
          let country_ = layer.feature.properties.COUNTRY;
          layer.bindPopup(
            '<strong>Country:</strong> ' + country_
            + '<br>' + '<strong>Population:</strong> ' + govt_intervention_obj[country_][0]
            + '<br>' + '<strong>Introduction:</strong> ' + govt_intervention_obj[country_][1]
            + '<br>' + '<strong>Monetary and Macro financial:</strong> ' + govt_intervention_obj[country_][2]
            + '<br>' + '<strong>Monetary:</strong> ' + govt_intervention_obj[country_][3]
          );
          layer.on('mouseover', function (e) {
            this.openPopup();
          });
          layer.on('mouseout', function (e) {
            this.closePopup();
          });
        });
        function stylefiscal(feature) {
          return {
            fillColor: getColorfiscal(parseFloat(govt_intervention_obj[feature.properties.COUNTRY][3].split(",").join(""))),
            weight: 1,
            opacity: 1,
            color: 'black',
            dashArray: '0',
            fillOpacity: 1
          };
        }
      }
    else if (element.id === "exchange") {
        let govt_intervention_obj = {}
        google_sheet_data.forEach(object_ => {
          govt_intervention_obj[object_["COUNTRY"]] = [
            object_["POP"],
            object_["Intro"],
            object_["Exchange_rate_and_balance_of_payments"],
            object_["Exchange"]
          ]
        })

        if (african_data._map) {
          map.removeLayer(african_data)
        }

        african_data = L.geoJson(africa_data, {
          style: stylefiscal
        }).addTo(map);

        african_data.eachLayer(function (layer) {
          let country_ = layer.feature.properties.COUNTRY;
          layer.bindPopup(
            '<strong>Country:</strong> ' + country_
            + '<br>' + '<strong>Population:</strong> ' + govt_intervention_obj[country_][0]
            + '<br>' + '<strong>Introduction:</strong> ' + govt_intervention_obj[country_][1]
            + '<br>' + '<strong>Exchange rate and balance of payments:</strong> ' + govt_intervention_obj[country_][2]
            + '<br>' + '<strong>Exchange:</strong> ' + govt_intervention_obj[country_][3]
          );
          layer.on('mouseover', function (e) {
            this.openPopup();
          });
          layer.on('mouseout', function (e) {
            this.closePopup();
          });
        });
        function stylefiscal(feature) {
          return {
            fillColor: getColorfiscal(parseFloat(govt_intervention_obj[feature.properties.COUNTRY][3].split(",").join(""))),
            weight: 1,
            opacity: 1,
            color: 'black',
            dashArray: '0',
            fillOpacity: 1
          };
        }
      }
      else if (element.id === "country") {
        let country_intervention_obj = {}
        google_sheet_data.forEach(object_ => {
          country_intervention_obj[object_["COUNTRY"]] = [
            object_["POP"],
            object_["Humanitarian_exemption"],
            object_["Lockdown"],
            object_["Movement_restrictions"],
            object_["Public_health_measures"],
            object_["Social_and_economic_measures"],
            object_["Social_distancing"],
          ]
        })

        if (african_data._map) {
          map.removeLayer(african_data)
        }

        african_data = L.geoJson(africa_data, {
          style: {
            weight: 2,
            opacity: 2,
            color: '#989898',
            fillOpacity: 2.5,
            fillColor: '#b30000'
          },
          onEachFeature: function (feature, layer) {
            layer.on('mouseover', function () {
              this.setStyle({
                weight: 2,
                opacity: 2,
                color: '#989898',
                fillOpacity: 10,
                fillColor: '#989898'
              });
            });
            layer.on('mouseout', function () {
              this.setStyle({
                weight: 2,
                opacity: 2,
                color: '#989898',
                fillOpacity: 2.5,
                fillColor: '#b30000'
              });
            });
          }
        }).addTo(map);

        african_data.eachLayer(function (layer) {
          let country_ = layer.feature.properties.COUNTRY;
          layer.bindPopup(
            '<strong>Country:</strong> ' + country_
            + '<br>' + '<strong>Population:</strong> ' + country_intervention_obj[country_][0]
            + '<br>' + '<strong>Humanitarian Exemption:</strong> ' + country_intervention_obj[country_][1]
            + '<br>' + '<strong>Lock Down:</strong> ' + country_intervention_obj[country_][2]
            + '<br>' + '<strong>Movement Restrictions:</strong> ' + country_intervention_obj[country_][3]
            + '<br>' + '<strong>Public health measures:</strong> ' + country_intervention_obj[country_][4]
            + '<br>' + '<strong>Social and economic measures:</strong> ' + country_intervention_obj[country_][5]
            + '<br>' + '<strong>Social distancing:</strong> ' + country_intervention_obj[country_][6]
          );
          layer.on('mouseover', function (e) {
            this.openPopup();
          });
          layer.on('mouseout', function (e) {
            this.closePopup();
          });
        });
      }

      let legend_parent = document.getElementsByClassName("legend")[0]
      if (legend_parent.childNodes.length > 1) {
        legend_parent.removeChild(legend_parent.childNodes[1])
      }
      // let legend_child = document.createElement("IMG")
      // legend_child.setAttribute("src", "images/fiscal_legend.png");
      // legend_child.setAttribute("class", "fiscal")
      // legend_parent.appendChild(legend_child);
    })
}
