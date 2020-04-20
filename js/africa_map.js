let long_id = "1tRF8gjyRd0oA2sSpTKmZqambggZzUM0YiED6KqF8H8M"
let gid = "1502462034"
let url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${gid}`
let google_sheet_data;

let map = L.map('map', {
  minZoom: 3.4,
  maxZoom: 3.4
}).setView([1.8, 2.24], 2);

map.dragging.disable();
map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);

let african_data = L.geoJson(africa_data, {
  style: {
    weight: 2,
    opacity: 2,
    color: '#e15b26',
    fillOpacity: 2.5,
    fillColor: '#ffffff00'
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
        color: '#e15b26',
        fillOpacity: 2.5,
        fillColor: '#ffffff00'
      });
    });
  }
}).addTo(map);


axios.get(url)
  .then(responseArrs => {
    google_sheet_data = $.csv.toObjects(responseArrs.data);
    let initial_data_obj = {}
    google_sheet_data.forEach(object_ => {
      initial_data_obj[object_["COUNTRY"]] = [
        object_["POP"],
        object_["DENSITY"]
      ]
    })

    african_data.eachLayer(function(layer) {
      let country_ = layer.feature.properties.COUNTRY;
      layer.bindPopup(
        '<strong>Country:</strong> ' + country_ +
        '<br>' + '<strong>Population:</strong> ' + initial_data_obj[country_][0] +
        '<br>' + '<strong>Density:</strong> ' + initial_data_obj[country_][1]
      );
      layer.on('mouseover', function(e) {
        this.openPopup();
      });
      layer.on('mouseout', function(e) {
        this.closePopup();
      });
    });
  })
