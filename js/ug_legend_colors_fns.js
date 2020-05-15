

// function produce_uganda() {
function getColorpop(d) {
    return d > 2000000 ? '#67000d' :
        d > 1999999 ? '#67000d' :
            d > 350000 ? '#d42020' :
                d > 349999 ? '#d42020' :
                    d > 250000 ? '#fc7050' :
                        d > 249999 ? '#fc7050' :
                            d > 150000 ? '#fdbea5' :
                                d > 149999 ? '#fdbea5' :
                                    d > 50000 ? '#fff5f0' :
                                        d > 49999 ? '#fff5f0' :
                                            d > 0 ? '#fff5f0' :
                                                '#808080';
}

function stylepop(feature) {
    return {
        fillColor: getColorpop(feature.properties.TotalPopn),
        weight: 1,
        opacity: 1,
        color: 'black',
        dashArray: '0',
        fillOpacity: 1
    };
}

// //density
function getColorden(d) {
    return d > 7500 ? '#993404' :
        d > 7499 ? '#993404' :
            d > 200 ? '#d95f0e' :
                d > 199 ? '#d95f0e' :
                    d > 100 ? '#fe9929' :
                        d > 99 ? '#fe9929' :
                            d > 50 ? '#fed98e' :
                                d > 49 ? '#fed98e' :
                                    d > 7 ? '#ffffd4' :
                                        d > 6.9 ? '#ffffd4' :
                                            '#808080';
}


function styleden(feature) {
    return {
        fillColor: getColorden(parseFloat(feature.properties.districts1_density.split(",").join(""))),
        weight: 1,
        opacity: 1,
        color: 'black',
        dashArray: '0',
        fillOpacity: 1
    };
}

// //poverty
function getColorpov(d) {
    return d > 15 ? '#810f7c' :
        d > 14.9 ? '#810f7c' :
            d > 5 ? '#8856a7' :
                d > 4.9 ? '#8856a7' :
                    d > 3 ? '#8c96c6' :
                        d > 2.9 ? '#8c96c6' :
                            d > 2 ? '#b3cde3' :
                                d > 1.9 ? '#b3cde3' :
                                    d > 0.3 ? '#edf8fb' :
                                        d > 0.2 ? '#edf8fb' :
                                            d > null ? '#808080' :
                                                '#808080';
}


function stylepov(feature) {
    return {
        fillColor: getColorpov(parseFloat(feature.properties.districts1_HHPov16_17.split(",").join(""))),
        weight: 1,
        opacity: 1,
        color: 'black',
        dashArray: '0',
        fillOpacity: 1
    };
}

// //elderly
function getColorelderly(d) {
    return d > 45000 ? '#253494' :
        d > 44999 ? '#253494' :
            d > 30000 ? '#2c7fb8' :
                d > 29999 ? '#2c7fb8' :
                    d > 20000 ? '#41b6c4' :
                        d > 19999 ? '#41b6c4' :
                            d > 10000 ? '#a1dab4' :
                                d > 9999 ? '#a1dab4' :
                                    d > 950 ? '#ffffcc' :
                                        d > 949 ? '#ffffcc' :
                                            d > null ? '#808080' :
                                                '#808080';
}


function styleelderly(feature) {
    return {
        fillColor: getColorelderly(parseFloat(feature.properties.districts1_Eldery.split(",").join(""))),
        weight: 1,
        opacity: 1,
        color: 'black',
        dashArray: '0',
        fillOpacity: 1
    };
}

// //aids
function getColoraids(d) {
    return d > 64000 ? '#00441b' :
        d > 63999 ? '#00441b' :
            d > 40000 ? '#2a924a' :
                d > 39999 ? '#2a924a' :
                    d > 20000 ? '#7bc87c' :
                        d > 19999 ? '#7bc87c' :
                            d > 10000 ? '#caeac3' :
                                d > 9999 ? '#caeac3' :
                                    d > 440 ? '#f7fcf5' :
                                        d > 339 ? '#f7fcf5' :
                                            d > 0 ? '#f7fcf5' :
                                                '#808080';
}


function styleaids(feature) {
    return {
        fillColor: getColoraids(feature.properties["districts1_HIV_rates(15+yrs_old)"]),
        weight: 1,
        opacity: 1,
        color: 'black',
        dashArray: '0',
        fillOpacity: 1
    };
}

// //prisons
function getColorprisons(d) {
    return d > 6300 ? '#08306b' :
        d > 6299 ? '#08306b' :
            d > 3000 ? '#2879b9' :
                d > 2999 ? '#2879b9' :
                    d > 1000 ? '#73b3d8' :
                        d > 999 ? '#73b3d8' :
                            d > 100 ? '#c8ddf0' :
                                d > 99 ? '#c8ddf0' :
                                    d > 15 ? '#f7fbff' :
                                        d > 14 ? '#f7fbff' :
                                            d > null ? '#808080' :
                                                '#808080';
}


function styleprisons(feature) {
    return {
        fillColor: getColorprisons(parseFloat(feature.properties.districts1_2017_TOTAL_PRISONERS.split(",").join(""))),
        weight: 1,
        opacity: 1,
        color: 'black',
        dashArray: '0',
        fillOpacity: 1
    };
}

// // //gdp
function getColorgdp(d) {
    return d > 3300 ? '#bd0026' :
        d > 3299 ? '#bd0026' :
            d > 500 ? '#f03b20' :
                d > 499 ? '#f03b20' :
                    d > 200 ? '#fd8d3c' :
                        d > 199 ? '#fd8d3c' :
                            d > 100 ? '#fecc5c' :
                                d > 99 ? '#fecc5c' :
                                    d > 34 ? '#ffffb2' :
                                        d > -1 ? '#ffffb2' :
                                            d > null ? '#808080' :
                                                '#808080';
}

function stylegdp(feature) {
    return {
        fillColor: getColorgdp(feature.properties["districts1_GDP_Per_Capita(USD)"]),
        weight: 1,
        opacity: 1,
        color: 'black',
        dashArray: '0',
        fillOpacity: 1
    };
}


let overlayLayers = {
    "Border Points": [border_points, "#cccc09"],
    // "Health Centers": [health_centers, "red"],
    "ICU Beds Per Health Center": [icu_beds, "orange"],
    // "Market Places": [markets, "green"],
    // "Water Access Points": [water_points, "blue"],
};

let ugandaLayers = {
    "Population": [[[5000, 150000, 250000, 350000, 2000000], getColorpop, "Population"], stylepop],
    "Contacts": [[[], , "Hover over district <br> for contact information"], {
        weight: 2,
        opacity: 2,
        color: '#000000b8',
        fillOpacity: 2.5,
        fillColor: '#AAA583'
    }],
    "Population Density": [[[7, 100, 500, 1000, 7500], getColorden, "Population Density"], styleden],
    "Poverty Rate": [[[0.3, 2, 3, 5, 15], getColorpov, "Household Poverty Rates"], stylepov],
    "Elderly(Over 60 in age)": [[[950, 10000, 20000, 30000, 45000], getColorelderly, "Elderly Rates"], styleelderly],
    "AIDS Rate": [[[440, 10000, 20000, 40000, 64000], getColoraids, "HIV Rates (15+ years old)"], styleaids],
    "Prisons Population": [[[15, 100, 1000, 3000, 6300], getColorprisons, "Total Prisoners"], styleprisons],
    "GDP": [[[34, 100, 200, 500, 3300], getColorgdp, "GDP Per Capita (USD)"], stylegdp]
};


function createOverLayers() {

    let layers = [];

    Object.keys(overlayLayers).forEach(element => {

        layers[element] = L.geoJson(overlayLayers[element], {
            pointToLayer: function (feature, latlng) {
                return new L.CircleMarker(latlng, {
                    pane: 'overlaysPane',
                    radius: 4,
                    fillOpacity: 1,
                    color: 'black',
                    fillColor: overlayLayers[element][1],
                    weight: 0.6,
                });
            }
        });
    });

    return layers;
}

let layers = createOverLayers();

function createCountryLayers() {

    let layers = [];

    Object.keys(ugandaLayers).forEach(element => {

        layers[element] = new L.geoJson(districts_data, { //ugandaLayers[element], {

            pane: 'choroplethPane',
            style: ugandaLayers[element][1],
            onEachFeature: function (feature, layer) {
                layer.bindPopup(
                    '<strong>District:</strong> ' + layer.feature.properties.DNama2017 +
                    '<br>' + '<strong>Total Population:</strong> ' + layer.feature.properties.TotalPopn +
                    '<br>' + '<strong>Remanded:</strong> ' + layer.feature.properties.districts1_REMANDS +
                    '<br>' + '<strong>Convicted:</strong> ' + layer.feature.properties.districts1_CONVICTS +
                    '<br>' + '<strong>Debtors:</strong> ' + layer.feature.properties.districts1_DEBTORS +
                    '<br>' + '<strong>Total Prisoners:</strong> ' + layer.feature.properties.districts1_2017_TOTAL_PRISONERS
                );
                layer.on('mouseover', function (e) {
                    this.openPopup();
                });
                layer.on('mouseout', function (e) {
                    this.closePopup();
                });
            }
        });
    });

    return layers;
}

let countrylayers = createCountryLayers();

function add_overlay(element) {
    let layer_ = element.text
    highlight_button(element)
    Object.keys(overlayLayers).forEach(element => {
        map.removeLayer(layers[element]);
    });
    layers[layer_].addTo(map)
    Object.keys(layers[layer_]._layers).forEach(element => {
        let l = layers[layer_]._layers[element];
        OEF(l, layer_)
        border_sheet_data.forEach(element => {
            if (element.Border_cases != "" && element.Border == l.feature.properties.Name) {
                l.setStyle({
                    radius: element.Border_cases / 3,
                    color: 'red',
                    fillOpacity: 0,
                    weight: 3,
                })
            }
        });
    });
}

function add_ug_layer(element) {
    let layer_ = element.text
    addLegend(ugandaLayers[layer_][0][0], ugandaLayers[layer_][0][1], ugandaLayers[layer_][0][2]);
    highlight_button(element)
    Object.keys(countrylayers).forEach(element => {
        if (map.hasLayer(countrylayers[element])) {
            map.removeLayer(countrylayers[element]);
        }
    });
    countrylayers[layer_].addTo(map)
    Object.keys(countrylayers[layer_]._layers).forEach(element => {
        let l = countrylayers[layer_]._layers[element];
        OEF(l, layer_)
    });
}

let overlays = $('#infrastructure');
