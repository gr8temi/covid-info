import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCovidDataDateRange, fetchCovidDataFromDayOne } from "../../actions/countryCovidInfo.actions";
import LineChart from "../../atoms/lineChart";
import { Col, DatePicker, Layout, Row, Select, Spin } from 'antd';
import moment from "moment"
import CovidStatistics from "../../organisms/covidStatistics";
import { getMonths, MonthDataFormat } from "../../utils/helpers";
const { RangePicker } = DatePicker;
export default function Country({match,...props}) {
  const { countryName } = match.params;
  const [value, setValue] = useState();
  const [picker, setPicker] = useState()
  const [months, setMonths] = useState([])
  const [fetch, setFetch] = useState(false)
  const dispatch = useDispatch();
  const {
    countryCovidDataReducer: {
      covidDataFetchSuccess,
      covidDataFetchLoading,
      covidData,
    },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchCovidDataFromDayOne(countryName));
  }, []);


  const handleFilter = () => {
    let startDate = value[0]
    let endDate = value[1]
    if (picker === "month"){
      setFetch(true)
      const daysInEndMonth = moment(endDate).daysInMonth()
      endDate = moment(endDate).add(daysInEndMonth, 'days')._d.toISOString().slice(0,10)
      setMonths(getMonths(startDate,endDate))
    }
    dispatch(fetchCovidDataDateRange(countryName,startDate,endDate))
  }

  function disabledDate(current) {
  return current && current > moment().endOf('day');
}

  const renderCountry = (countryData) => {
    const countrySummary = countryData[countryData.length-1];
    return (
      <>
      {covidDataFetchLoading && <Spin />}
        <CovidStatistics
        data={countrySummary}
        statistics = {[
          { value: "Confirmed", text: "Confirmed cases" },
          { value: "Deaths", text: "Deaths", color: "#ff0334" },
          { value: "Recovered", text: "Recovered Cases" },
          { value: "Active", text: "Active Cases" },
        ]}
        />
        <Row style={{ marginTop:"20px"}}>
          <Col
              className="gutter-row"
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
            >
        <LineChart
          data={countryData.map((data, index) => {
            let newCase = data.Confirmed;
            if (index > 0) {
              newCase -= countryData[index - 1].Confirmed;
            }
            return {
              ...data,
              newCase,
            };
          })}
          dependencies={covidData}
          fields={[{ field: "newCase", color: "#f32321" }]}
          picker={picker}
        />

            </Col>
            <Col
              className="gutter-row"
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
            >
        <LineChart
          data={countryData}
          dependencies={covidData}
          fields={[
            { field: "Confirmed", color: "#21e211" },
            { field: "Deaths", color: "#112332" },
            { field: "Recovered", color: "#ee2122" },
            { field: "Active", color: "#012FFF" },
          ]}
          picker={picker}
        />
            </Col>
        </Row>
      </>
    );
  };
  return (
  <Layout width={"100%"}>
    <div style={{display:"flex", justifyContent:"center", margin:"20px 20px"}}>
    <button onClick={()=>props.history.goBack()} > Go back to countries</button>
    <Select placeholder="Select A filter type" style={{ width: 200 }} onChange={(value)=>setPicker(value)}>
      <Select.Option value="day">
        Daily
      </Select.Option>
      <Select.Option value="month">
        Monthly
      </Select.Option>
    </Select>
    <RangePicker onChange={(_,date)=> setValue(date)} disabledDate={disabledDate} picker={picker} />
    <button onClick={handleFilter} > Filter result</button>
    </div>
    {covidDataFetchSuccess && <div>{renderCountry(picker==="month"&&fetch===true?MonthDataFormat(months,covidData):covidData)}</div>}
    
  </Layout>);
}
