let long_id = "1tRF8gjyRd0oA2sSpTKmZqambggZzUM0YiED6KqF8H8M"
let gid = "1196118475"
let url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${gid}`

let map = L.map('map', {
  minZoom: 4
}).setView([1.8, 10.24], 2);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);

let african_data = L.geoJson(africa_data, {
  style: stylevents
}).addTo(map);

function getColorvents(d) {
  return d > 8000000 ? '#045a8d' :
    d > 1600000 ? '#2b8cbe' :
      d > 1000000 ? '#74a9cf' :
        d > 800000 ? '#bdc9e1' :
          d > 200000 ? '#dbf8ff' :
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

axios.get(url)
  .then(responseArrs => {
    ventilators_data = $.csv.toObjects(responseArrs.data);
    let ventilators_obj = {}
    ventilators_data.forEach(object_ => {
      ventilators_obj[object_["COUNTRY"]] = [
        object_["POP"],
        object_["VENTILATORS"],
        object_["PEOPLE_PER_VENT"]
      ]
    })

    african_data.eachLayer(function (layer) {
      let country_ = layer.feature.properties.COUNTRY;
      layer.bindPopup(
        '<strong>COUNTRY:</strong> ' + country_ 
        + '<br>' + '<strong>POPULATION:</strong> ' + ventilators_obj[country_][0] 
        + '<br>' + '<strong>VENTILATORS:</strong> ' + ventilators_obj[country_][1]
        + '<br>' + '<strong>PEOPLE PER VENTILATOR:</strong> ' + ventilators_obj[country_][2]
      );
      layer.on('mouseover', function (e) {
        this.openPopup();
      });
      layer.on('mouseout', function (e) {
        this.closePopup();
      });
    });
  })