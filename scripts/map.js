//function that load the map on when the window loads 
$(window).on('load', function () {
  var documentSettings = {};
  var markerColors = [];

  var polygonSettings = [];
  var polygonSheets = 1;
  var polygonsLegend;

  var completePoints = false;
  var completePolygons = false;
  var completePolylines = false;

	/**
	   * Returns an Awesome marker with specified parameters
	   */
  function createMarkerIcon(icon, prefix, markerColor, iconColor) {
    return L.AwesomeMarkers.icon({
      icon: icon,
      prefix: prefix,
      markerColor: markerColor,
      iconColor: iconColor
    });
  }


	/**
	   * Sets the map view so that all markers are visible, or
	   * to specified (lat, lon) and zoom if all three are specified
	   */
  function centerAndZoomMap(points) {
    var lat = map.getCenter().lat, latSet = false;
    var lon = map.getCenter().lng, lonSet = false;
    var zoom = 12, zoomSet = false;
    var center;

    if (getSetting('_initLat') !== '') {
      lat = getSetting('_initLat');
      latSet = true;
    }

    if (getSetting('_initLon') !== '') {
      lon = getSetting('_initLon');
      lonSet = true;
    }

    if (getSetting('_initZoom') !== '') {
      zoom = parseInt(getSetting('_initZoom'));
      zoomSet = true;
    }

    if ((latSet && lonSet) || !points) {
      center = L.latLng(lat, lon);
    }
    else {

      center = points.getBounds().getCenter();
    }

    if (!zoomSet && points) {
      zoom = map.getBoundsZoom(points.getBounds());
    }

    map.setView(center, zoom);
  }


	/**
	   * Given a collection of points, determines the layers based on 'Group'
	   * column in the spreadsheet.
	   */
  function determineLayers(points) {

    (function (d3, $, queue, window) {
      'use strict';
      // https://www.humanitarianresponse.info/en/operations/afghanistan/cvwg-3w
      // https://public.tableau.com/profile/geo.gecko#!/vizhome/Districtpolygon/v1?publish=yes
      'use strict';
      String.prototype.replaceAll = function (search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
      };
      String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
      };

      // map.bounds = [],
      //   map.setMaxBounds([
      //     [5.5, 30.5],
      //     [-0.5, 35.5]
      //   ])
      // map.options.maxZoom = 12;
      // map.options.minZoom = 7;
      map.zoomSnap = 0.25;

      var geojson;

      $.getJSON('data/ugandaDistricts_wgs84_simple.geojson', function (data) {
        function highlightFeature(e) {
          var layer = e.target;
          console.log(layer.feature.properties)
          points.forEach(element => {
            if (element.District.toLowerCase() == layer.feature.properties.DName2016.toLowerCase()) {
              for (var attrname in element) { layer.feature.properties[attrname] = element[attrname]; }
            }

          });
          info.update(layer.feature.properties);

          layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
          });

          if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
          }
        }

        function resetHighlight(e) {
          geojson.resetStyle(e.target);
          info.update();
        }

        function zoomToFeature(e) {
          var layer = e.target;
          points.forEach(element => {
            if (element.District.toLowerCase() == layer.feature.properties.DName2016.toLowerCase()) {
              for (var attrname in element) { layer.feature.properties[attrname] = element[attrname]; }
            }

          });
          info.update(layer.feature.properties);
          map.fitBounds(e.target.getBounds());
        }

        function onEachFeature(feature, layer) {
          layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
          });
        }


        geojson = L.geoJson(data, {
          onEachFeature: onEachFeature
        }).addTo(map);

        map.fitBounds(geojson.getBounds());
      });



      var info = L.control();

      info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
      };

      // method that we will use to update the control based on feature properties passed
      info.update = function (props) {
        this._div.innerHTML = '<h4>Information</h4>' + (props ?
          '<b> District Name in 2019: ' + props.DName2019 + '</b><br /> <b> District Name in 2016: ' + props.DName2016 + '</b> <br /> Region: ' + props.F15Regions + '<br />' +
          '<h4>DHO - Information</h4>' +
          '<b> DHO Name: ' + props["DHO Name"] + '</b><br />' +
          '<b> DHO Tel Contact: ' + props["DHO Tel Contact"] + '</b><br />' +
          '<b> DHO Email Contact: ' + props["DHO Email Contact"] + '</b><br />' +
          '<h4>DSFP - Information</h4>' +
          '<b>DSFP Name: ' + props["DSFP Name"] + '</b><br />' +
          '<b>DSFP Tel Contact: ' + props["DSFP Tel Contact"] + '</b><br />' +
          '<b>DSFP Email Contact: ' + props["DSFP Email Contact"] + '</b><br />'
          : 'Hover over a district');
      };

      info.addTo(map);



      window.addEventListener("resize", function () {
        var wrapper = d3.select("#d3-map-wrapper");
        var width = wrapper.node().offsetWidth || 960;
        var height = wrapper.node().offsetHeight || 480;
        if (width) {
          d3.select("#d3-map-wrapper").select("svg")
            .attr("viewBox", "0 0 " + width + " " + height)
            .attr("width", width)
            .attr("height", height);
        }
      });



    })(d3, $, queue, window);

    $('#map').css('visibility', 'visible');
    $('.loader').hide();

  }



	/**
	   * Here all data processing from the spreadsheet happens
	   */
  function onMapDataLoad() {
    var options = mapData.sheets(constants.optionsSheetName).elements;
    createDocumentSettings(options);

    document.title = getSetting('_mapTitle');
    addBaseMap();

    // Add point markers to the map
    var points = mapData.sheets(constants.pointsSheetName);
    var layers;
    var group = '';
    if (points && points.elements.length > 0) {
      layers = determineLayers(points.elements);
    } else {
      completePoints = true;
    }

    centerAndZoomMap(group);


    // Change Map attribution to include author's info + urls
    changeAttribution();


  }

	/**
	   * Changes map attribution (author, GitHub repo, email etc.) in bottom-right
	   */
  function changeAttribution() {
    var attributionHTML = $('.leaflet-control-attribution')[0].innerHTML;
    var credit = 'Data from <a href="https://www.kcca.go.ug/" target="_blank">KCCA</a>, Vizualisation by <a href="https://www.geogecko.com/" target="_blank">GeoGecko</a>';
    var name = getSetting('_authorName');
    var url = getSetting('_authorURL');

    if (name && url) {
      if (url.indexOf('@') > 0) { url = 'mailto:' + url; }
      credit += ' by <a href="' + url + '">' + name + '</a> | ';
    } else if (name) {
      credit += ' by ' + name + ' | ';
    } else {
      credit += ' | ';
    }

    //		credit += 'View <a href="' + getSetting('_githubRepo') + '">code</a>';
    //		if (getSetting('_codeCredit')) credit += ' by ' + getSetting('_codeCredit');
    //		credit += ' with ';
    $('.leaflet-control-attribution')[0].innerHTML = credit + attributionHTML;
  }


	/**
	   * Loads the basemap and adds it to the map
	   */
  function addBaseMap() {
    var basemap = trySetting('_tileProvider', 'CartoDB.Positron');
    L.tileLayer.provider(basemap, {
      maxZoom: 18
    }).addTo(map);
    L.control.attribution({
      position: trySetting('_mapAttribution', 'bottomright')
    }).addTo(map);
  }

	/**
	   * Returns the value of a setting s
	   * getSetting(s) is equivalent to documentSettings[constants.s]
	   */
  function getSetting(s) {
    return documentSettings[constants[s]];
  }

	/**
	   * Returns the value of setting named s from constants.js
	   * or def if setting is either not set or does not exist
	   * Both arguments are strings
	   * e.g. trySetting('_authorName', 'No Author')
	   */
  function trySetting(s, def) {
    s = getSetting(s);
    if (!s || s.trim() === '') { return def; }
    return s;
  }

  function tryPolygonSetting(p, s, def) {
    s = getPolygonSetting(p, s);
    if (!s || s.trim() === '') { return def; }
    return s;
  }

	/**
	   * Triggers the load of the spreadsheet and map creation
	   */
  var mapData;

  $.ajax({
    url: 'csv/Options.csv',
    type: 'HEAD',
    error: function () {
      // Options.csv does not exist, so use Tabletop to fetch data from
      // the Google sheet
      mapData = Tabletop.init({
        key: googleDocURL,
        callback: function (data, mapData) { onMapDataLoad(); }
      });
    },
    success: function () {
      // Get all data from .csv files
      mapData = Procsv;
      mapData.load({
        self: mapData,
        tabs: ['Options', 'Points', 'Polygons', 'Polylines'],
        callback: onMapDataLoad
      });
    }
  });

	/**
	   * Reformulates documentSettings as a dictionary, e.g.
	   * {"webpageTitle": "Leaflet Boilerplate", "infoPopupText": "Stuff"}
	   */
  function createDocumentSettings(settings) {
    for (var i in settings) {
      var setting = settings[i];
      documentSettings[setting.Setting] = setting.Customize;
    }
  }

  // Returns a string that contains digits of val split by comma evey 3 positions
  // Example: 12345678 -> "12,345,678"
  function comma(val) {
    while (/(\d+)(\d{3})/.test(val.toString())) {
      val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
    }
    return val;
  }

});