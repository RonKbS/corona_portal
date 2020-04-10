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

function getColorpoverty(d) {
    return d > 0.0006744 ? '#b30000' :
      d > 0.0000134 ? '#e34a33' :
      d > 0.0000081 ? '#fc8d59' :
      d > 0.0000021 ? '#fdbb84' :
      d > 0.0000004 ? '#fdd49e' :
      '#fef0d9';
}

//calling the styles that power the geojsons
function stylepoverty(feature) {
    return {
        fillColor: getColorpoverty(povgeoJson[feature.properties.COUNTRY]),
        weight: 1,
        opacity: 1,
        color: 'black',
        dashArray: '0',
        fillOpacity: 1
    };
}



//adding the geojsons
var density, baseMaps = {}, popngeoJson_ = {},
    povgeoJson = {}, congeoJson = {}, popDensityFn, years = [],
    long_id = "1XHFpvCVt5uQOy5qHPIDnQTcZks4XsJh8Dpj66EetieI";
var pop_density_2017;

//calling poverty data from google sheets
let poverty_sheet = "0"
let url2 = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${poverty_sheet}`

let axioses = [axios.get(url2, { mode: 'no-cors' })]

axios.all(axioses)
    .then(responseArrs => {
        // second URL
        poverty_data = $.csv.toObjects(responseArrs[1].data),
            poverty_data.forEach(point => {
                povgeoJson[point["COUNTRY"]] = parseFloat(point["CASES/POP"])
            })

        //calling geosjon and style for poverty
        var pov = L.geoJson(africa_data, {
            style: stylepoverty
        }).addTo(map);
        pov.eachLayer(function (layer) {
            layer.bindPopup('<strong>Subcounty</strong><br> ' + layer.feature.properties.COUNTRY);
            layer.on('mouseover', function (e) {
                this.openPopup();
            });
            layer.on('mouseout', function (e) {
                this.closePopup();
            });
        });

    })
    .catch(e => console.log(e))

// //adding the geojsons
// var density, baseMaps = {},
//   geoJson_, popngeoJson_ = {},
//   povgeoJson = {},
//   congeoJson = {},
//   popDensityFn, years = [],
//   long_id = "1XHFpvCVt5uQOy5qHPIDnQTcZks4XsJh8Dpj66EetieI";
// var pop_density_2017;
//
// // https://docs.google.com/spreadsheets/d/1XHFpvCVt5uQOy5qHPIDnQTcZks4XsJh8Dpj66EetieI/edit#gid=0
// // https://docs.google.com/spreadsheets/d/1q3VqrZLbWkGhnzewMA20UCX2f9lziZNBhtTUdAwXWCA/edit?ts=5e8d876b#gid=880842471
//
// //calling density data from google sheets
// let poverty_sheet = "0"
// let url2 = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${poverty_sheet}`
//
// let axioses = [axios.get(url2, { mode: 'no-cors' })]
//
// axios.all(axioses)
//   .then(responseArrs => {
//
//     // second URL
//     poverty_data = $.csv.toObjects(responseArrs[1].data),
//       poverty_data.forEach(point => {
//         povgeoJson[point["COUNTRY"]] = parseFloat(point["CASES/POP"])
//       })
//
//     //calling geosjon and style for poverty
//     var pov = L.geoJson(africa_data, {
//       style: stylepoverty
//     }).addTo(map);
//     pov.eachLayer(function(layer) {
//       layer.bindPopup('<strong>Subcounty</strong><br> ' + layer.feature.properties.COUNTRY);
//       layer.on('mouseover', function(e) {
//         this.openPopup();
//       });
//       layer.on('mouseout', function(e) {
//         this.closePopup();
//       });
//     });
//
//   })

// var africa_data = L.geoJson(africa_data, {
//   style: stylevents
// }).addTo(map);
// africa_data.eachLayer(function(layer) {
//   layer.bindPopup('<strong>COUNTRY:</strong> ' + layer.feature.properties.COUNTRY + '<br>' + '<strong>POPULATION:</strong> ' + layer.feature.properties.pop + '<br>' + '<strong>VENTILATORS:</strong> ' + layer.feature.properties.vents + '<br>' + '<strong>PEOPLE PER VENTILATOR:</strong> ' + layer.feature.properties.pple_vents);
//   layer.on('mouseover', function(e) {
//     this.openPopup();
//   });
//   layer.on('mouseout', function(e) {
//     this.closePopup();
//   });
// });
//
// function getColorvents(d) {
//   return d > 8000000 ? '#045a8d' :
//     d > 1600000 ? '#2b8cbe' :
//     d > 1000000 ? '#74a9cf' :
//     d > 800000 ? '#bdc9e1' :
//     d > 200000 ? '#dbf8ff' :
//     d > 0 ? '#f1eef6' :
//     '#ffffff00';
// }
//
// function stylevents(feature) {
//   return {
//     fillColor: getColorvents(feature.properties.pple_vents),
//     weight: 1,
//     opacity: 1,
//     color: 'black',
//     dashArray: '0',
//     fillOpacity: 1
//   };
// }

// https://docs.google.com/spreadsheets/d/1q3VqrZLbWkGhnzewMA20UCX2f9lziZNBhtTUdAwXWCA/edit?ts=5e8d876b#gid=880842471

// var geoJson_;
// let povgeoJson = {};
//
// var baseMaps = {}
// var density;
// let long_id = "1XHFpvCVt5uQOy5qHPIDnQTcZks4XsJh8Dpj66Eetie"
//
// let poverty_sheet = "0"
// url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${poverty_sheet}`
// axios.get(url, {
//     mode: 'no-cors'
//   })
//   .then(r => {
//     // console.log("this cade", r.data)
//     poverty_data = $.csv.toObjects(r.data),
//       poverty_data.forEach(point => {
//         povgeoJson[point["COUNTRY"]] = parseFloat(point["CASES/POP"])
//       })
//
//       var africa_data = L.geoJson(africa_data, {
//         style: stylecases
//       }).addTo(map);
//       africa_data.eachLayer(function(layer) {
//         layer.bindPopup('<strong>COUNTRY:</strong> ' + layer.feature.properties.COUNTRY + '<br>' + '<strong>POPULATION:</strong> ' + layer.feature.properties.pop + '<br>' + '<strong>VENTILATORS:</strong> ' + layer.feature.properties.vents + '<br>' + '<strong>PEOPLE PER VENTILATOR:</strong> ' + layer.feature.properties.pple_vents);
//         layer.on('mouseover', function(e) {
//           this.openPopup();
//         });
//         layer.on('mouseout', function(e) {
//           this.closePopup();
//         });
//       });
//
//     //   baseMaps["Household Poverty Rates"] = pov
//     //   baseMaps["LandCover Classification"] = landcover
//     //   console.log(baseMaps["Population Density"])
//     //   var overlayMaps = {
//     //     "Boundary Conflicts": conflict
//     //   };
//     //
//     //   L.control.layers(baseMaps, overlayMaps, {
//     //     collapsed: false,
//     //   }).addTo(map);
//     //
//     // // console.log(popngeoJson_)
//   })
//   .catch(e => console.log(e))
//
// //function tabletop that calls the data from the google sheet
// var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1XHFpvCVt5uQOy5qHPIDnQTcZks4XsJh8Dpj66EetieI/edit#gid=0';
//
// async function init() {
//   await Tabletop.init({
//     key: publicSpreadsheetUrl,
//     simpleSheet: false
//   })
// }
// window.addEventListener('DOMContentLoaded', init)
//
// // adding layers
// function getColorcases(d) {
//   return d > 0.0006744 ? '#b30000' :
//     d > 0.0000134 ? '#e34a33' :
//     d > 0.0000081 ? '#fc8d59' :
//     d > 0.0000021 ? '#fdbb84' :
//     d > 0.0000004 ? '#fdd49e' :
//     '#fef0d9';
// }
