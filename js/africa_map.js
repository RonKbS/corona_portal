let long_id = "1tRF8gjyRd0oA2sSpTKmZqambggZzUM0YiED6KqF8H8M"
let gid = "1502462034"
let url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${gid}`
let google_sheet_data;

let map = L.map('map', {
  minZoom: 3,
  maxZoom: 3
}).setView([2.8, 15.24], 2);

map.dragging.disable();
map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();

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


axios.get(url)
  .then(responseArrs => {
    google_sheet_data = $.csv.toObjects(responseArrs.data);
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

    african_data.eachLayer(function(layer) {
      let country_ = layer.feature.properties.COUNTRY;
      layer.bindPopup(
        '<strong>Country:</strong> ' + country_ +
        '<br>' + '<strong>Population:</strong> ' + initial_data_obj[country_][0] +
        '<br>' + '<strong>Cases:</strong> ' + initial_data_obj[country_][1]
      );
      layer.on('mouseover', function(e) {
        this.openPopup();
      });
      layer.on('mouseout', function(e) {
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
    let legend_parent = document.getElementsByClassName("legend")[0]
    let legend_child = document.createElement("IMG")
    legend_child.setAttribute("src", "images/cases_legend.png");
    legend_child.setAttribute("class", "cases")
    legend_parent.appendChild(legend_child);
  })
