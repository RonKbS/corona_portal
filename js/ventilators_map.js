var map = L.map('map', {
  minZoom: 4
}).setView([1.8, 22.24], 2);


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
  style: stylevents
}).addTo(map);
africa_data.eachLayer(function(layer) {
  layer.bindPopup('<strong>COUNTRY:</strong> ' + layer.feature.properties.COUNTRY + '<br>' + '<strong>POPULATION:</strong> ' + layer.feature.properties.pop + '<br>' + '<strong>VENTILATORS:</strong> ' + layer.feature.properties.vents + '<br>' + '<strong>PEOPLE PER VENTILATOR:</strong> ' + layer.feature.properties.pple_vents);
  layer.on('mouseover', function(e) {
    this.openPopup();
  });
  layer.on('mouseout', function(e) {
    this.closePopup();
  });
});

function getColorvents(d) {
  return d > 8000000 ? '#045a8d' :
    d > 1600000 ? '#2b8cbe' :
    d > 1000000 ? '#74a9cf' :
    d > 800000 ? '#dbf8ff' :
    d > 200000 ? '#bdc9e1' :
    d > 0 ? '#f1eef6' :
    '#ffffff00';
}

function stylevents(feature) {
  return {
    fillColor: getColorvents(feature.properties.pple_vents),
    weight: 1,
    opacity: 1,
    color: 'black',
    dashArray: '0',
    fillOpacity: 1
  };
}
