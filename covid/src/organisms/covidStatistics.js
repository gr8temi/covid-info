import React from "react";
import { Row, Col, Card, Statistic } from "antd";
export default function CovidStatistics({ data, statistics }) {
  return (
    <Row gutter={16} style={{ width: "100%" }}>
      {statistics.map((stat) => (
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <Card hoverable>
            <Statistic
              title={stat.text}
              value={data[stat.value]}
              precision={2}
              valueStyle={{ color: stat.color || "#3f8600" }}
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
}
