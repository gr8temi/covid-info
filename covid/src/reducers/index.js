import { combineReducers } from "redux";
import countriesReducer from "./countries.reducer";
import covidDataReducer from "./covidInfo.reducer";
export default combineReducers({
  countriesReducer,
  covidDataReducer,
});
