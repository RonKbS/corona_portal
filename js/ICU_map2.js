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

// https://docs.google.com/spreadsheets/d/1tRF8gjyRd0oA2sSpTKmZqambggZzUM0YiED6KqF8H8M/edit#gid=1502462034
let long_id_ = "1tRF8gjyRd0oA2sSpTKmZqambggZzUM0YiED6KqF8H8M"
axios.get(
  `https://docs.google.com/spreadsheets/d/${long_id_}/export?format=csv&id=${long_id_}&gid=1502462034`, {
  mode: 'no-cors'
}
)
  .then(response => {
    let google_sheets_data = $.csv.toObjects(response.data)

    var myStyle = {
      weight: 1,
      opacity: 1,
      color: '#808080',
      fillOpacity: 1,
      fillColor: '#e34a33'
    };

    var infra_data = L.geoJSON(africa_data, {
      style: myStyle
    }).addTo(map);


    var slidervar = document.getElementById('slider')
    noUiSlider.create(slider, {
      start: [0, 29900000],
      connect: true,
      step: 5,
      range: {
        'min': 0,
        'max': 29900000
      },
      tooltips: true
    });

    var slidervar2 = document.getElementById('slider2')
    noUiSlider.create(slider2, {
      start: [0, 8000000],
      connect: true,
      range: {
        'min': 0,
        'max': 8000000
      },
      tooltips: true
    });

    var slidervar3 = document.getElementById('slider3')
    noUiSlider.create(slider3, {
      start: [0, 7100000],
      connect: true,
      step: 5,
      range: {
        'min': 0,
        'max': 7100000
      },
      tooltips: true
    });

    var slidervar4 = document.getElementById('slider4')
    noUiSlider.create(slider4, {
      start: [0, 240000],
      connect: true,
      step: 5,
      range: {
        'min': 0,
        'max': 240000
      },
      tooltips: true
    });

    document.getElementById('input-number-min').setAttribute("value", "0")
    document.getElementById('input-number-max').setAttribute("value", "29900000")
    document.getElementById('input-number-min2').setAttribute("value", "0")
    document.getElementById('input-number-max2').setAttribute("value", "8000000")
    document.getElementById('input-number-min3').setAttribute("value", "0")
    document.getElementById('input-number-max3').setAttribute("value", "7100000")
    document.getElementById('input-number-min4').setAttribute("value", "0")
    document.getElementById('input-number-max4').setAttribute("value", "240000")

    var inputNumberMin = document.getElementById("input-number-min");
    var inputNumberMax = document.getElementById("input-number-max");
    inputNumberMin.addEventListener("change", function () {
      slidervar.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener("change", function () {
      slidervar.noUiSlider.set(null, this.value);
    });

    var sliderData = [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ]

    function updatePopup() {
      //Connecting the slider to the data
      slidervar.noUiSlider.on('update', function (values, handle) {
        if (handle == 0) {
          document.getElementById('input-number-min').value = values[0];
        } else {
          document.getElementById('input-number-max').value = values[1];
        }

        sliderData[0] = values;

        updateFeatures(sliderData);
      })
      //Connecting the slider to the data
      slidervar2.noUiSlider.on('update', function (values, handle) {
        if (handle == 0) {
          document.getElementById('input-number-min2').value = values[0];
        } else {
          document.getElementById('input-number-max2').value = values[1];
        }

        sliderData[1] = values;

        updateFeatures(sliderData);
      })
      //Connecting the slider to the data
      slidervar3.noUiSlider.on('update', function (values, handle) {
        if (handle == 0) {
          document.getElementById('input-number-min3').value = values[0];
        } else {
          document.getElementById('input-number-max3').value = values[1];
        }

        sliderData[2] = values;

        updateFeatures(sliderData);
      })

      slidervar4.noUiSlider.on('update', function (values, handle) {
        if (handle == 0) {
          document.getElementById('input-number-min4').value = values[0];
        } else {
          document.getElementById('input-number-max4').value = values[1];
        }

        sliderData[3] = values;

        updateFeatures(sliderData);
      })
    }
    updatePopup()

    function updateFeatures(sliderData) {

      // 828811152 gid connect to this sheet for popn, pop-density, amount and usd
      for (key in infra_data['_layers']) {
        var l = infra_data['_layers'][key];
        let google_sheet_equivalent;
        google_sheets_data.forEach(row => {
          if (row["COUNTRY"] === l.feature.properties.COUNTRY) {
            google_sheet_equivalent = row
          }
        })

        // some names in the geojson are missing from the google sheet
        if (google_sheet_equivalent) {
          if (google_sheet_equivalent[`PEOPLE_PER_ICU`] >= parseInt(sliderData[0][0]) && google_sheet_equivalent[`PEOPLE_PER_ICU`] <= parseInt(sliderData[0][1]) && parseFloat(google_sheet_equivalent[`PEOPLE_PER_VENT`]) >= parseFloat(sliderData[1][0]) && parseFloat(google_sheet_equivalent
          [`PEOPLE_PER_VENT`]) <= parseFloat(sliderData[1][1]) &&
            google_sheet_equivalent[`HIV_rates`] >= parseInt(sliderData[2][0]) && google_sheet_equivalent[`HIV_rates`] <= parseInt(sliderData[2][1]) && google_sheet_equivalent[`TB_rates`] >= parseInt(sliderData[3][0]) && google_sheet_equivalent[`TB_rates`] <= parseInt(
              sliderData[3][1])) {
            l.setStyle({
              opacity: 1,
              fillOpacity: 1
            })
            l.bindPopup('<strong>Country:</strong>' + l.feature.properties.COUNTRY + '<br><strong>People:</strong> ' + google_sheet_equivalent[`PEOPLE_PER_ICU`] + '<br><strong>People:</strong> ' + google_sheet_equivalent[`PEOPLE_PER_VENT`] + '<br><strong>Population:</strong> ' + google_sheet_equivalent[`POP`] + '<br><strong>HIV:</strong> ' + google_sheet_equivalent[`HIV_rates`]);
            l.on('mouseover', function (e) {
              this.openPopup();
            });
            l.on('mouseout', function (e) {
              this.closePopup();
            });
          } else {
            l.setStyle({
              opacity: 0,
              fillOpacity: 0
            })
          }
        }
      };
    }
    $('.leaflet-top.leaflet-right').removeClass('leaflet-top').removeClass('leaflet-right');
    $('.leaflet-bottom.leaflet-left').removeClass('leaflet-bottom').removeClass('leaflet-left');
  })

  console.log(infra_data)
// var myStyle = {
//   weight: 1,
//   opacity: 1,
//   color: '#808080',
//   fillOpacity: 1,
//   fillColor: '#e34a33'
// };
//
// var icu_data = L.geoJSON(africa_data, {
//   style: myStyle
// }).addTo(map);
//
//
// // Creating a slider
// var slidervar = document.getElementById('slider')
// noUiSlider.create(slider, {
//   start: [0, 29900000],
//   connect: true,
//   step: 5,
//   range: {
//     'min': 0,
//     'max': 29900000
//   },
//   tooltips: true
// });
//
// document.getElementById('input-number-min').setAttribute("value", "0")
// document.getElementById('input-number-max').setAttribute("value", "29900000")
//
// var inputNumberMin = document.getElementById("input-number-min");
// var inputNumberMax = document.getElementById("input-number-max");
// inputNumberMin.addEventListener("change", function() {
//   slidervar.noUiSlider.set([this.value, null]);
// });
// inputNumberMax.addEventListener("change", function() {
//   slidervar.noUiSlider.set(null, this.value);
// });
//
// var sliderData = [
//   [0, 0],
//   [0, 0],
//   [0, 0],
//   [0, 0]
// ]
//
// function updatePopup() {
//   //Connecting the slider to the data
//   slidervar.noUiSlider.on('update', function(values, handle) {
//     if (handle == 0) {
//       document.getElementById('input-number-min').value = values[0];
//     } else {
//       document.getElementById('input-number-max').value = values[1];
//     }
//
//     sliderData[0] = values;
//
//     updateFeatures(sliderData);
//   })
// }
// updatePopup()
//
// function updateFeatures(sliderData) {
//
//   for (key in icu_data['_layers']) {
//     var l = icu_data['_layers'][key];
//     if (l.feature.properties.pple_ICU > parseInt(sliderData[0][0]) && l.feature.properties.pple_ICU < parseInt(sliderData[0][1])) {
//       l.setStyle({
//         opacity: 1,
//         fillOpacity: 1
//       })
//       l.bindPopup('<strong>COUNTRY:</strong> ' + l.feature.properties.COUNTRY + '<br>' + '<strong>POPULATION:</strong> ' + l.feature.properties.pop + '<br>' + '<strong>ICUS:</strong> ' + l.feature.properties.ICU + '<br>' + '<strong>PEOPLE PER ICU:</strong> ' + l.feature.properties.pple_ICU);
//       l.on('mouseover', function(e) {
//         this.openPopup();
//       });
//       l.on('mouseout', function(e) {
//         this.closePopup();
//       });
//     } else {
//       l.setStyle({
//         opacity: 0,
//         fillOpacity: 0
//       })
//     }
//   }
// }
// $('.leaflet-top.leaflet-right').removeClass('leaflet-top').removeClass('leaflet-right');
// $('.leaflet-bottom.leaflet-left').removeClass('leaflet-bottom').removeClass('leaflet-left');
