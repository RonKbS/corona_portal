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

function getColorTB(d) {
  return d > 86 ? '#404040' :
    d > 21 ? '#bababa' :
    d > 17 ? '#f1eef6' :
    d > 16 ? '#f4a582' :
    d > 10 ? '#ca0020' :
    d > 0 ? '#ffffff' :
    '#ffffff00';
}

axios.get(url)
  .then(responseArrs => {
    icus_data = $.csv.toObjects(responseArrs.data);
    let icus_obj = {}
    icus_data.forEach(object_ => {
      icus_obj[object_["COUNTRY"]] = [
        object_["POP"],
        object_["TB_rates"],
        object_["TB_percentage"]
      ]
    })

    let african_data = L.geoJson(africa_data, {
      style: styleTB
    }).addTo(map);

    african_data.eachLayer(function (layer) {
      let country_ = layer.feature.properties.COUNTRY;
      layer.bindPopup(
        '<strong>Country:</strong> ' + country_
        + '<br>' + '<strong>Population:</strong> ' + icus_obj[country_][0]
        + '<br>' + '<strong>TB rates:</strong> ' + icus_obj[country_][1]
        + '<br>' + '<strong>TB percentage:</strong> ' + icus_obj[country_][2]
      );
      layer.on('mouseover', function (e) {
        this.openPopup();
      });
      layer.on('mouseout', function (e) {
        this.closePopup();
      });
    });

    function styleTB(feature) {
      return {
        fillColor: getColorTB(parseFloat(icus_obj[feature.properties.COUNTRY][2].split(",").join(""))),
        weight: 1,
        opacity: 1,
        color: 'black',
        dashArray: '0',
        fillOpacity: 1
      };
    }
  })

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
