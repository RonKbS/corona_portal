let slider = document.getElementById('sliders');
let filterData;

let filter_data_obj = {};

var dataToFilter = {};

var filters = ["DENSITY", "CASES", "POP", "DEATHS", "Elderly_rates"]

sidebar.on("content", (e) => {
  if (e.id === 'profile') {
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


    addLegend([1], getColorFilters, "Filtered", "filterMap");

  } else if (e.id === 'layers') {
    if (african_data._map) {
      map.removeLayer(african_data)
    }
    $("a").filter(function () {
      return $(this).text() === "Cases";
    }).click()
  }
})


function createSlider(filterName, min, max) {

  var container = L.DomUtil.create('div', 'sliderContainer');
  container.innerHTML += '<p style="color:#fff;"><b>' + filterName + '</b></p><br>';

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
        return thousep2(parseInt(value));
      },
      from: function (value) {
        return value.replace(',', '');
      }
    }
  });

  div.noUiSlider.on('slide', (e, f, g) => {
    dataToFilter[filterName] = [parseInt(g[0]), parseInt(g[1])]
    filterMap();
  });

  slider.append(container);
}

let gid1 = "1502462034"
let url1 = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${gid1}`

axios.get(url1)
  .then(responseArrs => {
    filterData = $.csv.toObjects(responseArrs.data);

    filters.forEach(element => {

      let min = Infinity, max = -Infinity;
      if (element != "COUNTRY") {
        filterData.forEach(object_ => {
          filter_data_obj[object_["COUNTRY"]] = [
            object_["DENSITY"],
            object_["CASES"],
            object_["POP"],
            object_["DEATHS"],
            object_["Elderly_rates"],
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
