let long_id = "1tRF8gjyRd0oA2sSpTKmZqambggZzUM0YiED6KqF8H8M"
let gid = "1502462034"
govt_intervention_gid = "805631867"
border_data_gid = "1699741591"
let url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${gid}`
let govt_intervention_url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${govt_intervention_gid}`
let border_data_url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${border_data_gid}`
let google_sheet_data;
let second_google_sheet_data;
let border_sheet_data;
let prev_highlighted_button;

// set the hightlighted button to show
let highlight_button = (element) => {
  prev_highlighted_button = $("a[style='color: #f8b739;']");
  if (prev_highlighted_button.length != 0) {
    prev_highlighted_button[0].setAttribute("style", "color: rgb(219, 216, 216);");
  }
  element.setAttribute("style", "color: #f8b739;");
}

let show_hamburg_button = () => {
  let hamburg_ = $("a[href='#layers']")[0]
  let flashing_hamburg_ = setInterval(() => {
    hamburg_.setAttribute("style", "background-color: #e15b26;")
    setTimeout(
      () => {
        hamburg_.setAttribute("style", "color: rgb(51, 51, 51);")
      }, 250
    )
  }, 1000)
  setTimeout(() => { clearInterval(flashing_hamburg_) }, 15000)
}

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

map.createPane('choroplethPane');
map.getPane('choroplethPane').style.zIndex = 400;
map.createPane('overlaysPane');
map.getPane('overlaysPane').style.zIndex = 600;


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
    div.innerHTML += '<h6\
    style="background-color:#4e4e4e; padding: 0 3px 0 3px; color: white; border-radius: 10px">\
    <button type="button" class="btn btn-link" id="coookie_button">\
    <i class="fa fa-times"></i></button>\
    By continuing to view this site, you agree to our usage of\
    <a style="color: #f8b739;" type="button" target="_blank" href="/cookie.html"\
    >cookies</a></h6>'
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



// toggle to countries
let countries_ = L.control({ position: 'topright' });



countries_.onAdd = function (map) {
  let div = L.DomUtil.create('div', 'sources countries_');
  div.innerHTML = "<h6 style='color: rgb(248, 183, 57); outline: none;\
    margin-bottom: 0;'><a href='#' onclick='switch_map(map);'\
    style='color: rgb(248, 183, 57);'>UGANDA</a></h6>";
  div.setAttribute("style", "padding-bottom: 5px");
  div.id = "sources countries_"
  return div;
};
countries_.addTo(map);


L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);

let african_data;



axios.get(url)
  .then(responseArrs => {
    google_sheet_data = $.csv.toObjects(responseArrs.data);

    $("a").filter(function () {
      return $(this).text() === "Cases";
    }).click()

    $("#homeSubmenu0").attr("class", "list-unstyled collapse show")
    $("a[onclick='add_layer(this);']")[0].setAttribute("style", "color: #f8b739;")

  })

axios.get(govt_intervention_url)
  .then(responseArrs => {
    second_google_sheet_data = $.csv.toObjects(responseArrs.data);
  })

axios.get(border_data_url)
  .then(responseArrs => {
    border_sheet_data = $.csv.toObjects(responseArrs.data);
  })