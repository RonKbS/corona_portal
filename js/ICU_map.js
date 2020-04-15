var map = L.map('map', {
  minZoom: 4
}).setView([1.8, 10.24], 2);


function setParent(el, newParent) {
  newParent.appendChild(el);
}

// var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
//   attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
//   subdomains: 'abcd',
// }).addTo(map);

var CartoDB_PositronNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);

var africa_data = L.geoJson(africa_data, {
  style: styleICU
}).addTo(map);
africa_data.eachLayer(function(layer) {
  layer.bindPopup('<strong>COUNTRY:</strong> ' + layer.feature.properties.COUNTRY + '<br>' + '<strong>POPULATION:</strong> ' + layer.feature.properties.pop + '<br>' + '<strong>ICUs:</strong> ' + layer.feature.properties.ICU + '<br>' + '<strong>PEOPLE PER ICU:</strong> ' + layer.feature.properties.pple_ICU);
  layer.on('mouseover', function(e) {
    this.openPopup();
  });
  layer.on('mouseout', function(e) {
    this.closePopup();
  });
});

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
