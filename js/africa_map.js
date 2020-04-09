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

var africa_data = new L.GeoJSON(africa_data, {
  style: {
    weight: 2,
    opacity: 2,
    color: '#4a4949',
    fillOpacity: 2.5,
    fillColor: '#ffffff00'
  },
  onEachFeature: function(feature, layer) {
    layer.on('mouseover', function() {
      this.setStyle({
        weight: 2,
        opacity: 2,
        color: '#000000',
        fillOpacity: 10,
        fillColor: '#989898'
      });
    });
    layer.on('mouseout', function() {
      this.setStyle({
        weight: 2,
        opacity: 2,
        color: '#4a4949',
        fillOpacity: 2.5,
        fillColor: '#ffffff00'
      });
    });
  }
}).addTo(map);
africa_data.eachLayer(function(layer) {
  layer.bindPopup('<strong>COUNTRY:</strong> ' + layer.feature.properties.COUNTRY);
  layer.on('mouseover', function(e) {
    this.openPopup();
  });
  layer.on('mouseout', function(e) {
    this.closePopup();
  });
});
