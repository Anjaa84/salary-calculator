import React, { useState } from "react";
import { Input, Typography, Row, Col, Select ,Image} from "antd";
import { InitialPayLogo } from "../../assets";

const { Title } = Typography;
const { Option } = Select;

const PhoneLoanCalculator = () => {
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [userType, setUserType] = useState("customer"); // Default to customer

  // Convert string inputs to numbers safely, defaulting to 0 if empty
  const parsedPrice = parseFloat(price) || 0;
  const parsedDuration = parseFloat(duration) || 1; // Avoid division by 0, default to 1

  // Down Payment calculation
  const downPaymentRate = userType === "customer" ? 0.25 : 0.15;
  const downPayment = parsedPrice * downPaymentRate;

  // Facility Amount
  const facilityAmount = parsedPrice - downPayment;

  // Service Charge (5% of Facility Amount)
  const serviceChargeRate = userType === "customer" ? 0.05 : 0.02;
  const serviceCharge = facilityAmount * serviceChargeRate;


  // Rental Amount
  const rentalAmount = facilityAmount / parsedDuration;

  // Initial Pay
  const initialPay = downPayment + serviceCharge + rentalAmount;

  return (
    <div style={{ padding: "20px" }}>
      <Row align="middle" gutter={16}>
        <Col>
          <Image
            src={InitialPayLogo} // Replace with the actual logo URL or path
            alt="Logo"
            width={80}
            height={80}
          />
        </Col>
        <Col>
          <Title level={2}>Phone Loan Calculator</Title>
        </Col>
      </Row>

      <div style={{ marginBottom: "10px" }}>
        <label>H/P Price </label>
        <Input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter Price"
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

      <div style={{ marginBottom: "10px",marginRight:"20px" }}>
        <label style={{marginRight:"20px" }}>User Type: </label>
        <Select
          value={userType}
          onChange={(value) => setUserType(value)}
          style={{ width: 200 }}
        >
          <Option value="customer">Customer</Option>
          <Option value="staff">Staff</Option>
        </Select>
      </div>

      <Title level={3}>Results</Title>
      <p>Down Payment: {downPayment.toFixed(2)}</p>
      <p>Facility Amount: {facilityAmount.toFixed(2)}</p>
      <p>Service Charge: {serviceCharge.toFixed(2)}</p>
       <p style={{ fontWeight: "bold", color: "red",fontSize:"24px" }}>
        Rental Amount (Monthly): {rentalAmount.toFixed(2)}
      </p>
      <p style={{ fontWeight: "bold", color: "#00008B",fontSize:"28px" }}>
        Initial Payment: {initialPay.toFixed(2)}
      </p>

      <div
        style={{
          marginTop: "30px",
          textAlign: "center",
          fontSize: "16px",
          color: "gray",
        }}
      >
Need help? Contact at 0770733334 for any inquiries      </div>
    </div>
  );
};

export default PhoneLoanCalculator;
