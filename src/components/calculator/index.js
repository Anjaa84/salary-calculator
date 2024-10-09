import React, { useState } from "react";
import { Input, Typography, Row, Col, Image } from "antd";
import { Logo } from "../../assets";

const { Title } = Typography;

const LoanCalculator = () => {
  const [leaseAmount, setLeaseAmount] = useState("");
  const [otherCharges, setOtherCharges] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [duration, setDuration] = useState("");
  const [documentChargesPercentage, setDocumentChargesPercentage] =
    useState("");

  // Convert string inputs to numbers safely, defaulting to 0 if empty
  const parsedLeaseAmount = parseFloat(leaseAmount) || 0;
  const parsedOtherCharges = parseFloat(otherCharges) || 0;
  const parsedInterestRate = parseFloat(interestRate) || 0;
  const parsedDuration = parseFloat(duration) || 1; // Avoid division by 0, default to 1
  const parsedDocumentChargesPercentage =
    parseFloat(documentChargesPercentage) || 0;

  // Calculations
  const totalInterest =
    (parsedInterestRate / 100) *
    parsedDuration *
    (parsedLeaseAmount + parsedOtherCharges);
  const agreedAmount = parsedLeaseAmount + parsedOtherCharges + totalInterest;
  const rental = agreedAmount / parsedDuration;

  // Document Charges calculations
  const documentChargesAmount =
    (parsedDocumentChargesPercentage / 100) * parsedLeaseAmount;
  const releaseAmount = parsedLeaseAmount - documentChargesAmount;

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
        <label>Lease/Loan Amount: </label>
        <Input
          type="number"
          value={leaseAmount}
          onChange={(e) => setLeaseAmount(e.target.value)}
          placeholder="Enter Lease/Loan Amount"
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Other Charges: </label>
        <Input
          type="number"
          value={otherCharges}
          onChange={(e) => setOtherCharges(e.target.value)}
          placeholder="Enter Other Charges"
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Interest Rate (%): </label>
        <Input
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          placeholder="Enter Interest Rate"
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Duration (Months): </label>
        <Input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Enter Duration"
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Document Charges (%): </label>
        <Input
          type="number"
          value={documentChargesPercentage}
          onChange={(e) => setDocumentChargesPercentage(e.target.value)}
          placeholder="Enter Document Charges Percentage"
        />
      </div>

      <Title level={3}>Results</Title>
      <p>Total Interest: {totalInterest.toFixed(2)}</p>
      <p>Agreed Amount: {agreedAmount.toFixed(2)}</p>
      <p>Rental (Per Month): {rental.toFixed(2)}</p>
      <p>Document Charges Amount: {documentChargesAmount.toFixed(2)}</p>
      <p>Release Amount: {releaseAmount.toFixed(2)}</p>
    </div>
  );
};

export default LoanCalculator;
