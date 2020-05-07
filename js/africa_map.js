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
  minZoom: 3,
  maxZoom: 3
}).setView([2.8, 15.24], 2);
let sidebar = L.control.sidebar('sidebar').addTo(map);
sidebar.open("layers")

// display that cookies are being used on first time visit
let cookieUsageDisplay = localStorage.getItem('cookieusagedisplayed');
if (cookieUsageDisplay === null) {
  let cookies_button = L.control({
    position: 'topright'
  });
  cookies_button.onAdd = () => {
    let div = L.DomUtil.create('div', 'cooookie');
    // next to btn-link  style="color: #f8b739;"
    div.innerHTML += '<h5\
    style="background-color:#4e4e4e; padding: 0 3px 0 3px; color: white; border-radius: 10px">\
    <button type="button" class="btn btn-link" id="coookie_button">\
    <i class="fa fa-times"></i></button>\
    By continuing to view this site, you agree to our usage of\
    <a style="color: #f8b739;" type="button" target="_blank" href="/cookie.html"\
    >cookies</a></h5>'
    return div;
  };
  cookies_button.addTo(map);

  $("#coookie_button").click(() => {
    cookies_button.remove()
    localStorage.setItem('cookieusagedisplayed', true)
  });

}

// responsiveness styling
$(".sidebar-list").css(
  "max-height", `${parseInt($(".sidebar-content").css("height"), 10) - 187}px`
)
$(window).resize(() => {
  document.getElementById("map").setAttribute("style", `height: ${window.innerHeight}px`);
  $(".sidebar-list").css(
    "max-height", `${parseInt($(".sidebar-content").css("height"), 10) - 187}px`
  );
}
)

map.dragging.disable();
map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();

let sources_button = L.control({
  position: 'topright'
});
sources_button.onAdd = () => {
  let div = L.DomUtil.create('div', 'sources');
  div.innerHTML += '<a style="color: #f8b739;" type="button" target="_blank" href="https://docs.google.com/spreadsheets/d/1VR5mnOV3i6O8kXhh5SQb6tqMvevd02NXHldx3tOTZl4/edit#gid=0">Data Sources</a>'
  return div;
};
sources_button.addTo(map);



L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);

let african_data;

function getColorcases(d) {
  return  d > 4000 ? '#016c59' :
    d > 3999 ? '#016c59' :
    d > 1000 ? '#1c9099' :
    d > 999 ? '#1c9099' :
    d > 100 ? '#67a9cf' :
    d > 99 ? '#67a9cf' :
    d > 1 ? '#bdc9e1' :
    d > 0.9 ? '#bdc9e1' :
    d > 0 ? '#f6eff7' :
    d > -1 ? '#f6eff7' :
    d > null ? '#808080' :
    '#808080';
}


axios.all(axioses)
  .then(responseArrs => {
    google_sheet_data = $.csv.toObjects(responseArrs[0].data);
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
    addLegend([1, 100, 500, 1000, 2000, 3000, 4500], getColorcases, "Cases");

    $("#homeSubmenu5").attr("class", "list-unstyled collapse show")
    $("a[onclick='cases_layer(this);']")[0].setAttribute("style", "color: #f8b739;")

  })
