gid = "805631867"

let govt_intervention_layer = (element) => {
  console.log(element.id)
  axios.get(url)
    .then(responseArrs => {
      google_sheet_data = $.csv.toObjects(responseArrs.data);

      if (element.id === "govt") {
        let govt_intervention_obj = {}
        google_sheet_data.forEach(object_ => {
          govt_intervention_obj[object_["COUNTRY"]] = [
            object_["POP"],
            // object_["Intro"],
            // object_["Fiscal"],
            // object_["Monetary_and_Macro_financial"],
            object_["Exchange_rate_and_balance_of_payments"],
            object_["Fiscal2"],
            object_["Monetary"],
            object_["Exchange"],
            object_["Value"],
            // object_["Summary"],
            object_["SupportValue"],
            object_["GDP_PC"],
            object_["WageEmp"],
            object_["Cash"],
            object_["Credit"],
            object_["TaxDelDef"],
            object_["TaxCut"],
            object_["Interest_rate_cuts/liquidity_measures/other_monetary_measures"],
            object_["ImpExp"],
            object_["DigFinTran"]
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
            fillColor: '#E15B26'
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
                fillColor: '#E15B26'
              });
            });
          }
        }).addTo(map);

        african_data.eachLayer(function (layer) {
          let country_ = layer.feature.properties.COUNTRY;
          layer.bindPopup(
            '<strong>Country:</strong> ' + country_
            + '<br>' + '<strong>Population:</strong> ' + govt_intervention_obj[country_][0]
            // + '<br>' + '<strong>Introduction:</strong> ' + govt_intervention_obj[country_][1]
            // + '<br>' + '<strong>Fiscal Policy:</strong> ' + govt_intervention_obj[country_][2]
            // + '<br>' + '<strong>Monetary and Macro financial:</strong> ' + govt_intervention_obj[country_][3]
            + '<br>' + '<strong>Exchange rate and balance of payments:</strong> ' + govt_intervention_obj[country_][1]
            + '<br>' + '<strong>Fiscal:</strong> ' + govt_intervention_obj[country_][2]
            + '<br>' + '<strong>Monetary:</strong> ' + govt_intervention_obj[country_][3]
            + '<br>' + '<strong>Exchange:</strong> ' + govt_intervention_obj[country_][4]
            + '<br>' + '<strong>Value:</strong> ' + govt_intervention_obj[country_][5]
            // + '<br>' + '<strong>Summary:</strong> ' + govt_intervention_obj[country_][9]
            + '<br>' + '<strong>Support Value:</strong> ' + govt_intervention_obj[country_][6]
            + '<br>' + '<strong>GDP_PC:</strong> ' + govt_intervention_obj[country_][7]
            + '<br>' + '<strong>WageEmp:</strong> ' + govt_intervention_obj[country_][8]
            + '<br>' + '<strong>Cash:</strong> ' + govt_intervention_obj[country_][9]
            + '<br>' + '<strong>Credit:</strong> ' + govt_intervention_obj[country_][10]
            + '<br>' + '<strong>TaxDelDef:</strong> ' + govt_intervention_obj[country_][11]
            + '<br>' + '<strong>Tax Cut:</strong> ' + govt_intervention_obj[country_][12]
            + '<br>' + '<strong>Interest rate cuts/liquidity measures/other monetary measures:</strong> ' + govt_intervention_obj[country_][13]
            + '<br>' + '<strong>ImpExp:</strong> ' + govt_intervention_obj[country_][14]
            + '<br>' + '<strong>DigFinTran:</strong> ' + govt_intervention_obj[country_][15]
          );
          layer.on('mouseover', function (e) {
            this.openPopup();
          });
          layer.on('mouseout', function (e) {
            this.closePopup();
          });
        });
      } else if (element.id === "country") {
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
    })
}