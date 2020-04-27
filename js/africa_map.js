let long_id = "1tRF8gjyRd0oA2sSpTKmZqambggZzUM0YiED6KqF8H8M"
let gid = "1502462034"
let url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${gid}`
let google_sheet_data;

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;
yesterday = yyyy + '-' + mm + '-' + (parseInt(dd) - 1).toString();


let url1 = `https://covidtrackerapi.bsg.ox.ac.uk/api/stringency/date-range/${today}/${today}`


let axioses = [axios.get(url, { mode: 'no-cors' }), axios.get(url1, { mode: 'no-cors' })]


let map = L.map('map', {
  minZoom: 3,
  maxZoom: 3
}).setView([2.8, 15.24], 2);

map.dragging.disable();
map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();

var gg_logo = L.control({ position: 'bottomleft' });
gg_logo.onAdd = function (map) {
  var div = L.DomUtil.create('div');
  div.innerHTML += '<img style="width:56%;" class="gg_logo" src="images/GG_Logo2.png">'
  return div;
};
gg_logo.addTo(map);

var ire_logo = L.control({ position: 'bottomright' });
ire_logo.onAdd = function (map) {
  var div = L.DomUtil.create('div');
  div.innerHTML += '<img style="width:40%;float:right;" class="irish_logho" src="images/irish.png">'
  return div;
};
ire_logo.addTo(map);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);

let african_data;
function getColorcases(d) {
  return d > 2000 ? '#016c59' :
    d > 250 ? '#1c9099' :
      d > 50 ? '#67a9cf' :
        d > 20 ? '#bdc9e1' :
          d > 10 ? '#f6eff7' :
            d > 0 ? '#f0f5f7' :
              '#ffffff00';
}


axios.all(axioses)
  .then(responseArrs => {
    google_sheet_data = $.csv.toObjects(responseArrs[0].data);
    api_data = responseArrs[1].data;
    console.log(api_data);
    let initial_data_obj = {}
    google_sheet_data.forEach(object_ => {
      initial_data_obj[object_["COUNTRY"]] = [
        object_["POP"],
        object_["CASES"]
      ]
    })

    african_data = L.geoJson(africa_data, {
      style: stylecases
    }).addTo(map);

    african_data.eachLayer(function (layer) {
      let country_ = layer.feature.properties.COUNTRY;
      layer.bindPopup(
        '<strong>Country:</strong> ' + country_ +
        '<br>' + '<strong>Population:</strong> ' + initial_data_obj[country_][0] +
        '<br>' + '<strong>Cases:</strong> ' + initial_data_obj[country_][1]
      );
      layer.on('mouseover', function (e) {
        this.openPopup();
      });
      layer.on('mouseout', function (e) {
        this.closePopup();
      });
    });

    function stylecases(feature) {
      return {
        fillColor: getColorcases(parseFloat(initial_data_obj[feature.properties.COUNTRY][1].split(",").join(""))),
        weight: 1,
        opacity: 1,
        color: 'black',
        dashArray: '0',
        fillOpacity: 1
      };
    }
    addLegend([0, 10, 20, 50, 250, 2000], getColorcases, "Cases");
  })
