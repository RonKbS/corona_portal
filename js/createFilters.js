let slider = document.getElementById('sliders');
let filterData;

var dataToFilter = {}


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