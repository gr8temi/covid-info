import { covidDataConstant } from "../constants/covidInfo.constants";

const initialState = {
  covidDataFetchSuccess: false,
  covidDataFetchError: "",
  covidDataFetchLoading: false,
  covidData: [],
};

const covidDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case covidDataConstant.FETCH_COVID_DATA_START:
      return {
        ...state,
        covidDataFetchLoading: true,
        covidDataFetchError: "",
        covidDataFetchSuccess: false,
      };
    case covidDataConstant.FETCH_COVID_DATA_SUCCESS:
      return {
        ...state,
        covidDataFetchLoading: false,
        covidDataFetchError: "",
        covidDataFetchSuccess: true,
        covidData: action.payload,
      };
    case covidDataConstant.FETCH_COVID_DATA_FAIL:
      return {
        ...state,
        covidDataFetchLoading: false,
        covidDataFetchError: action.payload,
        covidDataFetchSuccess: false,
        covidData: [],
      };

    default:
      return state;
  }
};
export default covidDataReducer;
