import React, { useEffect, useState } from "react";
// import { Card, Icon ,Input} from "semantic-ui-react";
import {
  Row,
  Col,
  Container,
  Card,
  InputGroup,
  Form,
  Image,
} from "react-bootstrap";
import "./calculator.css";
import reset from "../../assets/images/reset.svg";
import deleteIcon from "../../assets/images/delete.svg";

import { CiCircleRemove } from "react-icons/ci";
import { AiOutlinePlus } from "react-icons/ai";
import {
  getDeductionTotalValue,
  getEarningTotalValue,
} from "../../common/Common";
import { HEADING } from "../../common/const";
import CalculatorResultRow from "./calcular-result-row";
const Calculator = () => {
  const [earningList, setEarningList] = useState([{ earningValue: "" }]);
  const [earningListEpf, setEarningListEpf] = useState([{ earningValue: "" }]);
  const [deductionList, setDeductionList] = useState([{ deductionValue: "" }]);
  const [epfSum, setEpfSum] = useState(null);
  const [checked, setChecked] = useState([]);

  const [basicSalary, setBasicSalary] = useState(null);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "earningValue") {
      const list = [...earningList];
      list[index][name] = Number(value);
      setEarningList(list);
    }

    if (name === "deductionValue") {
      const list = [...deductionList];
      list[index][name] = Number(value);
      setDeductionList(list);
    }

    if (name === "basicSalary") {
      setBasicSalary(Number(value));
    }
  };

  const handleEarningAddClick = () => {
    setEarningList([...earningList, { earningValue: "" }]);
  };
  const handleDeductionAddClick = () => {
    setDeductionList([...deductionList, { deductionValue: "" }]);
  };

  const handleEarningRemoveClick = (index) => {
    const list = [...earningList];
    list.splice(index, 1);
    setEarningList(list);
  };

  const handleDeductionRemoveClick = (index) => {
    const list = [...deductionList];
    list.splice(index, 1);
    setDeductionList(list);
  };

  const indexCounter = (event, index) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    let list = [];
    setChecked(updatedList);
    updatedList.map((number) => {
      list.push(earningList[Number(number)]);
    });

    setEarningListEpf(list);
    const sum = getEarningTotalValue(list);
    setEpfSum(sum);
  };
  const calculateEpf = (percent) => {
    return epfSum
      ? (Number(basicSalary) + Number(epfSum)) * (Number(percent) / 100)
      : 0;
  };

  const calculateNetSalary = () => {
    const result =
      Number(basicSalary) +
      Number(getEarningTotalValue(earningList)) -
      Number(getDeductionTotalValue(deductionList)) -
      Number(calculateEpf(8));

    return result;
  };

  const calculateCTC = () => {
    const result =
      Number(basicSalary) +
      Number(getEarningTotalValue(earningList)) -
      Number(getDeductionTotalValue(deductionList)) +
      Number(calculateEpf(12) + Number(calculateEpf(12)));

    return result;
  };

  const resetData = () => {
    setBasicSalary("");
    setEarningList([{ earningValue: "" }]);
    setDeductionList([{ deductionValue: "" }]);
  };
  return (
    <>
      <Row className="p-4 mb-2">
        <Col className="col-5 mt-2 ">
          <Card className="calculator-card ">
            <Container className="p-1 m-3 pb-3">
              <Row>
                <Col className="col-9 main-heading">{HEADING.CALC_SALARY}</Col>
                <Col className="col-3 reset-section">
                  <Image
                    src={reset}
                    onClick={() => {
                      resetData();
                    }}
                    className="pe-2"
                  ></Image>
                  Reset
                </Col>
              </Row>

              <Container className="p-0 m-0 pt-2">
                <Row className="heading pb-1">
                  <div>Basic Salary</div>
                </Row>
                <Row className="col-5">
                  <InputGroup className="mb-3">
                    <Form.Control
                      name="basicSalary"
                      value={basicSalary}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </InputGroup>
                </Row>
              </Container>

              <Container className="p-0 m-0">
                <Row>
                  <div className="heading">{HEADING.EARNINGS}</div>
                  <div className="sub-heading pb-1">
                    Allowance, Fixed Allowance, Bonus and etc.
                  </div>
                </Row>
                <Row>
                  {earningList.map((data, index) => {
                    return (
                      <>
                        <Col className="col-5 ">
                          <InputGroup className="mb-3">
                            <Form.Control
                              name="earningValue"
                              value={data.earningValue}
                              onChange={(e) => handleInputChange(e, index)}
                            />
                          </InputGroup>
                        </Col>

                        <Col className="col-1 p-0">
                          {earningList.length !== 0 && (
                            <Image
                              src={deleteIcon}
                              onClick={() => handleEarningRemoveClick(index)}
                              className="pe-2"
                            ></Image>
                          )}
                        </Col>
                        <Col className="col-2 p-0">
                          <Form.Check
                            type="checkbox"
                            id={`default`}
                            value={index}
                            label={`EPF/ETF `}
                            onChange={(e) => indexCounter(e, index)}
                          />
                        </Col>
                      </>
                    );
                  })}
                </Row>
                <Row className=" add-button m-0 p-0">
                  <Col className="col-1 ">
                    {earningList.length && (
                      <AiOutlinePlus onClick={handleEarningAddClick} />
                    )}
                  </Col>

                  <Col className=" m-0 p-0">Add New Allowance</Col>
                </Row>
              </Container>

              <Container className="p-0 m-0 pt-3">
                <Row>
                  <div className="heading">{HEADING.DEDUCTIONS}</div>
                  <div className="sub-heading pb-1">
                    Salary Advances, Loan Deductions and all
                  </div>
                </Row>
                <Row>
                  {deductionList.map((data, index) => {
                    return (
                      <>
                        <Col className="col-5">
                          <InputGroup className="mb-3">
                            <Form.Control
                              name="deductionValue"
                              value={data.deductionValue}
                              onChange={(e) => handleInputChange(e, index)}
                            />
                          </InputGroup>
                        </Col>

                        <Col className="col-1 p-0">
                          {deductionList.length !== 0 && (
                            <Image
                              src={deleteIcon}
                              onClick={() => handleDeductionRemoveClick(index)}
                              className="pe-2"
                            ></Image>
                          )}
                        </Col>
                      </>
                    );
                  })}
                </Row>
                <Row className=" add-button m-0 p-0">
                  <Col className="col-1 ">
                    {deductionList.length && (
                      <AiOutlinePlus
                        size={15}
                        onClick={handleDeductionAddClick}
                      />
                    )}
                  </Col>

                  <Col className=" m-0 p-0 ">Add New Deduction</Col>
                </Row>
              </Container>
            </Container>
          </Card>
        </Col>
        <Col className="col-4">
          <Card className="calculator-view-card p-2 m-2 ">
            <Container className=" m-1">
              <Row className="m-1">
                <Col className="col-10 main-heading p-0 pb-2 ">{HEADING.SALARY_RESULT}</Col>
              </Row>
              <Container className="p-0 m-0 result-heading ">
                <Row className=" m-1" >
                  <Col className="col-8 p-0 ">
                    <p className="left-align-text ">Items</p>
                  </Col>
                  <Col className="col-4">
                    <p className=" right-align-text mb-1">Amount</p>
                  </Col>
                </Row>
              </Container>

              <CalculatorResultRow item="Basic Salary" value={basicSalary} />
              <CalculatorResultRow
                item="Gross Earnings"
                value={getEarningTotalValue(earningList)}
              />
              <CalculatorResultRow
                item="Gross Deduction"
                value={getDeductionTotalValue(deductionList)}
              />
              <CalculatorResultRow
                item="Employee EPF (8%)"
                value={calculateEpf(8)}
              />

              <Container className="p-1 mt-2 mb-3 net-salary-section ">
                <Row className="p-1 m-1 ">
                  <Col className="col-8 p-0 ">
                    <p className="left-align-text ">Net Salary (Take Home)</p>
                  </Col>
                  <Col className="col-4">
                    <p className=" right-align-text mb-1">
                      {calculateNetSalary()}
                    </p>
                  </Col>
                </Row>
              </Container>

              <Row className=" result-heading m-1 pb-3">
                Contribution from the Employer
              </Row>

              <CalculatorResultRow
                item="Employeer EPF (12%)"
                value={calculateEpf(12)}
              />
              <CalculatorResultRow
                item="Employeer EPF (3%)"
                value={calculateEpf(3)}
              />
              <CalculatorResultRow
                item="CTC (Cost to Company)"
                value={calculateCTC()}
              />
            </Container>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Calculator;
