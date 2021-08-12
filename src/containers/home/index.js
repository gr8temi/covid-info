import React, { useEffect } from "react";
import { fetchCountriesAndSummary } from "../../actions/covidData.actions";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Avatar, Layout, Typography, Spin } from "antd";
import CovidStatistics from "../../organisms/covidStatistics";
import CardInfo from "../../organisms/cardInfo";

const { Title } = Typography;
const App = (props) => {
  const dispatch = useDispatch();
  const {
    covidInfoReducer: {
      covidDataInfoLoading,
      covidDataInfoSuccess,
      countries,
      summary,
    },
  } = useSelector((state) => state);

  useEffect(() => {
    console.log("here");
    dispatch(fetchCountriesAndSummary());
  }, []);

  const handleClick = (countryName) => {
    props.history.push(`/country/${countryName}`);
  };

  return (
    <>
      {covidDataInfoSuccess && (
        <Layout
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            paddingTop: "20px",
          }}
        >
          <CovidStatistics
            data={summary.Global}
            statistics={[
              { value: "TotalConfirmed", text: "Total confirmed cases" },
              { value: "NewConfirmed", text: "New Confirmed Cases" },
              { value: "NewDeaths", text: "New Deaths", color: "#ff0334" },
              { value: "TotalRecovered", text: "Total Recovered" },
            ]}
          />
          <Title level={1} mark style={{ marginTop: "20px" }}>
            Info by Countries
          </Title>

          <Row
            gutter={[
              { xs: 8, sm: 16, md: 24, lg: 32 },
              { xs: 8, sm: 16, md: 24, lg: 32 },
            ]}
            style={{ width: "70%" }}
          >
            {countries.sort().map((country, index) => {
              return (
                <Col
                  className="gutter-row"
                  xs={24}
                  sm={24}
                  md={12}
                  lg={12}
                  xl={12}
                  key={index}
                >
                  <Card
                    hoverable
                    bodyStyle={{ background: "#E5E4E2" }}
                    onClick={() => handleClick(country.Country)}
                  >
                    <Card.Meta
                      avatar={
                        <Avatar
                          src={`https://www.countryflags.io/${country.ISO2}/flat/64.png`}
                        />
                      }
                      title={country.Country}
                      description="Click Card for more details"
                    />
                    <CardInfo summary={summary} countryName={country.Country} />
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Layout>
      )}
      {covidDataInfoLoading && (
        <div
          style={{
            display: "flex",
            height: "inherit",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large" style={{ textAlign: "center" }} />
        </div>
      )}
    </>
  );
};

export default App;
