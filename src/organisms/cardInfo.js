import { Col, Divider, Row, Typography } from "antd";
import React from "react";
import styled from "styled-components";
const { Text } = Typography;
export default function CardInfo({ summary, countryName }) {
  const countryInfo = summary.Countries.filter(
    (country) => country.Country === countryName
  )[0];
  return (
    <CountryInfoContainer>
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          span={7}
        >
          <Text>Confirmed</Text>
          <Text>{countryInfo?.TotalConfirmed}</Text>
        </Col>
        <Divider type="vertical" />
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          span={7}
        >
          <Text>Deaths</Text>
          <Text>{countryInfo?.TotalDeaths}</Text>
        </Col>
        <Divider type="vertical" />
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          span={7}
        >
          <Text>Recovered</Text>
          <Text>{countryInfo?.TotalRecovered}</Text>
        </Col>
      </Row>
    </CountryInfoContainer>
  );
}

const CountryInfoContainer = styled.div`
  .ant-divider-vertical {
    font-size: 38px !important;
  }
`;
