import { covidDataConstant } from "../constants/covidData.constants";

const initialState = {
  covidDataInfoSuccess: false,
  covidDataInfoError: "",
  covidDataInfoLoading: false,
  countries: [],
  summary: {},
};

const covidInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case covidDataConstant.FETCH_COVIDINFO_START:
      return {
        ...state,
        covidDataInfoLoading: true,
        covidDataInfoError: "",
        covidDataInfoSuccess: false,
      };
    case covidDataConstant.FETCH_COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: action.payload,
      };
    case covidDataConstant.FETCH_COVIDINFO_FAIL:
      return {
        ...state,
        covidDataInfoLoading: false,
        covidDataInfoError: action.payload,
        covidDataInfoSuccess: false,
        countries: [],
      };
    case covidDataConstant.FETCH_SUMMARY:
      return {
        ...state,
        summary: action.payload,
      };
    case covidDataConstant.FETCH_INFO_END:
      return {
        ...state,
        covidDataInfoLoading: false,
        covidDataInfoError: "",
        covidDataInfoSuccess: true,
      };

    default:
      return state;
  }
};
export default covidInfoReducer;
