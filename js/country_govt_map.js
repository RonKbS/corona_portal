
let highlight = {
          weight: 2,
          opacity: 2,
          color: '#000000b8',
          fillOpacity: 10,
          fillColor: 'yellow'
};

function getColorfiscal(d) {
  return d > 1 ? '#15841b' :
    d > 0 ? '#15841b' :
    '#adadad';
}

let govt_intervention_layer = (element) => {

  if (element.id === "fiscal") {
    highlight_button(element)

    let govt_intervention_obj = {}
    second_google_sheet_data.forEach(object_ => {
      govt_intervention_obj[object_["COUNTRY"]] = [
        object_["POP"],
        object_["Intro"],
        object_["Fiscal"],
        object_["Fiscal2"]
      ]
    })

    if (african_data && african_data._map) {
      map.removeLayer(african_data)
    }

    african_data = L.geoJSON(africa_data, {
      style: stylefiscal
    }).addTo(map);


    african_data.on("click", onFeatureGroupClick);

    function onFeatureGroupClick(e) {
      if (!$("#messages").hasClass("sidebar-pane active")) {
        sidebar.open("messages")
        show_hamburg_button()
      }
      let group = e.target,
          layer = e.layer;

      group.setStyle(stylefiscal);
      layer.setStyle(highlight);
    }

    african_data.eachLayer(function(layer) {
      let country_ = layer.feature.properties.COUNTRY;
      layer.on('click', function(e) {
        document.getElementById("info").innerHTML = `<strong>Country: </strong>\
        ${country_}<br><strong>Population: </strong>${govt_intervention_obj[country_][0]}\
        <br><strong>Introduction: </strong>${govt_intervention_obj[country_][1]}<br>\
        <strong>Fiscal Policy: </strong>${govt_intervention_obj[country_][2]}`;
      });
    });

    function stylefiscal(feature) {
      return {
        fillColor: getColorfiscal(parseFloat(govt_intervention_obj[feature.properties.COUNTRY][3].split(",").join(""))),
        weight: 1,
        opacity: 1,
        color: 'black',
        dashArray: '0',
        fillOpacity: 1
      };
    }
    addLegend([0, 1], getColorfiscal);
  } else if (element.id === "monetary") {
    highlight_button(element)

    let govt_intervention_obj = {}
    second_google_sheet_data.forEach(object_ => {
      govt_intervention_obj[object_["COUNTRY"]] = [
        object_["POP"],
        object_["Intro"],
        object_["Monetary_and_Macro_financial"],
        object_["Monetary"]
      ]
    })

    if (african_data && african_data._map) {
      map.removeLayer(african_data)
    }

    african_data = L.geoJSON(africa_data, {
      style: stylefiscal
    }).addTo(map);


    african_data.on("click", onFeatureGroupClick);

    function onFeatureGroupClick(e) {
      if (!$("#messages").hasClass("sidebar-pane active")) {
        sidebar.open("messages")
        show_hamburg_button()
      }
      let group = e.target,
          layer = e.layer;

      group.setStyle(stylefiscal);
      layer.setStyle(highlight);
    }

    african_data.eachLayer(function(layer) {
      let country_ = layer.feature.properties.COUNTRY;
      layer.on('click', function(e) {
        document.getElementById("info").innerHTML = `<strong>Country: </strong>\
        ${country_}<br><strong>Population: </strong>${govt_intervention_obj[country_][0]}\
        <br><strong>Introduction: </strong>${govt_intervention_obj[country_][1]}<br><strong>\
        Monetary and Macro financial: </strong>${govt_intervention_obj[country_][2]}`;
      });
    });

    function stylefiscal(feature) {
      return {
        fillColor: getColorfiscal(parseFloat(govt_intervention_obj[feature.properties.COUNTRY][3].split(",").join(""))),
        weight: 1,
        opacity: 1,
        color: 'black',
        dashArray: '0',
        fillOpacity: 1
      };
    }
    addLegend([0, 1], getColorfiscal);

  } else if (element.id === "exchange") {
    highlight_button(element)

    let govt_intervention_obj = {}
    second_google_sheet_data.forEach(object_ => {
      govt_intervention_obj[object_["COUNTRY"]] = [
        object_["POP"],
        object_["Intro"],
        object_["Exchange_rate_and_balance_of_payments"],
        object_["Exchange"],
        object_["Source1"],
      ]
    })

    if (african_data && african_data._map) {
      map.removeLayer(african_data)
    }



    african_data = L.geoJSON(africa_data, {
      style: stylefiscal
    }).addTo(map);


    african_data.on("click", onFeatureGroupClick);

    function onFeatureGroupClick(e) {
      if (!$("#messages").hasClass("sidebar-pane active")) {
        sidebar.open("messages")
        show_hamburg_button()
      }
      let group = e.target,
          layer = e.layer;

      group.setStyle(stylefiscal);
      layer.setStyle(highlight);
    }

    african_data.eachLayer(function(layer) {
      let country_ = layer.feature.properties.COUNTRY;
      layer.on('click', function(e) {
        document.getElementById("info").innerHTML = `<strong>Country: </strong>${country_}\
        <br><strong>Population: </strong>${govt_intervention_obj[country_][0]}<br><strong>\
        Introduction: </strong>${govt_intervention_obj[country_][1]}<br>\
        <strong>Exchange rate and balance of payments: </strong>${govt_intervention_obj[country_][2]}
        <br><strong>Source: </strong>\
        <a href=${govt_intervention_obj[country_][4]} target='_blank' class='text-white'><u>IMF DATA</u></a>`;
      });
    });

    function stylefiscal(feature) {
      return {
        fillColor: getColorfiscal(parseFloat(govt_intervention_obj[feature.properties.COUNTRY][3].split(",").join(""))),
        weight: 1,
        opacity: 1,
        color: 'black',
        dashArray: '0',
        fillOpacity: 1
      };
    }
    addLegend([0, 1], getColorfiscal);
  } else if (element.id === "country") {
    highlight_button(element)

    let country_intervention_obj = {}
    second_google_sheet_data.forEach(object_ => {
      country_intervention_obj[object_["COUNTRY"]] = [
        object_["POP"],
        object_["Humanitarian_exemption"],
        object_["Lockdown"],
        object_["Movement_restrictions"],
        object_["Public_health_measures"],
        object_["Social_and_economic_measures"],
        object_["Social_distancing"],
        object_["Source2"],
      ]
    })

    if (african_data && african_data._map) {
      map.removeLayer(african_data)
    }

    let style2 = {
      weight: 2,
      opacity: 2,
      color: '#000000b8',
      fillOpacity: 2.5,
      fillColor: '#AAA583'
    };

    african_data = L.geoJSON(africa_data, {
      style: style2
    }).addTo(map);


    african_data.on("click", onFeatureGroupClick);

    function onFeatureGroupClick(e) {
      if (!$("#messages").hasClass("sidebar-pane active")) {
        sidebar.open("messages")
        show_hamburg_button()
      }
      let group = e.target,
          layer = e.layer;

      group.setStyle(style2);
      layer.setStyle(highlight);
    }

    african_data.eachLayer(function(layer) {
      let country_ = layer.feature.properties.COUNTRY;
      layer.on('click', function(e) {
        document.getElementById("info").innerHTML = `<strong>Country: </strong>${country_}\
        <br><strong>Population: </strong>${country_intervention_obj[country_][0]}<br>\
        <strong>Humanitarian Exemption: </strong>${country_intervention_obj[country_][1]}\
        <br><strong>Lock Down: </strong>${country_intervention_obj[country_][2]}<br><strong>\
        Movement Restrictions: </strong>${country_intervention_obj[country_][3]}<br>\
        <strong>Public health measures: </strong>${country_intervention_obj[country_][4]}<br>\
        <strong>Social and economic measures: </strong>${country_intervention_obj[country_][5]}\
        <br><strong>Social distancing: </strong>${country_intervention_obj[country_][6]}\
        <br><strong>Source: </strong>\
        <a href=${country_intervention_obj[country_][7]} target='_blank' class='text-white'><u>ACAPS DATASET</u></a>`;
      });
    });
    // favicon is missing in staging
    map.removeControl(legend);
  }
}
