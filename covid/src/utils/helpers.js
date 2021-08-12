//error message retriver
import moment from "moment";
export const retrieveMessage = (err) => {
  if (
    err.response &&
    err.response.data &&
    err.response.data.error &&
    err.response.data.error.message
  ) {
    return err.response.data.error.message;
  } else if (err.response && err.response.data && err.response.data.message) {
    return err.response.data.message;
  } else if (err.message) {
    return err.message;
  } else {
    return err;
  }
};

export const getMonths = (start, end) =>
  Array.from({ length: moment(end).diff(start, "month") + 1 }).map((_, index) =>
    moment(start).add(index, "month").format("YYYY-MM")
  );
export const MonthDataFormat = (months, data) => {
  const monthlyData = {};
  data.forEach((info) => {
    months.forEach((month) => {
      if (moment(month).format("M") === moment(info.Date).format("M")) {
        if (monthlyData.hasOwnProperty(month)) {
          monthlyData[month].Confirmed += info.Confirmed;
          monthlyData[month].Deaths += info.Deaths;
          monthlyData[month].Active += info.Active;
          monthlyData[month].Recovered += info.Recovered;
        } else {
          const obj = {
            Confirmed: info.Confirmed,
            Deaths: info.Deaths,
            Active: info.Active,
            Recovered: info.Recovered,
            Date: month,
          };
          monthlyData[month] = obj;
        }
      }
    });
  });
  console.log({ monthlyData });
  return Object.values(monthlyData);
};
