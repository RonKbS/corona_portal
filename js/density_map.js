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
  style: styledensity
}).addTo(map);
africa_data.eachLayer(function(layer) {
  layer.bindPopup('<strong>COUNTRY:</strong> ' + layer.feature.properties.COUNTRY + '<br>' + '<strong>POPULATION:</strong> ' + layer.feature.properties.pop + '<br>' + '<strong>Population Density:</strong> ' + layer.feature.properties.density);
  layer.on('mouseover', function(e) {
    this.openPopup();
  });
  layer.on('mouseout', function(e) {
    this.closePopup();
  });
});

function getColordensity(d) {
  return d > 730 ? '#993404' :
    d > 190 ? '#d95f0e' :
    d > 80 ? '#fe9929' :
    d > 50 ? '#fed98e' :
    d > 20 ? '#ffffd4' :
    d > 0 ? '#fef0d9' :
    '#ffffff00';

}

function styledensity(feature) {
  return {
    fillColor: getColordensity(feature.properties.density),
    weight: 1,
    opacity: 1,
    color: 'black',
    dashArray: '0',
    fillOpacity: 1
  };
}
