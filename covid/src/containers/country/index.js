import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCovidDataFromDayOne } from "../../actions/covidInfo.actions";

export default function Country(props) {
  const { match } = props;
  const { countryName } = match.params;
  const dispatch = useDispatch();
  const {
    covidDataReducer: {
      covidDataFetchSuccess,
      covidDataFetchError,
      covidDataFetchLoading,
      covidData,
    },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchCovidDataFromDayOne(countryName));
  }, []);

  const renderCountry = (countryData) => {
    const total = countryData.reduce(
      (accumulator, country) => {
        const keys = Object.keys(accumulator);
        keys.forEach((key) => {
          accumulator[key] += country[key];
        });
        return accumulator;
      },
      { Confirmed: 0, Deaths: 0, Recovered: 0, Active: 0 }
    );
    return (
      <>
        <div>
          <h1>Confirmed</h1>
          <p>{total.Confirmed}</p>
        </div>
        <div>
          <h1>Deaths</h1>
          <p>{total.Deaths}</p>
        </div>
        <div>
          <h1>Recovered</h1>
          <p>{total.Recovered}</p>
        </div>
        <div>
          <h1>Active</h1>
          <p>{total.Active}</p>
        </div>
      </>
    );
  };
  return covidDataFetchSuccess && <div>{renderCountry(covidData)}</div>;
}
