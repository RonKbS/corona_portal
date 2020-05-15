
let long_id = "1tRF8gjyRd0oA2sSpTKmZqambggZzUM0YiED6KqF8H8M"
let gid = "1502462034"
let url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${gid}`
let google_sheet_data;
let prev_highlighted_button;

// set the hightlighted button to show
let highlight_button = (element) => {
  prev_highlighted_button = $( "a[style='color: #f8b739;']" );
  if (prev_highlighted_button.length != 0) {
  prev_highlighted_button[0].setAttribute("style", "color: rgb(219, 216, 216);");
  }
  element.setAttribute("style", "color: #f8b739;");
}

let show_hamburg_button = () => {
  let hamburg_ = $("a[href='#layers']")[0]
  let flashing_hamburg_ = setInterval( () => {
    hamburg_.setAttribute("style", "background-color: #e15b26;")
    setTimeout(
      () => {
        hamburg_.setAttribute("style", "color: rgb(51, 51, 51);")
      }, 250
    )
  }, 1000)
  setTimeout( () => {clearInterval(flashing_hamburg_)}, 15000)
}


let axioses = [axios.get(url, { mode: 'no-cors' })]
document.getElementById("map").setAttribute("style", `height: ${window.innerHeight}px`)


let southWest = L.latLng(53.85252660044951, 107.75390625),
    northEast = L.latLng(-50.28933925329178, -132.01171875000003),
    bounds = L.latLngBounds(southWest, northEast);

let map = L.map('map', {
  maxBounds: bounds,
  minZoom: 7,
  maxZoom: 7
}).setView([1.8, 29.24], 7);

$(window).resize(() => {
  document.getElementById("map").setAttribute("style", `height: ${window.innerHeight}px`)
}
)
let sidebar = L.control.sidebar('sidebar').addTo(map);
sidebar.open("layers")


// toggle to Africa
let africa_ = L.control({position: 'topright'});

    africa_.onAdd = function () {
      let div = L.DomUtil.create('div', 'sources africa_');
      div.innerHTML = `<h6 style='color: rgb(248, 183, 57); outline: none;\
      margin-bottom: 0;'><a href='/corona_portal' style='color: rgb(248, 183, 57);'>AFRICA</a></h6>`;
      div.setAttribute("style", "padding-bottom: 5px");
      div.id = "sources africa_"
      return div;
    };
    africa_.addTo(map);

map.dragging.disable();
map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();

var sources_button = L.control({
  position: 'topright'
});
sources_button.onAdd = function(map) {
  var div = L.DomUtil.create('div', 'sources');
  div.innerHTML += '<a style="color: #f8b739;" type="button" target="_blank" href="https://docs.google.com/spreadsheets/d/1VR5mnOV3i6O8kXhh5SQb6tqMvevd02NXHldx3tOTZl4/edit#gid=462012943">Data Sources</a>'
  return div;
};
sources_button.addTo(map);



L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);

function setParent(el, newParent) {
  newParent.appendChild(el);
}

// health centers
var health_centers = L.geoJson(health_centers, {
  pointToLayer: function(feature, latlng) {
    return new L.CircleMarker(latlng, {
      radius: 5,
      fillOpacity: 1,
      color: 'black',
      fillColor: 'red',
      weight: 0.6,
    });
  }
});
health_centers.eachLayer(function(layer) {
  layer.bindPopup('<strong>District:</strong> ' + layer.feature.properties.District + '<br>' + '<strong>SubCounty:</strong> ' +
  layer.feature.properties.Subcounty + '<br>' + '<strong>Parish:</strong> ' +
  layer.feature.properties.Parish + '<br>' + '<strong>Name:</strong> ' +
  layer.feature.properties.Name + '<br>' + '<strong>Grade:</strong> ' +
  layer.feature.properties.Grade + '<br>' + '<strong>Ownership:</strong> ' +
  layer.feature.properties.Ownership);
  layer.on('mouseover', function(e) {
    this.openPopup();
  });
  layer.on('mouseout', function(e) {
    this.closePopup();
  });
});

// border points
var border_points = L.geoJson(border_points, {
  pointToLayer: function(feature, latlng) {
    return new L.CircleMarker(latlng, {
      radius: 5,
      fillOpacity: 1,
      color: 'black',
      fillColor: 'yellow',
      weight: 0.6,
    });
  }
}).addTo(map);
border_points.eachLayer(function(layer) {
  layer.bindPopup('<strong>District:</strong> ' + layer.feature.properties.District + '<br>' + '<strong>Name:</strong> ' +
  layer.feature.properties.Name + '<br>' + '<strong>Path:</strong> ' +
  layer.feature.properties.Path);
  layer.on('mouseover', function(e) {
    this.openPopup();
  });
  layer.on('mouseout', function(e) {
    this.closePopup();
  });
});

// markets
var markets = L.geoJson(markets, {
  pointToLayer: function(feature, latlng) {
    return new L.CircleMarker(latlng, {
      radius: 5,
      fillOpacity: 1,
      color: 'black',
      fillColor: 'green',
      weight: 0.6,
    });
  }
});
markets.eachLayer(function(layer) {
  layer.bindPopup('<strong>Name:</strong> ' + layer.feature.properties.name + '<br>' + '<strong>District:</strong> ' +
  layer.feature.properties.addr_district + '<br>' + '<strong>SubCounty:</strong> ' +
  layer.feature.properties.addr_subcounty + '<br>' + '<strong>Parish:</strong> ' +
  layer.feature.properties.addr_parish + '<br>' + '<strong>Open Hours:</strong> ' +
  layer.feature.properties.opening_hours);
  layer.on('mouseover', function(e) {
    this.openPopup();
  });
  layer.on('mouseout', function(e) {
    this.closePopup();
  });
});

// water access
var water_points = L.geoJson(water_points, {
  pointToLayer: function(feature, latlng) {
    return new L.CircleMarker(latlng, {
      radius: 5,
      fillOpacity: 1,
      color: 'black',
      fillColor: 'blue',
      weight: 0.6,
    });
  }
});
water_points.eachLayer(function(layer) {
  layer.bindPopup('<strong>Name:</strong> ' + layer.feature.properties.name + '<br>' + '<strong>County:</strong> ' +
  layer.feature.properties.addr_county + '<br>' + '<strong>Village:</strong> ' +
  layer.feature.properties.addr_village + '<br>' + '<strong>Type:</strong> ' +
  layer.feature.properties.waterway + '<br>' + '<strong>Amenity:</strong> ' +
  layer.feature.properties.amenity + '<br>' + '<strong>Status:</strong> ' +
  layer.feature.properties.operational_status + '<br>' + '<strong>Operator:</strong> ' +
  layer.feature.properties.operator + '<br>' + '<strong>Operator Type:</strong> ' +
  layer.feature.properties.operator_type + '<strong>Pump:</strong> ' +
  layer.feature.properties.pump);
  layer.on('mouseover', function(e) {
    this.openPopup();
  });
  layer.on('mouseout', function(e) {
    this.closePopup();
  });
});

// icu beds
var icu_beds = L.geoJson(icu_beds, {
  pointToLayer: function(feature, latlng) {
    return new L.CircleMarker(latlng, {
      radius: 5,
      fillOpacity: 1,
      color: 'black',
      fillColor: 'orange',
      weight: 0.6,
    });
  }
});
icu_beds.eachLayer(function(layer) {
  layer.bindPopup('<strong>Name:</strong> ' + layer.feature.properties.Name + '<br>' + '<strong>Location:</strong> ' +
  layer.feature.properties.location + '<br>' + '<strong>Ownership:</strong> ' +
  layer.feature.properties.ownership + '<br>' + '<strong>Services:</strong> ' +
  layer.feature.properties.services + '<br>' + '<strong>Referral:</strong> ' +
  layer.feature.properties.referral + '<br>' + '<strong>ICU Beds:</strong> ' +
  layer.feature.properties.beds);
  layer.on('mouseover', function(e) {
    this.openPopup();
  });
  layer.on('mouseout', function(e) {
    this.closePopup();
  });
});

var layMaps = {
  // "Border Points": border_points,
  "Health Centers": health_centers,
  "ICU Beds Per Health Center": icu_beds,
  // "bjaha": pop,
  // "Market Places": markets,
  // "Water Access Points": water_points,
};

L.control.layers(layMaps, "",{
  collapsed: false
}).addTo(map);

// var layMaps2 = {
//   "Border Points": border_points,
//   "Market Places": markets,
//   // "Water Access Points": water_points,
// };

// L.control.layers("", layMaps2, "",{
//   collapsed: false
// }).addTo(map);


// var legendFrom = $('.leaflet-control-layers-expanded');
// var legendTo = $('.infra');
// setParent(legendFrom[0], legendTo[0]);

// var legendFrom = $('.leaflet-bottom.leaflet-left');
// var legendTo = $('.hotspot');
// setParent(legendFrom[0], legendTo[0]);

// var legendFrom = $('.leaflet-control-layers-expanded');
// var legendTo = $('.infra');
// setParent(legendFrom[0], legendTo[0]);

// styling layers
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

  var pop = new L.GeoJSON(districts_data, {
    style: stylepop,
    onEachFeature: function(feature, layer) {
      layer.bindPopup(
        '<strong>District:</strong> ' + layer.feature.properties.DNama2017 +
        '<br>' + '<strong>Total Population:</strong> ' + layer.feature.properties.TotalPopn +
        '<br>' + '<strong>Male:</strong> ' + layer.feature.properties.Male +
        '<br>' + '<strong>Female:</strong> ' + layer.feature.properties.Female
      );
      layer.on('mouseover', function (e) {
        this.openPopup();
      });
      layer.on('mouseout', function (e) {
        this.closePopup();
      });
    }
  }).addTo(map);

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
    addLegend([5000, 150000, 250000, 350000, 2000000], getColorpop, "Population");

    // L.control.layers(layMaps, "",{
    //   collapsed: false
    // }).addTo(map);

    var layMaps = {
      "Border Points": pop,
    };

    var legendFrom = $('.leaflet-control-layers-expanded');
    var legendTo = $('.infra');
    setParent(legendFrom[0], legendTo[0]);
