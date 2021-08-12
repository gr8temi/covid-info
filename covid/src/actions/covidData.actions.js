import { covidDataConstant } from "../constants/covidData.constants";
import request from "../request";

const fetchCountriesStarted = () => ({
  type: covidDataConstant.FETCH_COVIDINFO_START,
});

const fetchAllCountriesSuccess = (payload) => ({
  type: covidDataConstant.FETCH_COUNTRIES_SUCCESS,
  payload,
});

const fetchAllCountriesFail = (payload) => ({
  type: covidDataConstant.FETCH_COVIDINFO_FAIL,
  payload,
});

const fetchSummary = (payload) => ({
  type: covidDataConstant.FETCH_SUMMARY,
  payload,
});
const fetchEnd = () => ({
  type: covidDataConstant.FETCH_INFO_END,
});

export const fetchCountriesAndSummary = () => async (dispatch) => {
  try {
    dispatch(fetchCountriesStarted());
    const response = await request.get("/countries");
    dispatch(fetchAllCountriesSuccess(response.data));
    const summaryResponse = await request.get("/summary");
    dispatch(fetchSummary(summaryResponse.data));
    dispatch(fetchEnd());
  } catch (err) {
    dispatch(fetchAllCountriesFail(err.response));
  }
};
