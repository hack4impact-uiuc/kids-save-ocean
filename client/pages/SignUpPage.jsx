import { Button, Col, Input, Row } from "reactstrap";
import { Head } from "../components";
import countryData from "../utils/countries";
import Select from "react-select";
import React from "react";
import "../public/styles/signupPage.scss";
export default function() {
  const options = [
    { value: "student", label: "Student" },
    { value: "teacher", label: "Teacher" },
    { value: "stakeholder", label: "Stakeholder" }
  ];
  return (
    <>
      <Head title="Sign Up" />
      <Row className="parentRow">
        <Col className="columnLeft" xs="6">
          <div className="motto">
            <strong>
              Change your community, <br /> Change the world.
              <br /> <br /> Join FateMaker today.
            </strong>
          </div>
        </Col>
        <Col xs="6">
          <div className="colBoxes">
            <h2>
              <strong>Welcome to FateMaker!</strong>
            </h2>
          </div>
          <Row className="rowInput">
            <Col xs="3" align="right" className="vertAlign">
              username
            </Col>
            <Col xs="9">
              <Input placeholder="choose username" />
            </Col>
          </Row>
          <Row className="rowInput">
            <Col xs="3" align="right" className="vertAlign">
              password
            </Col>
            <Col xs="9">
              <Input placeholder="choose password" />
            </Col>
          </Row>
          <Row className="rowInput">
            <Col xs="3" align="right" className="vertAlign">
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
          <Row className="rowInput">
            <Col xs="3" align="right" className="vertAlign">
              birthday
            </Col>
            <Col xs="9">
              <Input placeholder="dd/mm/yyyy" />
            </Col>
          </Row>
          <Row className="rowInput">
            <Col xs="3" align="right" className="vertAlign">
              who are you?
            </Col>
            <Col xs="9">
              <Select
                options={options}
                placeholder="I am a..."
                borderColor="#66CCCC"
                isClearable
              />
            </Col>
          </Row>
          <Row className="rowInput">
            <Col xs="3" align="right" className="vertAlign">
              email
            </Col>
            <Col xs="9">
              <Input placeholder="choose email" />
            </Col>
          </Row>
          <Row>
            <Button className="suButton">
              <strong>Sign Up!</strong>
            </Button>{" "}
          </Row>
        </Col>
      </Row>
    </>
  );
}
