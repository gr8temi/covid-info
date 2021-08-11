import { countriesConstant } from "../constants/countries.constants";
import request from "../request";

const fetchCountriesStarted = () => ({
  type: countriesConstant.FETCH_COUNTRIES_START,
});

const fetchAllCountriesSuccess = (payload) => ({
  type: countriesConstant.FETCH_COUNTRIES_SUCCESS,
  payload,
});

const fetchAllCountriesFail = (payload) => ({
  type: countriesConstant.FETCH_COUNTRIES_FAIL,
  payload,
});

export const fetchCountries = () => async (dispatch) => {
  try {
    dispatch(fetchCountriesStarted());
    const response = await request.get("/countries");
    dispatch(fetchAllCountriesSuccess(response.data));
  } catch (err) {
    dispatch(fetchAllCountriesFail(err.response));
  }
};
