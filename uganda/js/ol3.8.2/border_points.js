var map =L.map('map', {
    minZoom: 4
}).setView([1.8, 22.24],2);



function setParent(el, newParent) {
    newParent.appendChild(el);
}


var CartoDB_PostronNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);

var border_points = L.geoJson(border_points, {
    pointToLayer: function(feature, latlng) {
      return new L.CircleMarker(latlng, {
        radius: 5,
        fillOpacity: 1,
        color: 'black',
        fillColor: getColor(feature.properties.Point),
        weight: 0.6,
      });
    }
  }).addTo(map);








