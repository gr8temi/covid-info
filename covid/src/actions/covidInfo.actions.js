import { covidDataConstant } from "../constants/covidInfo.constants";
import request from "../request";
const fetchCovidDataStarted = () => ({
  type: covidDataConstant.FETCH_COVID_DATA_START,
});

const fetchAllCovidDataSuccess = (payload) => ({
  type: covidDataConstant.FETCH_COVID_DATA_SUCCESS,
  payload,
});

const fetchAllCovidDataFail = (payload) => ({
  type: covidDataConstant.FETCH_COVID_DATA_FAIL,
  payload,
});

export const fetchCovidDataFromDayOne = (country) => async (dispatch) => {
  try {
    dispatch(fetchCovidDataStarted());
    const response = await request.get(`/dayone/country/${country}`);
    dispatch(fetchAllCovidDataSuccess(response.data));
  } catch (err) {
    dispatch(fetchAllCovidDataFail(err.response));
  }
};

export const fetchCovidDataDateRange = (country, startDate, endDate) => async (dispatch) => {
  try {
    dispatch(fetchCovidDataStarted());
    const response = await request.get(`/country/${country}?from=${startDate}&to=${endDate}`);
  
    dispatch(fetchAllCovidDataSuccess(response.data));
  } catch (err) {
    dispatch(fetchAllCovidDataFail(err.response));
  }
};
