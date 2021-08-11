import React, { useEffect } from "react";
import { fetchCountries } from "../../actions/countries.actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const {
    countriesReducer: {
      countriesFetchLoading,
      countriesFetchError,
      countriesFetchSuccess,
      countries,
    },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchCountries());
  }, []);

  return (
    <>
      {countriesFetchSuccess &&
        countries.map((country, index) => (
          <div key={index}>
            <h3>{country.Country}</h3>{" "}
            <Link to={`/country/${country.Country}`}> More Info </Link>
          </div>
        ))}
    </>
  );
};

export default App;
