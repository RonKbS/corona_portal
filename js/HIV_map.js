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
  style: styleHIV
}).addTo(map);

function getColorHIV(d) {
  return d > 730 ? '#993404' :
    d > 190 ? '#d95f0e' :
    d > 80 ? '#fe9929' :
    d > 50 ? '#fed98e' :
    d > 20 ? '#ffffd4' :
    d > 0 ? '#fef0d9' :
    '#ffffff00';
}


axios.get(url)
  .then(responseArrs => {
    ventilators_data = $.csv.toObjects(responseArrs.data);
    let ventilators_obj = {}
    ventilators_data.forEach(object_ => {
      ventilators_obj[object_["COUNTRY"]] = [
        object_["POP"],
        object_["HIV_rates"],
        object_["HIV_percentage"]
      ]
    })

    african_data.eachLayer(function(layer) {
      let country_ = layer.feature.properties.COUNTRY;
      layer.bindPopup(
        '<strong>Country:</strong> ' + country_ +
        '<br>' + '<strong>Population:</strong> ' + ventilators_obj[country_][0] +
        '<br>' + '<strong>HIV rates:</strong> ' + ventilators_obj[country_][1] +
        '<br>' + '<strong>HIV percentage:</strong> ' + ventilators_obj[country_][2]
      );
      layer.on('mouseover', function(e) {
        this.openPopup();
      });
      layer.on('mouseout', function(e) {
        this.closePopup();
      });
    });
  })

  function styleHIV(feature, ventilators_obj) {
    return {
      fillColor: getColorHIV(ventilators_obj),
      weight: 1,
      opacity: 1,
      color: 'black',
      dashArray: '0',
      fillOpacity: 1
    };
  }

var info = L.control();
info.onAdd = function(map) {
  this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
  this.update();
  return this._div;
};

info.update = function(props) {
  this._div.innerHTML = (props ?
    '<b>' + '</b><br />' + ' ' :
    'Hover over a country');
};
info.addTo(map);
