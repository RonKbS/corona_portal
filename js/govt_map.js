gid = "805631867"

let govt_intervention_layer = () => {
axios.get(url)
  .then(responseArrs => {
    ventilators_data = $.csv.toObjects(responseArrs.data);
    let ventilators_obj = {}
    ventilators_data.forEach(object_ => {
      ventilators_obj[object_["COUNTRY"]] = [
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
      onEachFeature: function(feature, layer) {
        layer.on('mouseover', function() {
          this.setStyle({
            weight: 2,
            opacity: 2,
            color: '#989898',
            fillOpacity: 10,
            fillColor: '#989898'
          });
        });
        layer.on('mouseout', function() {
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
        + '<br>' + '<strong>Population:</strong> ' + ventilators_obj[country_][0]
        // + '<br>' + '<strong>Introduction:</strong> ' + ventilators_obj[country_][1]
        // + '<br>' + '<strong>Fiscal Policy:</strong> ' + ventilators_obj[country_][2]
        // + '<br>' + '<strong>Monetary and Macro financial:</strong> ' + ventilators_obj[country_][3]
        + '<br>' + '<strong>Exchange rate and balance of payments:</strong> ' + ventilators_obj[country_][1]
        + '<br>' + '<strong>Fiscal:</strong> ' + ventilators_obj[country_][2]
        + '<br>' + '<strong>Monetary:</strong> ' + ventilators_obj[country_][3]
        + '<br>' + '<strong>Exchange:</strong> ' + ventilators_obj[country_][4]
        + '<br>' + '<strong>Value:</strong> ' + ventilators_obj[country_][5]
        // + '<br>' + '<strong>Summary:</strong> ' + ventilators_obj[country_][9]
        + '<br>' + '<strong>Support Value:</strong> ' + ventilators_obj[country_][6]
        + '<br>' + '<strong>GDP_PC:</strong> ' + ventilators_obj[country_][7]
        + '<br>' + '<strong>WageEmp:</strong> ' + ventilators_obj[country_][8]
        + '<br>' + '<strong>Cash:</strong> ' + ventilators_obj[country_][9]
        + '<br>' + '<strong>Credit:</strong> ' + ventilators_obj[country_][10]
        + '<br>' + '<strong>TaxDelDef:</strong> ' + ventilators_obj[country_][11]
        + '<br>' + '<strong>Tax Cut:</strong> ' + ventilators_obj[country_][12]
        + '<br>' + '<strong>Interest rate cuts/liquidity measures/other monetary measures:</strong> ' + ventilators_obj[country_][13]
        + '<br>' + '<strong>ImpExp:</strong> ' + ventilators_obj[country_][14]
        + '<br>' + '<strong>DigFinTran:</strong> ' + ventilators_obj[country_][15]
      );
      layer.on('mouseover', function (e) {
        this.openPopup();
      });
      layer.on('mouseout', function (e) {
        this.closePopup();
      });
    });
  })
}