
let layers_ = {
    "Cases": {
        gsheet_keys: ["POP", "CASES"],
        legend_fn: getColorcases,
        popup_text: ["Population", "Cases"],
        legend_array: [0, 1, 100, 1000, 4000]
    },
    "Deaths": {
        gsheet_keys: ["POP", "DEATHS"],
        legend_fn: getColordeaths,
        popup_text: ["Population", "Deaths"],
        legend_array: [0, 1, 100, 300, 400]
    },
    "Cases per 100,000 people": {
        gsheet_keys: ["POP", "CASES", "CASES_PER_100,000"],
        legend_fn: getColorcasesratio,
        popup_text: ["Population", "Cases", "Cases per 100,000 people"],
        legend_array: [0, 1, 10, 100, 140]
    },
    "Deaths per 100,000 people": {
        gsheet_keys: ["POP", "DEATHS", "DEATHS_PER_100,000"],
        legend_fn: getColordeathsratio,
        popup_text: ["Population", "Deaths", "Deaths per 100,000 people"],
        legend_array: [0, 0.1, 0.2, 0.5, 1.0]
    },
    "Ventilators": {
        gsheet_keys: ["POP", "VENTILATORS", "PEOPLE_PER_VENT"],
        legend_fn: getColordeathsratio,
        popup_text: ["Population", "Ventilators", "People per ventilator"],
        legend_array: [9000, 500000, 1000000, 2000000, 10000000]
    },
    "ICU Beds": {
        gsheet_keys: ["POP", "ICU", "PEOPLE_PER_ICU"],
        legend_fn: getColorICU,
        popup_text: ["Population", "ICU Beds", "People per ICU"],
        legend_array: [9000, 500000, 1000000, 10000000, 20000000]
    },
    "Population Density": {
        gsheet_keys: ["POP", "DENSITY"],
        legend_fn: getColordensity,
        popup_text: ["Population", "Population Density"],
        legend_array: [3, 20, 100, 400, 700]
    },
    "HIV/AIDS(%)": {
        gsheet_keys: ["POP", "HIV_rates", "HIV_percentage"],
        legend_fn: getColorHIV,
        popup_text: ["Population", "HIV rates", "HIV percentage"],
        legend_array: [0.1, 2.5, 5.0, 10.0, 20.0]
    },
    "TB(%)": {
        gsheet_keys: ["POP", "TB_rates", "TB_percentage"],
        legend_fn: getColorTB,
        popup_text: ["Population", "TB rates", "TB percentage"],
        legend_array: [0.01, 0.05, 0.1, 0.2, 0.4]
    },
    "Elderly(% Over 65 in age)": {
        gsheet_keys: ["POP", "Elderly_rates", "Elderly_percentage"],
        legend_fn: getColorelderly,
        popup_text: ["Population", "Elderly rates", "Elderly percentage"],
        legend_array: [2, 3, 4, 8, 11]
    },
}
