import React from "react";

import { Row, Col, Container } from "react-bootstrap";
import "./calculator.css";

const CalculatorResultRow = ({ item, value }) => {
  return (
    <Container className="p-0 m-0 result-row">
      <Row className=" m-1">
        <Col className="col-8 p-0 m-0">
          <p className="left-align-text">{item}</p>
        </Col>
        <Col className="col-4">
          <p className=" right-align-text ">{value ? value : 0}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default CalculatorResultRow;
