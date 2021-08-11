import { countriesConstant } from "../constants/countries.constants";

const initialState = {
  countriesFetchSuccess: false,
  countriesFetchError: "",
  countriesFetchLoading: false,
  countries: [],
};

const countriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case countriesConstant.FETCH_COUNTRIES_START:
      return {
        ...state,
        countriesFetchLoading: true,
        countriesFetchError: "",
        countriesFetchSuccess: false,
      };
    case countriesConstant.FETCH_COUNTRIES_SUCCESS:
      return {
        ...state,
        countriesFetchLoading: false,
        countriesFetchError: "",
        countriesFetchSuccess: true,
        countries: action.payload,
      };
    case countriesConstant.FETCH_COUNTRIES_FAIL:
      return {
        ...state,
        countriesFetchLoading: false,
        countriesFetchError: action.payload,
        countriesFetchSuccess: false,
        countries: [],
      };

    default:
      return state;
  }
};
export default countriesReducer;
