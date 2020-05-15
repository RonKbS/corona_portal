var map = L.map('map', {
    minZoom: 7.2
  }).setView([0.5479, 33.2026], 11);
  
  
  function setParent(el, newParent) {
    newParent.appendChild(el);
  }
  
  var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
  }).addTo(map);


  
var school_data = L.geoJson(school_data, {
    pointToLayer: function(feature, latlng) {
      return new L.CircleMarker(latlng, {
        radius: 5,
        fillOpacity: 1,
        color: 'black',
        fillColor: getColor(feature.properties.LEVEL),
        weight: 0.6,
      });
    }
}).addTo(map);


