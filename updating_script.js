/*
some countries are missing because of the way they are named in the api
- Cote d'Ivoire
- Congo (Brazzaville)
- Congo (Kinshasa)
- Lesotho is not there in the API
- Reunion is part of France?!
- Same for Mayotte...also France
- Saint Helena is British
- Comoros does not exist?
*/

function getCovidData() {
    //  get sheet data
    let missing_countries = ["Congo (Brazzaville)", "Congo (Kinshasa)"]
    let ss = SpreadsheetApp.getActive()
    let source_sheet = ss.getSheetByName("Sources")
    let country_column = source_sheet.getRange(
      2, 1, source_sheet.getMaxRows() - 1
    ).getValues().filter(country => {if (country != ""){return true} return false})
  
    let countries_from_gsheet = []
    country_column.forEach(country => {
      countries_from_gsheet.push(country[0])
    })
  
    // Get missing countries
    response.forEach(country_object => {
        if (missing_countries.includes(country_object["Country_Region"])){
            Object.defineProperty(obj, newElem,
                Object.getOwnPropertyDescriptor(obj, oldElem));
            delete obj[oldElem];
            }
    })
  
    //  get data from API
    let response = UrlFetchApp.fetch('https://coronavirus.m.pipedream.net/');
    response = JSON.parse(response.getContentText())["rawData"]
    let african_data = response.filter(country_object => {
     if (countries_from_gsheet.includes(country_object["Country_Region"])) {
      return true
     }
     return false
    })
    
    
    let countries_from_gsheet_obj = {};
    country_column.forEach((country, i) => {
      //  add 2 to account for the column headers
      countries_from_gsheet_obj[country[0]] = i + 2
    })
    
    let african_data_object = {}
    african_data.forEach(obj_ => {
      african_data_object[obj_["Country_Region"]] = obj_
    })
    
    let new_cases_array = []
    let new_deaths_array = []
    countries_from_gsheet.forEach(country => {
      if (african_data_object[country]) {
       new_cases_array.push([country, african_data_object[country]["Confirmed"]])
       new_deaths_array.push([country, african_data_object[country]["Deaths"]])
      }
    })
    new_cases_array.forEach(arr_ => {
      source_sheet.getRange(`E${countries_from_gsheet_obj[arr_[0]]}`).setValue(arr_[1]);
    })
    new_deaths_array.forEach(arr_ => {
      source_sheet.getRange(`F${countries_from_gsheet_obj[arr_[0]]}`).setValue(arr_[1]);
    })
  
  
  }
  