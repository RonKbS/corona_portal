

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

function getColordeaths(d) {
    return d > 400 ? '#006837' :
        d > 399 ? '#006837' :
        d > 300 ? '#31a354' :
        d > 299 ? '#31a354' :
        d > 100 ? '#78c679' :
        d > 99 ? '#78c679' :
        d > 1 ? '#c2e699' :
        d > 0.9 ? '#c2e699' :
        d > 0 ? '#ffffcc' :
        d > -1 ? '#ffffcc' :
        d > null ? '#808080' :
        '#808080';
}

function getColorcasesratio(d) {
    return d > 140 ? '#980043' :
        d > 139 ? '#980043' :
        d > 100 ? '#dd1c77' :
        d > 99 ? '#dd1c77' :
        d > 10 ? '#df65b0' :
        d > 9.9 ? '#df65b0' :
        d > 1 ? '#d7b5d8' :
        d > 0.9 ? '#d7b5d8' :
        d > 0 ? '#f1eef6' :
        d > -1 ? '#f1eef6' :
        d > null ? '#808080' :
        '#808080';
}

function getColordeathsratio(d) {
    return d > 1.0 ? '#bd0026' :
        d > 0.9 ? '#bd0026' :
        d > 0.5 ? '#f03b20' :
        d > 0.49 ? '#f03b20' :
        d > 0.2 ? '#fd8d3c' :
        d > 0.19 ? '#fd8d3c' :
        d > 0.1 ? '#fecc5c' :
        d > 0.09 ? '#fecc5c' :
        d > 0 ? '#ffffb2' :
        d > -1 ? '#ffffb2' :
        d > null ? '#808080' :
        '#808080';
}

function getColorvents(d) {
    return   d > 10000000 ? '#08306b' :
        d > 9999999 ? '#08306b' :
        d > 2000000 ? '#2879b9' :
        d > 1999999 ? '#2879b9' :
        d > 1000000 ? '#73b3d8' :
        d > 999999 ? '#73b3d8' :
        d > 500000 ? '#c8ddf0' :
        d > 499999 ? '#c8ddf0' :
        d > 9000 ? '#f7fbff' :
        d > 8999 ? '#f7fbff' :
        '#808080';
}

function getColorICU(d) {
    return d > 20000000 ? '#67000d' :
        d > 19999999 ? '#67000d' :
        d > 10000000 ? '#d42020' :
        d > 9999999 ? '#d42020' :
        d > 1000000 ? '#fc7050' :
        d > 999999 ? '#fc7050' :
        d > 500000 ? '#fdbea5' :
        d > 499999 ? '#fdbea5' :
        d > 9000 ? '#fff5f0' :
        d > 8999 ? '#fff5f0' :
        '#808080';
}

function getColordensity(d) {
    return d > 700 ? '#993404' :
        d > 699 ? '#993404' :
        d > 300 ? '#d95f0e' :
        d > 299 ? '#d95f0e' :
        d > 100 ? '#fe9929' :
        d > 99 ? '#fe9929' :
        d > 20 ? '#fed98e' :
        d > 19 ? '#fed98e' :
        d > 3 ? '#ffffd4' :
        d > 2.9 ? '#ffffd4' :
        '#808080';
}

function getColorHIV(d) {
    return d > 20.0 ? '#00441b' :
        d > 19.9 ? '#00441b' :
        d > 10.0 ? '#2a924a' :
        d > 9.9 ? '#2a924a' :
        d > 5.0 ? '#7bc87c' :
        d > 5.9 ? '#7bc87c' :
        d > 2.5 ? '#caeac3' :
        d > 2.4 ? '#caeac3' :
        d > 0.1 ? '#f7fcf5' :
        d > 0 ? '#f7fcf5' :
        d > null ? '#f7fcf5' :
        '#808080';
}

function getColorTB(d) {
    d = parseFloat(d);
    return  d > 0.4 ? '#810f7c' :
        d > 0.39 ? '#810f7c' :
        d > 0.2 ? '#8856a7' :
        d > 0.19 ? '#8856a7' :
        d > 0.1 ? '#8c96c6' :
        d > 0.09 ? '#8c96c6' :
        d > 0.05 ? '#b3cde3' :
        d > 0.04 ? '#b3cde3' :
        d > 0.01 ? '#edf8fb' :
        d > 0.0 ? '#edf8fb' :
        d > null ? '#808080' :
        '#808080';
}

function getColorelderly(d) {
    return d > 11 ? '#253494' :
        d > 10 ? '#253494' :
        d > 8 ? '#2c7fb8' :
        d > 7 ? '#2c7fb8' :
        d > 4 ? '#41b6c4' :
        d > 3.9 ? '#41b6c4' :
        d > 3 ? '#a1dab4' :
        d > 2.9 ? '#a1dab4' :
        d > 2 ? '#ffffcc' :
        d > 1.9 ? '#ffffcc' :
        d > null ? '#808080' :
        '#808080';
}

function getColorfiscal(d) {
    return d > 1 ? '#15841b' :
      d > 0 ? '#15841b' :
      '#adadad';
  }
