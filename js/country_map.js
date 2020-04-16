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
    fillColor: '#b30000'
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
        fillColor: '#b30000'
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
        object_["Humanitarian_exemption"],
        object_["Lockdown"],
        object_["Movement_restrictions"],
        object_["Public_health_measures"],
        object_["Social_and_economic_measures"],
        object_["Social_distancing"],
      ]
    })

    african_data.eachLayer(function (layer) {
      let country_ = layer.feature.properties.COUNTRY;
      layer.bindPopup(
        '<strong>Country:</strong> ' + country_
        + '<br>' + '<strong>Population:</strong> ' + ventilators_obj[country_][0]
        + '<br>'+ '<strong>Humanitarian Exemption:</strong> ' + ventilators_obj[country_][1]
        + '<br>' + '<strong>Lock Down:</strong> ' + ventilators_obj[country_][2]
        + '<br>' + '<strong>Movement Restrictions:</strong> ' + ventilators_obj[country_][3]
        + '<br>' + '<strong>Public health measures:</strong> ' + ventilators_obj[country_][4]
        + '<br>' + '<strong>Social and economic measures:</strong> ' + ventilators_obj[country_][5]
        + '<br>' + '<strong>Social distancing:</strong> ' + ventilators_obj[country_][6]
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
