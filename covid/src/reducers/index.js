import { combineReducers } from "redux";
import covidInfoReducer from "./covidData.reducer";
import countryCovidDataReducer from "./countryCovidInfo.reducer";
export default combineReducers({
  covidInfoReducer,
  countryCovidDataReducer,
});
