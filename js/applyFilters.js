function filterMap() {
    var arr = [
        "False"
    ];

    for (key in map["_layers"]) {
        if (
            typeof map["_layers"][key]["feature"] !== "undefined" &&
            map["_layers"][key]["feature"]["geometry"]["type"] === "MultiPolygon"
        ) {
            let filter = [];
            var l = map["_layers"][key];
            filters.forEach((element, index) => {
                let value = filter_data_obj[l.feature.properties.COUNTRY][index].split(",").join("");
                if (parseFloat(value) > dataToFilter[element][0] && parseFloat(value) < dataToFilter[element][1]) {
                    filter.push("True");
                } else filter.push("False")
            });
            const found = filter
                .some(r => arr.includes(r));
              if (found) {
                l.setStyle({
                  opacity: 0,
                  fillOpacity: 0
                });
              } else {
                l.setStyle({
                  opacity: 1,
                  fillOpacity: 1
                });
              }
        }
    }

}