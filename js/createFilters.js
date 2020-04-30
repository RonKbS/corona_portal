let slider = document.getElementById('sliders');
let filterData;

let filter_data_obj ={};

var dataToFilter = {}

sidebar.on("content", (e) => {
    if(e.id === 'profile' ) {
        if (african_data._map) {
            map.removeLayer(african_data)
          }
          
          function getColorFilters() {
              return {
                weight: 1,
                fillOpacity: 1,
                fillColor: "#e15b26",
            }
          }

          african_data = L.geoJson(africa_data, {
            style: getColorFilters,
          }).addTo(map);


          addLegend([1], getColorFilters, "Filtered");

    } else if (e.id === 'layers' ) {
        if (african_data._map) {
            map.removeLayer(african_data)
          }
  
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
    }
})


function createSlider(filterName, min, max) {
    
    var container = L.DomUtil.create('div', 'sliderContainer');
    container.innerHTML += '<p><b>'+ filterName +'</b></p><br>';

    var div = L.DomUtil.create('div', 'slider ' + filterName);
    container.append(div);

    noUiSlider.create(div, {
        start: [min, max],
        connect: true,
        tooltips: true,
        range: {
            'min': min,
            'max': max
        },
        format: {
            to: function (value) {
                return value.toFixed(0);
            },
            from: function (value) {
                return value.replace('%', '');
            }
        }
    });

    div.noUiSlider.on('slide', (e, f, g) => {
        dataToFilter[filterName] = [parseInt(g[0]),parseInt(g[1])]
        filterMap();
    });

    slider.append(container);
}

let gid1 = "1502462034"
let url1 = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${gid1}`

axios.get(url1)
    .then(responseArrs => {
        filterData = $.csv.toObjects(responseArrs.data);

        Object.keys(filterData[0]).forEach(element => {

            let min = Infinity, max = -Infinity;
            if (element != "COUNTRY") {
                filterData.forEach(object_ => {
                    filter_data_obj[object_["COUNTRY"]] = [
                        object_["DENSITY"],
                        object_["CASES"], 
                        object_["POP"], 
                        object_["CASES_PER_100,000"], 
                        object_["DEATHS"], 
                        object_["DEATHS_PER_100,000"], 
                        object_["ICU"], 
                        object_["PEOPLE_PER_ICU"], 
                        object_["VENTILATORS"], 
                        object_["PEOPLE_PER_VENT"], 
                        object_["HIV_rates"], 
                        object_["HIV_percentage"], 
                        object_["TB_rates"], 
                        object_["TB_percentage"], 
                        object_["Elderly_rates"], 
                        object_["Elderly_percentage"], 
                        object_["GDP_percentage"],
                    ]
                    let value = object_[element].split(",").join("");
                        if (parseFloat(value) < min) min = parseFloat(value);
                        if (parseFloat(value) > max) max = parseFloat(value);
                })
                dataToFilter[element] = [
                    min,
                    max
                  ]
                createSlider(element, min, max)
            }

        })

    })