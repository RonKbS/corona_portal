let long_id = "1tRF8gjyRd0oA2sSpTKmZqambggZzUM0YiED6KqF8H8M"
let gid = "805631867"
let url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${gid}`

let map = L.map('map', {
  minZoom: 3.4
}).setView([1.8, -10.24], 2);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);

let african_data = L.geoJson(africa_data, {
  style: {
    weight: 2,
    opacity: 2,
    color: '#989898',
    fillOpacity: 2.5,
    fillColor: '#e84e5d'
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
        fillColor: '#e84e5d'
      });
    });
  }
}).addTo(map);

axios.get(url)
  .then(responseArrs => {
    ventilators_data = $.csv.toObjects(responseArrs.data);
    let ventilators_obj = {}
    ventilators_data.forEach(object_ => {
      ventilators_obj[object_["COUNTRY"]] = [
        object_["POP"],
        object_["Intro"],
        object_["Fiscal"],
        // object_["Monetary_and_Macro_financial"],
        // object_["Exchange_rate_and_balance_of_payments"],
        object_["Fiscal2"],
        object_["Monetary"],
        object_["Exchange"],
        object_["Value"],
        object_["Source1"]
        // object_["Humanitarian_exemption"],
        // object_["Lockdown"],
        // object_["Movement_restrictions"],
        // object_["Public_health_measures"],
        // object_["Social_and_economic_measures"],
        // object_["Social_distancing"],
        // object_["Source2"],
        // object_["Summary"],
        // object_["SupportValue"],
        // object_["GDP_PC"],
        // object_["WageEmp"],
        // object_["Cash"],
        // object_["Credit"],
        // object_["TaxDelDef"],
        // object_["TaxCut"],
        // object_["Interest_rate_cuts/liquidity_measures/other_monetary_measures"],
        // object_["ImpExp"],
        // object_["DigFinTran"],
        // object_["LinkGov"],
        // object_["LinkOthr"],
        // object_["LinkOth2"]
      ]
    })

    african_data.eachLayer(function (layer) {
      let country_ = layer.feature.properties.COUNTRY;
      layer.bindPopup(
        '<strong>Country:</strong> ' + country_
        + '<br>' + '<strong>Population:</strong> ' + ventilators_obj[country_][0]
        + '<br>' + '<strong>Introduction:</strong> ' + ventilators_obj[country_][1]
        // + '<br>' + '<strong>Fiscal Policy:</strong> ' + ventilators_obj[country_][2]
        // + '<br>' + '<strong>Monetary and Macro financial:</strong> ' + ventilators_obj[country_][3]
        + '<br>' + '<strong>Fiscal:</strong> ' + ventilators_obj[country_][2]
        + '<br>' + '<strong>Monetary:</strong> ' + ventilators_obj[country_][3]
        + '<br>' + '<strong>Exchange:</strong> ' + ventilators_obj[country_][4]
        + '<br>' + '<strong>Value:</strong> ' + ventilators_obj[country_][5]
        + '<br>' + '<strong>Source:</strong> ' + ventilators_obj[country_][6]
        // + '<br>'+ '<br>'+ '<br>' + '<strong>Humanitarian Exemption:</strong> ' + ventilators_obj[country_][9]
        // + '<br>' + '<strong>Lock Down:</strong> ' + ventilators_obj[country_][10]
        // + '<br>' + '<strong>Movement Restrictions:</strong> ' + ventilators_obj[country_][11]
        // + '<br>' + '<strong>Public health measures:</strong> ' + ventilators_obj[country_][12]
        // + '<br>' + '<strong>Social and economic measures:</strong> ' + ventilators_obj[country_][13]
        // + '<br>' + '<strong>Social distancing:</strong> ' + ventilators_obj[country_][14]
        // + '<br>' + '<strong>Source:</strong> ' + ventilators_obj[country_][15]
        // + '<br>'+ '<br>'+ '<br>' + '<strong>Summary:</strong> ' + ventilators_obj[country_][16]
        // + '<br>' + '<strong>Support Value:</strong> ' + ventilators_obj[country_][17]
        // + '<br>' + '<strong>GDP_PC:</strong> ' + ventilators_obj[country_][18]
        // + '<br>' + '<strong>WageEmp:</strong> ' + ventilators_obj[country_][19]
        // + '<br>' + '<strong>Cash:</strong> ' + ventilators_obj[country_][20]
        // + '<br>' + '<strong>Credit:</strong> ' + ventilators_obj[country_][21]
        // + '<br>' + '<strong>TaxDelDef:</strong> ' + ventilators_obj[country_][22]
        // + '<br>' + '<strong>Tax Cut:</strong> ' + ventilators_obj[country_][23]
        // + '<br>' + '<strong>Interest rate cuts/liquidity measures/other monetary measures:</strong> ' + ventilators_obj[country_][24]
        // + '<br>' + '<strong>ImpExp:</strong> ' + ventilators_obj[country_][25]
        // + '<br>' + '<strong>DigFinTran:</strong> ' + ventilators_obj[country_][26]
        // + '<br>' + '<strong>Link:</strong> ' + ventilators_obj[country_][27]
        // + '<br>' + '<strong>Link:</strong> ' + ventilators_obj[country_][28]
        // + '<br>' + '<strong>Link:</strong> ' + ventilators_obj[country_][29]
      );
      layer.on('mouseover', function (e) {
        this.openPopup();
      });
      layer.on('mouseout', function (e) {
        this.closePopup();
      });
    });
  })

  var info = L.control();
  info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
  };

  info.update = function(props) {
    this._div.innerHTML =  (props ?
      '<b>' + '</b><br />' + ' ' :
      'Hover over a country');
  };
  info.addTo(map);
