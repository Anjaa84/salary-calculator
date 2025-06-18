import React, { useState } from "react";
import { Switch, Input, Typography, Image, Row, Col, Select } from "antd";
import { Logo } from "../../assets";

const { Title } = Typography;

const Calculator = () => {
  const [itemsPrice, setItemsPrice] = useState(""); // Initialize as empty
  const [downPaymentMode, setDownPaymentMode] = useState(false); // false for amount, true for percentage
  const [minDownPayment, setMinDownPayment] = useState(""); // Initialize as empty
  const [otherPayment, setOtherPayment] = useState(""); // Initialize as empty
  const [duration, setDuration] = useState(3); // Default to 3 months

  // Map duration to interest rate
  const durationInterestRateMap = {
    3: 10,
    6: 25,
    12: 55,
  };

  // Convert string inputs to numbers safely, defaulting to 0 if empty
  const parsedItemsPrice = parseFloat(itemsPrice) || 0;
  const parsedMinDownPayment = parseFloat(minDownPayment) || 0;
  const parsedOtherPayment = parseFloat(otherPayment) || 0;
  const parsedDuration = parseInt(duration) || 3;
  const parsedInterestRate = durationInterestRateMap[parsedDuration];

  // Calculate down payment based on the mode (percentage or fixed amount)
  const downPayment = downPaymentMode
    ? (parsedMinDownPayment / 100) * parsedItemsPrice // If percentage mode, calculate down payment as percentage
    : parsedMinDownPayment; // If fixed amount mode, use the input value directly

  // Calculations
  const balanceAmount = parsedItemsPrice - (downPayment + parsedOtherPayment);
  const loanAmount = balanceAmount; // No service charge added
  const totalInterest = (parsedInterestRate / 100) * loanAmount;
  const rental = (totalInterest + loanAmount) / parsedDuration;

  return (
    <div style={{ padding: "20px" }}>
      <Row align="middle" style={{ marginBottom: "20px" }}>
        <Col>
          <Image
            paddingLeft="100px"
            src={Logo} // Replace with your logo URL
            alt="Monik Homes Logo"
            width={100} // Set the desired width
            height={100} // Set the desired height
            // Add margin for spacing
          />
        </Col>
        <Col>
          <Title level={2} style={{ margin: "0 0 0 20px" }}>
            Monik Homes CAL Calculator
          </Title>
        </Col>
      </Row>

      <div style={{ marginBottom: "10px" }}>
        <label>Items Price: </label>
        <Input
          type="number"
          value={itemsPrice}
          onChange={(e) => setItemsPrice(e.target.value)}
          placeholder="Enter items price"
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>
          Min Down Payment Mode: &nbsp;
          <Switch
            checked={downPaymentMode}
            onChange={(checked) => setDownPaymentMode(checked)}
          />
          &nbsp; {downPaymentMode ? "Percentage" : "Amount"}
        </label>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Min Down Payment ({downPaymentMode ? "%" : "Amount"}):</label>
        <Input
          type="number"
          value={minDownPayment}
          onChange={(e) => setMinDownPayment(e.target.value)}
          placeholder="Enter down payment"
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Other Payment: </label>
        <Input
          type="number"
          value={otherPayment}
          onChange={(e) => setOtherPayment(e.target.value)}
          placeholder="Enter other payment"
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Duration (Months): </label>
        <Select
          value={duration}
          onChange={(value) => setDuration(value)}
          style={{ width: 120 }}
        >
          <Select.Option value={3}>3 Months</Select.Option>
          <Select.Option value={6}>6 Months</Select.Option>
          <Select.Option value={12}>12 Months</Select.Option>
        </Select>
      </div>

      <Title level={3}>Results</Title>
      <p>Min Down Payment: {downPayment.toFixed(2)}</p>
      <p>Balance Amount: {balanceAmount.toFixed(2)}</p>
      <p>Loan Amount: {(loanAmount + totalInterest).toFixed(2)}</p>
      <p>Total Interest: {totalInterest.toFixed(2)}</p>
      <p>Interest Rate: {parsedInterestRate}%</p>

      {/* Highlighting Rental */}
      <p style={{ fontSize: "1.5em", fontWeight: "bold", color: "#00008B" }}>
        Rental (Per Month): {rental.toFixed(2)}
      </p>

      {/* Contact Information Section */}
      <div
        style={{
          marginTop: "30px",
          textAlign: "center",
          fontSize: "16px",
          color: "gray",
        }}
      >
        Need help? Contact at 0770733334 for any inquiries
      </div>
    </div>
  );
};

export default Calculator;
