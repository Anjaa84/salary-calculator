import React, { useState } from "react";
import { Switch, Input, Typography } from "antd";

const { Title } = Typography;

const Calculator = () => {
  const [itemsPrice, setItemsPrice] = useState(""); // Initialize as empty
  const [downPaymentMode, setDownPaymentMode] = useState(false); // false for amount, true for percentage
  const [minDownPayment, setMinDownPayment] = useState(""); // Initialize as empty
  const [otherPayment, setOtherPayment] = useState(""); // Initialize as empty
  const [interestRate, setInterestRate] = useState(""); // Initialize as empty
  const [duration, setDuration] = useState(""); // Initialize as empty

  // Convert string inputs to numbers safely, defaulting to 0 if empty
  const parsedItemsPrice = parseFloat(itemsPrice) || 0;
  const parsedMinDownPayment = parseFloat(minDownPayment) || 0;
  const parsedOtherPayment = parseFloat(otherPayment) || 0;
  const parsedInterestRate = parseFloat(interestRate) || 0;
  const parsedDuration = parseFloat(duration) || 1; // Avoid division by 0, default to 1

  // Calculate down payment based on the mode (percentage or fixed amount)
  const downPayment = downPaymentMode
    ? (parsedMinDownPayment / 100) * parsedItemsPrice // If percentage mode, calculate down payment as percentage
    : parsedMinDownPayment; // If fixed amount mode, use the input value directly

  // Calculations
  const balanceAmount = parsedItemsPrice - (downPayment + parsedOtherPayment);
  const serviceCharge = balanceAmount * 0.05; // 5% of the loan amount
  const loanAmount = balanceAmount + serviceCharge;
  const totalInterest =
    (parsedInterestRate / 100) * loanAmount * parsedDuration;
  const rental = (totalInterest + loanAmount) / parsedDuration;

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>Manual Entry Calculator</Title>

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
        <label>Interest Rate (%): </label>
        <Input
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          placeholder="Enter interest rate"
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Duration (Months): </label>
        <Input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Enter duration in months"
        />
      </div>

      <Title level={3}>Results</Title>
      <p>Min Down Payment: {downPayment.toFixed(2)}</p>
      <p>Balance Amount: {balanceAmount.toFixed(2)}</p>
      <p>Service Charge (5%): {serviceCharge.toFixed(2)}</p>
      <p>Loan Amount: {loanAmount.toFixed(2)}</p>
      <p>Total Interest: {totalInterest.toFixed(2)}</p>

      {/* Highlighting Rental */}
      <p style={{ fontSize: "1.5em", fontWeight: "bold", color: "#1890ff" }}>
        Rental (Per Month): {rental.toFixed(2)}
      </p>
    </div>
  );
};

export default Calculator;
