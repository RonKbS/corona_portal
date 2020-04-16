
let long_id = "1tRF8gjyRd0oA2sSpTKmZqambggZzUM0YiED6KqF8H8M"
let gid = "1502462034"
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
  style: styleICU
}).addTo(map);

function getColorICU(d) {
  return d > 29900000 ? '#b30000' :
    d > 2500000 ? '#e34a33' :
    d > 800000 ? '#fc8d59' :
    d > 400000 ? '#fdbb84' :
    d > 200000 ? '#fdd49e' :
    d > 0 ? '#fef0d9':
    '#ffffff00';
}

function styleICU(feature) {
  return {
    fillColor: getColorICU(feature.properties.pple_ICU),
    weight: 1,
    opacity: 1,
    color: 'black',
    dashArray: '0',
    fillOpacity: 1
  };
}

axios.get(url)
  .then(responseArrs => {
    icus_data = $.csv.toObjects(responseArrs.data);
    let icus_obj = {}
    icus_data.forEach(object_ => {
      icus_obj[object_["COUNTRY"]] = [
        object_["POP"],
        object_["ICU"],
        object_["PEOPLE_PER_ICU"]
      ]
    })

    african_data.eachLayer(function (layer) {
      let country_ = layer.feature.properties.COUNTRY;
      layer.bindPopup(
        '<strong>Country:</strong> ' + country_
        + '<br>' + '<strong>Population:</strong> ' + icus_obj[country_][0]
        + '<br>' + '<strong>ICUs:</strong> ' + icus_obj[country_][1]
        + '<br>' + '<strong>People per ICU:</strong> ' + icus_obj[country_][2]
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
