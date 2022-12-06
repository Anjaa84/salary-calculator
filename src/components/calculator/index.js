import React, { useState } from "react";

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
import { AiOutlinePlus } from "react-icons/ai";
import {
  getDeductionTotalValue,
  getEarningTotalValue,
  currencyMask,
  removeComma,
} from "../../common/Common";
import { HEADING } from "../../common/const";
import CalculatorResultRow from "./calcular-result-row";
const Calculator = () => {
  const [earningList, setEarningList] = useState([{ earningValue: "" }]);
  const [deductionList, setDeductionList] = useState([{ deductionValue: "" }]);
  const [epfSum, setEpfSum] = useState(null);
  const [checked, setChecked] = useState([]);

  const [basicSalary, setBasicSalary] = useState(null);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    if (name === "earningValue") {
      const list = [...earningList];
      list[index][name] = value;
      setEarningList(list);
    }

    if (name === "deductionValue") {
      const list = [...deductionList];
      list[index][name] = value;
      setDeductionList(list);
    }

    if (name === "basicSalary") {
      setBasicSalary(value);
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

    list.splice(0, 1);

    list.length ? setEarningList(list) : setEarningList([{ earningValue: "" }]);
  };

  const handleDeductionRemoveClick = (index) => {
    const list = [...deductionList];

    list.splice(index, 1);

    list.length
      ? setDeductionList(list)
      : setDeductionList([{ deductionValue: "" }]);
  };

  const indexCounter = (event, index) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    const list = [];
    setChecked(updatedList);
    for (const number of updatedList) {
      list.push(earningList[Number(number)]);
    }

    const sum = getEarningTotalValue(list);

    setEpfSum(sum);
  };
  const calculateEpf = (percent) => {
    let value =
      (Number(removeComma(basicSalary)) + Number(epfSum)) *
      (Number(percent) / 100);
   
    return (value);
  };

  const calculateGrossEarning = () => {
    const sum =
      Number(getEarningTotalValue(earningList)) +
      Number(removeComma(basicSalary));
    return sum
  };

  const calculateNetSalary = () => {
    let result =
      Number(removeComma(basicSalary)) +
      Number(getEarningTotalValue(earningList)) -
      Number(getDeductionTotalValue(deductionList)) -
      Number((calculateEpf(8)));



    return result;
  };

  const calculateCTC = () => {
    let result =
      Number(calculateGrossEarning()) -
      Number(getDeductionTotalValue(deductionList)) +
      Number((calculateEpf(12)) + Number((calculateEpf(3))));
    
    return result
  };

  const resetData = () => {
    setBasicSalary("");
    setEarningList([{ earningValue: "" }]);
    setDeductionList([{ deductionValue: "" }]);
    setEpfSum(null);
  };

  // setBasicSalary(addCommas((event.target.value)));
  const onBlur = (e, index) => {
    const { name, value } = e.target;

    if (name === "earningValue") {
      const list = [...earningList];
      list[index][name] = Number(value).toLocaleString(undefined, {
        minimumFractionDigits: 2,
      });
      setEarningList(list);
    }

    if (name === "deductionValue") {
      const list = [...deductionList];
      list[index][name] = Number(value).toLocaleString(undefined, {
        minimumFractionDigits: 2,
      });
      setDeductionList(list);
    }

    if (name === "basicSalary") {
      setBasicSalary(
        Number(value).toLocaleString(undefined, { minimumFractionDigits: 2 })
      );
    }
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
                      type="text"
                      name="basicSalary"
                      value={basicSalary}
                      onBlur={(e) => onBlur(e)}
                      onChange={(e) => handleInputChange(currencyMask(e))}
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
                              type="text"
                              name="earningValue"
                              onBlur={(e) => onBlur(e, index)}
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
                      <Row>
                        <Col className="col-5">
                          <InputGroup className="mb-3">
                            <Form.Control
                              name="deductionValue"
                              type="text"
                              onBlur={(e) => onBlur(e, index)}
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
                      </Row>
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
                <Col className="col-10 main-heading p-0 pb-2 ">
                  {HEADING.SALARY_RESULT}
                </Col>
              </Row>
              <Container className="p-0 m-0 result-heading ">
                <Row className=" m-1">
                  <Col className="col-8 p-0 ">
                    <p className="left-align-text ">Items</p>
                  </Col>
                  <Col className="col-4">
                    <p className=" right-align-text mb-1">Amount</p>
                  </Col>
                </Row>
              </Container>

              <CalculatorResultRow
                item="Basic Salary"
                value={basicSalary ? basicSalary : null}
              />
              <CalculatorResultRow
                item="Gross Earnings"
                value={
                  isNaN(calculateGrossEarning())
                    ? "0.00"
                    : calculateGrossEarning().toLocaleString(undefined, { minimumFractionDigits: 2 })
                }
              />
              <CalculatorResultRow
                item="Gross Deduction"
                value={getDeductionTotalValue(deductionList).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              />
              <CalculatorResultRow
                item="Employee EPF (8%)"
                value={calculateEpf(8).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              />

              <Container className="p-1 mt-2 mb-3 net-salary-section ">
                <Row className="p-1 m-1 ">
                  <Col className="col-8 p-0 ">
                    <p className="left-align-text ">Net Salary (Take Home)</p>
                  </Col>
                  <Col className="col-4">
                    <p className=" right-align-text mb-1">
                     {calculateNetSalary().toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </p>
                  </Col>
                </Row>
              </Container>

              <Row className=" result-heading m-1 pb-3">
                Contribution from the Employer
              </Row>

              <CalculatorResultRow
                item="Employeer EPF (12%)"
                value={calculateEpf(12).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              />
              <CalculatorResultRow
                item="Employeer ETF (3%)"
                value={calculateEpf(3).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              />
              <CalculatorResultRow
                item="CTC (Cost to Company)"
                value={calculateCTC().toLocaleString(undefined, { minimumFractionDigits: 2 })}
              />
            </Container>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Calculator;
