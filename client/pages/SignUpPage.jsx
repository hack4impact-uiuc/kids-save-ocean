import { Button, Col, Input, Row } from "reactstrap";
import { Head } from "../components";
import countryData from "../utils/countries";
import Select from "react-select";
import React from "react";
export default function() {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" }
  ];
  return (
    <>
      <Head title="Sign Up" />
      {/* <Container style={{fontFamily:"Arvo", marginTop:"3.5%", width:"100%"}}> */}
      <Row style={{ fontFamily: "Arvo", color: "#003366" }}>
        <Col xs="6" style={{ background: "#66CCCC", height: "100%" }}>
          <div
            style={{
              fontSize: "3rem",
              marginTop: "5%",
              marginLeft: "5%",
              marginRight: "5%",
              marginBottom: "62%"
            }}
          >
            <strong>
              Change your community, <br /> Change the world.
              <br /> <br /> Join FateMaker today.
            </strong>
          </div>
        </Col>
        <Col xs="6">
          <div style={{ textAlign: "center", marginTop: "20%" }}>
            <h2>
              <strong>Welcome to FateMaker!</strong>
            </h2>
          </div>
          {/* Inputs */}
          <Row
            style={{
              width: "60%",
              marginLeft: "20%",
              marginRight: "20%",
              marginTop: "3.5%"
            }}
          >
            <Col
              xs="3"
              align="right"
              style={{ marginTop: "auto", marginBottom: "auto" }}
            >
              username
            </Col>
            <Col xs="9">
              <Input
                // style={{borderColor: "#66CCCC"}}
                placeholder="choose username"
              />
            </Col>
          </Row>
          <Row
            style={{
              width: "60%",
              marginLeft: "20%",
              marginRight: "20%",
              marginTop: "3.5%"
            }}
          >
            <Col
              xs="3"
              align="right"
              style={{ marginTop: "auto", marginBottom: "auto" }}
            >
              password
            </Col>
            <Col xs="9">
              <Input
                // style={{borderColor: "#66CCCC"}}
                placeholder="choose password"
              />
            </Col>
          </Row>
          <Row
            style={{
              width: "60%",
              marginLeft: "20%",
              marginRight: "20%",
              marginTop: "3.5%"
            }}
          >
            <Col
              xs="3"
              align="right"
              style={{ marginTop: "auto", marginBottom: "auto" }}
            >
              country
            </Col>
            <Col xs="9">
              <Select
                options={countryData}
                placeholder="select country"
                isClearable
              />
            </Col>
          </Row>
          <Row
            style={{
              width: "60%",
              marginLeft: "20%",
              marginRight: "20%",
              marginTop: "3.5%"
            }}
          >
            <Col
              xs="3"
              align="right"
              style={{ marginTop: "auto", marginBottom: "auto" }}
            >
              birthday
            </Col>
            <Col xs="9">
              <Input
                //style={{borderColor: "#66CCCC"}}
                placeholder="dd/mm/yyyy"
              />
            </Col>
          </Row>
          <Row
            style={{
              width: "60%",
              marginLeft: "20%",
              marginRight: "20%",
              marginTop: "3.5%"
            }}
          >
            <Col
              xs="3"
              align="right"
              style={{ marginTop: "auto", marginBottom: "auto" }}
            >
              who are you?
            </Col>
            <Col xs="9">
              <Select
                // style={{borderColor: "#66CCCC"}}
                options={options}
                placeholder="I am a..."
                borderColor="#66CCCC"
                isClearable
              />
            </Col>
          </Row>
          <Row
            style={{
              width: "60%",
              marginLeft: "20%",
              marginRight: "20%",
              marginTop: "3.5%"
            }}
          >
            <Col
              xs="3"
              align="right"
              style={{ marginTop: "auto", marginBottom: "auto" }}
            >
              email
            </Col>
            <Col xs="9">
              <Input
                //style={{borderColor: "#66CCCC"}}
                placeholder="choose email"
              />
            </Col>
          </Row>
          <Row>
            <Button
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                background: "#FFCC66",
                color: "#003366",
                border: "transparent",
                marginTop: "3.5%"
              }}
            >
              <strong>Sign Up!</strong>
            </Button>{" "}
          </Row>
        </Col>
      </Row>

      {/* </Container> */}
    </>
  );
}
